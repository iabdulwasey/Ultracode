import { useEffect, useRef, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import type { Monaco } from '@monaco-editor/react';
import { useTheme } from '@/components/theme-provider';
import { useFileStore } from '@/stores/fileStore';
import { Button } from '@/components/ui/button';
import { FileExplorer } from '@/components/file-explorer/FileExplorer';
import {
  X,
  Settings,
  Search,
  GitBranch,
  Bug,
  Package,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface VSCodeIntegrationProps {
  projectId: string;
}

interface OpenFile {
  path: string;
  content: string;
  isDirty: boolean;
  language: string;
}

export function VSCodeIntegration({ projectId }: VSCodeIntegrationProps) {
  const { theme } = useTheme();
  const { files, currentFile, setCurrentFile, loadProjectFiles } = useFileStore();
  const [openFiles, setOpenFiles] = useState<Record<string, OpenFile>>({});
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePanel, setActivePanel] = useState<'explorer' | 'search' | 'git' | 'debug' | 'extensions'>('explorer');
  
  const monacoRef = useRef<Monaco | null>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    loadProjectFiles(projectId);
  }, [projectId, loadProjectFiles]);

  // Initialize Monaco with VS Code themes and features
  const handleEditorWillMount = (monaco: Monaco) => {
    // Register VS Code dark theme
    monaco.editor.defineTheme('vs-dark-plus', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '608b4e' },
        { token: 'keyword', foreground: 'c586c0' },
        { token: 'string', foreground: 'ce9178' },
        { token: 'number', foreground: 'b5cea8' },
        { token: 'type', foreground: '4ec9b0' },
        { token: 'function', foreground: 'dcdcaa' },
        { token: 'variable', foreground: '9cdcfe' },
      ],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'editor.lineHighlightBackground': '#2a2d2e',
        'editorLineNumber.foreground': '#858585',
        'editor.selectionBackground': '#264f78',
        'editor.inactiveSelectionBackground': '#3a3d41',
      },
    });

    // Enable VS Code keybindings
    monaco.editor.addKeybindingRules([
      {
        keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyP,
        command: 'workbench.action.quickOpen',
      },
      {
        keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyP,
        command: 'workbench.action.showCommands',
      },
    ]);

    monacoRef.current = monaco;
  };

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    
    // Add VS Code-like features
    editor.addAction({
      id: 'save-file',
      label: 'Save File',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
      run: () => {
        // Save file logic
        console.log('Saving file...');
      },
    });

    // Enable IntelliSense for TypeScript/JavaScript
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: 'React',
      allowJs: true,
      typeRoots: ['node_modules/@types'],
    });

    // Add type definitions
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });
  };

  const openFile = (path: string) => {
    const file = files[path];
    if (!file) return;

    const language = getLanguageFromPath(path);
    
    setOpenFiles(prev => ({
      ...prev,
      [path]: {
        path,
        content: file.content,
        isDirty: false,
        language,
      },
    }));
    
    setActiveFile(path);
    setCurrentFile(path);
  };

  const closeFile = (path: string) => {
    const newOpenFiles = { ...openFiles };
    delete newOpenFiles[path];
    setOpenFiles(newOpenFiles);
    
    if (activeFile === path) {
      const remainingFiles = Object.keys(newOpenFiles);
      setActiveFile(remainingFiles.length > 0 ? remainingFiles[0] : null);
    }
  };

  const getLanguageFromPath = (path: string): string => {
    const ext = path.split('.').pop() || '';
    const languageMap: Record<string, string> = {
      ts: 'typescript',
      tsx: 'typescript',
      js: 'javascript',
      jsx: 'javascript',
      json: 'json',
      css: 'css',
      scss: 'scss',
      sass: 'sass',
      less: 'less',
      html: 'html',
      xml: 'xml',
      md: 'markdown',
      py: 'python',
      java: 'java',
      c: 'c',
      cpp: 'cpp',
      cs: 'csharp',
      go: 'go',
      rs: 'rust',
      php: 'php',
      rb: 'ruby',
      swift: 'swift',
      kt: 'kotlin',
      yaml: 'yaml',
      yml: 'yaml',
      toml: 'toml',
      sql: 'sql',
      sh: 'shell',
      bash: 'shell',
      ps1: 'powershell',
      dockerfile: 'dockerfile',
    };
    
    return languageMap[ext] || 'plaintext';
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && activeFile) {
      setOpenFiles(prev => ({
        ...prev,
        [activeFile]: {
          ...prev[activeFile],
          content: value,
          isDirty: true,
        },
      }));
    }
  };

  return (
    <div className="h-full flex bg-[#1e1e1e]">
      {/* Activity Bar */}
      <div className="w-12 bg-[#333333] flex flex-col items-center py-2">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'h-10 w-10 rounded-none hover:bg-[#2a2d2e]',
            activePanel === 'explorer' && 'bg-[#2a2d2e]'
          )}
          onClick={() => {
            setActivePanel('explorer');
            setSidebarCollapsed(false);
          }}
        >
          <Package className="h-5 w-5 text-[#cccccc]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'h-10 w-10 rounded-none hover:bg-[#2a2d2e]',
            activePanel === 'search' && 'bg-[#2a2d2e]'
          )}
          onClick={() => {
            setActivePanel('search');
            setSidebarCollapsed(false);
          }}
        >
          <Search className="h-5 w-5 text-[#cccccc]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'h-10 w-10 rounded-none hover:bg-[#2a2d2e]',
            activePanel === 'git' && 'bg-[#2a2d2e]'
          )}
          onClick={() => {
            setActivePanel('git');
            setSidebarCollapsed(false);
          }}
        >
          <GitBranch className="h-5 w-5 text-[#cccccc]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'h-10 w-10 rounded-none hover:bg-[#2a2d2e]',
            activePanel === 'debug' && 'bg-[#2a2d2e]'
          )}
          onClick={() => {
            setActivePanel('debug');
            setSidebarCollapsed(false);
          }}
        >
          <Bug className="h-5 w-5 text-[#cccccc]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'h-10 w-10 rounded-none hover:bg-[#2a2d2e]',
            activePanel === 'extensions' && 'bg-[#2a2d2e]'
          )}
          onClick={() => {
            setActivePanel('extensions');
            setSidebarCollapsed(false);
          }}
        >
          <Settings className="h-5 w-5 text-[#cccccc]" />
        </Button>
      </div>

      {/* Sidebar */}
      {!sidebarCollapsed && (
        <div className="w-64 bg-[#252526] border-r border-[#3e3e42]">
          <div className="h-9 px-5 flex items-center justify-between border-b border-[#3e3e42]">
            <span className="text-xs uppercase text-[#cccccc]">{activePanel}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 hover:bg-[#2a2d2e]"
              onClick={() => setSidebarCollapsed(true)}
            >
              <X className="h-3 w-3 text-[#cccccc]" />
            </Button>
          </div>
          
          {activePanel === 'explorer' && (
            <FileExplorer
              projectId={projectId}
              onFileSelect={openFile}
            />
          )}
          
          {activePanel === 'search' && (
            <div className="p-4">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-2 py-1 bg-[#3c3c3c] border border-[#3e3e42] rounded text-sm text-[#cccccc]"
              />
            </div>
          )}
          
          {activePanel === 'git' && (
            <div className="p-4 text-sm text-[#cccccc]">
              <p>Source Control</p>
              <p className="text-xs text-[#858585] mt-2">No source control providers registered.</p>
            </div>
          )}
        </div>
      )}

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Tabs */}
        <div className="h-9 bg-[#2d2d30] flex items-center">
          {Object.values(openFiles).map(file => (
            <div
              key={file.path}
              className={cn(
                'h-full px-3 flex items-center gap-2 border-r border-[#252526] cursor-pointer',
                activeFile === file.path ? 'bg-[#1e1e1e]' : 'hover:bg-[#2a2d2e]'
              )}
              onClick={() => {
                setActiveFile(file.path);
                setCurrentFile(file.path);
              }}
            >
              <span className="text-sm text-[#cccccc]">
                {file.path.split('/').pop()}
              </span>
              {file.isDirty && <span className="text-[#cccccc]">•</span>}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 hover:bg-[#383838]"
                onClick={(e) => {
                  e.stopPropagation();
                  closeFile(file.path);
                }}
              >
                <X className="h-3 w-3 text-[#cccccc]" />
              </Button>
            </div>
          ))}
        </div>

        {/* Editor */}
        <div className="flex-1">
          {activeFile && openFiles[activeFile] ? (
            <MonacoEditor
              height="100%"
              language={openFiles[activeFile].language}
              value={openFiles[activeFile].content}
              theme="vs-dark-plus"
              onChange={handleEditorChange}
              beforeMount={handleEditorWillMount}
              onMount={handleEditorDidMount}
              options={{
                fontSize: 14,
                fontFamily: 'Consolas, "Courier New", monospace',
                minimap: { enabled: true },
                scrollbar: {
                  vertical: 'visible',
                  horizontal: 'visible',
                },
                lineNumbers: 'on',
                glyphMargin: true,
                folding: true,
                lineDecorationsWidth: 0,
                lineNumbersMinChars: 0,
                renderLineHighlight: 'all',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: 'on',
                readOnly: true, // As per requirements
              }}
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-[#858585]">Select a file to view</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}