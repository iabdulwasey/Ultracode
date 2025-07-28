// Removed Vite imports - now using child process approach
import fs from 'fs/promises';
import path from 'path';
import { logger } from '../utils/logger.js';
import { supabase } from '../config/supabase.js';

interface ProjectFile {
  path: string;
  content: string;
  type: string;
}

interface LocalPreviewInfo {
  projectId: string;
  port: number;
  url: string;
  status: 'starting' | 'ready' | 'error';
  server?: any; // Now holds child process info
}

class LocalPreviewService {
  private activeServers = new Map<string, LocalPreviewInfo>();
  private basePort = 4000; // Start from port 4000 to avoid conflicts
  private tempDir = path.join(process.cwd(), '..', 'temp-projects'); // Move outside api directory
  private stateFile = path.join(process.cwd(), '.preview-state.json');

  constructor() {
    this.ensureTempDir();
    this.loadState();
  }

  private async ensureTempDir() {
    try {
      await fs.mkdir(this.tempDir, { recursive: true });
    } catch (error) {
      logger.error('Failed to create temp directory', { error });
    }
  }

  /**
   * Load persisted state on startup
   */
  private async loadState() {
    try {
      const stateData = await fs.readFile(this.stateFile, 'utf-8');
      const state = JSON.parse(stateData);
      
      // Restore preview info without servers (they'll be recreated)
      for (const [projectId, info] of Object.entries(state.activeServers || {})) {
        const previewInfo = info as LocalPreviewInfo;
        this.activeServers.set(projectId, {
          ...previewInfo,
          status: 'error', // Mark as error so they get recreated
          server: undefined
        });
      }
      
      logger.info('Loaded preview state', { 
        restoredPreviews: this.activeServers.size 
      });
    } catch (error) {
      // No state file or invalid JSON, start fresh
      logger.info('No preview state to restore, starting fresh');
    }
  }

  /**
   * Save state to persist across restarts
   */
  private async saveState() {
    try {
      const state = {
        activeServers: Object.fromEntries(
          Array.from(this.activeServers.entries()).map(([id, info]) => [
            id,
            { ...info, server: undefined } // Don't serialize the server
          ])
        )
      };
      
      await fs.writeFile(this.stateFile, JSON.stringify(state, null, 2));
    } catch (error) {
      logger.warn('Failed to save preview state', { error });
    }
  }

  /**
   * Get or create a local preview for a project
   */
  async createPreview(projectId: string, userId: string): Promise<LocalPreviewInfo> {
    try {
      // Always stop existing server to ensure proper port allocation and config regeneration
      const existing = this.activeServers.get(projectId);
      if (existing) {
        logger.info('Stopping existing preview to recreate with proper configuration', { 
          projectId, 
          oldPort: existing.port 
        });
        await this.stopPreview(projectId);
      }

      logger.info('Creating new local preview', { projectId, userId });

      // Get project files from database
      if (!supabase) {
        throw new Error('Supabase client not initialized');
      }
      
      const { data: files, error: filesError } = await supabase
        .from('project_files')
        .select('path, content, type')
        .eq('project_id', projectId);

      if (filesError) {
        throw new Error(`Failed to fetch project files: ${filesError.message}`);
      }

      if (!files || files.length === 0) {
        throw new Error('No files found in project');
      }

      logger.info('Fetched files from database', { 
        projectId, 
        fileCount: files.length,
        filePaths: files.map(f => f.path)
      });

      // Find available port
      const port = await this.findAvailablePort();
      const projectPath = path.join(this.tempDir, projectId);

      // Create preview info
      const previewInfo: LocalPreviewInfo = {
        projectId,
        port,
        url: `http://localhost:${port}`,
        status: 'starting'
      };

      this.activeServers.set(projectId, previewInfo);
      await this.saveState(); // Save state immediately

      // Always setup project files to ensure latest configuration
      logger.info('About to setup project files', { projectPath, port, fileCount: files.length });
      await this.setupProjectFiles(projectPath, files, port);
      logger.info('Finished setting up project files', { projectPath, port });
      
      // Only install dependencies if node_modules doesn't exist
      const nodeModulesExists = await this.checkNodeModulesExists(projectPath);
      if (!nodeModulesExists) {
        await this.installDependencies(projectPath);
      } else {
        logger.info('Dependencies already installed, skipping npm install', { projectId });
      }

      // Create Vite dev server
      const server = await this.createViteServer(projectPath, port);
      
      previewInfo.server = server;
      previewInfo.status = 'ready';

      logger.info('Local preview created successfully', { 
        projectId, 
        port, 
        url: previewInfo.url 
      });

      return previewInfo;

    } catch (error: any) {
      logger.error('Failed to create local preview', { 
        projectId, 
        error: error.message 
      });

      // Update status to error
      const errorInfo: LocalPreviewInfo = {
        projectId,
        port: 0,
        url: '',
        status: 'error'
      };
      this.activeServers.set(projectId, errorInfo);

      throw error;
    }
  }

