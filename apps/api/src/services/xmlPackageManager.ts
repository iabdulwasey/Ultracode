/**
 * XML Package Manager - Real-time package detection during AI streaming
 * Based on Open-Lovable's XML package management system
 * 
 * This service detects <package>package-name</package> declarations during
 * AI code generation streaming and triggers real-time package installation.
 */

import { logger } from '../utils/logger.js';
import { localPreviewService } from './localPreview.service.js';
import { getWebSocketService } from '../services/websocket.service.js';

export interface PackageDetectionResult {
  packageName: string;
  detectedAt: number;
  context: string; // Surrounding text context where package was found
  confidence: number;
}

export interface PackageInstallationStatus {
  packageName: string;
  status: 'pending' | 'installing' | 'success' | 'failed';
  message: string;
  startTime: number;
  endTime?: number;
  error?: string;
}

export class XmlPackageManager {
  private detectedPackages = new Map<string, PackageDetectionResult>();
  private installationQueue = new Set<string>();
  private installationStatus = new Map<string, PackageInstallationStatus>();
  private streamingBuffers = new Map<string, string>(); // projectId -> buffer

  /**
   * Process streaming AI response chunk for package detection
   * Based on Open-Lovable's real-time detection (Lines 1298-1320)
   */
  async processStreamChunk(
    projectId: string,
    chunk: string,
    userId: string
  ): Promise<PackageDetectionResult[]> {
    try {
      // Accumulate chunks in buffer for cross-boundary package tags
      const currentBuffer = this.streamingBuffers.get(projectId) || '';
      const combinedBuffer = currentBuffer + chunk;
      this.streamingBuffers.set(projectId, combinedBuffer);

      // Keep only last 1000 chars to prevent memory bloat
      if (combinedBuffer.length > 1000) {
        const truncatedBuffer = combinedBuffer.slice(-1000);
        this.streamingBuffers.set(projectId, truncatedBuffer);
      }

      // Detect packages in the combined buffer
      const detectedPackages = this.detectPackagesInText(combinedBuffer, projectId);
      
      // Process new detections
      const newDetections: PackageDetectionResult[] = [];
      for (const detection of detectedPackages) {
        const key = `${projectId}:${detection.packageName}`;
        
        if (!this.detectedPackages.has(key)) {
          this.detectedPackages.set(key, detection);
          newDetections.push(detection);
          
          // Trigger immediate installation
          await this.triggerPackageInstallation(projectId, detection, userId);
        }
      }

      return newDetections;

    } catch (error) {
      logger.error('Failed to process stream chunk for package detection', {
        projectId,
        error: error instanceof Error ? error.message : String(error)
      });
      return [];
    }
  }

