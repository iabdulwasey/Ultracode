import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DeploymentModal } from '@/components/deployment/DeploymentModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MonacoEditor from '@monaco-editor/react';
import { useTheme } from '@/components/theme-provider';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { FileExplorer } from '@/components/file-explorer/FileExplorer';
import { PreviewPane } from '@/components/preview/PreviewPane';
import { useFileStore } from '@/stores/fileStore';
import type { GeneratedFile } from '@ultracode/shared';
import { supabase } from '@/lib/supabase';
import {
  Play,
  Download,
  Share2,
  Settings,
  GitBranch,
  Maximize2,
  Smartphone,
  Tablet,
  Monitor,
  Globe,
} from 'lucide-react';

export default function ProjectPage() {
  const { id } = useParams();
  const { theme } = useTheme();
  const { files, currentFile, applyGeneratedFiles } = useFileStore();
  const [selectedTab, setSelectedTab] = useState('code');
  const [projectName, setProjectName] = useState('Loading...');
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [deploymentUrl, setDeploymentUrl] = useState<string | null>(null);

  useEffect(() => {
    // Load project details
    const loadProject = async () => {
      if (!id) return;
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
      }
    };
    loadProject();
  }, [id]);

  useEffect(() => {
    // Handle generated files from AI
    const handleFilesGenerated = async (event: CustomEvent<{ projectId: string; files: GeneratedFile[] }>) => {
      if (event.detail.projectId === id) {
        await applyGeneratedFiles(id!, event.detail.files);
        // Switch to code tab to show the generated files
        setSelectedTab('code');
      }
    };

    window.addEventListener('files-generated', handleFilesGenerated as any);
    return () => {
      window.removeEventListener('files-generated', handleFilesGenerated as any);
    };
  }, [id, applyGeneratedFiles]);


  const currentFileContent = currentFile && files[currentFile] 
    ? files[currentFile].content 
    : '// Select a file to view its content';


  const getFileLanguage = (path: string) => {
    const ext = path.split('.').pop();
    switch (ext) {
      case 'ts':
      case 'tsx':
        return 'typescript';
      case 'js':
      case 'jsx':
        return 'javascript';
      case 'css':
        return 'css';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      default:
        return 'plaintext';
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Project Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h1 className="text-xl font-semibold">{projectName}</h1>
          <p className="text-sm text-muted-foreground">Project ID: {id}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <GitBranch className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          {deploymentUrl && (
            <Button
              variant="outline"
              onClick={() => window.open(deploymentUrl, '_blank')}
            >
              <Globe className="mr-2 h-4 w-4" />
              View Live
            </Button>
          )}
          <Button onClick={() => setShowDeployModal(true)}>
            <Play className="mr-2 h-4 w-4" />
            Deploy
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* File Explorer */}
        <div className="w-64 border-r bg-background">
          <FileExplorer 
            projectId={id!} 
            onFileSelect={() => setSelectedTab('code')}
          />
        </div>

        {/* Editor Panel */}
        <div className="flex-1 flex flex-col">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start rounded-none border-b h-10">
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="chat">AI Chat</TabsTrigger>
              <TabsTrigger value="terminal">Terminal</TabsTrigger>
            </TabsList>
            <TabsContent value="code" className="flex-1 m-0">
              <div className="h-full">
                {currentFile && (
                  <div className="h-10 border-b px-4 flex items-center bg-muted/50">
                    <span className="text-sm">{currentFile}</span>
                  </div>
                )}
                <MonacoEditor
                  height={currentFile ? "calc(100% - 2.5rem)" : "100%"}
                  language={currentFile ? getFileLanguage(currentFile) : 'typescript'}
                  theme={theme === 'dark' ? 'vs-dark' : 'light'}
                  value={currentFileContent}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    readOnly: true,
                  }}
                />
              </div>
            </TabsContent>
            <TabsContent value="chat" className="flex-1 m-0">
              <ChatInterface projectId={id!} />
            </TabsContent>
            <TabsContent value="terminal" className="flex-1 p-4 m-0 bg-black text-white font-mono">
              <div className="text-sm">
                <div className="text-green-400">$ npm run dev</div>
                <div className="mt-2">
                  <div>VITE v5.0.10  ready in 425 ms</div>
                  <div className="mt-1">➜  Local:   http://localhost:5173/</div>
                  <div>➜  Network: use --host to expose</div>
                  <div>➜  press h to show help</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Panel */}
        <div className="w-1/2 border-l flex flex-col">
          <div className="flex items-center justify-between p-2 border-b">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" title="Desktop view">
                <Monitor className="h-4 w-4 mr-1" />
                Desktop
              </Button>
              <Button variant="ghost" size="sm" title="Tablet view">
                <Tablet className="h-4 w-4 mr-1" />
                Tablet
              </Button>
              <Button variant="ghost" size="sm" title="Mobile view">
                <Smartphone className="h-4 w-4 mr-1" />
                Mobile
              </Button>
            </div>
            <Button variant="ghost" size="icon">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1">
            <PreviewPane projectId={id!} />
          </div>
        </div>
      </div>
      
      {/* Deployment Modal */}
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