  /**
   * Stop a local preview server
   */
  async stopPreview(projectId: string): Promise<boolean> {
    try {
      const previewInfo = this.activeServers.get(projectId);
      if (!previewInfo) {
        return false;
      }

      if (previewInfo.server) {
        previewInfo.server.close();
      }

      // Clean up project files
      const projectPath = path.join(this.tempDir, projectId);
      try {
        await fs.rm(projectPath, { recursive: true, force: true });
      } catch (error) {
        logger.warn('Failed to clean up project files', { projectId, error });
      }

      this.activeServers.delete(projectId);
      await this.saveState(); // Save state after deletion

      logger.info('Local preview stopped', { projectId });
      return true;

    } catch (error: any) {
      logger.error('Failed to stop local preview', { 
        projectId, 
        error: error.message 
      });
      return false;
    }
  }

  /**
   * Get preview status
   */
  getPreviewStatus(projectId: string): LocalPreviewInfo | null {
    return this.activeServers.get(projectId) || null;
  }

  /**
   * Update project files and restart preview
   */
  async updatePreview(projectId: string): Promise<LocalPreviewInfo> {
    const existing = this.activeServers.get(projectId);
    if (!existing) {
      throw new Error('Preview not found');
    }

    // Get updated files from database
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data: files, error: filesError } = await supabase
      .from('project_files')
      .select('path, content, type')
      .eq('project_id', projectId);

    if (filesError || !files) {
      throw new Error('Failed to fetch updated files');
    }

    // Update files on disk  
    const projectPath = path.join(this.tempDir, projectId);
    await this.setupProjectFiles(projectPath, files, existing.port);

    // Vite will automatically hot reload the changes
    logger.info('Project files updated, Vite will hot reload', { projectId });

