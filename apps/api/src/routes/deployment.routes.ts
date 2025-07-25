import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { deploymentService } from '../services/deployment.service.js';
import { supabase } from '../config/supabase.js';

const router = Router();

// Deploy a project
router.post('/deploy/:projectId', authenticate, async (req, res) => {
  try {
    const { projectId } = req.params;
    const { provider = 'netlify' } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify project ownership
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .eq('user_id', userId)
      .single();

    if (projectError || !project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Get all project files
    const { data: files, error: filesError } = await supabase
      .from('project_files')
      .select('*')
      .eq('project_id', projectId);

    if (filesError) {
      return res.status(500).json({ error: 'Failed to fetch project files' });
    }

    // Convert files to the format needed for deployment
    const fileMap: Record<string, string> = {};
    files.forEach(file => {
      fileMap[`/${file.path}`] = file.content;
    });

    // Deploy based on provider
    let deploymentResult;
    if (provider === 'vercel') {
      deploymentResult = await deploymentService.deployToVercel({
        provider: 'vercel',
        projectId,
        userId,
        files: fileMap,
        projectName: project.name,
      });
    } else {
      deploymentResult = await deploymentService.deployToNetlify({
        provider: 'netlify',
        projectId,
        userId,
        files: fileMap,
        projectName: project.name,
      });
    }

    res.json({
      success: true,
      deployment: deploymentResult,
    });
  } catch (error) {
    console.error('Deployment error:', error);
    res.status(500).json({ 
      error: 'Deployment failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get deployment history
router.get('/deployments/:projectId', authenticate, async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify project ownership
    const { data: project } = await supabase
      .from('projects')
      .select('id')
      .eq('id', projectId)
      .eq('user_id', userId)
      .single();

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const deployments = await deploymentService.getDeployments(projectId);
    
    res.json({ deployments });
  } catch (error) {
    console.error('Error fetching deployments:', error);
    res.status(500).json({ error: 'Failed to fetch deployments' });
  }
});

// Get deployment status
router.get('/deployment/:deploymentId/status', authenticate, async (req, res) => {
  try {
    const { deploymentId } = req.params;
    
    const { data: deployment, error } = await supabase
      .from('deployments')
      .select('*')
      .eq('id', deploymentId)
      .single();

    if (error || !deployment) {
      return res.status(404).json({ error: 'Deployment not found' });
    }

    // For Vercel, we might need to check the actual status
    if (deployment.provider === 'vercel' && deployment.status === 'building') {
      // In a real implementation, we would check Vercel API for build status
      // For now, we'll assume it's ready after some time
      const deploymentAge = Date.now() - new Date(deployment.created_at).getTime();
      if (deploymentAge > 60000) { // 1 minute
        await supabase
          .from('deployments')
          .update({ status: 'ready' })
          .eq('id', deploymentId);
        deployment.status = 'ready';
      }
    }

    res.json({ deployment });
  } catch (error) {
    console.error('Error fetching deployment status:', error);
    res.status(500).json({ error: 'Failed to fetch deployment status' });
  }
});

export default router;