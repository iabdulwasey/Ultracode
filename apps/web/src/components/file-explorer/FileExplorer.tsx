import { useState, useEffect } from 'react';
import { useFileStore } from '@/stores/fileStore';
import { useProjectSync } from '@/hooks';
import { ChevronRight, ChevronDown, File, Folder, Wifi, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileExplorerProps {
  projectId: string;
  onFileSelect?: (path: string) => void;
}

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}

export function FileExplorer({ projectId, onFileSelect }: FileExplorerProps) {
  const { files, currentFile, loadProjectFiles, setCurrentFile, updateFiles } = useFileStore();
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src']));
  const [fileTree, setFileTree] = useState<FileNode[]>([]);

  // WebSocket integration for real-time file updates
  const { isConnected, isBuilding } = useProjectSync({
    projectId,
    onFilesUpdated: (updatedFiles) => {
      console.log('FileExplorer: Files updated via WebSocket', updatedFiles);
      
      // Convert WebSocket file format to fileStore format
      const fileMap: Record<string, string> = {};
      updatedFiles.forEach(file => {
        fileMap[file.path] = file.content;
      });
      
      // Update the file store with new files
      updateFiles(fileMap);
    },
    onError: (error) => {
      console.error('FileExplorer: WebSocket error', error);
    }
  });

  useEffect(() => {
    loadProjectFiles(projectId);
  }, [projectId, loadProjectFiles]);

  useEffect(() => {
    // Listen for generated files
    const handleFilesGenerated = (event: CustomEvent) => {
      if (event.detail.projectId === projectId) {
        // Files will be updated via the fileStore
        loadProjectFiles(projectId);
      }
    };

    window.addEventListener('files-generated', handleFilesGenerated as EventListener);
    return () => {
      window.removeEventListener('files-generated', handleFilesGenerated as EventListener);
    };
  }, [projectId, loadProjectFiles]);

  useEffect(() => {
    // Build file tree from flat file list
    const tree: FileNode[] = [];
    const paths = Object.keys(files).sort();

    paths.forEach(path => {
      const parts = path.split('/');
      let currentLevel = tree;

      parts.forEach((part, index) => {
        const isFile = index === parts.length - 1;
        const currentPath = parts.slice(0, index + 1).join('/');

        let node = currentLevel.find(n => n.name === part);
        if (!node) {
          node = {
            name: part,
            path: currentPath,
            type: isFile ? 'file' : 'folder',
            children: isFile ? undefined : [],
          };
          currentLevel.push(node);
        }

        if (!isFile && node.children) {
          currentLevel = node.children;
        }
      });
    });

    setFileTree(tree);
  }, [files]);

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const handleFileClick = (path: string) => {
    setCurrentFile(path);
    onFileSelect?.(path);
  };

  const renderNode = (node: FileNode, level: number = 0) => {
    const isExpanded = expandedFolders.has(node.path);
    const isSelected = currentFile === node.path;

    return (
      <div key={node.path}>
        <div
          className={cn(
            'flex items-center gap-1 py-1 px-2 hover:bg-accent cursor-pointer',
            isSelected && 'bg-accent'
          )}
          style={{ paddingLeft: `${level * 12 + 8}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.path);
            } else {
              handleFileClick(node.path);
            }
          }}
        >
          {node.type === 'folder' ? (
            <>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <Folder className="h-4 w-4" />
            </>
          ) : (
            <>
              <div className="w-4" />
              <File className="h-4 w-4" />
            </>
          )}
          <span className="text-sm">{node.name}</span>
        </div>
        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full overflow-auto">
      <div className="p-2 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Files</h3>
          <div className="flex items-center space-x-1">
            {isBuilding && (
              <div className="w-3 h-3 border border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            )}
            <div title={isConnected ? "Real-time sync active" : "Connecting..."}>
              {isConnected ? (
                <Wifi className="w-3 h-3 text-green-500" />
              ) : (
                <WifiOff className="w-3 h-3 text-gray-400" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="py-1">
        {fileTree.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            No files yet. Start chatting to generate code!
          </div>
        ) : (
          fileTree.map(node => renderNode(node))
        )}
      </div>
    </div>
  );
}