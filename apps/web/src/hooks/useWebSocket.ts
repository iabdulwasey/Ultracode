import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { supabase } from '@/lib/supabase';

// WebSocket event types (must match backend interface)
export interface WebSocketEvents {
  'files-updated': {
    projectId: string;
    files: Array<{ path: string; content: string; type: string }>;
    userId: string;
  };
  
  'preview-rebuild': {
    projectId: string;
    status: 'building' | 'ready' | 'error';
    message?: string;
    progress?: number;
    userId: string;
  };
  
  'chat-generation-complete': {
    projectId: string;
    generatedFiles: Array<{ path: string; content: string; type: string }>;
    userId: string;
  };
  
  'build-status': {
    projectId: string;
    status: 'idle' | 'building' | 'ready' | 'error';
    message?: string;
    progress?: number;
    userId: string;
  };
}

export interface BuildStatus {
  status: 'idle' | 'building' | 'ready' | 'error';
  message?: string;
  progress?: number;
  lastUpdated: Date;
}

interface UseWebSocketOptions {
  projectId?: string;
  onFilesUpdated?: (files: Array<{ path: string; content: string; type: string }>) => void;
  onPreviewStatusChange?: (status: BuildStatus) => void;
  onChatGenerationComplete?: (files: Array<{ path: string; content: string; type: string }>) => void;
}

export function useWebSocket({
  projectId,
  onFilesUpdated,
  onPreviewStatusChange,
  onChatGenerationComplete
}: UseWebSocketOptions = {}) {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [buildStatus, setBuildStatus] = useState<BuildStatus>({
    status: 'idle',
    lastUpdated: new Date()
  });
  const connectingRef = useRef(false);
  const currentProjectRef = useRef<string | undefined>(projectId);

  // Connect to WebSocket server
  const connect = useCallback(async () => {
    try {
      // Prevent multiple connections
      if (connectingRef.current || socketRef.current?.connected) {
        console.log('WebSocket already connecting or connected');
        return;
      }
      
      connectingRef.current = true;

      // Get current user session for authentication
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        console.warn('No authentication token available for WebSocket connection');
        connectingRef.current = false;
        return;
      }

      // Disconnect existing socket if any
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }

      // Create socket connection
      const socket = io(import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3001', {
        transports: ['websocket', 'polling'],
        withCredentials: true,
        autoConnect: true,
        forceNew: true, // Force new connection
      });

      socketRef.current = socket;

      // Handle connection events
      socket.on('connect', () => {
        console.log('WebSocket connected:', socket.id);
        setIsConnected(true);
        connectingRef.current = false;
        
        // Authenticate with the server
        socket.emit('authenticate', {
          token: session.access_token,
          projectId: currentProjectRef.current
        });
      });

      socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
        connectingRef.current = false;
      });

      socket.on('authenticated', (data: { userId: string }) => {
        console.log('WebSocket authenticated for user:', data.userId);
        
        // Join project room if projectId is provided
        if (currentProjectRef.current) {
          socket.emit('join-project', { projectId: currentProjectRef.current });
        }
      });

      socket.on('joined-project', (data: { projectId: string }) => {
        console.log('Joined project room:', data.projectId);
      });

      socket.on('auth-error', (data: { message: string }) => {
        console.error('WebSocket authentication error:', data.message);
      });

      socket.on('error', (data: { message: string }) => {
        console.error('WebSocket error:', data.message);
      });

      // Handle business logic events
      socket.on('files-updated', (data: WebSocketEvents['files-updated']) => {
        console.log('Files updated:', data);
        if (onFilesUpdated && data.projectId === projectId) {
          onFilesUpdated(data.files);
        }
      });

      socket.on('preview-rebuild', (data: WebSocketEvents['preview-rebuild']) => {
        console.log('Preview status update:', data);
        if (data.projectId === projectId) {
          const status: BuildStatus = {
            status: data.status,
            message: data.message,
            progress: data.progress,
            lastUpdated: new Date()
          };
          
          setBuildStatus(status);
          
          if (onPreviewStatusChange) {
            onPreviewStatusChange(status);
          }
        }
      });

      socket.on('build-status', (data: WebSocketEvents['build-status']) => {
        console.log('Build status update:', data);
        if (data.projectId === projectId) {
          const status: BuildStatus = {
            status: data.status,
            message: data.message,
            progress: data.progress,
            lastUpdated: new Date()
          };
          
          setBuildStatus(status);
          
          if (onPreviewStatusChange) {
            onPreviewStatusChange(status);
          }
        }
      });

      socket.on('chat-generation-complete', (data: WebSocketEvents['chat-generation-complete']) => {
        console.log('Chat generation complete:', data);
        if (onChatGenerationComplete && data.projectId === projectId) {
          onChatGenerationComplete(data.generatedFiles);
        }
      });

    } catch (error) {
      console.error('Failed to establish WebSocket connection:', error);
      connectingRef.current = false;
    }
  }, []);

  // Disconnect from WebSocket server
  const disconnect = useCallback(() => {
    connectingRef.current = false;
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    }
  }, []);

  // Join a project room
  const joinProject = useCallback((newProjectId: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('join-project', { projectId: newProjectId });
    }
  }, [isConnected]);

  // Leave a project room
  const leaveProject = useCallback((projectIdToLeave: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('leave-project', { projectId: projectIdToLeave });
    }
  }, [isConnected]);

  // Send build status update
  const updateBuildStatus = useCallback((status: BuildStatus) => {
    if (socketRef.current && isConnected && projectId) {
      socketRef.current.emit('build-status-update', {
        projectId,
        status: status.status,
        message: status.message,
        progress: status.progress,
        userId: '' // Will be filled by server
      });
    }
  }, [isConnected, projectId]);

  // Update project reference when projectId changes
  useEffect(() => {
    currentProjectRef.current = projectId;
  }, [projectId]);

  // Effect to handle connection lifecycle - connect only once
  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  // Effect to handle project changes - only rejoin if project changes
  useEffect(() => {
    if (socketRef.current && isConnected && projectId && currentProjectRef.current !== projectId) {
      currentProjectRef.current = projectId;
      joinProject(projectId);
    }
  }, [projectId, isConnected, joinProject]);

  return {
    isConnected,
    buildStatus,
    connect,
    disconnect,
    joinProject,
    leaveProject,
    updateBuildStatus,
    socket: socketRef.current
  };
}