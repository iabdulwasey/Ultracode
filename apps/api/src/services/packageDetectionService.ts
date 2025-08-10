/**
 * Package Detection Service - Intelligent package detection during AI streaming
 * Based on Open-Lovable's package detection and streaming integration
 * 
 * This service coordinates between XML package detection and streaming installation,
 * providing intelligent deduplication and context-aware package management.
 */

import { logger } from '../utils/logger.js';
import { xmlPackageManager } from './xmlPackageManager.js';
import { streamingPackageInstaller } from './streamingPackageInstaller.js';
import { getWebSocketService } from '../services/websocket.service.js';

export interface PackageDetectionEvent {
  type: 'package-detected' | 'package-queued' | 'installation-started' | 'installation-progress' | 'installation-complete' | 'installation-failed';
  packageName: string;
  projectId: string;
  timestamp: number;
  metadata?: any;
}

export interface DetectionSession {
  projectId: string;
  userId: string;
  sessionId: string;
  startTime: number;
  packagesDetected: Set<string>;
  packagesInstalled: Set<string>;
  packagesFailed: Set<string>;
}

export class PackageDetectionService {
  private activeSessions = new Map<string, DetectionSession>();
  private detectionHistory: PackageDetectionEvent[] = [];
  private maxHistorySize = 1000;

  /**
   * Initialize a new package detection session for AI streaming
   */
  async initializeDetectionSession(
    projectId: string,
    userId: string,
    sessionId?: string
  ): Promise<DetectionSession> {
    const detectionSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    const session: DetectionSession = {
      projectId,
      userId,
      sessionId: detectionSessionId,
      startTime: Date.now(),
      packagesDetected: new Set(),
      packagesInstalled: new Set(),
      packagesFailed: new Set()
    };

    this.activeSessions.set(detectionSessionId, session);
    
    logger.info('Package detection session initialized', {
      sessionId: detectionSessionId,
      projectId,
      userId
    });

    return session;
  }

  /**
   * Process AI streaming chunk for package detection
   * Integrates XML package manager and streaming installer
   */
  async processAIStreamChunk(
    sessionId: string,
    chunk: string
  ): Promise<PackageDetectionEvent[]> {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      logger.warn('Package detection attempted for unknown session', { sessionId });
      return [];
    }

    const events: PackageDetectionEvent[] = [];

