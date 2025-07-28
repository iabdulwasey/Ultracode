import { Client } from 'pg';
import { logger } from '../utils/logger.js';
import { getWebSocketService } from './websocket.service.js';
import { supabase } from '../config/supabase.js';

interface FileChangeNotification {
  project_id: string;
  file_path: string;
  action: 'INSERT' | 'UPDATE' | 'DELETE';
  user_id: string;
  timestamp: string;
}

interface ProjectUpdateNotification {
  project_id: string;
  action: 'files_bulk_update';
  user_id: string;
  timestamp: string;
}

export class DatabaseListenerService {
  private pgClient: Client;
  private isConnected = false;

  constructor() {
    const connectionString = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
    
    if (!connectionString) {
      throw new Error(
        'Database connection string not found. Please set DATABASE_URL or SUPABASE_DB_URL in your environment variables. ' +
        'Hot reload features require direct PostgreSQL access for LISTEN/NOTIFY functionality.'
      );
    }

    // Create PostgreSQL client for listening to database notifications
    this.pgClient = new Client({
      connectionString,
      // Additional connection options for better reliability
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      keepAlive: true,
      keepAliveInitialDelayMillis: 10000,
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    // Handle connection events
    this.pgClient.on('connect', () => {
      logger.info('Database listener connected');
      this.isConnected = true;
    });

    this.pgClient.on('error', (error) => {
      logger.error('Database listener error:', error);
      this.isConnected = false;
      this.reconnect();
    });

    this.pgClient.on('end', () => {
      logger.info('Database listener disconnected');
      this.isConnected = false;
      this.reconnect();
    });

    // Handle database notifications
    this.pgClient.on('notification', async (msg) => {
      try {
        if (msg.channel === 'file_change') {
          await this.handleFileChange(JSON.parse(msg.payload || '{}'));
        } else if (msg.channel === 'project_update') {
          await this.handleProjectUpdate(JSON.parse(msg.payload || '{}'));
        }
      } catch (error) {
        logger.error('Error handling database notification:', { 
          channel: msg.channel, 
          payload: msg.payload, 
          error 
        });
      }
    });
  }

  private async handleFileChange(notification: FileChangeNotification) {
    logger.info('File change notification received', notification);

    try {
      const webSocketService = getWebSocketService();

      if (notification.action === 'DELETE') {
        // Handle file deletion - notify clients
        webSocketService.broadcastToProject(notification.project_id, 'files-updated', {
          projectId: notification.project_id,
          files: [], // Empty array indicates a file was deleted
          userId: notification.user_id
        });
      } else {
        // For INSERT/UPDATE, fetch the updated files and broadcast
        const { data: files, error } = await supabase
          .from('project_files')
          .select('path, content, type')
          .eq('project_id', notification.project_id)
          .order('path');

        if (error) {
          logger.error('Error fetching updated files:', error);
          return;
        }

        // Broadcast updated files to all connected clients for this project
        webSocketService.broadcastFileUpdate(
          notification.project_id,
          files || [],
          notification.user_id
        );

        // Also trigger preview rebuild
        webSocketService.broadcastPreviewStatus(
          notification.project_id,
          'building',
          notification.user_id,
          'Files updated, rebuilding preview...'
        );
      }
    } catch (error) {
      logger.error('Error handling file change notification:', error);
    }
  }

  private async handleProjectUpdate(notification: ProjectUpdateNotification) {
    logger.info('Project update notification received', notification);

    try {
      const webSocketService = getWebSocketService();

      // Fetch all project files for bulk update
      const { data: files, error } = await supabase
        .from('project_files')
        .select('path, content, type')
        .eq('project_id', notification.project_id)
        .order('path');

      if (error) {
        logger.error('Error fetching project files for bulk update:', error);
        return;
      }

      // Broadcast all files to connected clients
      webSocketService.broadcastFileUpdate(
        notification.project_id,
        files || [],
        notification.user_id
      );

      // Trigger preview rebuild
      webSocketService.broadcastPreviewStatus(
        notification.project_id,
        'building',
        notification.user_id,
        'Project updated, rebuilding preview...'
      );
    } catch (error) {
      logger.error('Error handling project update notification:', error);
    }
  }

  public async connect(): Promise<void> {
    try {
      await this.pgClient.connect();
      
      // Subscribe to database notifications
      await this.pgClient.query('LISTEN file_change');
      await this.pgClient.query('LISTEN project_update');
      
      logger.info('Database listener started and subscribed to notifications');
    } catch (error) {
      logger.error('Failed to connect database listener:', error);
      throw error;
    }
  }

  private async reconnect(): Promise<void> {
    if (this.isConnected) return;

    logger.info('Attempting to reconnect database listener...');
    
    try {
      // Wait a bit before reconnecting
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Create new client instance
      this.pgClient = new Client({
        connectionString: process.env.DATABASE_URL || process.env.SUPABASE_DB_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        keepAlive: true,
        keepAliveInitialDelayMillis: 10000,
      });

      this.setupEventHandlers();
      await this.connect();
      
      logger.info('Database listener reconnected successfully');
    } catch (error) {
      logger.error('Failed to reconnect database listener:', error);
      // Try again after a longer delay
      setTimeout(() => this.reconnect(), 30000);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      if (this.isConnected) {
        await this.pgClient.end();
        logger.info('Database listener disconnected gracefully');
      }
    } catch (error) {
      logger.error('Error disconnecting database listener:', error);
    }
  }

  public isListening(): boolean {
    return this.isConnected;
  }
}

// Singleton instance
let databaseListenerService: DatabaseListenerService | null = null;

export function initializeDatabaseListener(): DatabaseListenerService {
  if (!databaseListenerService) {
    databaseListenerService = new DatabaseListenerService();
  }
  return databaseListenerService;
}

export function getDatabaseListenerService(): DatabaseListenerService {
  if (!databaseListenerService) {
    throw new Error('Database listener service not initialized. Call initializeDatabaseListener first.');
  }
  return databaseListenerService;
}