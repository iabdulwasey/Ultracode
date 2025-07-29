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
import { getWebSocketService } from '../services/websocket.service.js';
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
      maxTokens: z.number().min(100).max(64000).default(64000),
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
const getSystemPrompt = (context?: any, hasExistingFiles?: boolean) => {
  if (hasExistingFiles) {
    // Incremental update mode
    return `You are Ultracode, an AI assistant that makes precise, incremental updates to existing React applications.

IMPORTANT: You are working with an EXISTING React application. Make TARGETED changes only.

Update Mode Guidelines - CRITICAL PROTECTIONS:
1. ANALYZE the existing project structure and files
2. Make MINIMAL, TARGETED changes to achieve the user's request
3. ONLY modify or add files that are necessary for the requested change
4. DO NOT regenerate the entire application
5. PRESERVE existing functionality and structure

STRICT MODIFICATION RULES:
6. NEVER change existing component structure unless explicitly requested
7. NEVER remove existing buttons, features, or functionality 
8. NEVER rewrite existing components completely - only make surgical changes
9. When adding new functionality, prefer creating NEW components over modifying existing ones
10. If you must modify existing components, add new features WITHOUT changing existing content
11. PRESERVE all existing onClick handlers, state, and props
12. If user asks for "add a button", add it alongside existing buttons, don't replace them
13. NEVER change existing component layouts (grid, flex, positioning) unless specifically requested
14. READ the existing file content carefully before making any modifications
15. PRESERVE all existing text content, styling, and functionality when making changes
16. Only modify the specific parts mentioned in the user request
17. When changing content like "Japan" to "Nepal", ONLY change that specific text, keep everything else identical

CHANGE VALIDATION:
18. Before modifying any existing file, ask yourself: "Is this change absolutely necessary?"
19. Default to creating new components rather than modifying existing ones
20. Maintain consistency with existing code style and patterns

Technology Stack (maintain existing):
- React 18+ with TypeScript
- Vite for build tooling  
- Tailwind CSS for styling
- Modern React patterns (hooks, functional components)

Code Generation Format:
For each file that needs to be created or modified, use this EXACT format:
\`\`\`typescript src/components/NewComponent.tsx
// New component code here
\`\`\`

\`\`\`typescript src/App.tsx
// Updated App.tsx code here (only if needed)
\`\`\`

Guidelines for Updates:
1. Be surgical - change only what's necessary
2. Preserve existing imports and structure
3. Add new functionality without breaking existing features
4. Use consistent naming and code style
5. Only create new files if absolutely necessary
6. Update existing files minimally
7. NEVER regenerate package.json, vite.config.ts, or other config files unless specifically requested
8. Focus on the specific feature or change requested by the user

${context?.currentFile ? `Context - Current file: ${context.currentFile}` : ''}
${context?.selectedCode ? `Context - Selected code:\n${context.selectedCode}` : ''}
${context?.fileTree ? `
EXISTING PROJECT FILES (for context and targeted modifications):
${Object.entries(context.fileTree).map(([path, content]) => `
=== FILE: ${path} ===
${content}
=== END FILE: ${path} ===
`).join('\n')}

IMPORTANT: When modifying existing files, PRESERVE existing content and make ONLY the requested changes. Do not rewrite entire components unless explicitly asked.` : ''}

Remember: Make targeted updates to achieve the user's specific request without breaking existing functionality!`;
  }

  // Full generation mode (for new projects)
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
- src/index.css (Tailwind imports and base styles)
- Additional components in src/components/
- Pages in src/pages/ (if multi-page app)

Package.json Dependencies:
- Always include: react, react-dom, @types/react, @types/react-dom
- Build tools: vite, @vitejs/plugin-react-swc, typescript
- Styling: tailwindcss, autoprefixer, postcss
- Icons: lucide-react, react-icons (for comprehensive icon coverage)
- Add other packages as needed for functionality

Tailwind Configuration (CRITICAL):
- ALWAYS create tailwind.config.js with proper content paths
- Use: content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
- Use ES module format: export default { ... }

Vite Configuration (CRITICAL):
- ALWAYS create vite.config.ts with complete server settings
- Use: @vitejs/plugin-react-swc (not @vitejs/plugin-react)
- Include: server config with host, port, and HMR enabled
- Include: build config with target: 'es2020'

Code Generation Format:
For each file, use this EXACT format:
\`\`\`json package.json
{
  "name": "app-name",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.1",
    "react-icons": "^4.10.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react-swc": "^3.5.0",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.3",
    "typescript": "^5.2.2",
    "vite": "^5.2.0"
  }
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
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
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

\`\`\`css src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 84% 4.9%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 94.1%;
  }

  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
  }
}
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
11. JSX ESCAPING: When using data URLs in className, properly escape quotes
12. CORRECT: className="bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22...')]"
13. INCORRECT: className="bg-[url('data:image/svg+xml,%3Csvg width="60" height="60"...')]" 
14. ALWAYS: URL-encode quotes (%22) and spaces (%20) in data URLs to prevent JSX parsing errors
15. ICON LIBRARIES: Use multiple icon libraries for comprehensive coverage
16. PRIMARY ICONS: lucide-react for modern, consistent icons (Heart, User, Mail, Phone, Menu, X, ChevronDown, Star, Check, Plus, Minus, Search, Calendar, Clock, MapPin, Shield, Zap, Users, CheckCircle, DollarSign, Smile, Award, Wind, Activity, etc.)
17. EXTENDED ICONS: react-icons for specialized icons not in Lucide - BUT USE WITH EXTREME CAUTION
18. COMMON SAFE FA ICONS: FaHeart, FaUser, FaStar, FaHome, FaPhone, FaEnvelope, FaCheck, FaArrowRight, FaPlay, FaPause, FaCog, FaSearch, FaEdit, FaTrash, FaPlus, FaMinus
19. COMMON SAFE GI ICONS: GiSword, GiShield, GiHeart, GiStar, GiBrain, GiMountain, GiTree, GiFlower
20. NEVER USE RARE ICONS: Avoid specialized icons like FaTorii, FaSpecific, or any icon you're not 100% sure exists
21. ICON VALIDATION RULE: If you're not certain an icon exists, use a Lucide icon instead
22. PREFER LUCIDE: When in doubt, always choose Lucide icons over react-icons for reliability
23. TYPESCRIPT CONFIG: Always include proper tsconfig.json and tsconfig.node.json files
24. VERIFY ALL IMPORTS: Every imported component, icon, and utility must actually exist in the specified packages

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

    // Check for existing files to determine generation mode
    const { data: existingFiles, error: filesError } = await supabase
      .from('project_files')
      .select('path, content')
      .eq('project_id', projectId);

    const hasExistingFiles = !filesError && existingFiles && existingFiles.length > 0;
    const fileTree = hasExistingFiles ? 
      existingFiles.reduce((acc: Record<string, string>, file) => {
        acc[file.path] = file.content;
        return acc;
      }, {}) : {};

    logger.info('Generation mode determined', {
      projectId,
      hasExistingFiles,
      existingFileCount: existingFiles?.length || 0,
      mode: hasExistingFiles ? 'incremental update' : 'full generation'
    });

    // Enhance context with existing files
    const enhancedContext = {
      ...context,
      fileTree: hasExistingFiles ? fileTree : undefined,
      existingFiles: hasExistingFiles
    };

    // Check cache (include file state in cache key)
    const cacheKey = `gen:${projectId}:${hasExistingFiles ? 'update' : 'new'}:${Buffer.from(prompt).toString('base64').substring(0, 50)}`;
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
    const systemPrompt = getSystemPrompt(enhancedContext, hasExistingFiles);
    const stream = await getAnthropic().messages.create({
      model: options.model || 'claude-sonnet-4-20250514',
      messages: [
        { 
          role: 'user', 
          content: `${systemPrompt}\n\nUser request: ${prompt}` 
        },
      ],
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 64000,
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
        try {
          const webSocketService = getWebSocketService();
          // The chunk content will be handled by the SSE stream above
          // WebSocket will handle file updates when generation completes
        } catch (error) {
          // WebSocket service might not be initialized, continue without notification
          logger.debug('WebSocket service not available for chunk notification');
        }
      }
    }

    // Parse generated code and extract files
    const files = extractFilesFromContent(fullContent);
    
    // Validate that all imported components have corresponding files
    const validationResult = validateGeneratedFiles(files);
    let finalFiles = validationResult.files;

    // Auto-retry if components are missing
    if (validationResult.missingComponents && validationResult.missingComponents.length > 0) {
      logger.info('Auto-generating missing components', { 
        missingComponents: validationResult.missingComponents 
      });

      // Generate missing components
      const missingComponentsContent = await generateMissingComponents(
        validationResult.missingComponents, 
        files,
        options,
        systemPrompt,
        prompt
      );

      if (missingComponentsContent && missingComponentsContent.length > 0) {
        finalFiles = [...finalFiles, ...missingComponentsContent];
        logger.info('Successfully generated missing components', { 
          generatedCount: missingComponentsContent.length 
        });
      }
    }

    // Save generation to database
    // Transaction handling is managed by Supabase

    // Chat session management is handled by Supabase directly in the frontend

    // Save files to Supabase
    if (finalFiles.length > 0) {
      logger.info(`Saving ${finalFiles.length} files to database`, { 
        projectId, 
        mode: hasExistingFiles ? 'incremental' : 'full',
        files: finalFiles.map(f => f.path)
      });

      const { error } = await supabase
        .from('project_files')
        .upsert(
          finalFiles.map(file => ({
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
function validateGeneratedFiles(files: Array<{ path: string; content: string; type: string }>): { missingComponents?: string[]; files: Array<{ path: string; content: string; type: string }> } {
  // Find App.tsx file
  const appFile = files.find(f => f.path === 'src/App.tsx' || f.path === 'App.tsx');
  if (!appFile) {
    logger.warn('No App.tsx found in generated files');
    return { files };
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
    logger.warn('Missing component files detected - will save partial generation and auto-retry', {
      imports,
      componentFiles: componentFiles.map(f => f.path),
      missingComponents
    });
    
    // Return the missing components so we can auto-generate them
    return { missingComponents, files };
  }

  logger.info('Component validation passed', {
    imports,
    componentFiles: componentFiles.map(f => f.path)
  });

  return { files };
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

// Helper function to generate missing components using incremental update pattern
async function generateMissingComponents(
  missingComponents: string[], 
  existingFiles: Array<{ path: string; content: string; type: string }>,
  options: any,
  systemPrompt: string,
  originalPrompt: string
): Promise<Array<{ path: string; content: string; type: string }> | null> {
  try {
    logger.info('Generating missing components using incremental pattern', { 
      count: missingComponents.length,
      components: missingComponents 
    });

    // Create fileTree context like incremental mode
    const fileTree = existingFiles.reduce((acc: Record<string, string>, file) => {
      acc[file.path] = file.content;
      return acc;
    }, {});

    // Create enhanced context like incremental mode  
    const enhancedContext = {
      fileTree,
      existingFiles: true
    };

    // Use incremental system prompt with file context
    const incrementalSystemPrompt = getSystemPrompt(enhancedContext, true);

    // Create focused prompt for missing components
    const missingComponentPrompt = `Complete the React application by generating the missing components that are imported but not yet created.

Missing components that need to be generated:
${missingComponents.map(comp => `- ${comp}.tsx`).join('\n')}

Original user request context: "${originalPrompt}"

Requirements:
- Generate ONLY the missing components listed above
- Follow the EXACT same patterns, styling, and structure as existing components
- Maintain consistency with the design system already established
- Use the same Tailwind CSS approach and component architecture
- Each component should fit seamlessly into the existing application

Generate each missing component using this EXACT format:

\`\`\`typescript src/components/ComponentName.tsx
// Component code here
\`\`\``;

    // Use anthropic with null check
    if (!anthropic) {
      throw new Error('Anthropic client not initialized');
    }

    // Use the same streaming approach as incremental updates
    const stream = await anthropic.messages.create({
      model: options.model || 'claude-sonnet-4-20250514',
      max_tokens: 24000,
      messages: [
        {
          role: 'user',
          content: `${incrementalSystemPrompt}\n\n${missingComponentPrompt}`
        }
      ],
      temperature: options.temperature || 0.7,
      stream: true,
    });

    let generatedContent = '';
    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        generatedContent += chunk.delta.text;
      }
    }

    // Parse the generated components
    const generatedFiles = extractFilesFromContent(generatedContent);
    
    // Filter to only include the requested missing components
    const expectedFiles = generatedFiles.filter(file => 
      missingComponents.some(component => 
        file.path.includes(`${component}.tsx`) || file.path.includes(`${component}.js`)
      )
    );
    
    logger.info('Generated missing components with context', { 
      requestedCount: missingComponents.length,
      generatedCount: generatedFiles.length,
      expectedCount: expectedFiles.length,
      generatedFiles: generatedFiles.map(f => f.path)
    });

    return expectedFiles.length > 0 ? expectedFiles : generatedFiles;

  } catch (error) {
    logger.error('Failed to generate missing components', { 
      missingComponents, 
      error: error instanceof Error ? error.message : String(error) 
    });
    return null;
  }
}

export default router;