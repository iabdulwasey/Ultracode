// Removed Vite imports - now using child process approach
import fs from 'fs/promises';
import path from 'path';
import { logger } from '../utils/logger.js';
import { supabase } from '../config/supabase.js';
import { getWebSocketService } from './websocket.service.js';

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
      // Mark all as error status since server processes won't survive restart
      for (const [projectId, info] of Object.entries(state.activeServers || {})) {
        const previewInfo = info as LocalPreviewInfo;
        this.activeServers.set(projectId, {
          ...previewInfo,
          status: 'error', // Mark as error so they get recreated
          server: undefined
        });
      }
      
      logger.info('Loaded preview state', { 
        restoredPreviews: this.activeServers.size,
        restoredProjects: Array.from(this.activeServers.keys())
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
      // Check if server already exists and is running
      const existing = this.activeServers.get(projectId);
      if (existing) {
        logger.info('Found existing server for project', { 
          projectId, 
          status: existing.status,
          port: existing.port,
          hasServer: !!existing.server
        });

        // If server is healthy and running, just update files
        if (existing.status === 'ready' && existing.server) {
          logger.info('Server is healthy, reusing existing server and updating files', { 
            projectId, 
            port: existing.port,
            url: existing.url
          });
          
          return await this.updatePreview(projectId);
        }

        // If server exists but is unhealthy, clean it up
        if (existing.status === 'error' || !existing.server) {
          logger.info('Server is unhealthy, cleaning up before creating new one', { 
            projectId, 
            oldPort: existing.port,
            status: existing.status,
            hasServer: !!existing.server
          });
          await this.stopPreview(projectId);
        }
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
        // Broadcast build status - installing dependencies
        try {
          const webSocketService = getWebSocketService();
          webSocketService.broadcastPreviewStatus(
            projectId,
            'building',
            userId,
            'Installing dependencies...',
            50
          );
        } catch (error) {
          logger.debug('WebSocket service not available for status broadcast', { error: error instanceof Error ? error.message : String(error) });
        }

        await this.installDependencies(projectPath);
      } else {
        logger.info('Dependencies already installed, skipping npm install', { projectId });
      }

      // Broadcast build status - starting server
      try {
        const webSocketService = getWebSocketService();
        webSocketService.broadcastPreviewStatus(
          projectId,
          'building',
          userId,
          'Starting development server...',
          80
        );
      } catch (error) {
        // WebSocket service might not be initialized yet, continue without broadcasting
        logger.debug('WebSocket service not available for status broadcast', { error: error instanceof Error ? error.message : String(error) });
      }

      // Create Vite dev server
      const server = await this.createViteServer(projectPath, port);
      
      previewInfo.server = server;
      previewInfo.status = 'ready';

      // Broadcast build status - ready
      try {
        const webSocketService = getWebSocketService();
        webSocketService.broadcastPreviewStatus(
          projectId,
          'ready',
          userId,
          'Preview ready for development',
          100
        );
      } catch (error) {
        // WebSocket service might not be initialized yet, continue without broadcasting
        logger.debug('WebSocket service not available for status broadcast', { error: error instanceof Error ? error.message : String(error) });
      }

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

      // Broadcast error status
      try {
        const webSocketService = getWebSocketService();
        webSocketService.broadcastPreviewStatus(
          projectId,
          'error',
          userId,
          `Preview creation failed: ${error.message}`
        );
      } catch (wsError) {
        // WebSocket service might not be initialized yet
        logger.debug('WebSocket service not available for error broadcast', { error: wsError instanceof Error ? wsError.message : String(wsError) });
      }

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
   * Update project files incrementally (preserving node_modules and build state)
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

    // Update only the AI-modified files (preserves node_modules and build state)
    const projectPath = path.join(this.tempDir, projectId);
    await this.updateChangedFiles(projectPath, files, existing.port);

    // Vite will automatically hot reload the changes
    logger.info('Project files updated incrementally, Vite will hot reload', { projectId });

    return existing;
  }

  /**
   * Update only the changed files and analyze dependencies for additional updates needed
   */
  private async updateChangedFiles(projectPath: string, files: ProjectFile[], port?: number): Promise<void> {
    logger.info('Starting incremental file update', { 
      projectPath, 
      changedFiles: files.length,
      filesList: files.map(f => f.path)
    });

    // Broadcast building status
    await this.broadcastPreviewStatus(projectPath, 'building', 'Updating preview with generated code...');

    // Parse files from AI-generated content
    const parsedFiles = this.parseGeneratedFiles(files);
    
    // Step 1: Update only the AI-modified files
    const updatedFilePaths = new Set<string>();
    for (const file of parsedFiles) {
      const fullPath = path.join(projectPath, file.path);
      const dir = path.dirname(fullPath);
      
      // Ensure directory exists
      await fs.mkdir(dir, { recursive: true });
      
      // Write the updated file
      await fs.writeFile(fullPath, file.content, 'utf-8');
      updatedFilePaths.add(file.path);
      
      logger.info('Updated AI-modified file', { filePath: file.path });
    }

    // Step 2: Analyze dependencies and update related files if needed
    await this.analyzeAndUpdateDependencies(projectPath, parsedFiles, updatedFilePaths, port);
    
    // Step 3: Sync all updated files back to Supabase
    await this.syncFilesToSupabase(projectPath, updatedFilePaths);
    
    // Step 4: Broadcast file updates via WebSocket  
    await this.broadcastFileUpdates(projectPath, parsedFiles);
    
    // Step 5: Broadcast preview ready status
    await this.broadcastPreviewStatus(projectPath, 'ready');
    
    logger.info('Incremental file update completed', { 
      projectPath, 
      aiModifiedFiles: parsedFiles.length,
      totalUpdatedFiles: updatedFilePaths.size
    });
  }

  /**
   * Analyze AI changes and update dependent files (App.tsx imports, Tailwind config, etc.)
   */
  private async analyzeAndUpdateDependencies(
    projectPath: string, 
    aiModifiedFiles: ProjectFile[], 
    updatedPaths: Set<string>,
    port?: number
  ): Promise<void> {
    
    // Check if new components were added that need to be imported in App.tsx
    const newComponents = aiModifiedFiles.filter(f => 
      f.path.startsWith('src/components/') && 
      (f.path.endsWith('.tsx') || f.path.endsWith('.jsx'))
    );

    if (newComponents.length > 0) {
      await this.updateAppImports(projectPath, newComponents, updatedPaths);
    }

    // Check if Tailwind classes are used that might need config updates
    const hasNewTailwindClasses = aiModifiedFiles.some(f => 
      f.content.includes('className=') && 
      this.hasCustomTailwindClasses(f.content)
    );

    if (hasNewTailwindClasses) {
      await this.ensureTailwindConfig(projectPath, updatedPaths);
    }

    // Update Vite config port if needed
    if (port) {
      await this.updateViteConfigPort(projectPath, port, updatedPaths);
    }

    // Ensure package.json has all required dependencies
    await this.ensureRequiredDependencies(projectPath, aiModifiedFiles, updatedPaths);
  }

  /**
   * Update App.tsx to import new components if needed
   */
  private async updateAppImports(
    projectPath: string, 
    newComponents: ProjectFile[], 
    updatedPaths: Set<string>
  ): Promise<void> {
    const appPath = path.join(projectPath, 'src', 'App.tsx');
    
    try {
      const currentAppContent = await fs.readFile(appPath, 'utf-8');
      let needsUpdate = false;
      let updatedContent = currentAppContent;

      for (const component of newComponents) {
        const componentName = path.basename(component.path, path.extname(component.path));
        const importPath = `./${component.path.replace('src/', '').replace(/\.(tsx?|jsx?)$/, '')}`;
        
        // Check if import already exists
        const importRegex = new RegExp(`import\\s+${componentName}\\s+from\\s+['"]${importPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`);
        
        if (!importRegex.test(updatedContent)) {
          // Add import
          const importStatement = `import ${componentName} from '${importPath}';`;
          
          // Find where to insert the import (after existing imports)
          const importLines = updatedContent.split('\n');
          let lastImportIndex = -1;
          
          for (let i = 0; i < importLines.length; i++) {
            if (importLines[i].trim().startsWith('import ')) {
              lastImportIndex = i;
            }
          }
          
          if (lastImportIndex >= 0) {
            importLines.splice(lastImportIndex + 1, 0, importStatement);
            updatedContent = importLines.join('\n');
            needsUpdate = true;
            
            logger.info('Added import to App.tsx', { componentName, importPath });
          }
        }
      }

      if (needsUpdate) {
        await fs.writeFile(appPath, updatedContent, 'utf-8');
        updatedPaths.add('src/App.tsx');
        logger.info('Updated App.tsx with new component imports');
      }
      
    } catch (error) {
      logger.warn('Could not update App.tsx imports', { error });
    }
  }

  /**
   * Check if content has custom Tailwind classes that might need config
   */
  private hasCustomTailwindClasses(content: string): boolean {
    // Look for custom colors, spacing, or complex Tailwind patterns
    const customClassPatterns = [
      /className="[^"]*bg-\[#[0-9a-fA-F]+\]/,  // Custom hex colors
      /className="[^"]*text-\[[^\]]+\]/,        // Custom text sizes/colors
      /className="[^"]*w-\[[^\]]+\]/,           // Custom widths
      /className="[^"]*h-\[[^\]]+\]/,           // Custom heights
    ];
    
    return customClassPatterns.some(pattern => pattern.test(content));
  }

  /**
   * Ensure Tailwind config exists and is properly set up
   */
  private async ensureTailwindConfig(projectPath: string, updatedPaths: Set<string>): Promise<void> {
    const tailwindConfigPath = path.join(projectPath, 'tailwind.config.js');
    
    try {
      await fs.access(tailwindConfigPath);
      // Tailwind config exists, no need to update
    } catch {
      // Create default Tailwind config
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
      
      await fs.writeFile(tailwindConfigPath, tailwindConfig, 'utf-8');
      updatedPaths.add('tailwind.config.js');
      logger.info('Created missing Tailwind config');
    }
  }

  /**
   * Update Vite config port if needed
   */
  private async updateViteConfigPort(projectPath: string, port: number, updatedPaths: Set<string>): Promise<void> {
    const viteConfigPath = path.join(projectPath, 'vite.config.ts');
    
    try {
      const currentContent = await fs.readFile(viteConfigPath, 'utf-8');
      const updatedContent = currentContent.replace(/port:\s*\d+/, `port: ${port}`);
      
      if (updatedContent !== currentContent) {
        await fs.writeFile(viteConfigPath, updatedContent, 'utf-8');
        updatedPaths.add('vite.config.ts');
        logger.info('Updated Vite config port', { port });
      }
    } catch (error) {
      logger.warn('Could not update Vite config port', { error });
    }
  }

  /**
   * Ensure package.json has required dependencies for AI-generated code
   */
  private async ensureRequiredDependencies(
    _projectPath: string, 
    aiModifiedFiles: ProjectFile[], 
    _updatedPaths: Set<string>
  ): Promise<void> {
    // Check if AI code uses any new libraries
    const usedLibraries = new Set<string>();
    
    for (const file of aiModifiedFiles) {
      // Extract import statements to find used libraries
      const importMatches = file.content.match(/import\s+.*?\s+from\s+['"]([^'"]+)['"]/g);
      if (importMatches) {
        importMatches.forEach(importMatch => {
          const libMatch = importMatch.match(/from\s+['"]([^'"]+)['"]/);
          if (libMatch && !libMatch[1].startsWith('.')) {
            // External library (not relative import)
            usedLibraries.add(libMatch[1]);
          }
        });
      }
    }

    if (usedLibraries.size > 0) {
      logger.info('Detected external libraries in AI code', { 
        libraries: Array.from(usedLibraries) 
      });
      // For now, just log - could implement automatic dependency installation
    }
  }

  /**
   * Sync locally updated files back to Supabase database
   */
  private async syncFilesToSupabase(projectPath: string, updatedFilePaths: Set<string>): Promise<void> {
    if (updatedFilePaths.size === 0) {
      return;
    }

    // Extract project ID from project path
    const projectId = path.basename(projectPath);
    
    logger.info('Syncing updated files to Supabase', { 
      projectId, 
      fileCount: updatedFilePaths.size,
      files: Array.from(updatedFilePaths)
    });

    try {
      // Read all updated files from disk and prepare for database update
      const filesToSync: ProjectFile[] = [];
      
      for (const filePath of updatedFilePaths) {
        try {
          const fullPath = path.join(projectPath, filePath);
          const content = await fs.readFile(fullPath, 'utf-8');
          const fileExtension = path.extname(filePath);
          
          // Determine file type
          let fileType = 'text';
          if (['.tsx', '.ts'].includes(fileExtension)) {
            fileType = 'typescript';
          } else if (['.jsx', '.js'].includes(fileExtension)) {
            fileType = 'javascript';
          } else if (fileExtension === '.css') {
            fileType = 'css';
          } else if (fileExtension === '.json') {
            fileType = 'json';
          } else if (fileExtension === '.html') {
            fileType = 'html';
          }

          filesToSync.push({
            path: filePath,
            content,
            type: fileType
          });
        } catch (error) {
          logger.warn('Failed to read file for sync', { filePath, error });
        }
      }

      // Update files in Supabase database
      if (filesToSync.length > 0 && supabase) {
        for (const file of filesToSync) {
          const { error } = await supabase
            .from('project_files')
            .upsert({
              project_id: projectId,
              path: file.path,
              content: file.content,
              type: file.type,
              updated_at: new Date().toISOString()
            }, {
              onConflict: 'project_id,path'
            });

          if (error) {
            logger.error('Failed to sync file to Supabase', { 
              projectId, 
              filePath: file.path, 
              error 
            });
          } else {
            logger.debug('Synced file to Supabase', { 
              projectId, 
              filePath: file.path 
            });
          }
        }

        logger.info('Successfully synced files to Supabase', { 
          projectId, 
          syncedFiles: filesToSync.length 
        });
      }
    } catch (error) {
      logger.error('Failed to sync files to Supabase', { projectId, error });
    }
  }

  /**
   * Broadcast file updates to connected clients via WebSocket
   */
  private async broadcastFileUpdates(projectPath: string, updatedFiles: ProjectFile[]): Promise<void> {
    if (updatedFiles.length === 0) {
      return;
    }

    const projectId = path.basename(projectPath);
    
    try {
      const webSocketService = getWebSocketService();
      
      // Broadcast file update event with proper format
      webSocketService.broadcastToProject(projectId, 'files-updated', {
        projectId,
        files: updatedFiles,
        userId: 'system' // Since this is from AI generation
      });
      
      logger.info('Broadcasted file updates via WebSocket', { 
        projectId, 
        fileCount: updatedFiles.length 
      });
      
    } catch (error) {
      logger.debug('WebSocket service not available for file update broadcast', { 
        error: error instanceof Error ? error.message : String(error) 
      });
    }
  }

  /**
   * Broadcast preview status update via WebSocket
   */
  private async broadcastPreviewStatus(projectPath: string, status: 'building' | 'ready' | 'error', message?: string): Promise<void> {
    const projectId = path.basename(projectPath);
    
    try {
      const webSocketService = getWebSocketService();
      
      // Broadcast preview status event
      webSocketService.broadcastToProject(projectId, 'preview-rebuild', {
        projectId,
        status,
        message: message || (status === 'ready' ? 'Preview updated successfully' : 'Preview is building...'),
        progress: status === 'ready' ? 100 : (status === 'building' ? 50 : 0)
      });
      
      logger.info('Broadcasted preview status via WebSocket', { 
        projectId, 
        status,
        message 
      });
    } catch (error) {
      logger.debug('WebSocket service not available for preview status broadcast', { 
        error: error instanceof Error ? error.message : String(error) 
      });
    }
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

    // Create vite.config.ts with SWC plugin and HMR enabled for live updates
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
    hmr: {
      port: ${actualPort + 1000}
    }
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
   * Checks both our tracked servers AND actual system port availability with HTTP test
   */
  private async findAvailablePort(): Promise<number> {
    const net = await import('net');
    
    // Get all currently used ports from active servers
    const usedPorts = new Set(
      Array.from(this.activeServers.values()).map(server => server.port)
    );
    
    const isPortReallyAvailable = async (port: number): Promise<boolean> => {
      // First test with socket binding
      return new Promise((resolve) => {
        const server = net.createServer();
        
        server.listen(port, () => {
          server.close(() => {
            // Port bound successfully, now test if there's an HTTP server
            this.testHttpConnection(port).then((hasHttpServer) => {
              if (hasHttpServer) {
                logger.debug(`Port ${port} has existing HTTP server, not available`);
                resolve(false);
              } else {
                logger.debug(`Port ${port} is truly available`);
                resolve(true);
              }
            });
          });
        });
        
        server.on('error', (err: any) => {
          if (err.code === 'EADDRINUSE') {
            logger.debug(`Port ${port} binding failed - clearly in use`);
            resolve(false);
          } else {
            logger.debug(`Port ${port} error during test:`, err.code);
            resolve(false);
          }
        });
      });
    };
    
    const tryPort = async (port: number): Promise<number> => {
      // Skip port if already used by our service
      if (usedPorts.has(port)) {
        logger.debug(`Port ${port} already tracked by our service, trying next port`);
        return tryPort(port + 1);
      }
      
      // Test if port is actually available
      const available = await isPortReallyAvailable(port);
      if (available) {
        logger.info(`Found available port: ${port}`);
        return port;
      } else {
        logger.debug(`Port ${port} is occupied, trying next port`);
        return tryPort(port + 1);
      }
    };
    
    logger.info(`Starting port search from basePort: ${this.basePort}`);
    return tryPort(this.basePort);
  }

  /**
   * Test if there's an HTTP server responding on the given port
   */
  private async testHttpConnection(port: number): Promise<boolean> {
    const http = await import('http');
    
    return new Promise((resolve) => {
      const req = http.get(`http://localhost:${port}`, { timeout: 1000 }, () => {
        resolve(true); // HTTP server is responding
      });
      
      req.on('error', () => {
        resolve(false); // No HTTP server or connection failed
      });
      
      req.on('timeout', () => {
        req.destroy();
        resolve(false); // Timeout means no responsive HTTP server
      });
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