import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DeploymentModal } from '@/components/deployment/DeploymentModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { EnhancedPreviewPane } from '@/components/preview/EnhancedPreviewPane';
import { VSCodeIntegration } from '@/components/ide/VSCodeIntegration';
import { useFileStore } from '@/stores/fileStore';
import { useDevModeStore } from '@/stores/devModeStore';
import type { GeneratedFile } from '@ultracode/shared';
import { supabase } from '@/lib/supabase';
import {
  Code2,
  MessageSquare,
  Monitor,
} from 'lucide-react';

export default function ProjectPage() {
  const { id } = useParams();
  const { applyGeneratedFiles } = useFileStore();
  const { isDevMode } = useDevModeStore();
  const [selectedTab, setSelectedTab] = useState('chat');
  const [projectName, setProjectName] = useState('Loading...');
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [deploymentUrl, setDeploymentUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load project details only if we don't have the project name yet
    const loadProject = async () => {
      if (!id || projectName !== 'Loading...') return;
      setIsLoading(true);
      try {
        const { data } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single();
        
        if (data) {
          setProjectName(data.name);
          setDeploymentUrl(data.deployment_url);
        }
      } catch (error) {
        console.error('Failed to load project:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProject();
  }, [id, projectName]);

  useEffect(() => {
    // Handle generated files from AI
    const handleFilesGenerated = async (event: CustomEvent<{ projectId: string; files: GeneratedFile[] }>) => {
      if (event.detail.projectId === id) {
        await applyGeneratedFiles(id!, event.detail.files);
        // Switch to code tab to show the generated files (only if dev mode is enabled)
        if (isDevMode) {
          setSelectedTab('code');
        }
      }
    };

    window.addEventListener('files-generated', handleFilesGenerated as any);
    return () => {
      window.removeEventListener('files-generated', handleFilesGenerated as any);
    };
  }, [id, applyGeneratedFiles, isDevMode]);

  useEffect(() => {
    // Switch to chat tab if dev mode is disabled and currently on code tab
    if (!isDevMode && selectedTab === 'code') {
      setSelectedTab('chat');
    }
  }, [isDevMode, selectedTab]);



  if (isLoading) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="w-8 h-8 bg-primary rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col bg-background animate-fade-in overflow-hidden">
      {/* Main Content - Full Height */}
      <div className="flex h-full overflow-hidden gap-4 px-2 pt-2 pb-2">
        {/* Unified Editor Panel */}
        <div className="w-1/3 flex flex-col h-full overflow-hidden rounded-lg border border-border/50 bg-card">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="h-full flex flex-col">
            <TabsList className="w-full justify-start rounded-t-lg border-b border-border/50 h-12 bg-background/50 backdrop-blur-sm flex-shrink-0">
              {isDevMode && (
                <TabsTrigger 
                  value="code" 
                  className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                >
                  <Code2 className="h-4 w-4" />
                  <span className="font-medium">VS Code IDE</span>
                </TabsTrigger>
              )}
              <TabsTrigger 
                value="chat" 
                className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="font-medium">AI Assistant</span>
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              </TabsTrigger>
            </TabsList>
            
            {isDevMode && (
              <TabsContent value="code" className="flex-1 m-0 animate-fade-in overflow-hidden">
                <div className="h-full">
                  <VSCodeIntegration projectId={id!} />
                </div>
              </TabsContent>
            )}
            
            <TabsContent value="chat" className="flex-1 m-0 animate-fade-in overflow-hidden">
              <div className="h-full">
                <ChatInterface projectId={id!} />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Enhanced Preview Panel */}
        <div className="flex-1 flex flex-col h-full overflow-hidden rounded-lg border border-border/50 bg-card">
          <div className="h-12 bg-background/50 backdrop-blur-sm rounded-t-lg flex items-center justify-between px-4 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">Live Preview</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">Live</span>
              </div>
            </div>
          </div>
          <div className="flex-1 animate-fade-in delay-100 overflow-hidden">
            <EnhancedPreviewPane projectId={id!} />
          </div>
        </div>
      </div>
      
      {/* Enhanced Deployment Modal */}
      <DeploymentModal
        projectId={id!}
        projectName={projectName}
        open={showDeployModal}
        onOpenChange={setShowDeployModal}
        onDeploymentComplete={(url) => {
          setDeploymentUrl(url);
        }}
      />
    </div>
  );
}