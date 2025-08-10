/**
 * Package Install Status Component - Real-time package installation progress
 * Based on Open-Lovable's package installation UI
 * 
 * This component displays real-time package installation progress with animations,
 * progress bars, and detailed logging information.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { 
  Package, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Loader2,
  Terminal,
  Clock,
  Zap
} from 'lucide-react';

interface PackageInstallation {
  packageName: string;
  stage: 'queued' | 'resolving' | 'downloading' | 'installing' | 'configuring' | 'complete' | 'failed';
  progress: number;
  message: string;
  startTime: number;
  logs: string[];
  error?: string;
}

interface PackageDetectionEvent {
  type: 'package-detected' | 'package-queued' | 'installation-started' | 'installation-progress' | 'installation-complete' | 'installation-failed';
  packageName: string;
  projectId: string;
  timestamp: number;
  metadata?: any;
}

interface Props {
  projectId: string;
  className?: string;
  onPackageInstalled?: (packageName: string) => void;
  showMiniView?: boolean;
}

export const PackageInstallStatus: React.FC<Props> = ({
  projectId,
  className = '',
  onPackageInstalled,
  showMiniView = false
}) => {
  const [activeInstallations, setActiveInstallations] = useState<PackageInstallation[]>([]);
  const [recentDetections, setRecentDetections] = useState<PackageDetectionEvent[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [stats, setStats] = useState({
    packagesDetected: 0,
    packagesInstalled: 0,
    packagesFailed: 0
  });

  // Connect to WebSocket for real-time updates
  useEffect(() => {
    const connectWebSocket = () => {
      const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${wsProtocol}//${window.location.host}/ws`;
      const ws = new WebSocket(wsUrl);

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.projectId === projectId) {
            handleWebSocketMessage(data);
          }
        } catch (error) {
          console.warn('Failed to parse WebSocket message:', error);
        }
      };

      ws.onerror = (error) => {
        console.warn('WebSocket connection error:', error);
      };

      return ws;
    };

    const ws = connectWebSocket();
    return () => ws?.close();
  }, [projectId]);

  // Handle WebSocket messages
  const handleWebSocketMessage = useCallback((data: any) => {
    switch (data.event) {
      case 'package-detection-event':
        handlePackageDetectionEvent(data.data);
        break;
      case 'package-installation-progress':
        handleInstallationProgress(data.data);
        break;
      case 'package-install-update':
        handleInstallUpdate(data.data);
        break;
    }
  }, []);

  // Handle package detection events
  const handlePackageDetectionEvent = useCallback((event: PackageDetectionEvent) => {
    setRecentDetections(prev => {
      const updated = [event, ...prev.slice(0, 9)]; // Keep last 10 events
      return updated;
    });

    switch (event.type) {
      case 'package-detected':
        setStats(prev => ({ ...prev, packagesDetected: prev.packagesDetected + 1 }));
        toast.success(`📦 Detected package: ${event.packageName}`, { duration: 3000 });
        break;
      case 'installation-complete':
        setStats(prev => ({ ...prev, packagesInstalled: prev.packagesInstalled + 1 }));
        toast.success(`✅ Installed: ${event.packageName}`, { duration: 4000 });
        onPackageInstalled?.(event.packageName);
        break;
      case 'installation-failed':
        setStats(prev => ({ ...prev, packagesFailed: prev.packagesFailed + 1 }));
        toast.error(`❌ Failed to install: ${event.packageName}`, { duration: 5000 });
        break;
    }
  }, [onPackageInstalled]);

  // Handle installation progress updates
  const handleInstallationProgress = useCallback((data: any) => {
    setActiveInstallations(prev => {
      const existingIndex = prev.findIndex(inst => inst.packageName === data.packageName);
      
      const updatedInstallation: PackageInstallation = {
        packageName: data.packageName,
        stage: data.stage,
        progress: data.progress,
        message: data.message,
        startTime: data.startTime || Date.now(),
        logs: data.logs || [],
        error: data.error
      };

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = updatedInstallation;
        return updated;
      } else {
        return [updatedInstallation, ...prev];
      }
    });
  }, []);

  // Handle install update events
  const handleInstallUpdate = useCallback((data: any) => {
    const { packageName, status, message, error } = data;
    
    setActiveInstallations(prev => {
      const existingIndex = prev.findIndex(inst => inst.packageName === packageName);
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          stage: status === 'success' ? 'complete' : status === 'failed' ? 'failed' : updated[existingIndex].stage,
          message,
          error,
          progress: status === 'success' ? 100 : status === 'failed' ? 0 : updated[existingIndex].progress
        };
        return updated;
      }
      return prev;
    });
  }, []);

  // Get stage icon and color
  const getStageDisplay = (stage: PackageInstallation['stage']) => {
    switch (stage) {
      case 'queued':
        return { icon: Clock, color: 'text-gray-500', bgColor: 'bg-gray-100' };
      case 'resolving':
        return { icon: Loader2, color: 'text-blue-500', bgColor: 'bg-blue-100' };
      case 'downloading':
        return { icon: Download, color: 'text-indigo-500', bgColor: 'bg-indigo-100' };
      case 'installing':
        return { icon: Package, color: 'text-yellow-500', bgColor: 'bg-yellow-100' };
      case 'configuring':
        return { icon: Zap, color: 'text-orange-500', bgColor: 'bg-orange-100' };
      case 'complete':
        return { icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-100' };
      case 'failed':
        return { icon: AlertCircle, color: 'text-red-500', bgColor: 'bg-red-100' };
      default:
        return { icon: Package, color: 'text-gray-500', bgColor: 'bg-gray-100' };
    }
  };

  // Cancel installation
  const cancelInstallation = async (packageName: string) => {
    try {
      const response = await fetch(`/api/v1/generate/${projectId}/packages/${packageName}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('supabase-token')}`
        }
      });

      if (response.ok) {
        toast.success(`Cancelled installation of ${packageName}`);
      } else {
        toast.error(`Could not cancel installation of ${packageName}`);
      }
    } catch (error) {
      toast.error('Failed to cancel installation');
    }
  };

  // Format duration
  const formatDuration = (startTime: number) => {
    const duration = Date.now() - startTime;
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    
    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
  };

  // Clean up completed installations periodically
  useEffect(() => {
    const cleanup = setInterval(() => {
      setActiveInstallations(prev => 
        prev.filter(inst => 
          inst.stage !== 'complete' && inst.stage !== 'failed' || 
          (Date.now() - inst.startTime) < 30000 // Keep completed for 30 seconds
        )
      );
    }, 10000);

    return () => clearInterval(cleanup);
  }, []);

  if (showMiniView) {
    // Mini view for chat interface
    if (activeInstallations.length === 0 && stats.packagesDetected === 0) return null;

    return (
      <div className={`bg-blue-50 border border-blue-200 rounded-lg p-3 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">
              Package Manager
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-blue-700">
            {stats.packagesDetected > 0 && (
              <span>{stats.packagesDetected} detected</span>
            )}
            {stats.packagesInstalled > 0 && (
              <span>{stats.packagesInstalled} installed</span>
            )}
            {activeInstallations.length > 0 && (
              <span>{activeInstallations.length} installing</span>
            )}
          </div>
        </div>

        {activeInstallations.length > 0 && (
          <div className="mt-2 space-y-1">
            {activeInstallations.slice(0, 2).map((installation) => {
              const { icon: StageIcon, color } = getStageDisplay(installation.stage);
              return (
                <div key={installation.packageName} className="flex items-center gap-2">
                  <StageIcon className={`w-3 h-3 ${color} ${installation.stage === 'resolving' || installation.stage === 'downloading' ? 'animate-spin' : ''}`} />
                  <span className="text-xs text-blue-800 truncate">
                    {installation.packageName}
                  </span>
                  <div className="flex-1 bg-blue-200 rounded-full h-1.5">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${installation.progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Full view
  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      {/* Header */}
      <div 
        className="p-4 border-b border-gray-200 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-gray-600" />
            <h3 className="font-medium text-gray-900">Package Manager</h3>
            {activeInstallations.length > 0 && (
              <div className="flex items-center gap-1">
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                <span className="text-sm text-blue-600">
                  {activeInstallations.length} active
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{stats.packagesDetected} detected</span>
            <span className="text-green-600">{stats.packagesInstalled} installed</span>
            {stats.packagesFailed > 0 && (
              <span className="text-red-600">{stats.packagesFailed} failed</span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Active Installations */}
          {activeInstallations.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Active Installations</h4>
              {activeInstallations.map((installation) => {
                const { icon: StageIcon, color, bgColor } = getStageDisplay(installation.stage);
                
                return (
                  <div key={installation.packageName} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded ${bgColor}`}>
                          <StageIcon className={`w-4 h-4 ${color} ${installation.stage === 'resolving' || installation.stage === 'downloading' ? 'animate-spin' : ''}`} />
                        </div>
                        <span className="font-medium text-gray-900">
                          {installation.packageName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDuration(installation.startTime)}
                        </span>
                      </div>
                      
                      {installation.stage !== 'complete' && installation.stage !== 'failed' && (
                        <button
                          onClick={() => cancelInstallation(installation.packageName)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="mb-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">{installation.message}</span>
                        <span className="text-gray-500">{installation.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            installation.stage === 'failed' ? 'bg-red-500' : 
                            installation.stage === 'complete' ? 'bg-green-500' : 
                            'bg-blue-500'
                          }`}
                          style={{ width: `${installation.progress}%` }}
                        />
                      </div>
                    </div>

                    {installation.error && (
                      <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                        {installation.error}
                      </div>
                    )}

                    {installation.logs.length > 0 && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2 mb-1">
                          <Terminal className="w-3 h-3 text-gray-500" />
                          <span className="text-xs font-medium text-gray-700">Recent Logs</span>
                        </div>
                        <div className="bg-gray-50 rounded p-2 text-xs font-mono text-gray-600 max-h-20 overflow-y-auto">
                          {installation.logs.slice(-5).map((log, index) => (
                            <div key={index}>{log}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Recent Detections */}
          {recentDetections.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Recent Activity</h4>
              <div className="space-y-2">
                {recentDetections.slice(0, 5).map((event) => (
                  <div key={`${event.packageName}-${event.timestamp}`} className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-gray-600">
                      {event.type === 'package-detected' && `Detected ${event.packageName}`}
                      {event.type === 'installation-complete' && `✅ Installed ${event.packageName}`}
                      {event.type === 'installation-failed' && `❌ Failed ${event.packageName}`}
                    </span>
                    <span className="text-xs text-gray-400 ml-auto">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeInstallations.length === 0 && recentDetections.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No package activity yet</p>
              <p className="text-sm">Packages will be detected automatically during AI generation</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};