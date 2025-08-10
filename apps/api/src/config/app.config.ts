// Application Configuration
// This file contains all configurable settings for the application

export const appConfig = {
  // AI Model Configuration
  ai: {
    // Default AI model (Anthropic as requested)
    defaultModel: 'anthropic/claude-sonnet-4-20250514',
    
    // Available models with provider prefixes
    availableModels: [
      'anthropic/claude-sonnet-4-20250514',
      'anthropic/claude-opus-4-20250514',
      'openai/gpt-4o',
      'openai/gpt-5',
      'groq/mixtral-8x7b-32768',
      'groq/llama3-groq-70b-8192'
    ],
    
    // Model display names for UI
    modelDisplayNames: {
      'anthropic/claude-sonnet-4-20250514': 'Claude Sonnet 4',
      'anthropic/claude-opus-4-20250514': 'Claude Opus 4',
      'openai/gpt-4o': 'GPT-4o',
      'openai/gpt-5': 'GPT-5',
      'groq/mixtral-8x7b-32768': 'Mixtral 8x7B',
      'groq/llama3-groq-70b-8192': 'Llama 3 70B'
    },
    
    // Temperature settings for non-reasoning models
    defaultTemperature: 0.7,
    
    // Max tokens for code generation
    maxTokens: 8000,
    
    // Max tokens for truncation recovery
    truncationRecoveryMaxTokens: 4000,
    
    // Provider configurations
    providers: {
      anthropic: {
        baseUrl: process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com/v1',
        defaultModel: 'claude-sonnet-4-20250514',
        maxRetries: 3,
        timeout: 60000
      },
      openai: {
        baseUrl: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
        defaultModel: 'gpt-4o',
        maxRetries: 3,
        timeout: 60000
      },
      groq: {
        baseUrl: process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1',
        defaultModel: 'mixtral-8x7b-32768',
        maxRetries: 3,
        timeout: 30000 // Groq is faster
      }
    }
  },
  
  // Container Configuration
  containers: {
    // Container timeout in minutes
    timeoutMinutes: 15,
    
    // Convert to milliseconds for API
    get timeoutMs() {
      return this.timeoutMinutes * 60 * 1000;
    },
    
    // Maximum concurrent containers
    maxConcurrent: 10,
    
    // Preview server port
    previewPort: 5173,
    
    // Time to wait for preview to be ready (milliseconds)
    startupDelay: 7000
  },
  
  // Code Application Configuration
  codeApplication: {
    // Delay after applying code before refreshing iframe (milliseconds)
    defaultRefreshDelay: 2000,
    
    // Delay when packages are installed (milliseconds)
    packageInstallRefreshDelay: 5000,
    
    // Enable/disable automatic truncation recovery
    enableTruncationRecovery: false, // Disabled - too many false positives
    
    // Maximum number of truncation recovery attempts per file
    maxTruncationRecoveryAttempts: 1
  },
  
  // UI Configuration
  ui: {
    // Show/hide certain UI elements
    showModelSelector: true,
    showStatusIndicator: true,
    
    // Animation durations (milliseconds)
    animationDuration: 200,
    
    // Toast notification duration (milliseconds)
    toastDuration: 3000,
    
    // Maximum chat messages to keep in memory
    maxChatMessages: 100,
    
    // Maximum recent messages to send as context
    maxRecentMessagesContext: 20
  },
  
  // Development Configuration
  dev: {
    // Enable debug logging
    enableDebugLogging: true,
    
    // Enable performance monitoring
    enablePerformanceMonitoring: false,
    
    // Log API responses
    logApiResponses: true
  },
  
  // Package Installation Configuration
  packages: {
    // Use --legacy-peer-deps flag for npm install
    useLegacyPeerDeps: true,
    
    // Package installation timeout (milliseconds)
    installTimeout: 60000,
    
    // Auto-restart preview after package installation
    autoRestartPreview: true
  },
  
  // File Management Configuration
  files: {
    // Excluded file patterns (files to ignore)
    excludePatterns: [
      'node_modules/**',
      '.git/**',
      '.next/**',
      'dist/**',
      'build/**',
      '*.log',
      '.DS_Store'
    ],
    
    // Maximum file size to read (bytes)
    maxFileSize: 1024 * 1024, // 1MB
    
    // File extensions to treat as text
    textFileExtensions: [
      '.js', '.jsx', '.ts', '.tsx',
      '.css', '.scss', '.sass',
      '.html', '.xml', '.svg',
      '.json', '.yml', '.yaml',
      '.md', '.txt', '.env',
      '.gitignore', '.dockerignore'
    ]
  },
  
  // API Endpoints Configuration (for external services)
  api: {
    // Retry configuration
    maxRetries: 3,
    retryDelay: 1000, // milliseconds
    
    // Request timeout (milliseconds)
    requestTimeout: 30000
  }
} as const;

// Type-safe config getter
export function getConfig<K extends keyof typeof appConfig>(key: K): typeof appConfig[K] {
  return appConfig[key];
}

// Helper to get nested config values
export function getConfigValue(path: string): any {
  return path.split('.').reduce((obj, key) => obj?.[key], appConfig as any);
}

export default appConfig;