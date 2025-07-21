import { Router } from 'express';
import { z } from 'zod';
import Anthropic from '@anthropic-ai/sdk';
import { query, getClient } from '../config/database.js';
import { getRedis } from '../config/redis.js';
import { AppError } from '../middleware/errorHandler.js';
import { authenticateSupabase } from '../middleware/supabaseAuth.js';
import { generateRateLimiter } from '../middleware/rateLimiter.js';
import { validateRequest } from '../utils/validation.js';
import { logger } from '../utils/logger.js';
import { io } from '../server.js';
import { FileSystemService } from '../services/fileSystem.service.js';

const router = Router();

// Initialize Anthropic client lazily
let anthropic: Anthropic | null = null;

const getAnthropic = () => {
  if (!anthropic) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new AppError('Anthropic API key not configured', 500);
    }
    anthropic = new Anthropic({ apiKey });
  }
  return anthropic;
};

// All routes require authentication
router.use(authenticateSupabase);

// Validation schemas
const generateSchema = z.object({
  body: z.object({
    projectId: z.string().uuid(),
    prompt: z.string().min(10).max(4000),
    context: z.object({
      currentFile: z.string().optional(),
      selectedCode: z.string().optional(),
      fileTree: z.record(z.any()).optional(),
    }).optional(),
    options: z.object({
      model: z.enum(['claude-sonnet-4-20250514', 'claude-opus-4-20250514', 'gpt-4o', 'gpt-4-turbo']).default('claude-sonnet-4-20250514'),
      temperature: z.number().min(0).max(1).default(0.7),
      maxTokens: z.number().min(100).max(8000).default(4000),
    }).optional(),
  }),
});

// Check user credits
const checkCredits = async (userId: string) => {
  const result = await query(
    'SELECT credits_remaining FROM billing WHERE user_id = $1',
    [userId]
  );

  if (result.rows.length === 0 || result.rows[0].credits_remaining <= 0) {
    throw new AppError('Insufficient credits. Please upgrade your plan.', 402);
  }

  return result.rows[0].credits_remaining;
};

// Deduct credits
const deductCredits = async (userId: string, amount: number = 1) => {
  await query(
    'UPDATE billing SET credits_remaining = credits_remaining - $1, credits_used = credits_used + $1 WHERE user_id = $2',
    [amount, userId]
  );
};

// Generate system prompt
const getSystemPrompt = (context?: any) => {
  return `You are Ultracode, an AI assistant that helps developers build web applications.
You generate clean, modern, production-ready code following best practices.

Technology stack:
- Frontend: React with TypeScript
- Styling: Tailwind CSS with shadcn/ui components
- Backend: Node.js with Express
- Database: PostgreSQL with Supabase

Guidelines:
1. Always use TypeScript with proper types
2. Follow React best practices and hooks
3. Use Tailwind CSS for styling with shadcn/ui components
4. Write clean, maintainable code with proper error handling
5. Include helpful comments explaining complex logic
6. Ensure code is accessible and follows WCAG guidelines

When generating code, wrap file contents in markdown code blocks with the filename, like:
\`\`\`typescript src/components/Button.tsx
// Button component code here
\`\`\`

${context?.currentFile ? `Current file: ${context.currentFile}` : ''}
${context?.selectedCode ? `Selected code:\n${context.selectedCode}` : ''}`;
};

