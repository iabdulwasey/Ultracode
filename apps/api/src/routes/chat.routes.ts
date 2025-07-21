import { Router } from 'express';
import { z } from 'zod';
import { query } from '../config/database.js';
import { authenticateSupabase } from '../middleware/supabaseAuth.js';
import { validateRequest } from '../utils/validation.js';
import { AppError } from '../middleware/errorHandler.js';
import { logger } from '../utils/logger.js';

const router = Router();

// All routes require authentication
router.use(authenticateSupabase);

// Get chat sessions for a project
router.get('/sessions/:projectId', async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = req.user!.id;

    // Verify project ownership
    const projectResult = await query(
      'SELECT id FROM projects WHERE id = $1 AND user_id = $2',
      [projectId, userId]
    );

    if (projectResult.rows.length === 0) {
      throw new AppError('Project not found', 404);
    }

    // Get chat sessions
    const sessions = await query(
      `SELECT id, project_id, messages, context, tokens_used, model, created_at, updated_at
       FROM chat_sessions 
       WHERE project_id = $1 AND user_id = $2
       ORDER BY updated_at DESC`,
      [projectId, userId]
    );

    res.json({
      sessions: sessions.rows.map(session => ({
        id: session.id,
        projectId: session.project_id,
        messages: session.messages || [],
        context: session.context || {},
        tokensUsed: session.tokens_used,
        model: session.model,
        createdAt: session.created_at,
        updatedAt: session.updated_at,
      })),
    });
  } catch (error) {
    next(error);
  }
});

// Create a new chat session
router.post('/sessions', validateRequest(z.object({
  body: z.object({
    projectId: z.string().uuid(),
    model: z.enum(['claude-sonnet-4-20250514', 'claude-opus-4-20250514', 'gpt-4o', 'gpt-4-turbo']).optional(),
  }),
})), async (req, res, next) => {
  try {
    const { projectId, model = 'claude-sonnet-4-20250514' } = req.body;
    const userId = req.user!.id;

    // Verify project ownership
    const projectResult = await query(
      'SELECT id FROM projects WHERE id = $1 AND user_id = $2',
      [projectId, userId]
    );

    if (projectResult.rows.length === 0) {
      throw new AppError('Project not found', 404);
    }

    // Create new session
    const result = await query(
      `INSERT INTO chat_sessions (project_id, user_id, messages, context, tokens_used, model)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [projectId, userId, JSON.stringify([]), JSON.stringify({}), 0, model]
    );

    const session = result.rows[0];
    res.status(201).json({
      id: session.id,
      projectId: session.project_id,
      messages: [],
      context: {},
      tokensUsed: 0,
      model: session.model,
      createdAt: session.created_at,
      updatedAt: session.updated_at,
    });
  } catch (error) {
    next(error);
  }
});

// Clear chat session
router.delete('/sessions/:sessionId', async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user!.id;

    // Verify session ownership
    const sessionResult = await query(
      'SELECT id FROM chat_sessions WHERE id = $1 AND user_id = $2',
      [sessionId, userId]
    );

    if (sessionResult.rows.length === 0) {
      throw new AppError('Chat session not found', 404);
    }

    // Clear messages and reset token count
    await query(
      `UPDATE chat_sessions 
       SET messages = '[]'::jsonb, tokens_used = 0, updated_at = NOW()
       WHERE id = $1`,
      [sessionId]
    );

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// Get chat history
router.get('/sessions/:sessionId/messages', async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user!.id;

    const result = await query(
      `SELECT messages, tokens_used, model 
       FROM chat_sessions 
       WHERE id = $1 AND user_id = $2`,
      [sessionId, userId]
    );

    if (result.rows.length === 0) {
      throw new AppError('Chat session not found', 404);
    }

    res.json({
      messages: result.rows[0].messages || [],
      tokensUsed: result.rows[0].tokens_used,
      model: result.rows[0].model,
    });
  } catch (error) {
    next(error);
  }
});

export default router;