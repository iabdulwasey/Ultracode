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

interface WebSocketCallbacks {
  onFilesUpdated?: (files: Array<{ path: string; content: string; type: string }>) => void;
  onPreviewStatusChange?: (status: BuildStatus) => void;
  onChatGenerationComplete?: (files: Array<{ path: string; content: string; type: string }>) => void;
}

class WebSocketService {
  private socket: Socket | null = null;
  private isConnecting = false;
  private isConnected = false;
  private currentProjectId: string | null = null;
  private callbacks = new Set<WebSocketCallbacks>();
  private projectSubscribers = new Map<string, number>(); // projectId -> subscriber count

  async connect(): Promise<void> {
    if (this.isConnecting || this.isConnected) {
      console.log('WebSocket already connecting or connected');
      return;
    }

    this.isConnecting = true;

    try {
      // Get current user session for authentication
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        console.warn('No authentication token available for WebSocket connection');
        this.isConnecting = false;
        return;
      }

      // Disconnect existing socket if any
      if (this.socket) {
        this.socket.disconnect();
        this.socket = null;
      }

      // Create socket connection
      const socket = io(import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3001', {
        transports: ['websocket', 'polling'],
        withCredentials: true,
        autoConnect: true,
        forceNew: true,
      });

      this.socket = socket;
      this.setupEventHandlers(socket, session.access_token);

    } catch (error) {
      console.error('Failed to establish WebSocket connection:', error);
      this.isConnecting = false;
    }
  }

  private setupEventHandlers(socket: Socket, token: string): void {
    // Handle connection events
    socket.on('connect', () => {
      console.log('WebSocket connected:', socket.id);
      this.isConnected = true;
      this.isConnecting = false;
      
      // Authenticate with the server
      socket.emit('authenticate', {
        token,
        projectId: this.currentProjectId
      });
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
      this.isConnected = false;
      this.isConnecting = false;
    });

    socket.on('authenticated', (data: { userId: string }) => {
      console.log('WebSocket authenticated for user:', data.userId);
      
      // Join project room if projectId is provided
      if (this.currentProjectId) {
        socket.emit('join-project', { projectId: this.currentProjectId });
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
      if (data.projectId === this.currentProjectId) {
        this.callbacks.forEach(callback => {
          if (callback.onFilesUpdated) {
            callback.onFilesUpdated(data.files);
          }
        });
      }
    });

    socket.on('preview-rebuild', (data: WebSocketEvents['preview-rebuild']) => {
      console.log('Preview status update:', data);
      if (data.projectId === this.currentProjectId) {
        const status: BuildStatus = {
          status: data.status,
          message: data.message,
          progress: data.progress,
          lastUpdated: new Date()
        };
        
        this.callbacks.forEach(callback => {
          if (callback.onPreviewStatusChange) {
            callback.onPreviewStatusChange(status);
          }
        });
      }
    });

    socket.on('build-status', (data: WebSocketEvents['build-status']) => {
      console.log('Build status update:', data);
      if (data.projectId === this.currentProjectId) {
        const status: BuildStatus = {
          status: data.status,
          message: data.message,
          progress: data.progress,
          lastUpdated: new Date()
        };
        
        this.callbacks.forEach(callback => {
          if (callback.onPreviewStatusChange) {
            callback.onPreviewStatusChange(status);
          }
        });
      }
    });

    socket.on('chat-generation-complete', (data: WebSocketEvents['chat-generation-complete']) => {
      console.log('Chat generation complete:', data);
      if (data.projectId === this.currentProjectId) {
        this.callbacks.forEach(callback => {
          if (callback.onChatGenerationComplete) {
            callback.onChatGenerationComplete(data.generatedFiles);
          }
        });
      }
    });
  }

  disconnect(): void {
    this.isConnecting = false;
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  joinProject(projectId: string): void {
    // Increment subscriber count for this project
    const currentCount = this.projectSubscribers.get(projectId) || 0;
    this.projectSubscribers.set(projectId, currentCount + 1);

    // Only send join message if this is the first subscriber for this project
    if (currentCount === 0) {
      // Leave current project first if exists and different
      if (this.currentProjectId && this.currentProjectId !== projectId && this.socket && this.isConnected) {
        this.socket.emit('leave-project', { projectId: this.currentProjectId });
      }

      this.currentProjectId = projectId;
      if (this.socket && this.isConnected) {
        this.socket.emit('join-project', { projectId });
        console.log(`Joined project room: ${projectId} (${currentCount + 1} subscribers)`);
      }
    } else {
      console.log(`Already in project room: ${projectId} (${currentCount + 1} subscribers)`);
    }
  }

  leaveProject(projectId: string): void {
    const currentCount = this.projectSubscribers.get(projectId) || 0;
    
    if (currentCount <= 0) {
      return; // No subscribers for this project
    }

    // Decrement subscriber count
    const newCount = currentCount - 1;
    
    if (newCount === 0) {
      // Remove from map and actually leave the project
      this.projectSubscribers.delete(projectId);
      
      if (this.currentProjectId === projectId && this.socket && this.isConnected) {
        this.socket.emit('leave-project', { projectId });
        console.log(`Left project room: ${projectId} (0 subscribers)`);
      }
      
      if (this.currentProjectId === projectId) {
        this.currentProjectId = null;
      }
    } else {
      // Still have subscribers, just update count
      this.projectSubscribers.set(projectId, newCount);
      console.log(`Still in project room: ${projectId} (${newCount} subscribers)`);
    }
  }

  updateBuildStatus(status: BuildStatus): void {
    if (this.socket && this.isConnected && this.currentProjectId) {
      this.socket.emit('build-status-update', {
        projectId: this.currentProjectId,
        status: status.status,
        message: status.message,
        progress: status.progress,
        userId: '' // Will be filled by server
      });
    }
  }

  subscribe(callbacks: WebSocketCallbacks): () => void {
    this.callbacks.add(callbacks);
    
    // Return unsubscribe function
    return () => {
      this.callbacks.delete(callbacks);
    };
  }

  getConnectionStatus(): { isConnected: boolean; isConnecting: boolean } {
    return {
      isConnected: this.isConnected,
      isConnecting: this.isConnecting
    };
  }
}

// Singleton instance
const webSocketService = new WebSocketService();

export default webSocketService;