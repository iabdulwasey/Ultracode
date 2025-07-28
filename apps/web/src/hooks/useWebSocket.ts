import { useEffect, useState, useCallback, useRef } from 'react';
import webSocketService, { type BuildStatus } from '@/services/websocket.service';

interface UseWebSocketOptions {
  projectId?: string;
  onFilesUpdated?: (files: Array<{ path: string; content: string; type: string }>) => void;
  onPreviewStatusChange?: (status: BuildStatus) => void;
  onChatGenerationComplete?: (files: Array<{ path: string; content: string; type: string }>) => void;
}

// Re-export BuildStatus for backward compatibility
export type { BuildStatus };

export function useWebSocket({
  projectId,
  onFilesUpdated,
  onPreviewStatusChange,
  onChatGenerationComplete
}: UseWebSocketOptions = {}) {
  const [connectionStatus, setConnectionStatus] = useState(() => 
    webSocketService.getConnectionStatus()
  );
  const [buildStatus, setBuildStatus] = useState<BuildStatus>({
    status: 'idle',
    lastUpdated: new Date()
  });

  // Use refs to maintain current callback references
  const callbacksRef = useRef({
    onFilesUpdated,
    onPreviewStatusChange,
    onChatGenerationComplete
  });

  // Update refs when callbacks change
  useEffect(() => {
    callbacksRef.current = {
      onFilesUpdated,
      onPreviewStatusChange,
      onChatGenerationComplete
    };
  }, [onFilesUpdated, onPreviewStatusChange, onChatGenerationComplete]);

  // Initialize connection if needed
  useEffect(() => {
    webSocketService.connect();
    
    // Update connection status periodically
    const checkStatus = () => {
      setConnectionStatus(webSocketService.getConnectionStatus());
    };
    
    const interval = setInterval(checkStatus, 1000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Subscribe to callbacks (only once per component)
  useEffect(() => {
    const callbacks = {
      onFilesUpdated: (files: Array<{ path: string; content: string; type: string }>) => {
        if (callbacksRef.current.onFilesUpdated) {
          callbacksRef.current.onFilesUpdated(files);
        }
      },
      onPreviewStatusChange: (status: BuildStatus) => {
        setBuildStatus(status);
        if (callbacksRef.current.onPreviewStatusChange) {
          callbacksRef.current.onPreviewStatusChange(status);
        }
      },
      onChatGenerationComplete: (files: Array<{ path: string; content: string; type: string }>) => {
        if (callbacksRef.current.onChatGenerationComplete) {
          callbacksRef.current.onChatGenerationComplete(files);
        }
      }
    };

    const unsubscribe = webSocketService.subscribe(callbacks);
    
    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array - subscribe only once

  // Handle project joining/leaving separately
  useEffect(() => {
    if (projectId) {
      webSocketService.joinProject(projectId);
      
      return () => {
        webSocketService.leaveProject(projectId);
      };
    }
  }, [projectId]); // Only re-run when projectId changes

  // Utility functions
  const connect = useCallback(() => {
    webSocketService.connect();
  }, []);

  const disconnect = useCallback(() => {
    webSocketService.disconnect();
  }, []);

  const joinProject = useCallback((newProjectId: string) => {
    webSocketService.joinProject(newProjectId);
  }, []);

  const leaveProject = useCallback((projectIdToLeave: string) => {
    webSocketService.leaveProject(projectIdToLeave);
  }, []);

  const updateBuildStatus = useCallback((status: BuildStatus) => {
    webSocketService.updateBuildStatus(status);
  }, []);

  return {
    isConnected: connectionStatus.isConnected,
    buildStatus,
    connect,
    disconnect,
    joinProject,
    leaveProject,
    updateBuildStatus,
    socket: null // Legacy compatibility, but not needed with singleton
  };
}