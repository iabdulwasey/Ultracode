import { Router } from 'express';
import { z } from 'zod';
import { supabase } from '../config/supabase.js';
import { getRedis } from '../config/redis.js';
import { AppError } from '../middleware/errorHandler.js';
import { authenticate } from '../middleware/auth.js';
import { generateRateLimiter } from '../middleware/rateLimiter.js';
import { validateRequest } from '../utils/validation.js';
import { logger } from '../utils/logger.js';
import { getWebSocketService } from '../services/websocket.service.js';
import { localPreviewService } from '../services/localPreview.service.js';
import { backgroundPersistenceService } from '../services/backgroundPersistence.service.js';
import { editIntentAnalyzer } from '../services/editIntentAnalyzer.js';
import { fileSearchService } from '../services/fileSearchService.js';
import { conversationManager } from '../services/conversationManager.js';
import { conversationIntelligence } from '../services/conversationIntelligence.js';
import { enhancedResponseParser } from '../services/enhancedResponseParser.js';
import { autoCompleteService } from '../services/autoCompleteService.js';
import { fileAnalysisEngine } from '../services/fileAnalysisEngine.js';
import { packageDetectionService } from '../services/packageDetectionService.js';
import { xmlPackageManager } from '../services/xmlPackageManager.js';
import { streamingPackageInstaller } from '../services/streamingPackageInstaller.js';
import { aiProviderManager } from '../services/aiProviderManager.js';
import { appConfig } from '../config/app.config.js';

const router = Router();

// AI Provider Manager handles all AI clients

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
      model: z.string().default(appConfig.ai.defaultModel), // Dynamic model validation
      temperature: z.number().min(0).max(1).default(0.7),
      maxTokens: z.number().min(100).max(64000).default(8000),
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