// Code generation endpoint
router.post('/', generateRateLimiter, validateRequest(generateSchema), async (req, res, next) => {
  logger.info('Generate endpoint called', { 
    user: req.user,
    hasAuthHeader: !!req.headers.authorization 
  });
  
  const client = await getClient();
  const redis = getRedis();
  
  try {
    const { projectId, prompt, context, options = {} } = req.body;
    const userId = req.user?.id;
    
    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    // Check project ownership
    const projectResult = await query(
      'SELECT id FROM projects WHERE id = $1 AND user_id = $2',
      [projectId, userId]
    );

    if (projectResult.rows.length === 0) {
      throw new AppError('Project not found', 404);
    }

    // Check credits
    await checkCredits(userId);

    // Check cache
    const cacheKey = `gen:${projectId}:${Buffer.from(prompt).toString('base64').substring(0, 50)}`;
    const cached = await redis.get(cacheKey);
    
    if (cached && process.env.NODE_ENV === 'production') {
      logger.info('Returning cached generation');
      res.json(JSON.parse(cached));
      return;
    }

    // Set up streaming response
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    // Create message with Anthropic
    const stream = await getAnthropic().messages.create({
      model: options.model || 'claude-sonnet-4-20250514',
      messages: [
        { 
          role: 'user', 
          content: `${getSystemPrompt(context)}\n\nUser request: ${prompt}` 
        },
      ],
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 4000,
      stream: true,
    });

    let fullContent = '';
    let tokenCount = 0;

    // Stream response
    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        const content = chunk.delta.text;
        fullContent += content;
        tokenCount += 1; // Approximate

        // Send chunk to client
        res.write(`data: ${JSON.stringify({
          event: 'chunk',
          data: { content },
        })}\n\n`);

        // Also send to WebSocket for real-time collaboration
        io.to(`project:${projectId}`).emit('generation:chunk', {
          content,
          userId,
        });
      }
    }

    // Parse generated code and extract files
    const files = extractFilesFromContent(fullContent);

    // Save generation to database
    await client.query('BEGIN');

    // Update chat session
    await client.query(
      `UPDATE chat_sessions 
       SET messages = messages || $1::jsonb, tokens_used = tokens_used + $2
       WHERE project_id = $3 AND user_id = $4`,
      [
        JSON.stringify([
          { role: 'user', content: prompt, timestamp: new Date() },
          { role: 'assistant', content: fullContent, timestamp: new Date() },
        ]),
        tokenCount,
        projectId,
        userId,
      ]
    );

    // Update project files if any
    for (const file of files) {
      await client.query(
        `INSERT INTO project_files (project_id, path, content, type) 
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (project_id, path) 
         DO UPDATE SET content = $3, updated_at = NOW()`,
        [projectId, file.path, file.content, file.type]
      );
    }

    await client.query('COMMIT');

    // Deduct credits
    await deductCredits(userId);

    // Cache result
    const result = {
      content: fullContent,
      files,
      usage: {
        promptTokens: tokenCount * 0.3, // Rough estimate
        completionTokens: tokenCount * 0.7,
        totalTokens: tokenCount,
      },
    };

    await redis.setex(cacheKey, 3600, JSON.stringify(result)); // Cache for 1 hour

    // Send final event
    res.write(`data: ${JSON.stringify({
      event: 'end',
      data: result,
    })}\n\n`);

    res.end();

    logger.info(`Code generation completed for project ${projectId}`);
  } catch (error) {
    await client.query('ROLLBACK');
    
    // Send error event for streaming response
    if (!res.headersSent) {
      next(error);
    } else {
      res.write(`data: ${JSON.stringify({
        event: 'error',
        data: { message: error instanceof Error ? error.message : 'Generation failed' },
      })}\n\n`);
      res.end();
    }
  } finally {
    client.release();
  }
});

// Explain code endpoint
router.post('/explain', validateRequest(z.object({
  body: z.object({
    code: z.string(),
    question: z.string().optional(),
    language: z.string().default('typescript'),
  }),
})), async (req, res, next) => {
  try {
    const { code, question, language } = req.body;

    const message = await getAnthropic().messages.create({
      model: 'claude-sonnet-4-20250514',
      messages: [
        {
          role: 'user',
          content: question 
            ? `You are a helpful coding assistant. Explain this ${language} code clearly and concisely, and answer: ${question}\n\n${code}`
            : `You are a helpful coding assistant. Explain this ${language} code clearly and concisely:\n\n${code}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    res.json({
      explanation: message.content[0].type === 'text' ? message.content[0].text : '',
    });
  } catch (error) {
    next(error);
  }
});

// Helper function to extract files from generated content
function extractFilesFromContent(content: string): Array<{ path: string; content: string; type: string }> {
  const files: Array<{ path: string; content: string; type: string }> = [];
  
  // Simple regex to extract code blocks with file indicators
  const codeBlockRegex = /```(\w+)(?:\s+(.+?))?\n([\s\S]*?)```/g;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    const [, language, filename, code] = match;
    if (filename) {
      files.push({
        path: filename,
        content: code.trim(),
        type: language || 'text',
      });
    }
  }

  return files;
}

export default router;