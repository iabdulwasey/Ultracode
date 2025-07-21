import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MonacoEditor from '@monaco-editor/react';
import { useTheme } from '@/components/theme-provider';
import {
  Play,
  Save,
  Download,
  Share2,
  Settings,
  GitBranch,
  Maximize2,
} from 'lucide-react';

export default function ProjectPage() {
  const { id } = useParams();
  const { theme } = useTheme();

  // Mock code for demo
  const mockCode = `import React from 'react';
import { Button } from './components/ui/button';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Ultracode
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Build amazing apps with AI
        </p>
        <Button size="lg">
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default App;`;

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Project Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h1 className="text-xl font-semibold">E-commerce Platform</h1>
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
          <Button>
            <Play className="mr-2 h-4 w-4" />
            Deploy
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Editor Panel */}
        <div className="flex-1 flex flex-col">
          <Tabs defaultValue="code" className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start rounded-none border-b h-10">
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="chat">AI Chat</TabsTrigger>
              <TabsTrigger value="terminal">Terminal</TabsTrigger>
            </TabsList>
            <TabsContent value="code" className="flex-1 m-0">
              <div className="h-full">
                <MonacoEditor
                  height="100%"
                  defaultLanguage="typescript"
                  theme={theme === 'dark' ? 'vs-dark' : 'light'}
                  value={mockCode}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>
            </TabsContent>
            <TabsContent value="chat" className="flex-1 p-4 m-0">
              <div className="h-full flex items-center justify-center text-muted-foreground">
                AI Chat Interface Coming Soon
              </div>
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
              <Button variant="ghost" size="sm">
                Desktop
              </Button>
              <Button variant="ghost" size="sm">
                Tablet
              </Button>
              <Button variant="ghost" size="sm">
                Mobile
              </Button>
            </div>
            <Button variant="ghost" size="icon">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 bg-white">
            <iframe
              src="about:blank"
              className="w-full h-full"
              title="Preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
}