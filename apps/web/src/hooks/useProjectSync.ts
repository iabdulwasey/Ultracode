import { useEffect, useState, useCallback } from 'react';
import { useWebSocket, type BuildStatus } from './useWebSocket';

interface ProjectFile {
  path: string;
  content: string;
  type: string;
}

interface UseProjectSyncOptions {
  projectId: string;
  onFilesUpdated?: (files: ProjectFile[]) => void;
  onPreviewReady?: () => void;
  onError?: (error: string) => void;
}

export function useProjectSync({
  projectId,
  onFilesUpdated,
  onPreviewReady,
  onError
}: UseProjectSyncOptions) {
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isPreviewReady, setIsPreviewReady] = useState(false);

  // WebSocket connection for real-time updates
  const {
    isConnected,
    buildStatus,
    updateBuildStatus
  } = useWebSocket({
    projectId,
    onFilesUpdated: useCallback((updatedFiles: ProjectFile[]) => {
      console.log('Files updated via WebSocket:', updatedFiles);
      setFiles(updatedFiles);
      setLastUpdate(new Date());
      
      if (onFilesUpdated) {
        onFilesUpdated(updatedFiles);
      }
    }, [onFilesUpdated]),
    
    onPreviewStatusChange: useCallback((status: BuildStatus) => {
      console.log('Preview status changed:', status);
      
      if (status.status === 'ready') {
        setIsPreviewReady(true);
        if (onPreviewReady) {
          onPreviewReady();
        }
      } else if (status.status === 'error') {
        setIsPreviewReady(false);
        if (onError && status.message) {
          onError(status.message);
        }
      } else {
        setIsPreviewReady(false);
      }
    }, [onPreviewReady, onError]),
    
    onChatGenerationComplete: useCallback((generatedFiles: ProjectFile[]) => {
      console.log('Chat generation completed, files updated:', generatedFiles);
      setFiles(generatedFiles);
      setLastUpdate(new Date());
      
      if (onFilesUpdated) {
        onFilesUpdated(generatedFiles);
      }
    }, [onFilesUpdated])
  });

  // Handle triggering rebuild after files are updated
  useEffect(() => {
    if (files.length > 0 && updateBuildStatus) {
      updateBuildStatus({
        status: 'building',
        message: 'Updating preview with generated code...',
        progress: 90,
        lastUpdated: new Date()
      });
    }
  }, [files, updateBuildStatus]);

  // Function to manually trigger a preview rebuild
  const triggerPreviewRebuild = useCallback(() => {
    if (updateBuildStatus) {
      updateBuildStatus({
        status: 'building',
        message: 'Rebuilding preview...',
        progress: 0,
        lastUpdated: new Date()
      });
    }
  }, [updateBuildStatus]);

  // Function to refresh files from the server (fallback when WebSocket fails)
  const refreshFiles = useCallback(async () => {
    try {
      // This would typically fetch from your API
      // For now, we'll rely on WebSocket updates
      console.log('Refreshing files for project:', projectId);
    } catch (error) {
      console.error('Failed to refresh files:', error);
      if (onError) {
        onError('Failed to refresh project files');
      }
    }
  }, [projectId, onError]);

  return {
    // State
    files,
    lastUpdate,
    isPreviewReady,
    isConnected,
    buildStatus,
    
    // Actions
    triggerPreviewRebuild,
    refreshFiles,
    
    // Status helpers
    isBuilding: buildStatus.status === 'building',
    hasError: buildStatus.status === 'error',
    buildProgress: buildStatus.progress || 0,
    buildMessage: buildStatus.message || ''
  };
}