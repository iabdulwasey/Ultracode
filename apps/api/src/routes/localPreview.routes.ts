import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../middleware/auth.js';
import { validateRequest } from '../utils/validation.js';
import { AppError } from '../middleware/errorHandler.js';
import { localPreviewService } from '../services/localPreview.service.js';
import { supabase } from '../config/supabase.js';
import { logger } from '../utils/logger.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Validation schemas
const createPreviewSchema = z.object({
  body: z.object({
    projectId: z.string().uuid(),
    forceRecreate: z.boolean().default(false),
  }),
});

const updatePreviewSchema = z.object({
  params: z.object({
    projectId: z.string().uuid(),
  }),
});

/**
 * Create or get local preview for a project
 * POST /api/local-preview
 */
router.post('/', validateRequest(createPreviewSchema), async (req, res, next) => {
  try {
    const { projectId, forceRecreate } = req.body;
    const userId = req.user!.sub;

    logger.info('Local preview request received', { projectId, userId, forceRecreate });

    // Check if supabase is available
    if (!supabase) {
      logger.error('Supabase client not initialized');
      throw new AppError('Database connection error', 500);
    }

    // Verify project ownership
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id, name, user_id')
      .eq('id', projectId)
      .eq('user_id', userId)
      .single();

    if (projectError || !project) {
      throw new AppError('Project not found', 404);
    }

    // Let the preview service handle server reuse vs creation
    // The service will reuse healthy servers and only recreate if necessary

    // Create or reuse local preview
    logger.info('Requesting preview (create or reuse)', { projectId, userId });
    const existingPreview = localPreviewService.getPreviewStatus(projectId);
    const wasExisting = existingPreview && existingPreview.status === 'ready';
    
    const previewInfo = await localPreviewService.createPreview(projectId, userId);
    logger.info('Preview ready', { 
      projectId, 
      port: previewInfo.port,
      status: previewInfo.status,
      wasReused: wasExisting
    });

    res.json({
      success: true,
      preview: {
        projectId: previewInfo.projectId,
        url: previewInfo.url,
        port: previewInfo.port,
        status: previewInfo.status,
        isExisting: wasExisting,
      },
    });

  } catch (error: any) {
    logger.error('Local preview creation error', { 
      projectId: req.body.projectId, 
      userId: req.user?.sub, 
      error: error.message 
    });
    next(error);
  }
});

/**
 * Get local preview status for a project
 * GET /api/local-preview/:projectId
 */
router.get('/:projectId', async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = req.user!.sub;

    // Verify project ownership
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id, user_id')
      .eq('id', projectId)
      .eq('user_id', userId)
      .single();

    if (projectError || !project) {
      throw new AppError('Project not found', 404);
    }

    // Get preview status
    const previewInfo = localPreviewService.getPreviewStatus(projectId);

    if (!previewInfo) {
      return res.json({
        success: true,
        preview: null,
      });
    }

    res.json({
      success: true,
      preview: {
        projectId: previewInfo.projectId,
        url: previewInfo.url,
        port: previewInfo.port,
        status: previewInfo.status,
      },
    });

  } catch (error) {
    next(error);
  }
});

/**
 * Update local preview with latest files
 * POST /api/local-preview/:projectId/update
 */
router.post('/:projectId/update', validateRequest(updatePreviewSchema), async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = req.user!.sub;

    // Verify project ownership
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id, user_id')
      .eq('id', projectId)
      .eq('user_id', userId)
      .single();

    if (projectError || !project) {
      throw new AppError('Project not found', 404);
    }

    // Check if preview exists
    const existingPreview = localPreviewService.getPreviewStatus(projectId);
    if (!existingPreview || existingPreview.status !== 'ready') {
      throw new AppError('No active preview found', 404);
    }

    // Update preview with latest files
    const updatedPreview = await localPreviewService.updatePreview(projectId);

    res.json({
      success: true,
      message: 'Preview updated successfully',
      preview: {
        projectId: updatedPreview.projectId,
        url: updatedPreview.url,
        port: updatedPreview.port,
        status: updatedPreview.status,
      },
    });

  } catch (error: any) {
    logger.error('Failed to update local preview', { 
      projectId: req.params.projectId, 
      userId: req.user?.sub, 
      error: error.message 
    });
    next(error);
  }
});

/**
 * Stop local preview
 * DELETE /api/local-preview/:projectId
 */
router.delete('/:projectId', async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = req.user!.sub;

    // Verify project ownership
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id, user_id')
      .eq('id', projectId)
      .eq('user_id', userId)
      .single();

    if (projectError || !project) {
      throw new AppError('Project not found', 404);
    }

    // Stop the preview
    const stopped = await localPreviewService.stopPreview(projectId);

    if (stopped) {
      logger.info('Local preview stopped', { projectId, userId });
      res.json({
        success: true,
        message: 'Preview stopped successfully',
      });
    } else {
      res.json({
        success: true,
        message: 'No active preview found',
      });
    }

  } catch (error: any) {
    logger.error('Failed to stop local preview', { 
      projectId: req.params.projectId, 
      userId: req.user?.sub, 
      error: error.message 
    });
    next(error);
  }
});

/**
 * Get all active local previews for user
 * GET /api/local-preview
 */
router.get('/', async (req, res, next) => {
  try {
    const userId = req.user!.sub;

    // Get user's projects
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('id, name')
      .eq('user_id', userId);

    if (projectsError) {
      throw new AppError('Failed to fetch projects', 500);
    }

    // Get preview status for each project
    const previews = projects
      ?.map(project => {
        const previewInfo = localPreviewService.getPreviewStatus(project.id);
        return previewInfo ? {
          projectId: project.id,
          projectName: project.name,
          url: previewInfo.url,
          port: previewInfo.port,
          status: previewInfo.status,
        } : null;
      })
      .filter(Boolean) || [];

    res.json({
      success: true,
      previews,
      total: previews.length,
    });

  } catch (error) {
    next(error);
  }
});

export default router;