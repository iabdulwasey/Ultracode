import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  RotateCcw,
  Monitor, 
  Tablet, 
  Smartphone,
  Maximize2,
  AlertCircle,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';
import { useProjectSync } from '@/hooks';

type DeviceType = 'desktop' | 'tablet' | 'mobile';
type PreviewStatus = 'starting' | 'ready' | 'error' | null;

interface LocalPreviewProps {
  projectId: string;
  className?: string;
}

interface PreviewInfo {
  projectId: string;
  url: string;
  port: number;
  status: PreviewStatus;
  isExisting?: boolean;
}

const deviceConfigs = {
  desktop: {
    width: '100%',
    height: '100%',
    icon: Monitor,
    label: 'Desktop'
  },
  tablet: {
    width: '768px',
    height: '1024px',
    icon: Tablet,
    label: 'Tablet'
  },
  mobile: {
    width: '375px',
    height: '812px',
    icon: Smartphone,
    label: 'Mobile'
  }
};

export function LocalPreview({ projectId, className }: LocalPreviewProps) {
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewInfo, setPreviewInfo] = useState<PreviewInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { toast } = useToast();

  // WebSocket integration for real-time preview updates
  const {
    isConnected,
    buildStatus,
    isBuilding,
    hasError,
    buildProgress,
    buildMessage,
    isPreviewReady
  } = useProjectSync({
    projectId,
    onPreviewReady: () => {
      console.log('Preview ready via WebSocket - refreshing iframe');
      // Refresh the iframe when preview is ready
      if (iframeRef.current && previewInfo?.url) {
        iframeRef.current.src = iframeRef.current.src;
      }
    },
    onError: (errorMessage) => {
      console.error('Preview error via WebSocket:', errorMessage);
      setError(errorMessage);
      toast({
        title: "Preview Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  });

  // Check for existing preview on component mount
  useEffect(() => {
    checkPreviewStatus();
  }, [projectId]);

  const checkPreviewStatus = async () => {
    try {
      const response = await api.getLocalPreviewStatus(projectId);

      if (response.preview && response.preview.status === 'ready') {
        setPreviewInfo(response.preview);
        setError(null);
      } else {
        setPreviewInfo(null);
      }
    } catch (error: any) {
      console.error('Failed to check preview status:', error);
      // Clear any stale preview info on error
      setPreviewInfo(null);
    }
  };

  const startPreview = async (forceRecreate = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.createLocalPreview(projectId, forceRecreate);

      setPreviewInfo(response.preview);
      
      toast({
        title: response.preview.isExisting ? 'Preview Ready' : 'Preview Started',
        description: response.preview.isExisting 
          ? 'Using existing preview server'
          : 'Local development server is running',
      });

    } catch (error: any) {
      setError(error.message || 'Failed to start preview');
      toast({
        title: 'Preview Error',
        description: error.message || 'Failed to start preview',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stopPreview = async () => {
    if (!previewInfo) return;

    setIsLoading(true);
    try {
      await api.request(`/local-preview/${projectId}`, {
        method: 'DELETE',
      });

      setPreviewInfo(null);
      toast({
        title: 'Preview Stopped',
        description: 'Local development server has been stopped',
      });

    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to stop preview',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreview = async () => {
    if (!previewInfo) {
      // If no preview exists, create one first
      await startPreview();
      return;
    }

    setIsLoading(true);
    try {
      await api.updateLocalPreview(projectId);

      // Refresh the iframe
      if (iframeRef.current) {
        iframeRef.current.src = iframeRef.current.src;
      }

      toast({
        title: 'Preview Updated',
        description: 'Latest files have been synced to preview',
      });

    } catch (error: any) {
      // If update fails (404), try to create a new preview
      if (error.message.includes('404') || error.message.includes('not found')) {
        console.log('Preview not found, creating new one...');
        await startPreview();
        return;
      }
      
      toast({
        title: 'Update Error',
        description: error.message || 'Failed to update preview',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshPreview = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const rebuildPreview = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Force recreate the preview (same as starting from scratch)
      const response = await api.createLocalPreview(projectId, true);
      
      setPreviewInfo(response.preview);
      
      toast({
        title: 'Preview Rebuilt',
        description: 'Project has been completely rebuilt and restarted',
      });
      
    } catch (error: any) {
      setError(error.message || 'Failed to rebuild preview');
      toast({
        title: 'Rebuild Error',
        description: error.message || 'Failed to rebuild preview',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const getStatusColor = (status: PreviewStatus) => {
    switch (status) {
      case 'ready':
        return 'bg-green-500';
      case 'starting':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: PreviewStatus) => {
    switch (status) {
      case 'ready':
        return 'Ready';
      case 'starting':
        return 'Starting';
      case 'error':
        return 'Error';
      default:
        return 'Stopped';
    }
  };

  if (isFullscreen && previewInfo?.status === 'ready') {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <div className="flex items-center justify-between p-4 bg-gray-900 text-white">
          <div className="flex items-center gap-4">
            <Badge variant="secondary">
              Local Preview - {previewInfo.url}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className="text-white hover:bg-gray-700"
          >
            <Maximize2 className="h-4 w-4" />
            Exit Fullscreen
          </Button>
        </div>
        <iframe
          ref={iframeRef}
          src={previewInfo.url}
          className="w-full h-[calc(100vh-64px)] border-0"
          title="Preview"
        />
      </div>
    );
  }

  return (
    <Card className={cn('h-full flex flex-col', className)}>
      {previewInfo?.status === 'ready' && (
        <CardHeader className="pb-3 flex-shrink-0">
          {/* WebSocket Build Status */}
          {(isBuilding || hasError) && (
            <div className={`mb-2 px-3 py-2 rounded text-sm ${
              hasError 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-blue-50 text-blue-700 border border-blue-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {isBuilding && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  {hasError && (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  <span>{buildMessage || (hasError ? 'Build failed' : 'Building...')}</span>
                </div>
                {buildProgress > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs">{buildProgress}%</span>
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${buildProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Connection Status */}
              <div className={`flex items-center space-x-1 text-xs ${
                isConnected ? 'text-green-600' : 'text-gray-400'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isConnected ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
                <span>{isConnected ? 'Live' : 'Offline'}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              {/* Rebuild button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={rebuildPreview}
                disabled={isLoading || isBuilding}
                title="Rebuild Preview"
              >
                <RefreshCw className={cn("h-4 w-4", (isLoading || isBuilding) && "animate-spin")} />
              </Button>
              
              <div className="w-px h-6 bg-border mx-1" />
              
              {/* Device switching */}
              {Object.entries(deviceConfigs).map(([key, config]) => {
                const Icon = config.icon;
                return (
                  <Button
                    key={key}
                    variant={device === key ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setDevice(key as DeviceType)}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                );
              })}
              
              <div className="w-px h-6 bg-border mx-1" />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      )}

      <CardContent className="flex-1 p-0 min-h-0">
        {error && (
          <div className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-red-900 mb-2">Preview Error</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => startPreview(true)} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        )}

        {isLoading && !previewInfo && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Starting local development server...</p>
            </div>
          </div>
        )}

        {!previewInfo && !isLoading && !error && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <Monitor className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Preview Running</h3>
              <p className="text-muted-foreground mb-4">
                Start a local development server to preview your application
              </p>
              <Button onClick={() => startPreview()}>
                <Play className="h-4 w-4 mr-2" />
                Start Preview
              </Button>
            </div>
          </div>
        )}

        {previewInfo?.status === 'starting' && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Development server is starting...</p>
            </div>
          </div>
        )}

        {previewInfo?.status === 'ready' && (
          <div className="flex-1 bg-gray-100 flex items-center justify-center p-4">
            <div 
              className={cn(
                'bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300',
                device === 'desktop' && 'w-[1200px] h-[800px]',
                device === 'tablet' && 'w-[768px] h-[800px]',
                device === 'mobile' && 'w-[375px] h-[700px]'
              )}
            >
              <iframe
                ref={iframeRef}
                src={previewInfo.url}
                className="w-full h-full border-0"
                title="Local Preview"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}