    return existing;
  }

  /**
   * Check if node_modules directory exists for project
   */
  private async checkNodeModulesExists(projectPath: string): Promise<boolean> {
    try {
      const nodeModulesPath = path.join(projectPath, 'node_modules');
      await fs.access(nodeModulesPath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Prepare project (setup files and install dependencies) without starting server
   */
  async prepareProject(projectId: string, files: ProjectFile[]): Promise<void> {
    try {
      const projectPath = path.join(this.tempDir, projectId);
      
      logger.info('Preparing project for preview', { projectId });
      
      // Setup project files (use default port for background preparation)
      await this.setupProjectFiles(projectPath, files);
      
      // Install dependencies
      await this.installDependencies(projectPath);
      
      logger.info('Project prepared successfully', { projectId });
    } catch (error: any) {
      logger.error('Failed to prepare project', { projectId, error: error.message });
      throw error;
    }
  }

  /**
   * Clean up all servers (for graceful shutdown)
   */
  async cleanup(): Promise<void> {
    logger.info('Cleaning up all local preview servers');
    
    const cleanupPromises = Array.from(this.activeServers.keys()).map(
      projectId => this.stopPreview(projectId)
    );

    await Promise.allSettled(cleanupPromises);
    
    // Clean up temp directory
    try {
      await fs.rm(this.tempDir, { recursive: true, force: true });
    } catch (error) {
      logger.warn('Failed to clean up temp directory', { error });
    }
  }

  /**
   * Setup project files on disk
   */
  private async setupProjectFiles(projectPath: string, files: ProjectFile[], port?: number): Promise<void> {
    // Clean and recreate project directory
    await fs.rm(projectPath, { recursive: true, force: true });
    await fs.mkdir(projectPath, { recursive: true });

    // Parse files from AI-generated content and write them
    const parsedFiles = this.parseGeneratedFiles(files);
    
    // Determine project type and create appropriate structure
    const hasPackageJson = parsedFiles.some(f => f.path === 'package.json');
    
    if (!hasPackageJson) {
      // Create default React + Vite + TypeScript + Tailwind project structure
      await this.createDefaultProject(projectPath, parsedFiles, port);
    } else {
      // Write files with dynamic port replacement
      for (const file of parsedFiles) {
        const fullPath = path.join(projectPath, file.path);
        const dir = path.dirname(fullPath);
        
        await fs.mkdir(dir, { recursive: true });
        
        // Replace port in vite.config.ts if port is specified
        let content = file.content;
        if (port && file.path === 'vite.config.ts') {
          content = content.replace(/port:\s*\d+/, `port: ${port}`);
          logger.info('Updated Vite config port', { projectPath, port, filePath: file.path });
        }
        
        await fs.writeFile(fullPath, content, 'utf-8');
      }
    }

    logger.debug('Project files written', { 
      projectPath, 
      fileCount: files.length 
    });
  }

  /**
   * Create default project structure if no package.json exists
   */
  private async createDefaultProject(projectPath: string, files: ProjectFile[], port?: number): Promise<void> {
    logger.info('Creating default project', { 
      projectPath, 
      fileCount: files.length,
      files: files.map(f => ({ path: f.path, type: f.type }))
    });
    // Create package.json
    const packageJson = {
      name: "ultracode-preview",
      private: true,
      version: "0.0.0",
      type: "module",
      scripts: {
        dev: "vite",
        build: "tsc && vite build",
        preview: "vite preview"
      },
      dependencies: {
        react: "^18.2.0",
        "react-dom": "^18.2.0",
        "lucide-react": "^0.263.1",
        "react-icons": "^4.10.1"
      },
      devDependencies: {
        "@types/react": "^18.2.66",
        "@types/react-dom": "^18.2.22",
        "@vitejs/plugin-react-swc": "^3.5.0",
        autoprefixer: "^10.4.19",
        postcss: "^8.4.38",
        tailwindcss: "^3.4.3",
        typescript: "^5.2.2",
        vite: "^5.2.0"
      }
    };

    await fs.writeFile(
      path.join(projectPath, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    // Create index.html
    const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ultracode Preview</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

    await fs.writeFile(path.join(projectPath, 'index.html'), indexHtml);

    // Create src directory
    await fs.mkdir(path.join(projectPath, 'src'), { recursive: true });

    // Create main.tsx
    const mainTsx = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`;

    await fs.writeFile(path.join(projectPath, 'src/main.tsx'), mainTsx);

    // Create index.css
    const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`;

    await fs.writeFile(path.join(projectPath, 'src/index.css'), indexCss);

    // Find or create App component from the generated files
    let appContent = files.find(f => f.path.includes('App.') || f.path.includes('app.'))?.content;
    
    if (!appContent) {
      // Create default App if none found
      appContent = `import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Ultracode</h1>
        <p className="text-gray-600 mb-4">Your application has been generated successfully!</p>
        <div className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg">
          <span className="animate-pulse mr-2">●</span>
          Ready to preview
        </div>
      </div>
    </div>
  );
}

export default App;`;
    }

    await fs.writeFile(path.join(projectPath, 'src/App.tsx'), appContent);

    // Write other files to appropriate directories
    for (const file of files) {
      if (file.path === 'App.tsx' || file.path === 'App.jsx') continue; // Already handled
      
      let filePath = file.path;
      if (!filePath.includes('/') && !filePath.includes('\\')) {
        // Determine if it's a component file and put in src/components
        const isComponent = filePath.endsWith('.tsx') || filePath.endsWith('.jsx');
        if (isComponent && !filePath.includes('main.') && !filePath.includes('index.')) {
          filePath = path.join('src', 'components', filePath);
        } else {
          // Put other files in src directory
          filePath = path.join('src', filePath);
        }
      }
      
      const fullPath = path.join(projectPath, filePath);
      const dir = path.dirname(fullPath);
      
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(fullPath, file.content, 'utf-8');
      
      logger.debug('Wrote file', { filePath, fullPath });
    }

    // Create vite.config.ts with SWC plugin and completely disabled HMR
    // Use the actual assigned port directly in config
    const actualPort = port || 4000;
    logger.info('Creating vite.config.ts', { projectPath, assignedPort: port, actualPort });
    const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: ${actualPort},
    strictPort: false,
    hmr: false
  },
  build: {
    target: 'es2020',
    sourcemap: false
  }
})`;

    logger.info('Writing vite.config.ts with port', { projectPath, actualPort });
    await fs.writeFile(path.join(projectPath, 'vite.config.ts'), viteConfig);

    // Create tailwind.config.js
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;

    await fs.writeFile(path.join(projectPath, 'tailwind.config.js'), tailwindConfig);

    // Create postcss.config.js
    const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

    await fs.writeFile(path.join(projectPath, 'postcss.config.js'), postcssConfig);
  }

  /**
   * Install dependencies for the project with retry logic
   */
  private async installDependencies(projectPath: string, maxRetries: number = 3): Promise<void> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        logger.info(`Installing dependencies (attempt ${attempt}/${maxRetries})`, { projectPath });
        await this.runNpmInstall(projectPath);
        return; // Success, exit retry loop
      } catch (error) {
        logger.warn(`npm install attempt ${attempt} failed`, { 
          projectPath, 
          attempt, 
          maxRetries, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
        
        if (attempt === maxRetries) {
          throw error; // Final attempt failed, throw error
        }
        
        // Wait before retry with exponential backoff
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000); // Cap at 10s
        logger.info(`Retrying npm install in ${delay}ms`, { projectPath, attempt });
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  /**
   * Run npm install command
   */
  private async runNpmInstall(projectPath: string): Promise<void> {
    const { spawn } = await import('child_process');
    const fs = await import('fs/promises');
    
    // Clean up any corrupted npm artifacts before install
    try {
      await fs.rm(path.join(projectPath, 'node_modules'), { recursive: true, force: true });
      await fs.rm(path.join(projectPath, 'package-lock.json'), { force: true });
    } catch (error) {
      // Ignore cleanup errors
    }
    
    return new Promise((resolve, reject) => {
      logger.info('Installing dependencies', { projectPath });
      
      // Set timeout for npm install (2 minutes)
      const timeout = setTimeout(() => {
        npmInstall.kill();
        reject(new Error('npm install timed out after 2 minutes'));
      }, 120000);
      
      let stdout = '';
      let stderr = '';
      
      const npmInstall = spawn('npm', [
        'install',
        '--silent',
        '--no-warnings',
        '--no-audit',           // Skip audit for speed
        '--no-fund',            // Skip funding messages  
        '--legacy-peer-deps',   // Handle peer dependency conflicts
        '--timeout=60000',      // 60 second timeout per package
        '--retry=2',            // Retry failed downloads
        '--registry=https://registry.npmjs.org/', // Explicit registry
        '--prefer-offline',     // Use cache when possible for speed
        '--no-shrinkwrap'       // Avoid package-lock conflicts
      ], {
        cwd: projectPath,
        stdio: 'pipe',
        env: { 
          ...process.env, 
          NODE_NO_WARNINGS: '1',
          NPM_CONFIG_LOGLEVEL: 'error',
          npm_config_progress: 'false',
          npm_config_fetch_timeout: '60000',
          npm_config_fetch_retry_mintimeout: '10000',
          npm_config_fetch_retry_maxtimeout: '60000'
        }
      });

      // Capture output for debugging
      npmInstall.stdout?.on('data', (data) => {
        stdout += data.toString();
      });

      npmInstall.stderr?.on('data', (data) => {
        stderr += data.toString();
      });

      npmInstall.on('close', (code) => {
        clearTimeout(timeout);
        if (code === 0) {
          logger.info('Dependencies installed successfully', { projectPath });
          resolve();
        } else {
          logger.error('npm install failed', { 
            projectPath, 
            code, 
            stdout: stdout.slice(0, 1000), // Limit output size
            stderr: stderr.slice(0, 1000)
          });
          reject(new Error(`npm install failed with code ${code}: ${stderr}`));
        }
      });

      npmInstall.on('error', (error) => {
        clearTimeout(timeout);
        logger.error('Failed to spawn npm install', { projectPath, error: error.message });
        reject(new Error(`Failed to start npm: ${error.message}`));
      });
    });
  }

  /**
   * Create Vite development server using child process
   */
  private async createViteServer(projectPath: string, port: number): Promise<any> {
    const { spawn } = await import('child_process');
    
    return new Promise((resolve, reject) => {
      logger.info('Starting Vite dev server', { projectPath, port });
      
      // Start Vite dev server as child process
      const viteProcess = spawn('npm', ['run', 'dev'], {
        cwd: projectPath,
        stdio: 'pipe',
        env: { 
          ...process.env, 
          PORT: port.toString(),
          HOST: '0.0.0.0'
        }
      });

      let stdout = '';
      let stderr = '';
      let serverReady = false;

      // Capture output
      viteProcess.stdout?.on('data', (data) => {
        const output = data.toString();
        stdout += output;
        
        // Log Vite output for debugging
        logger.info('Vite output', { projectPath, port, output: output.trim() });
        
        // Check if server is ready (look for local/network URLs)
        if ((output.includes('Local:') || output.includes('ready in')) && !serverReady) {
          serverReady = true;
          logger.info('Vite server ready', { projectPath, port });
          resolve({
            process: viteProcess,
            port,
            close: () => {
              viteProcess.kill('SIGTERM');
            }
          });
        }
      });

      viteProcess.stderr?.on('data', (data) => {
        const error = data.toString();
        stderr += error;
        logger.error('Vite stderr', { projectPath, port, error: error.trim() });
      });

      viteProcess.on('error', (error) => {
        logger.error('Failed to start Vite server', { projectPath, error: error.message });
        reject(new Error(`Failed to start Vite: ${error.message}`));
      });

      viteProcess.on('exit', (code) => {
        if (code !== 0 && !serverReady) {
          logger.error('Vite server exited with error', { 
            projectPath, 
            code, 
            stdout: stdout.slice(0, 1000), 
            stderr: stderr.slice(0, 1000) 
          });
          reject(new Error(`Vite server failed to start (exit code ${code}): ${stderr}`));
        }
      });

      // Timeout after 30 seconds
      setTimeout(() => {
        if (!serverReady) {
          viteProcess.kill('SIGTERM');
          reject(new Error('Vite server startup timeout'));
        }
      }, 30000);
    });
  }

  /**
   * Parse AI-generated content to extract files
   */
  private parseGeneratedFiles(files: ProjectFile[]): ProjectFile[] {
    // If files are already structured (from database), check if they contain markdown
    const needsParsing = files.some(f => f.content.includes('```'));
    
    if (!needsParsing) {
      return files;
    }

    const parsedFiles: ProjectFile[] = [];
    
    for (const file of files) {
      if (file.content.includes('```')) {
        // Parse markdown code blocks from this file's content
        const fileRegex = /```(?:[\w]+\s+)?([^\n\r]+)\n([\s\S]*?)```/g;
        
        let match;
        while ((match = fileRegex.exec(file.content)) !== null) {
          const [, filePath, fileContent] = match;
          parsedFiles.push({
            path: filePath.trim(),
            content: fileContent.trim(),
            type: this.getFileType(filePath.trim())
          });
        }
      } else {
        // Keep file as-is
        parsedFiles.push(file);
      }
    }

    logger.info('Parsed files from AI response', { 
      originalCount: files.length,
      parsedCount: parsedFiles.length,
      originalFiles: files.map(f => f.path),
      parsedFiles: parsedFiles.map(f => f.path)
    });

    return parsedFiles.length > 0 ? parsedFiles : files;
  }

  /**
   * Get file type from path
   */
  private getFileType(filePath: string): string {
    const ext = path.extname(filePath);
    switch (ext) {
      case '.ts':
      case '.tsx':
        return 'typescript';
      case '.js':
      case '.jsx':
        return 'javascript';
      case '.json':
        return 'json';
      case '.css':
        return 'css';
      case '.html':
        return 'html';
      default:
        return 'text';
    }
  }

  /**
   * Find an available port starting from basePort
   */
  private async findAvailablePort(): Promise<number> {
    const net = await import('net');
    
    // Get all currently used ports from active servers
    const usedPorts = new Set(
      Array.from(this.activeServers.values()).map(server => server.port)
    );
    
    return new Promise((resolve, reject) => {
      const server = net.createServer();
      
      const tryPort = (port: number) => {
        // Skip port if already used by our service
        if (usedPorts.has(port)) {
          tryPort(port + 1);
          return;
        }
        
        server.listen(port, () => {
          server.close(() => resolve(port));
        });
        
        server.on('error', (err: any) => {
          if (err.code === 'EADDRINUSE') {
            tryPort(port + 1);
          } else {
            reject(err);
          }
        });
      };
      
      tryPort(this.basePort);
    });
  }
}

export const localPreviewService = new LocalPreviewService();

// Graceful shutdown
process.on('SIGTERM', async () => {
  await localPreviewService.cleanup();
});

process.on('SIGINT', async () => {
  await localPreviewService.cleanup();
});