import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { api } from '@/lib/api';
import { Loader2, ExternalLink, CheckCircle, XCircle } from 'lucide-react';

interface DeploymentModalProps {
  projectId: string;
  projectName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeploymentComplete?: (url: string) => void;
}

export function DeploymentModal({
  projectId,
  projectName,
  open,
  onOpenChange,
  onDeploymentComplete,
}: DeploymentModalProps) {
  const [provider, setProvider] = useState<'netlify' | 'vercel'>('netlify');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentUrl, setDeploymentUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDeploy = async () => {
    setIsDeploying(true);
    setError(null);
    setDeploymentUrl(null);

    try {
      const result = await api.deployProject(projectId, provider);
      
      if (result.deployment.url) {
        setDeploymentUrl(result.deployment.url);
        onDeploymentComplete?.(result.deployment.url);
        
        // Check deployment status if it's building
        if (result.deployment.status === 'building') {
          // Poll for status updates
          const checkStatus = async () => {
            if (result.deployment.deploymentId) {
              const status = await api.getDeploymentStatus(result.deployment.deploymentId);
              if (status.deployment.status === 'ready') {
                setDeploymentUrl(status.deployment.url);
              } else if (status.deployment.status === 'error') {
                setError('Deployment failed during build process');
              }
            }
          };
          
          // Check every 5 seconds for up to 2 minutes
          const intervalId = setInterval(checkStatus, 5000);
          setTimeout(() => clearInterval(intervalId), 120000);
        }
      }
    } catch (err) {
      console.error('Deployment error:', err);
      setError(err instanceof Error ? err.message : 'Deployment failed');
    } finally {
      setIsDeploying(false);
    }
  };

  const resetModal = () => {
    setDeploymentUrl(null);
    setError(null);
    setIsDeploying(false);
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      onOpenChange(newOpen);
      if (!newOpen) resetModal();
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Deploy {projectName}</DialogTitle>
          <DialogDescription>
            Deploy your project to a hosting provider. Your React app will be built and deployed automatically.
          </DialogDescription>
        </DialogHeader>

        {!deploymentUrl && !error && (
          <div className="py-4">
            <Label className="text-base mb-3 block">Select deployment provider</Label>
            <RadioGroup value={provider} onValueChange={(value) => setProvider(value as 'netlify' | 'vercel')}>
              <div className="flex items-start space-x-3 mb-4 p-4 border rounded-lg hover:bg-accent">
                <RadioGroupItem value="netlify" id="netlify" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="netlify" className="cursor-pointer">
                    <div className="font-medium">Netlify</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Fast, reliable hosting with automatic HTTPS and global CDN
                    </div>
                  </Label>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-accent">
                <RadioGroupItem value="vercel" id="vercel" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="vercel" className="cursor-pointer">
                    <div className="font-medium">Vercel</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      The platform for frontend developers with edge functions
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>

            <Alert className="mt-4">
              <AlertDescription>
                Make sure you have configured your {provider === 'netlify' ? 'Netlify' : 'Vercel'} access token in the environment variables.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {deploymentUrl && (
          <div className="py-4">
            <div className="flex items-center gap-2 text-green-600 mb-4">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Deployment successful!</span>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Your project is live at:</p>
              <a
                href={deploymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-2"
              >
                {deploymentUrl}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}

        {error && (
          <div className="py-4">
            <div className="flex items-center gap-2 text-destructive mb-2">
              <XCircle className="h-5 w-5" />
              <span className="font-medium">Deployment failed</span>
            </div>
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        <DialogFooter>
          {!deploymentUrl && (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isDeploying}>
                Cancel
              </Button>
              <Button onClick={handleDeploy} disabled={isDeploying}>
                {isDeploying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isDeploying ? 'Deploying...' : 'Deploy'}
              </Button>
            </>
          )}
          {deploymentUrl && (
            <Button onClick={() => onOpenChange(false)}>Done</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}