  /**
   * Detect package declarations in text using multiple patterns
   * Based on Open-Lovable's pattern matching (Lines 1300-1316)
   */
  private detectPackagesInText(text: string, projectId: string): PackageDetectionResult[] {
    const detections: PackageDetectionResult[] = [];
    const now = Date.now();

    // Pattern 1: <package>package-name</package>
    const singlePackageRegex = /<package>([^<]+)<\/package>/g;
    let match;
    
    while ((match = singlePackageRegex.exec(text)) !== null) {
      const packageName = match[1].trim();
      
      if (this.isValidPackageName(packageName)) {
        const context = this.extractContext(text, match.index, 100);
        detections.push({
          packageName,
          detectedAt: now,
          context,
          confidence: 0.95
        });
      }
    }

    // Pattern 2: <packages>...multiple packages...</packages>
    const multiPackageRegex = /<packages>([\s\S]*?)<\/packages>/g;
    while ((match = multiPackageRegex.exec(text)) !== null) {
      const packagesContent = match[1].trim();
      const packagesList = packagesContent.split(/[\n,\s]+/)
        .map(pkg => pkg.trim())
        .filter(pkg => pkg.length > 0 && this.isValidPackageName(pkg));
      
      for (const packageName of packagesList) {
        const context = this.extractContext(text, match.index, 100);
        detections.push({
          packageName,
          detectedAt: now,
          context,
          confidence: 0.90
        });
      }
    }

    // Pattern 3: Import-based detection (for fallback)
    const importRegex = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))*\s+from\s+)?['"]([^'"]+)['"]/g;
    while ((match = importRegex.exec(text)) !== null) {
      const importPath = match[1];
      
      // Skip relative imports and built-ins
      if (!importPath.startsWith('.') && !importPath.startsWith('/') && 
          !this.isBuiltinModule(importPath)) {
        
        const packageName = this.extractPackageNameFromImport(importPath);
        if (packageName && this.isValidPackageName(packageName)) {
          const context = this.extractContext(text, match.index, 100);
          detections.push({
            packageName,
            detectedAt: now,
            context,
            confidence: 0.75 // Lower confidence for import-based detection
          });
        }
      }
    }

    // Remove duplicates and return
    const uniqueDetections = detections.filter((detection, index, array) => 
      array.findIndex(d => d.packageName === detection.packageName) === index
    );

    if (uniqueDetections.length > 0) {
      logger.info('Detected packages in streaming content', {
        projectId,
        packages: uniqueDetections.map(d => d.packageName),
        totalDetections: detections.length,
        uniqueDetections: uniqueDetections.length
      });
    }

    return uniqueDetections;
  }

  /**
   * Trigger package installation with streaming updates
   * Based on Open-Lovable's installation flow (Lines 146-251)
   */
  private async triggerPackageInstallation(
    projectId: string,
    detection: PackageDetectionResult,
    userId: string
  ): Promise<void> {
    const { packageName } = detection;
    
    // Check if already queued or installing
    if (this.installationQueue.has(packageName) || 
        this.installationStatus.get(packageName)?.status === 'installing') {
      return;
    }

    // Add to queue
    this.installationQueue.add(packageName);
    
    // Update status
    const status: PackageInstallationStatus = {
      packageName,
      status: 'pending',
      message: `Package ${packageName} detected, queueing installation...`,
      startTime: Date.now()
    };
    this.installationStatus.set(packageName, status);

    // Broadcast detection to frontend
    await this.broadcastPackageUpdate(projectId, status);

    // Start installation process
    this.performPackageInstallation(projectId, packageName, userId);
  }

  /**
   * Perform actual package installation
   * Based on Open-Lovable's installation logic (Lines 192-245)
   */
  private async performPackageInstallation(
    projectId: string,
    packageName: string,
    userId: string
  ): Promise<void> {
    try {
      // Update status to installing
      const status = this.installationStatus.get(packageName)!;
      status.status = 'installing';
      status.message = `Installing ${packageName}...`;
      await this.broadcastPackageUpdate(projectId, status);

      // Check if package is already installed
      const isInstalled = await this.isPackageInstalled(projectId, packageName);
      if (isInstalled) {
        status.status = 'success';
        status.message = `Package ${packageName} is already installed`;
        status.endTime = Date.now();
        await this.broadcastPackageUpdate(projectId, status);
        return;
      }

      // Install package using local preview service
      const installResult = await localPreviewService.installPackage(projectId, packageName);
      
      if (installResult.success) {
        status.status = 'success';
        status.message = `Successfully installed ${packageName}`;
        status.endTime = Date.now();
        
        logger.info('Package installation completed', {
          projectId,
          packageName,
          duration: status.endTime - status.startTime
        });
      } else {
        throw new Error(installResult.error || 'Installation failed');
      }

      await this.broadcastPackageUpdate(projectId, status);

    } catch (error) {
      const status = this.installationStatus.get(packageName)!;
      status.status = 'failed';
      status.message = `Failed to install ${packageName}`;
      status.error = error instanceof Error ? error.message : String(error);
      status.endTime = Date.now();

      await this.broadcastPackageUpdate(projectId, status);

      logger.error('Package installation failed', {
        projectId,
        packageName,
        error: status.error
      });
    } finally {
      // Remove from queue
      this.installationQueue.delete(packageName);
    }
  }

  /**
   * Check if package is already installed in project
   */
  private async isPackageInstalled(projectId: string, packageName: string): Promise<boolean> {
    try {
      const packageJsonContent = await localPreviewService.readFile(projectId, 'package.json');
      if (!packageJsonContent) {
        return false;
      }

      const packageJson = JSON.parse(packageJsonContent);
      const allDeps = {
        ...packageJson.dependencies || {},
        ...packageJson.devDependencies || {}
      };

      return packageName in allDeps;

    } catch (error) {
      logger.warn('Failed to check package installation status', {
        projectId,
        packageName,
        error: error instanceof Error ? error.message : String(error)
      });
      return false;
    }
  }

  /**
   * Broadcast package installation updates via WebSocket
   */
  private async broadcastPackageUpdate(
    projectId: string,
    status: PackageInstallationStatus
  ): Promise<void> {
    try {
      const webSocketService = getWebSocketService();
      await webSocketService.broadcastToProject(projectId, {
        event: 'package-install-update',
        data: {
          packageName: status.packageName,
          status: status.status,
          message: status.message,
          error: status.error,
          duration: status.endTime ? status.endTime - status.startTime : undefined
        }
      });
    } catch (error) {
      logger.warn('Failed to broadcast package update', {
        projectId,
        packageName: status.packageName,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  /**
   * Validate package name format
   * Based on npm package naming rules
   */
  private isValidPackageName(packageName: string): boolean {
    if (!packageName || packageName.trim().length === 0) return false;
    
    // Basic npm package name validation
    const npmPackageRegex = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/i;
    const isValid = npmPackageRegex.test(packageName.trim());
    
    // Exclude common non-packages
    const excludedPatterns = [
      'react', 'react-dom', // Already included in base template
      'typescript', '@types/react', '@types/react-dom', // Already included
      'vite', '@vitejs/plugin-react-swc', // Build tools already included
      'tailwindcss', 'autoprefixer', 'postcss' // Styling already included
    ];
    
    return isValid && !excludedPatterns.includes(packageName.toLowerCase());
  }

  /**
   * Check if import is a built-in Node.js module
   */
  private isBuiltinModule(moduleName: string): boolean {
    const builtins = [
      'fs', 'path', 'http', 'https', 'crypto', 'stream', 'util', 'os', 
      'url', 'querystring', 'child_process', 'events', 'buffer'
    ];
    return builtins.includes(moduleName);
  }

  /**
   * Extract package name from import path (handle scoped packages)
   */
  private extractPackageNameFromImport(importPath: string): string {
    const parts = importPath.split('/');
    
    if (importPath.startsWith('@')) {
      // Scoped package: @scope/package or @scope/package/subpath
      return parts.slice(0, 2).join('/');
    } else {
      // Regular package: package or package/subpath
      return parts[0];
    }
  }

  /**
   * Extract surrounding context for package detection
   */
  private extractContext(text: string, index: number, length: number): string {
    const start = Math.max(0, index - length / 2);
    const end = Math.min(text.length, index + length / 2);
    return text.substring(start, end);
  }

  /**
   * Get current installation status for a project
   */
  getInstallationStatus(projectId: string): PackageInstallationStatus[] {
    const projectPackages: PackageInstallationStatus[] = [];
    
    for (const [packageName, status] of this.installationStatus) {
      // In a real implementation, we'd track which packages belong to which project
      // For now, return all statuses (could be filtered by project)
      projectPackages.push(status);
    }
    
    return projectPackages;
  }

  /**
   * Clear streaming buffer for a project (call when streaming ends)
   */
  clearStreamBuffer(projectId: string): void {
    this.streamingBuffers.delete(projectId);
    
    // Also cleanup old detection records (keep last hour)
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    for (const [key, detection] of this.detectedPackages) {
      if (detection.detectedAt < oneHourAgo) {
        this.detectedPackages.delete(key);
      }
    }
  }

  /**
   * Get package detection statistics
   */
  getDetectionStats(): {
    totalDetections: number;
    uniquePackages: number;
    averageConfidence: number;
    installationSuccessRate: number;
  } {
    const detections = Array.from(this.detectedPackages.values());
    const statuses = Array.from(this.installationStatus.values());
    
    const successfulInstalls = statuses.filter(s => s.status === 'success').length;
    const totalInstalls = statuses.length;
    
    return {
      totalDetections: detections.length,
      uniquePackages: new Set(detections.map(d => d.packageName)).size,
      averageConfidence: detections.length > 0 
        ? detections.reduce((sum, d) => sum + d.confidence, 0) / detections.length 
        : 0,
      installationSuccessRate: totalInstalls > 0 ? successfulInstalls / totalInstalls : 0
    };
  }
}

// Export singleton instance
export const xmlPackageManager = new XmlPackageManager();