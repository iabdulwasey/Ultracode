import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { logger } from '../utils/logger.js';
import { supabase } from '../config/supabase.js';

// WebSocket event interfaces
export interface WebSocketEvents {
  // File-related events
  'files-updated': {
    projectId: string;
    files: Array<{ path: string; content: string; type: string }>;
    userId: string;
  };
  
  // Preview-related events
  'preview-rebuild': {
    projectId: string;
    status: 'building' | 'ready' | 'error';
    message?: string;
    progress?: number;
    userId: string;
  };
  
  // IDE-related events
  'ide-file-change': {
    projectId: string;
    filePath: string;
    content: string;
    userId: string;
  };
  
  // Chat-related events
  'chat-generation-complete': {
    projectId: string;
    generatedFiles: Array<{ path: string; content: string; type: string }>;
    userId: string;
  };
  
  // Build status events
  'build-status': {
    projectId: string;
    status: 'idle' | 'building' | 'ready' | 'error';
    message?: string;
    progress?: number;
    userId: string;
  };
  
  // Connection events
  'join-project': {
    projectId: string;
    userId: string;
  };
  
  'leave-project': {
    projectId: string;
    userId: string;
  };
}

export class WebSocketService {
  private io: SocketIOServer;
  private connectedUsers = new Map<string, Set<string>>(); // projectId -> Set of socketIds
  private userSockets = new Map<string, { socket: Socket; userId: string; projectId?: string }>(); // socketId -> socket info