    try {
      // Use XML package manager to detect packages in chunk
      const detectedPackages = await xmlPackageManager.processStreamChunk(
        session.projectId,
        chunk,
        session.userId
      );

      // Process each detected package
      for (const detection of detectedPackages) {
        const { packageName } = detection;
        
        // Skip if already processed in this session
        if (session.packagesDetected.has(packageName)) {
          continue;
        }

        // Add to session tracking
        session.packagesDetected.add(packageName);

        // Create detection event
        const detectionEvent: PackageDetectionEvent = {
          type: 'package-detected',
          packageName,
          projectId: session.projectId,
          timestamp: Date.now(),
          metadata: {
            confidence: detection.confidence,
            context: detection.context,
            sessionId
          }
        };

        events.push(detectionEvent);
        this.addToHistory(detectionEvent);

        // Broadcast detection to frontend
        await this.broadcastDetectionEvent(session.projectId, detectionEvent);

        // Queue for installation
        await this.queuePackageInstallation(session, packageName);
      }

      return events;

    } catch (error) {
      logger.error('Failed to process AI stream chunk for package detection', {
        sessionId,
        error: error instanceof Error ? error.message : String(error)
      });
      return [];
    }
  }

  /**
   * Queue package for installation with session tracking
   */
  private async queuePackageInstallation(
    session: DetectionSession,
    packageName: string
  ): Promise<void> {
    try {
      // Create queued event
      const queuedEvent: PackageDetectionEvent = {
        type: 'package-queued',
        packageName,
        projectId: session.projectId,
        timestamp: Date.now(),
        metadata: { sessionId: session.sessionId }
      };

      this.addToHistory(queuedEvent);
      await this.broadcastDetectionEvent(session.projectId, queuedEvent);

      // Queue with streaming installer
      const installationProgress = await streamingPackageInstaller.queueInstallation(
        session.projectId,
        packageName,
        session.userId
      );

      // Create installation started event
      const startedEvent: PackageDetectionEvent = {
        type: 'installation-started',
        packageName,
        projectId: session.projectId,
        timestamp: Date.now(),
        metadata: {
          sessionId: session.sessionId,
          installationProgress
        }
      };

      this.addToHistory(startedEvent);
      await this.broadcastDetectionEvent(session.projectId, startedEvent);

      // Monitor installation progress
      this.monitorInstallationProgress(session, packageName);

    } catch (error) {
      logger.error('Failed to queue package installation', {
        sessionId: session.sessionId,
        packageName,
        error: error instanceof Error ? error.message : String(error)
      });

      // Add to failed packages
      session.packagesFailed.add(packageName);

      // Create failed event
      const failedEvent: PackageDetectionEvent = {
        type: 'installation-failed',
        packageName,
        projectId: session.projectId,
        timestamp: Date.now(),
        metadata: {
          sessionId: session.sessionId,
          error: error instanceof Error ? error.message : String(error)
        }
      };

      this.addToHistory(failedEvent);
      await this.broadcastDetectionEvent(session.projectId, failedEvent);
    }
  }

  /**
   * Monitor installation progress for a package
   */
  private monitorInstallationProgress(
    session: DetectionSession,
    packageName: string
  ): void {
    const checkProgress = () => {
      const progress = streamingPackageInstaller.getInstallationProgress(
        session.projectId,
        packageName
      );

      if (!progress) {
        // Installation not found, stop monitoring
        return;
      }

      if (progress.stage === 'complete') {
        session.packagesInstalled.add(packageName);

        const completeEvent: PackageDetectionEvent = {
          type: 'installation-complete',
          packageName,
          projectId: session.projectId,
          timestamp: Date.now(),
          metadata: {
            sessionId: session.sessionId,
            installTime: Date.now() - progress.startTime,
            logs: progress.logs
          }
        };

        this.addToHistory(completeEvent);
        this.broadcastDetectionEvent(session.projectId, completeEvent);
        return;
      }

      if (progress.stage === 'failed') {
        session.packagesFailed.add(packageName);

        const failedEvent: PackageDetectionEvent = {
          type: 'installation-failed',
          packageName,
          projectId: session.projectId,
          timestamp: Date.now(),
          metadata: {
            sessionId: session.sessionId,
            error: progress.error,
            logs: progress.logs
          }
        };

        this.addToHistory(failedEvent);
        this.broadcastDetectionEvent(session.projectId, failedEvent);
        return;
      }

      // Still in progress, create progress event
      const progressEvent: PackageDetectionEvent = {
        type: 'installation-progress',
        packageName,
        projectId: session.projectId,
        timestamp: Date.now(),
        metadata: {
          sessionId: session.sessionId,
          stage: progress.stage,
          progress: progress.progress,
          message: progress.message
        }
      };

      this.addToHistory(progressEvent);
      this.broadcastDetectionEvent(session.projectId, progressEvent);

      // Continue monitoring
      setTimeout(checkProgress, 2000); // Check every 2 seconds
    };

    // Start monitoring after a short delay
    setTimeout(checkProgress, 1000);
  }

  /**
   * Complete a detection session
   */
  async completeDetectionSession(sessionId: string): Promise<{
    packagesDetected: number;
    packagesInstalled: number;
    packagesFailed: number;
    duration: number;
  }> {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error(`Detection session not found: ${sessionId}`);
    }

    // Clear XML package manager buffer
    xmlPackageManager.clearStreamBuffer(session.projectId);

    const summary = {
      packagesDetected: session.packagesDetected.size,
      packagesInstalled: session.packagesInstalled.size,
      packagesFailed: session.packagesFailed.size,
      duration: Date.now() - session.startTime
    };

    // Remove session
    this.activeSessions.delete(sessionId);

    logger.info('Package detection session completed', {
      sessionId,
      projectId: session.projectId,
      ...summary
    });

    return summary;
  }

  /**
   * Get detection session status
   */
  getSessionStatus(sessionId: string): DetectionSession | null {
    return this.activeSessions.get(sessionId) || null;
  }

  /**
   * Get all active sessions for a project
   */
  getProjectSessions(projectId: string): DetectionSession[] {
    return Array.from(this.activeSessions.values())
      .filter(session => session.projectId === projectId);
  }

  /**
   * Get package detection history for a project
   */
  getProjectDetectionHistory(
    projectId: string,
    limit: number = 100
  ): PackageDetectionEvent[] {
    return this.detectionHistory
      .filter(event => event.projectId === projectId)
      .slice(-limit)
      .reverse(); // Most recent first
  }

  /**
   * Get currently detected packages for a project
   */
  async getCurrentProjectPackages(projectId: string): Promise<{
    detected: string[];
    installing: string[];
    installed: string[];
    failed: string[];
  }> {
    const activeSessions = this.getProjectSessions(projectId);
    const result = {
      detected: new Set<string>(),
      installing: new Set<string>(),
      installed: new Set<string>(),
      failed: new Set<string>()
    };

    // Collect from all active sessions
    for (const session of activeSessions) {
      session.packagesDetected.forEach(pkg => result.detected.add(pkg));
      session.packagesInstalled.forEach(pkg => result.installed.add(pkg));
      session.packagesFailed.forEach(pkg => result.failed.add(pkg));
    }

    // Get currently installing packages
    const activeInstallations = streamingPackageInstaller.getActiveInstallations(projectId);
    for (const installation of activeInstallations) {
      if (installation.stage !== 'complete' && installation.stage !== 'failed') {
        result.installing.add(installation.packageName);
      }
    }

    return {
      detected: Array.from(result.detected),
      installing: Array.from(result.installing),
      installed: Array.from(result.installed),
      failed: Array.from(result.failed)
    };
  }

  /**
   * Broadcast detection event to frontend
   */
  private async broadcastDetectionEvent(
    projectId: string,
    event: PackageDetectionEvent
  ): Promise<void> {
    try {
      const webSocketService = getWebSocketService();
      await webSocketService.broadcastToProject(projectId, {
        event: 'package-detection-event',
        data: event
      });
    } catch (error) {
      logger.warn('Failed to broadcast detection event', {
        projectId,
        eventType: event.type,
        packageName: event.packageName,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  /**
   * Add event to history with size management
   */
  private addToHistory(event: PackageDetectionEvent): void {
    this.detectionHistory.push(event);
    
    // Maintain history size
    if (this.detectionHistory.length > this.maxHistorySize) {
      this.detectionHistory = this.detectionHistory.slice(-this.maxHistorySize);
    }
  }

  /**
   * Cleanup inactive sessions
   */
  cleanupInactiveSessions(): void {
    const now = Date.now();
    const inactiveThreshold = 30 * 60 * 1000; // 30 minutes

    for (const [sessionId, session] of this.activeSessions) {
      if (now - session.startTime > inactiveThreshold) {
        this.activeSessions.delete(sessionId);
        xmlPackageManager.clearStreamBuffer(session.projectId);
        
        logger.debug('Cleaned up inactive package detection session', {
          sessionId,
          projectId: session.projectId,
          duration: now - session.startTime
        });
      }
    }
  }

  /**
   * Get service statistics
   */
  getServiceStats(): {
    activeSessions: number;
    totalDetectionEvents: number;
    packagesDetectedToday: number;
    packagesInstalledToday: number;
    averageInstallTime: number;
  } {
    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000);

    // Filter events from last 24 hours
    const recentEvents = this.detectionHistory.filter(
      event => event.timestamp >= oneDayAgo
    );

    const detectedToday = recentEvents.filter(
      event => event.type === 'package-detected'
    ).length;

    const installedToday = recentEvents.filter(
      event => event.type === 'installation-complete'
    );

    const avgInstallTime = installedToday.length > 0
      ? installedToday.reduce((sum, event) => 
          sum + (event.metadata?.installTime || 0), 0
        ) / installedToday.length
      : 0;

    return {
      activeSessions: this.activeSessions.size,
      totalDetectionEvents: this.detectionHistory.length,
      packagesDetectedToday: detectedToday,
      packagesInstalledToday: installedToday.length,
      averageInstallTime: avgInstallTime
    };
  }

  /**
   * Cancel package installation for a session
   */
  async cancelPackageInstallation(
    sessionId: string,
    packageName: string
  ): Promise<boolean> {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      return false;
    }

    const cancelled = await streamingPackageInstaller.cancelInstallation(
      session.projectId,
      packageName
    );

    if (cancelled) {
      session.packagesFailed.add(packageName);
      
      const cancelEvent: PackageDetectionEvent = {
        type: 'installation-failed',
        packageName,
        projectId: session.projectId,
        timestamp: Date.now(),
        metadata: {
          sessionId,
          error: 'Cancelled by user'
        }
      };

      this.addToHistory(cancelEvent);
      await this.broadcastDetectionEvent(session.projectId, cancelEvent);
    }

    return cancelled;
  }
}

// Export singleton instance
export const packageDetectionService = new PackageDetectionService();

// Cleanup inactive sessions every 10 minutes
setInterval(() => {
  packageDetectionService.cleanupInactiveSessions();
}, 10 * 60 * 1000);