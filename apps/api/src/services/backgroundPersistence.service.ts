import { supabase } from '../config/supabase.js';
import { logger } from '../utils/logger.js';

interface ProjectFile {
  path: string;
  content: string;
  type: string;
  size?: number;
}

/**
 * Background Persistence Service - Handles async saves to database
 * This is part of the container-first architecture where:
 * 1. AI writes directly to container filesystem (instant preview)
 * 2. Files are persisted to database asynchronously (no sync complexity)
 * 
 * Based on Open-Lovable's pattern where container is the single source of truth
 */
class BackgroundPersistenceService {
  private saveQueue = new Map<string, ProjectFile[]>();
  private processing = new Set<string>();

  /**
   * Save project files to database asynchronously
   * This runs in the background without blocking container operations
   */
  async saveProjectSnapshot(projectId: string, files: ProjectFile[]): Promise<void> {
    try {
      logger.info('Background persistence: Saving project snapshot', { 
        projectId, 
        fileCount: files.length 
      });

      if (!supabase) {
        throw new Error('Supabase client not initialized');
      }

      // Prepare files for database storage
      const filesToSave = files.map(file => ({
        project_id: projectId,
        path: file.path,
        content: file.content,
        type: file.type,
        size: file.content.length,
        updated_at: new Date().toISOString()
      }));

      // Upsert files to database (create or update)
      const { error } = await supabase
        .from('project_files')
        .upsert(filesToSave, { 
          onConflict: 'project_id,path',
          ignoreDuplicates: false 
        });

      if (error) {
        logger.error('Background persistence failed', { projectId, error });
        throw error;
      }

      logger.info('Background persistence completed', { 
        projectId, 
        savedFiles: files.length 
      });

    } catch (error) {
      logger.error('Background persistence error', { 
        projectId, 
        error: error instanceof Error ? error.message : String(error) 
      });
      throw error;
    }
  }

  /**
   * Queue files for background save with debouncing
   * Multiple rapid saves are batched together
   */
  queueSave(projectId: string, files: ProjectFile[], delayMs: number = 1000): void {
    // Update queue with latest files
    this.saveQueue.set(projectId, files);

    // Skip if already processing this project
    if (this.processing.has(projectId)) {
      logger.debug('Background save already queued', { projectId });
      return;
    }

    // Mark as processing
    this.processing.add(projectId);

    // Debounce saves
    setTimeout(async () => {
      try {
        const queuedFiles = this.saveQueue.get(projectId);
        if (queuedFiles) {
          await this.saveProjectSnapshot(projectId, queuedFiles);
          this.saveQueue.delete(projectId);
        }
      } catch (error) {
        logger.warn('Queued background save failed', { projectId, error });
      } finally {
        this.processing.delete(projectId);
      }
    }, delayMs);

    logger.debug('Background save queued', { 
      projectId, 
      fileCount: files.length,
      delayMs 
    });
  }

  /**
   * Immediate save without queuing (for critical operations)
   */
  async saveImmediate(projectId: string, files: ProjectFile[]): Promise<void> {
    await this.saveProjectSnapshot(projectId, files);
  }

  /**
   * Get current queue status for monitoring
   */
  getQueueStatus(): { queued: number; processing: number } {
    return {
      queued: this.saveQueue.size,
      processing: this.processing.size
    };
  }

  /**
   * Clear all queued saves for a project (useful during project deletion)
   */
  clearQueue(projectId: string): void {
    this.saveQueue.delete(projectId);
    this.processing.delete(projectId);
    logger.info('Background save queue cleared', { projectId });
  }

  /**
   * Load project files from database (fallback when container doesn't exist)
   */
  async loadProjectFiles(projectId: string): Promise<ProjectFile[]> {
    try {
      if (!supabase) {
        throw new Error('Supabase client not initialized');
      }

      const { data: files, error } = await supabase
        .from('project_files')
        .select('path, content, type')
        .eq('project_id', projectId)
        .order('path');

      if (error) {
        logger.error('Failed to load project files from database', { projectId, error });
        throw error;
      }

      logger.info('Loaded project files from database', { 
        projectId, 
        fileCount: files?.length || 0 
      });

      return files || [];

    } catch (error) {
      logger.error('Error loading project files', { 
        projectId, 
        error: error instanceof Error ? error.message : String(error) 
      });
      return [];
    }
  }

  /**
   * Sync container files back to database (recovery operation)
   */
  async syncContainerToDatabase(projectId: string, containerFiles: Record<string, string>): Promise<void> {
    const files: ProjectFile[] = Object.entries(containerFiles).map(([path, content]) => ({
      path,
      content,
      type: this.getFileType(path),
      size: content.length
    }));

    logger.info('Syncing container files to database', { 
      projectId, 
      fileCount: files.length 
    });

    await this.saveProjectSnapshot(projectId, files);
  }

  /**
   * Helper to determine file type from extension
   */
  private getFileType(filePath: string): string {
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
}

// Export singleton instance
export const backgroundPersistenceService = new BackgroundPersistenceService();

// Graceful shutdown - wait for pending saves
process.on('SIGTERM', () => {
  const status = backgroundPersistenceService.getQueueStatus();
  if (status.queued > 0 || status.processing > 0) {
    logger.info('Waiting for background persistence to complete before shutdown', status);
    // In production, you might want to wait or force-save critical data
  }
});