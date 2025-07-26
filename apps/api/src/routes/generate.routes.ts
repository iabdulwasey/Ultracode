import { Router } from 'express';
import { z } from 'zod';
import Anthropic from '@anthropic-ai/sdk';
import { supabase } from '../config/supabase.js';
import { getRedis } from '../config/redis.js';
import { AppError } from '../middleware/errorHandler.js';
import { authenticate } from '../middleware/auth.js';
import { generateRateLimiter } from '../middleware/rateLimiter.js';
import { validateRequest } from '../utils/validation.js';
import { logger } from '../utils/logger.js';
import { io } from '../server.js';
import { localPreviewService } from '../services/localPreview.service.js';

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

// Debug middleware to log all requests
router.use((req, res, next) => {
  logger.info('Generate route request received', {
    method: req.method,
    url: req.url,
    body: req.body,
    headers: {
      contentType: req.headers['content-type'],
      authorization: !!req.headers.authorization
    }
  });
  next();
});

// All routes require authentication
router.use(authenticate);

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
      maxTokens: z.number().min(100).max(32000).default(32000),
    }).optional(),
  }),
});

// Check user credits
const checkCredits = async (userId: string) => {
  if (!supabase) {
    throw new AppError('Database connection error', 500);
  }

  const { data, error } = await supabase
    .from('billing')
    .select('credits_remaining')
    .eq('user_id', userId)
    .single();

  if (error || !data || data.credits_remaining <= 0) {
    throw new AppError('Insufficient credits. Please upgrade your plan.', 402);
  }

  return data.credits_remaining;
};

// Deduct credits  
const deductCredits = async (userId: string, amount: number = 1) => {
  if (!supabase) {
    throw new AppError('Database connection error', 500);
  }

  const { error } = await supabase.rpc('deduct_credits', {
    user_id: userId,
    amount: amount
  });

  if (error) {
    logger.error('Failed to deduct credits', { userId, amount, error });
    // Don't throw error for credits - allow generation to continue
  }
};

// Generate system prompt
const getSystemPrompt = (context?: any) => {
  return `You are Ultracode, an AI assistant that creates complete, standalone React applications.

IMPORTANT: Generate COMPLETE React applications that run independently with their own dependencies.

Technology Stack:
- React 18+ with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Modern React patterns (hooks, functional components)

Application Requirements:
1. Create a COMPLETE, STANDALONE React application
2. Include ALL necessary files: package.json, vite.config.ts, tailwind.config.js, etc.
3. Use ONLY standard React and popular NPM packages (no custom UI libraries)
4. Make applications fully functional with proper state management
5. Include proper TypeScript types and error handling
6. Create responsive, accessible designs with Tailwind CSS
7. CRITICAL: Generate ALL components referenced in imports - no missing files allowed
8. CRITICAL: Ensure every import in App.tsx has a corresponding component file
9. MANDATORY: If App.tsx imports components like Header, Hero, Services, About, Gallery, Testimonials, Contact, Footer - you MUST generate ALL of these component files
10. VERIFICATION: After writing App.tsx, check every import statement and generate the corresponding component file
11. TAILWIND CRITICAL: Always include tailwind.config.js with content paths or CSS won't work
12. POSTCSS CRITICAL: Always include postcss.config.js or Tailwind processing will fail
13. VITE CRITICAL: Always include vite.config.ts with server settings and SWC plugin or preview will fail

File Structure (ALWAYS create these files):
- package.json (with all dependencies)
- vite.config.ts
- tailwind.config.js
- postcss.config.js
- index.html
- src/main.tsx (React entry point)
- src/App.tsx (main application component)
- src/index.css (Tailwind imports)
- Additional components in src/components/
- Pages in src/pages/ (if multi-page app)

Package.json Dependencies:
- Always include: react, react-dom, @types/react, @types/react-dom
- Build tools: vite, @vitejs/plugin-react-swc, typescript
- Styling: tailwindcss, autoprefixer, postcss
- Add other packages as needed for functionality

Tailwind Configuration (CRITICAL):
- ALWAYS create tailwind.config.js with proper content paths
- Use: content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
- Use ES module format: export default { ... }

Vite Configuration (CRITICAL):
- ALWAYS create vite.config.ts with complete server settings
- Use: @vitejs/plugin-react-swc (not @vitejs/plugin-react)
- Include: server config with host, port, and hmr: false
- Include: build config with target: 'es2020'

Code Generation Format:
For each file, use this EXACT format:
\`\`\`json package.json
{
  "name": "app-name",
  "private": true,
  ...
}
\`\`\`

\`\`\`javascript tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
\`\`\`

\`\`\`javascript postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
\`\`\`

\`\`\`typescript vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 4000,
    strictPort: false,
    hmr: false
  },
  build: {
    target: 'es2020',
    sourcemap: false
  }
})
\`\`\`

\`\`\`typescript src/App.tsx
import React from 'react';
// Component code here
\`\`\`

Guidelines:
1. Generate WORKING, COMPLETE applications that compile and run
2. Use modern React patterns (useState, useEffect, custom hooks)
3. Create beautiful, responsive UIs with Tailwind CSS
4. Include proper error states and loading indicators
5. Add interactive features and proper event handling
6. Make applications production-ready with proper structure
7. NEVER leave missing imports - if App.tsx imports a component, ALWAYS create that component file
8. Double-check all imports and ensure every referenced file is generated
9. EXAMPLE: If App.tsx has "import Header from './components/Header'", you MUST create "src/components/Header.tsx"
10. EXAMPLE: If App.tsx imports 8 components, you MUST generate all 8 component files

${context?.currentFile ? `Context - Current file: ${context.currentFile}` : ''}
${context?.selectedCode ? `Context - Selected code:\n${context.selectedCode}` : ''}

Remember: Create COMPLETE applications that users can immediately preview and interact with!`;
};

