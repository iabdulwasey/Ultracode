import { create } from 'zustand';
import type { GeneratedFile } from '@ultracode/shared';
import { api } from '@/lib/api';

export interface ProjectFile {
  id: string;
  path: string;
  content: string;
  type: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;
}

interface FileState {
  files: Record<string, ProjectFile>;
  currentFile: string | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  loadProjectFiles: (projectId: string) => Promise<void>;
  updateFile: (path: string, content: string) => void;
  createFile: (projectId: string, path: string, content: string, type: string) => Promise<void>;
  deleteFile: (id: string) => Promise<void>;
  setCurrentFile: (path: string | null) => void;
  applyGeneratedFiles: (projectId: string, files: GeneratedFile[]) => Promise<void>;
}

export const useFileStore = create<FileState>((set, get) => ({
  files: {},
  currentFile: null,
  loading: false,
  error: null,

  loadProjectFiles: async (projectId: string) => {
    set({ loading: true, error: null });
    
    try {
      const files = await api.getProjectFiles(projectId);
      const fileMap: Record<string, ProjectFile> = {};
      
      files.forEach(file => {
        fileMap[file.path] = {
          id: file.id,
          path: file.path,
          content: file.content,
          type: file.type,
          size: file.size,
          createdAt: new Date(file.created_at),
          updatedAt: new Date(file.updated_at),
        };
      });
      
      set({ files: fileMap, loading: false });
    } catch (error) {
      console.error('Failed to load project files:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to load files', loading: false });
    }
  },

  updateFile: (path: string, content: string) => {
    const files = get().files;
    if (files[path]) {
      set({
        files: {
          ...files,
          [path]: {
            ...files[path],
            content,
            size: new Blob([content]).size,
            updatedAt: new Date(),
          },
        },
      });
    }
  },

  createFile: async (projectId: string, path: string, content: string, type: string) => {
    try {
      const file = await api.createFile(projectId, path, content, type);
      
      set({
        files: {
          ...get().files,
          [path]: {
            id: file.id,
            path: file.path,
            content: file.content,
            type: file.type,
            size: file.size,
            createdAt: new Date(file.created_at),
            updatedAt: new Date(file.updated_at),
          },
        },
      });
    } catch (error) {
      console.error('Failed to create file:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to create file' });
    }
  },

  deleteFile: async (id: string) => {
    try {
      await api.deleteFile(id);
      
      const files = get().files;
      const newFiles = { ...files };
      
      // Find and remove the file by id
      Object.keys(newFiles).forEach(path => {
        if (newFiles[path].id === id) {
          delete newFiles[path];
        }
      });
      
      set({ files: newFiles });
    } catch (error) {
      console.error('Failed to delete file:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to delete file' });
    }
  },

  setCurrentFile: (path: string | null) => {
    set({ currentFile: path });
  },

  applyGeneratedFiles: async (projectId: string, files: GeneratedFile[]) => {
    // Since files are already saved by the backend, we just need to reload them
    await get().loadProjectFiles(projectId);
  },
}));