  constructor(httpServer: HTTPServer) {
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
      },
      transports: ['websocket', 'polling'],
      // Increase connection limits
      maxHttpBufferSize: 1e6,
      pingTimeout: 60000,
      pingInterval: 25000
    });

    this.setupEventHandlers();
    logger.info('WebSocket service initialized');
  }

  private setupEventHandlers() {
    this.io.on('connection', (socket: Socket) => {
      logger.info('New WebSocket connection', { socketId: socket.id });

      // Handle user authentication and project joining
      socket.on('authenticate', async (data: { token: string; projectId?: string }) => {
        try {
          // Verify user with Supabase
          const { data: { user }, error } = await supabase.auth.getUser(data.token);
          
          if (error || !user) {
            logger.warn('WebSocket authentication failed', { socketId: socket.id, error });
            socket.emit('auth-error', { message: 'Authentication failed' });
            return;
          }

          // Store user info
          this.userSockets.set(socket.id, {
            socket,
            userId: user.id,
            projectId: data.projectId
          });

          // Join project room if specified
          if (data.projectId) {
            await this.joinProject(socket, data.projectId, user.id);
          }

          socket.emit('authenticated', { userId: user.id });
          logger.info('WebSocket user authenticated', { 
            socketId: socket.id, 
            userId: user.id, 
            projectId: data.projectId 
          });

        } catch (error) {
          logger.error('WebSocket authentication error', { socketId: socket.id, error });
          socket.emit('auth-error', { message: 'Authentication error' });
        }
      });

      // Handle project joining
      socket.on('join-project', async (data: { projectId: string }) => {
        const userInfo = this.userSockets.get(socket.id);
        if (!userInfo) {
          socket.emit('error', { message: 'Not authenticated' });
          return;
        }

        await this.joinProject(socket, data.projectId, userInfo.userId);
      });

      // Handle project leaving
      socket.on('leave-project', (data: { projectId: string }) => {
        this.leaveProject(socket, data.projectId);
      });

      // Handle client-side events that need to be broadcasted
      socket.on('build-status-update', (data: WebSocketEvents['build-status']) => {
        this.broadcastToProject(data.projectId, 'build-status', data);
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        this.handleDisconnection(socket);
      });
    });
  }

  private async joinProject(socket: Socket, projectId: string, userId: string) {
    try {
      // Verify user has access to project
      const { data: project, error } = await supabase
        .from('projects')
        .select('id, user_id, visibility')
        .eq('id', projectId)
        .single();

      if (error || !project) {
        socket.emit('error', { message: 'Project not found' });
        return;
      }

      // Check access permissions
      if (project.visibility === 'private' && project.user_id !== userId) {
        socket.emit('error', { message: 'Access denied' });
        return;
      }

      // Join socket room
      socket.join(`project:${projectId}`);
      
      // Track connection
      if (!this.connectedUsers.has(projectId)) {
        this.connectedUsers.set(projectId, new Set());
      }
      this.connectedUsers.get(projectId)!.add(socket.id);

      // Update user info
      const userInfo = this.userSockets.get(socket.id);
      if (userInfo) {
        userInfo.projectId = projectId;
      }

      socket.emit('joined-project', { projectId });
      logger.info('User joined project', { socketId: socket.id, userId, projectId });

    } catch (error) {
      logger.error('Error joining project', { socketId: socket.id, projectId, error });
      socket.emit('error', { message: 'Failed to join project' });
    }
  }

  private leaveProject(socket: Socket, projectId: string) {
    socket.leave(`project:${projectId}`);
    
    const projectUsers = this.connectedUsers.get(projectId);
    if (projectUsers) {
      projectUsers.delete(socket.id);
      if (projectUsers.size === 0) {
        this.connectedUsers.delete(projectId);
      }
    }

    socket.emit('left-project', { projectId });
    logger.info('User left project', { socketId: socket.id, projectId });
  }

  private handleDisconnection(socket: Socket) {
    const userInfo = this.userSockets.get(socket.id);
    
    if (userInfo?.projectId) {
      this.leaveProject(socket, userInfo.projectId);
    }

    this.userSockets.delete(socket.id);
    logger.info('WebSocket disconnected', { socketId: socket.id });
  }

  // Public methods for broadcasting events

  /**
   * Broadcast event to all users in a project
   */
  public broadcastToProject<T extends keyof WebSocketEvents>(
    projectId: string,
    event: T,
    data: WebSocketEvents[T]
  ) {
    this.io.to(`project:${projectId}`).emit(event, data);
    logger.debug('Broadcasted to project', { projectId, event, dataKeys: Object.keys(data) });
  }

  /**
   * Send event to specific user
   */
  public sendToUser<T extends keyof WebSocketEvents>(
    userId: string,
    event: T,
    data: WebSocketEvents[T]
  ) {
    // Find all sockets for this user
    for (const [socketId, userInfo] of this.userSockets.entries()) {
      if (userInfo.userId === userId) {
        userInfo.socket.emit(event, data);
      }
    }
    logger.debug('Sent to user', { userId, event, dataKeys: Object.keys(data) });
  }

  /**
   * Get connected users count for a project
   */
  public getProjectUserCount(projectId: string): number {
    return this.connectedUsers.get(projectId)?.size || 0;
  }

  /**
   * Get all connected projects
   */
  public getConnectedProjects(): string[] {
    return Array.from(this.connectedUsers.keys());
  }

  /**
   * Broadcast file updates to project
   */
  public broadcastFileUpdate(
    projectId: string,
    files: Array<{ path: string; content: string; type: string }>,
    userId: string
  ) {
    this.broadcastToProject(projectId, 'files-updated', {
      projectId,
      files,
      userId
    });
  }

  /**
   * Broadcast preview rebuild status
   */
  public broadcastPreviewStatus(
    projectId: string,
    status: 'building' | 'ready' | 'error',
    userId: string,
    message?: string,
    progress?: number
  ) {
    this.broadcastToProject(projectId, 'preview-rebuild', {
      projectId,
      status,
      message,
      progress,
      userId
    });
  }

  /**
   * Broadcast chat generation completion
   */
  public broadcastChatGeneration(
    projectId: string,
    generatedFiles: Array<{ path: string; content: string; type: string }>,
    userId: string
  ) {
    this.broadcastToProject(projectId, 'chat-generation-complete', {
      projectId,
      generatedFiles,
      userId
    });
  }
}

// Singleton instance
let webSocketService: WebSocketService | null = null;

export function initializeWebSocket(httpServer: HTTPServer): WebSocketService {
  if (!webSocketService) {
    webSocketService = new WebSocketService(httpServer);
  }
  return webSocketService;
}

export function getWebSocketService(): WebSocketService {
  if (!webSocketService) {
    throw new Error('WebSocket service not initialized. Call initializeWebSocket first.');
  }
  return webSocketService;
}