// Generate system prompt with conversation context
const getSystemPrompt = (context?: any, hasExistingFiles?: boolean, conversationContext?: any) => {
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
TARGETED FILES FOR SURGICAL EDITING:
${Object.entries(context.fileTree).map(([path, content]) => `
=== FILE: ${path} ===
${content}
=== END FILE: ${path} ===
`).join('\n')}

${context.searchResults ? `
EXACT LOCATIONS FOUND BY SEARCH:
${context.searchResults}

SURGICAL EDITING INSTRUCTIONS:
- Target the exact lines identified by the search results
- Make MINIMAL changes to achieve the user's request
- Preserve all surrounding code and structure
` : ''}

${context.editIntent ? `
EDIT INTENT ANALYSIS:
- Type: ${context.editIntent.type}
- Target Files: ${context.editIntent.targetFiles.join(', ')}
- Confidence: ${Math.round(context.editIntent.confidence * 100)}%
- Description: ${context.editIntent.description}

PRECISION REQUIREMENTS:
- Focus ONLY on the identified target files
- Make surgical changes as indicated by the search results
- Preserve all existing functionality and structure
` : ''}

IMPORTANT: This is SURGICAL EDITING - make ONLY the necessary changes to the specific locations identified. Do not rewrite entire components unless explicitly required.` : ''}

${conversationContext ? `
## 💭 CONVERSATION MEMORY & USER PREFERENCES

### User Learning Profile:
- **Edit Style Preference**: ${conversationContext.userPreferences?.editStyle || 'targeted'}
- **Preferred Components**: ${conversationContext.userPreferences?.preferredComponents?.slice(0, 5).join(', ') || 'None learned yet'}
- **Successful Edit Types**: ${Object.keys(conversationContext.userPreferences?.successfulEditTypes || {}).slice(0, 3).join(', ') || 'Learning...'}
- **Average Token Usage**: ${conversationContext.userPreferences?.averageTokenUsage || 1000} tokens

### Recent Context (last 3 messages):
${conversationContext.recentMessages?.slice(-3).map((msg: any, i: number) => 
  `${i + 1}. ${msg.role.toUpperCase()}: ${msg.content.substring(0, 200)}${msg.content.length > 200 ? '...' : ''}`
).join('\n') || 'No recent messages'}

### Project Evolution:
- **Recently Created Files**: ${conversationContext.projectEvolution?.recentlyCreatedFiles?.slice(-5).join(', ') || 'None'}
- **Major Changes**: ${conversationContext.projectEvolution?.majorChanges?.slice(-2).map((change: any) => change.description).join(', ') || 'None'}

### Session Statistics:
- **Total Messages**: ${conversationContext.sessionStats?.totalMessages || 0}
- **Successful Edits**: ${conversationContext.sessionStats?.successfulEdits || 0}/${conversationContext.sessionStats?.totalEdits || 0}
- **Average Confidence**: ${Math.round((conversationContext.sessionStats?.averageConfidence || 0) * 100)}%

ADAPTATION RULES:
1. **Respect User Preferences**: Use ${conversationContext.userPreferences?.editStyle || 'targeted'} editing approach
2. **Avoid Duplicates**: Don't recreate recently created files unless explicitly requested
3. **Build on Context**: Reference previous successful patterns and approaches
4. **Maintain Consistency**: Follow established patterns from this conversation
5. **Token Optimization**: Aim for ~${conversationContext.userPreferences?.averageTokenUsage || 1000} tokens based on user's typical usage
` : ''}

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

IMPORT VALIDATION (CRITICAL - PREVENTS BUILD FAILURES):
14. EVERY import statement must reference an interface/type that actually exists
15. If ANY component imports from './types' or '../types', ensure ALL imported interfaces are defined in types.ts
16. Generate complete type definitions - never leave interfaces missing or incomplete
17. DOUBLE-CHECK: Scan all component files for type imports and ensure every imported interface exists
18. Example: Component imports User, Question, Challenge → types.ts must export ALL three interfaces
19. VALIDATION STEP: Before finalizing, verify that every import can be resolved

FILE CREATION RESTRICTIONS (CRITICAL):
20. NEVER create files named after commands (e.g., "npm install", "npm run dev", "npm run build")
21. Commands like "npm install" are meant to be RUN, not created as files
22. DO NOT create any files with spaces in their names
23. DO NOT create command instruction files - only create actual source code and config files

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

    // PHASE 3: Initialize conversation memory system
    await conversationManager.initializeConversation(projectId, userId);
    
    // Add user message to conversation
    await conversationManager.addUserMessage(projectId, userId, prompt);
    
    // Update conversation topic
    await conversationManager.updateCurrentTopic(projectId, userId, prompt);

    // CONTAINER-FIRST: Check for existing files directly from container filesystem
    const hasExistingFiles = await localPreviewService.hasExistingFiles(projectId);
    const fileTree = hasExistingFiles ? 
      await localPreviewService.getFileTree(projectId) : {};

    logger.info('Generation mode determined', {
      projectId,
      hasExistingFiles,
      fileTreeKeys: Object.keys(fileTree).length,
      mode: hasExistingFiles ? 'incremental update' : 'full generation'
    });

    // AGENTIC SURGICAL EDIT SYSTEM: Analyze edit intent and target files
    let editIntent;
    let searchResults;
    let targetedFileTree: Record<string, string> = {};
    
    if (hasExistingFiles) {
      // Phase 2: Analyze edit intent for surgical precision
      editIntent = editIntentAnalyzer.analyzePrompt(prompt, fileTree);
      
      logger.info('Edit intent analysis', {
        type: editIntent.type,
        targetFiles: editIntent.targetFiles,
        confidence: editIntent.confidence,
        searchTerms: editIntent.searchTerms
      });
      
      // Execute search plan to find exact locations
      if (editIntent.searchTerms.length > 0) {
        const searchPlan = fileSearchService.createSearchPlan(
          prompt,
          editIntent.type,
          editIntent.searchTerms
        );
        
        const searchExecution = fileSearchService.executeSearchPlan(searchPlan, fileTree);
        searchResults = searchExecution.results;
        
        logger.info('File search results', {
          success: searchExecution.success,
          resultsFound: searchResults.length,
          filesSearched: searchExecution.filesSearched
        });
      }
      
      // Build targeted file tree (only relevant files)
      const relevantFiles = new Set([
        ...editIntent.targetFiles,
        ...editIntent.suggestedContext.slice(0, 2) // Limit context to avoid overwhelming AI
      ]);
      
      for (const filePath of relevantFiles) {
        if (fileTree[filePath]) {
          targetedFileTree[filePath] = fileTree[filePath];
        }
      }
      
      logger.info('Targeted file selection', {
        totalFiles: Object.keys(fileTree).length,
        targetedFiles: Object.keys(targetedFileTree).length,
        tokenReduction: Math.round((1 - Object.keys(targetedFileTree).length / Object.keys(fileTree).length) * 100)
      });
    }

    // PHASE 3: Get conversation context for AI prompts
    const conversationContext = await conversationManager.getOptimizedContext(projectId, userId);

    // PHASE 5: Initialize XML package detection session
    const packageDetectionSession = await packageDetectionService.initializeDetectionSession(
      projectId,
      userId,
      `gen_session_${Date.now()}`
    );

    // Enhance context with surgical editing information AND conversation memory
    const enhancedContext = {
      ...context,
      fileTree: hasExistingFiles ? targetedFileTree : undefined, // Use targeted files only
      existingFiles: hasExistingFiles,
      editIntent: editIntent || undefined,
      searchResults: searchResults ? fileSearchService.formatSearchResultsForAI(searchResults) : undefined
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

    // PHASE 7: Enhanced streaming architecture with progress feedback
    const encoder = new TextEncoder();
    
    // Function to send progress updates (like Open-Lovable)
    const sendProgress = async (data: any) => {
      const message = `data: ${JSON.stringify(data)}\n\n`;
      res.write(message);
    };

    // Send initial status
    await sendProgress({ type: 'status', message: 'Initializing AI...' });

    // Create message with AI Provider Manager (including conversation context)
    const systemPrompt = getSystemPrompt(enhancedContext, hasExistingFiles, conversationContext);
    
    // Validate model is available
    const selectedModel = options.model || appConfig.ai.defaultModel;
    const availableModels = aiProviderManager.getAvailableModels();
    
    if (!availableModels.includes(selectedModel)) {
      logger.warn(`Requested model ${selectedModel} not available, using default`);
      // Use default model from first available provider
      if (availableModels.length === 0) {
        throw new AppError('No AI providers available', 503);
      }
      await sendProgress({ 
        type: 'warning', 
        message: `Model ${selectedModel} unavailable, using fallback` 
      });
    }

    // Send status based on generation mode
    if (hasExistingFiles) {
      if (editIntent) {
        await sendProgress({ 
          type: 'status', 
          message: `🔍 Analyzing ${editIntent.type.toLowerCase().replace('_', ' ')}...` 
        });
        
        if (searchResults && searchResults.length > 0) {
          await sendProgress({ 
            type: 'status', 
            message: `✅ Found code in ${editIntent.targetFiles.length} file(s)` 
          });
        }
      } else {
        await sendProgress({ type: 'status', message: '🔧 Preparing incremental update...' });
      }
    } else {
      await sendProgress({ type: 'status', message: '🎨 Planning application structure...' });
    }
    
    // Use AI Provider Manager with fallback support
    const response = await aiProviderManager.generateWithFallback([
      {
        role: 'system',
        content: systemPrompt
      },
      { 
        role: 'user', 
        content: prompt 
      },
    ], {
      model: selectedModel,
      temperature: options.temperature || 0.7,
      maxTokens: options.maxTokens || 8000,
      stream: true
    });

    let fullContent = '';
    let tokenCount = 0;

    // PHASE 7: Enhanced streaming with real-time progress tracking
    if (response.stream) {
      // AI SDK streaming format - unified across all providers
      const stream = response.stream as ReadableStream<string>;
      const reader = stream.getReader();
      
      // Enhanced streaming variables for progress tracking
      let currentFile = '';
      let currentFilePath = '';
      let componentCount = 0;
      let isInFile = false;
      let isInTag = false;
      let conversationalBuffer = '';
      let tagBuffer = '';
      
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          if (value) {
            fullContent += value;
            currentFile += value;
            tokenCount += 1; // Approximate

            // Combine with buffer for tag detection
            const searchText = tagBuffer + value;

            // Check if we're entering or leaving a tag
            const hasOpenTag = /<(file|package|packages|explanation|command|structure|template)\b/.test(value);
            const hasCloseTag = /<\/(file|package|packages|explanation|command|structure|template)>/.test(value);
            
            if (hasOpenTag) {
              // Send any buffered conversational text before the tag
              if (conversationalBuffer.trim() && !isInTag) {
                await sendProgress({ 
                  type: 'conversation', 
                  text: conversationalBuffer.trim()
                });
                conversationalBuffer = '';
              }
              isInTag = true;
            }
            
            if (hasCloseTag) {
              isInTag = false;
            }
            
            // If we're not in a tag, buffer as conversational text
            if (!isInTag && !hasOpenTag) {
              conversationalBuffer += value;
            }

            // PHASE 5: Process chunk for XML package detection
            try {
              await packageDetectionService.processAIStreamChunk(
                packageDetectionSession.sessionId,
                value
              );
            } catch (error) {
              logger.warn('Package detection failed for chunk', { 
                projectId, 
                error: error instanceof Error ? error.message : String(error) 
              });
            }

            // Check for file boundaries and send progress updates
            if (value.includes('<file path="')) {
              const pathMatch = value.match(/<file path="([^"]+)"/);
              if (pathMatch) {
                currentFilePath = pathMatch[1];
                isInFile = true;
                currentFile = value;
                
                // Send file start progress
                await sendProgress({
                  type: 'file_start',
                  path: currentFilePath,
                  message: `Creating ${currentFilePath.split('/').pop()}`
                });
              }
            }
            
            // Check for file end
            if (isInFile && currentFile.includes('</file>')) {
              isInFile = false;
              
              // Send component progress update
              if (currentFilePath.includes('components/')) {
                componentCount++;
                const componentName = currentFilePath.split('/').pop()?.replace(/\.(jsx|tsx)$/, '') || 'Component';
                await sendProgress({ 
                  type: 'component', 
                  name: componentName,
                  path: currentFilePath,
                  index: componentCount
                });
              } else if (currentFilePath.includes('App.')) {
                await sendProgress({ 
                  type: 'app', 
                  message: 'Generated main App component',
                  path: currentFilePath
                });
              } else if (currentFilePath.includes('index.css')) {
                await sendProgress({ 
                  type: 'styles', 
                  message: 'Created base styles',
                  path: currentFilePath
                });
              } else if (currentFilePath.includes('.json')) {
                await sendProgress({ 
                  type: 'config', 
                  message: 'Generated configuration',
                  path: currentFilePath
                });
              }
              
              currentFile = '';
              currentFilePath = '';
            }

            // Stream the raw text for live preview
            await sendProgress({ 
              type: 'stream', 
              text: value,
              raw: true 
            });

            // Keep unmatched portion in buffer for next iteration
            const lastIndex = Math.max(0, searchText.length - 50);
            tagBuffer = searchText.substring(lastIndex);
          }
        }
        
        // Send any remaining conversational text
        if (conversationalBuffer.trim()) {
          await sendProgress({ 
            type: 'conversation', 
            text: conversationalBuffer.trim()
          });
        }
        
      } finally {
        reader.releaseLock();
      }
    } else {
      // Non-streaming response
      fullContent = response.content;
      tokenCount = response.usage?.totalTokens || 0;
    }

    // PHASE 4: Enhanced parsing with duplicate handling and validation
    const parsedResponse = enhancedResponseParser.parseAIResponse(fullContent);
    const files = parsedResponse.files;
    
    // Log parsing warnings if any
    if (parsedResponse.warnings.length > 0) {
      logger.warn('AI response parsing warnings', {
        projectId,
        warnings: parsedResponse.warnings
      });
    }
    
    // Log parsing errors if any
    if (parsedResponse.errors.length > 0) {
      logger.error('AI response parsing errors', {
        projectId,
        errors: parsedResponse.errors
      });
    }
    
    // PHASE 3: Add assistant message to conversation
    await conversationManager.addAssistantMessage(projectId, userId, fullContent, {
      editedFiles: files.map(f => f.path),
      tokenCount: tokenCount,
      model: options.model || 'claude-sonnet-4-20250514'
    });
    
    // Validate that all imported components have corresponding files
    const validationResult = validateGeneratedFiles(files);
    let finalFiles = validationResult.files;

    // PHASE 4: Enhanced auto-retry with sophisticated component generation
    if (validationResult.missingComponents && validationResult.missingComponents.length > 0) {
      logger.info('Auto-generating missing components with enhanced system', { 
        missingComponents: validationResult.missingComponents 
      });

      // Use enhanced auto-complete service
      const autoCompleteResult = await autoCompleteService.generateMissingComponents(
        validationResult.missingComponents,
        files,
        {
          model: options.model || 'claude-sonnet-4-20250514',
          temperature: options.temperature || 0.7,
          maxTokens: 8000
        }
      );

      if (autoCompleteResult.success && autoCompleteResult.generatedFiles.length > 0) {
        finalFiles = [...finalFiles, ...autoCompleteResult.generatedFiles];
        logger.info('Enhanced auto-complete succeeded', { 
          generatedCount: autoCompleteResult.generatedFiles.length,
          failedCount: autoCompleteResult.failedComponents.length
        });

        // Log warnings from auto-complete
        if (autoCompleteResult.warnings.length > 0) {
          logger.warn('Auto-complete warnings', {
            warnings: autoCompleteResult.warnings
          });
        }
      } else {
        logger.warn('Enhanced auto-complete failed', {
          failedComponents: autoCompleteResult.failedComponents,
          warnings: autoCompleteResult.warnings
        });
        
        // Fallback to original method if enhanced fails
        const fallbackComponents = await generateMissingComponents(
          validationResult.missingComponents, 
          files,
          options,
          systemPrompt,
          prompt
        );

        if (fallbackComponents && fallbackComponents.length > 0) {
          finalFiles = [...finalFiles, ...fallbackComponents];
          logger.info('Fallback component generation succeeded', { 
            generatedCount: fallbackComponents.length 
          });
        }
      }
    }

    // Save generation to database
    // Transaction handling is managed by Supabase

    // Chat session management is handled by Supabase directly in the frontend

    // CONTAINER-FIRST APPROACH: Write directly to container filesystem
    if (finalFiles.length > 0) {
      logger.info(`Writing ${finalFiles.length} files directly to container`, { 
        projectId, 
        mode: hasExistingFiles ? 'incremental' : 'full',
        files: finalFiles.map(f => f.path)
      });

      // Get or create preview container first
      const previewInfo = await localPreviewService.createPreview(projectId, userId);
      
      // Write files directly to container filesystem (like Open-Lovable)
      // This eliminates sync complexity - preview sees changes instantly
      for (const file of finalFiles) {
        try {
          await localPreviewService.writeFileToContainer(projectId, file.path, file.content);
          logger.info(`Wrote file directly to container: ${file.path}`);
        } catch (error) {
          logger.error(`Failed to write file to container: ${file.path}`, { error });
        }
      }

      // Background persistence to database (async, no sync needed)
      // Using the new background persistence service
      backgroundPersistenceService.queueSave(projectId, finalFiles);

      // PHASE 3: Track successful edit operation
      const editType = editIntent?.type || 'FULL_REBUILD';
      const confidence = editIntent?.confidence || 0.8;
      await conversationManager.trackEdit(
        projectId,
        userId,
        prompt,
        editType,
        finalFiles.map(f => f.path),
        confidence,
        'success',
        undefined,
        tokenCount,
        Date.now() - Date.now() // execution time placeholder
      );

      // Track user behavior patterns
      await conversationIntelligence.trackUserPreferences(
        userId,
        editType,
        'success',
        confidence,
        tokenCount,
        finalFiles.map(f => f.path),
        prompt
      );

      // Track major project change
      await conversationManager.trackMajorChange(
        projectId,
        userId,
        `Generated ${finalFiles.length} files`,
        finalFiles.map(f => f.path),
        hasExistingFiles ? 
          (editType === 'UPDATE_STYLE' ? 'style_update' : 
           editType === 'ADD_FEATURE' ? 'feature_add' : 
           editType === 'FIX_ISSUE' ? 'bug_fix' : 'refactor') : 
          'full_rebuild'
      );
    }

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

    // PHASE 5: Complete package detection session
    const packageSessionSummary = await packageDetectionService.completeDetectionSession(
      packageDetectionSession.sessionId
    );

    logger.info('Package detection session completed', {
      projectId,
      sessionId: packageDetectionSession.sessionId,
      packagesDetected: packageSessionSummary.packagesDetected,
      packagesInstalled: packageSessionSummary.packagesInstalled,
      packagesFailed: packageSessionSummary.packagesFailed
    });

    // Include package information in final result
    const enhancedResult = {
      ...result,
      packageDetection: {
        packagesDetected: packageSessionSummary.packagesDetected,
        packagesInstalled: packageSessionSummary.packagesInstalled,
        packagesFailed: packageSessionSummary.packagesFailed,
        detectionDuration: packageSessionSummary.duration
      }
    };

    // Send final event
    res.write(`data: ${JSON.stringify({
      event: 'end',
      data: enhancedResult,
    })}\n\n`);

    res.end();

    logger.info(`Code generation completed for project ${projectId}`, {
      packagesDetected: packageSessionSummary.packagesDetected,
      packagesInstalled: packageSessionSummary.packagesInstalled
    });
  } catch (error) {
    // Error occurred - Supabase handles transaction rollback automatically
    
    // PHASE 3: Track failed edit operation
    try {
      const { projectId: reqProjectId, prompt: reqPrompt } = req.body || {};
      const reqUserId = req.user?.sub;
      
      if (reqProjectId && reqUserId && reqPrompt) {
        const editType = 'UNKNOWN';
        await conversationManager.trackEdit(
          reqProjectId,
          reqUserId,
          reqPrompt,
          editType,
          [],
          0,
          'failed',
          error instanceof Error ? error.message : 'Generation failed'
        );

        // Track user behavior patterns for failed attempts
        await conversationIntelligence.trackUserPreferences(
          reqUserId,
          editType,
          'failed',
          0,
          0,
          [],
          reqPrompt
        );
      }
    } catch (trackingError) {
      // Don't let tracking errors affect the main error handling
      logger.warn('Failed to track error in conversation', { trackingError });
    }
    
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
    model: z.string().optional()
  }),
})), async (req, res, next) => {
  try {
    const { code, question, language, model } = req.body;
    
    const selectedModel = model || appConfig.ai.defaultModel;
    const content = question 
      ? `You are a helpful coding assistant. Explain this ${language} code clearly and concisely, and answer: ${question}\n\n${code}`
      : `You are a helpful coding assistant. Explain this ${language} code clearly and concisely:\n\n${code}`;

    const response = await aiProviderManager.generateWithFallback([
      {
        role: 'user',
        content: content
      },
    ], {
      model: selectedModel,
      temperature: 0.3,
      maxTokens: 1000,
      stream: false
    });

    res.json({
      explanation: response.content,
      provider: response.provider,
      model: response.model
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

    // Use AI Provider Manager for generating missing components
    const selectedModel = options.model || appConfig.ai.defaultModel;
    
    const response = await aiProviderManager.generateWithFallback([
      {
        role: 'system',
        content: incrementalSystemPrompt
      },
      {
        role: 'user',
        content: missingComponentPrompt
      }
    ], {
      model: selectedModel,
      maxTokens: 24000,
      temperature: options.temperature || 0.7,
      stream: false  // Use non-streaming for simplicity in helper function
    });

    const generatedContent = response.content;

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

// PHASE 6: Multi-AI Provider API Endpoints

// Get available AI models and providers
router.get('/models', async (req, res, next) => {
  try {
    const availableModels = aiProviderManager.getAvailableModels();
    const availableProviders = aiProviderManager.getAvailableProviders();
    const providerStats = aiProviderManager.getProviderStats();

    // Get model display names
    const modelsWithDisplayNames = availableModels.map(modelId => ({
      id: modelId,
      displayName: aiProviderManager.getModelDisplayName(modelId),
      provider: modelId.split('/')[0]
    }));

    res.json({
      success: true,
      models: modelsWithDisplayNames,
      providers: availableProviders,
      defaultModel: appConfig.ai.defaultModel,
      providerStats
    });
  } catch (error) {
    next(error);
  }
});

// Health check for AI providers
router.get('/providers/health', async (req, res, next) => {
  try {
    const health = await aiProviderManager.healthCheck();
    
    res.json({
      success: true,
      health
    });
  } catch (error) {
    next(error);
  }
});

// PHASE 5: XML Package Management API Endpoints

// Get package installation status for a project
router.get('/:projectId/packages/status', async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = req.user?.sub;

    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    // Get current package status
    const currentPackages = await packageDetectionService.getCurrentProjectPackages(projectId);
    const activeInstallations = streamingPackageInstaller.getActiveInstallations(projectId);
    const detectionHistory = packageDetectionService.getProjectDetectionHistory(projectId, 50);

    res.json({
      success: true,
      packages: currentPackages,
      activeInstallations: activeInstallations.map(installation => ({
        packageName: installation.packageName,
        stage: installation.stage,
        progress: installation.progress,
        message: installation.message,
        startTime: installation.startTime,
        logs: installation.logs.slice(-5) // Last 5 log lines
      })),
      recentHistory: detectionHistory
    });

  } catch (error) {
    next(error);
  }
});

// Cancel package installation
router.post('/:projectId/packages/:packageName/cancel', async (req, res, next) => {
  try {
    const { projectId, packageName } = req.params;
    const userId = req.user?.sub;

    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    const cancelled = await streamingPackageInstaller.cancelInstallation(projectId, packageName);

    res.json({
      success: cancelled,
      message: cancelled 
        ? `Installation of ${packageName} has been cancelled`
        : `Could not cancel installation of ${packageName} (may already be complete)`
    });

  } catch (error) {
    next(error);
  }
});

// Get package detection statistics
router.get('/packages/stats', async (req, res, next) => {
  try {
    const packageDetectionStats = packageDetectionService.getServiceStats();
    const installationStats = streamingPackageInstaller.getInstallationStats();
    const xmlDetectionStats = xmlPackageManager.getDetectionStats();

    res.json({
      success: true,
      stats: {
        detection: packageDetectionStats,
        installation: installationStats,
        xmlDetection: xmlDetectionStats
      }
    });

  } catch (error) {
    next(error);
  }
});

export default router;