// Code generation endpoint
router.post('/', generateRateLimiter, validateRequest(generateSchema), async (req, res, next) => {
  logger.info('Generate endpoint called', { 
    user: req.user,
    userSub: req.user?.sub,
    hasAuthHeader: !!req.headers.authorization,
    body: req.body,
    bodyKeys: Object.keys(req.body || {}),
    projectId: req.body?.projectId,
    prompt: req.body?.prompt
  });
  
  const redis = getRedis();
  
  try {
    const { projectId, prompt, context, options = {} } = req.body;
    const userId = req.user?.sub;
    
    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    // Check project ownership
    if (!supabase) {
      throw new AppError('Database connection error', 500);
    }

    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id')
      .eq('id', projectId)
      .eq('user_id', userId)
      .single();

    if (projectError || !project) {
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
      max_tokens: options.maxTokens || 32000,
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
    
    // Validate that all imported components have corresponding files
    validateGeneratedFiles(files);

    // Save generation to database
    // Transaction handling is managed by Supabase

    // Chat session management is handled by Supabase directly in the frontend

    // Save files to Supabase
    if (files.length > 0) {
      const { error } = await supabase
        .from('project_files')
        .upsert(
          files.map(file => ({
            project_id: projectId,
            path: file.path,
            content: file.content,
            type: file.type,
            size: file.content.length
          })),
          { onConflict: 'project_id,path' }
        );
      
      if (error) {
        logger.error('Failed to save files to database', { projectId, error });
      }
    }

    // Pre-build project for faster preview (run in background)
    setImmediate(async () => {
      try {
        await (localPreviewService as any).prepareProject(projectId, files);
        logger.info('Project prepared for preview', { projectId });
      } catch (error) {
        logger.warn('Failed to prepare project for preview', { projectId, error });
      }
    });

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
    // Error occurred - Supabase handles transaction rollback automatically
    
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
    // No database client cleanup needed with Supabase
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

// Helper function to validate that all imported components have corresponding files
function validateGeneratedFiles(files: Array<{ path: string; content: string; type: string }>): void {
  // Find App.tsx file
  const appFile = files.find(f => f.path === 'src/App.tsx' || f.path === 'App.tsx');
  if (!appFile) {
    logger.warn('No App.tsx found in generated files');
    return;
  }

  // Extract import statements from App.tsx
  const importRegex = /import\s+\w+\s+from\s+['"]\.\/components\/(\w+)['"];/g;
  const imports: string[] = [];
  let match;
  
  while ((match = importRegex.exec(appFile.content)) !== null) {
    imports.push(match[1]);
  }

  // Check if all imported components have corresponding files
  const componentFiles = files.filter(f => 
    f.path.startsWith('src/components/') || f.path.startsWith('components/')
  );
  
  const missingComponents: string[] = [];
  for (const componentName of imports) {
    const componentFile = componentFiles.find(f => 
      f.path.includes(`${componentName}.tsx`) || f.path.includes(`${componentName}.jsx`)
    );
    if (!componentFile) {
      missingComponents.push(componentName);
    }
  }

  if (missingComponents.length > 0) {
    logger.error('Missing component files detected', {
      imports,
      componentFiles: componentFiles.map(f => f.path),
      missingComponents
    });
    throw new AppError(
      `Generated code is incomplete. Missing component files: ${missingComponents.join(', ')}. ` +
      'Please regenerate with a more specific prompt.',
      400
    );
  }

  logger.info('Component validation passed', {
    imports,
    componentFiles: componentFiles.map(f => f.path)
  });
}

// Helper function to extract files from generated content
function extractFilesFromContent(content: string): Array<{ path: string; content: string; type: string }> {
  const files: Array<{ path: string; content: string; type: string }> = [];
  
  // Updated regex to match our new markdown format: ```language filename
  const codeBlockRegex = /```(?:(\w+)\s+)?([^\n\r]+)\n([\s\S]*?)```/g;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    const [, , filename, code] = match;
    if (filename && filename.trim()) {
      const cleanFilename = filename.trim();
      files.push({
        path: cleanFilename,
        content: code.trim(),
        type: getFileType(cleanFilename),
      });
    }
  }

  logger.info('Extracted files from content', { 
    fileCount: files.length,
    files: files.map(f => ({ path: f.path, type: f.type }))
  });

  return files;
}

// Helper function to determine file type from extension
function getFileType(filePath: string): string {
  const ext = filePath.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'js':
    case 'jsx':
      return 'javascript';
    case 'json':
      return 'json';
    case 'css':
      return 'css';
    case 'html':
      return 'html';
    case 'md':
      return 'markdown';
    default:
      return 'text';
  }
}

export default router;