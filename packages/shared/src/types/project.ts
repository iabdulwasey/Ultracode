export interface Project {
  id: string;
  userId: string;
  name: string;
  description?: string;
  visibility: ProjectVisibility;
  techStack: TechStack;
  thumbnailUrl?: string;
  deploymentUrl?: string;
  githubRepo?: string;
  settings: ProjectSettings;
  createdAt: Date;
  updatedAt: Date;
  lastAccessedAt: Date;
}

export type ProjectVisibility = 'public' | 'private' | 'workspace';

export interface TechStack {
  frontend: 'react' | 'vue' | 'angular';
  styling: 'tailwind' | 'css' | 'styled-components';
  backend?: 'supabase' | 'firebase' | 'custom';
  database?: 'postgresql' | 'mysql' | 'mongodb';
}

export interface ProjectSettings {
  autoSave: boolean;
  lintOnSave: boolean;
  formatOnSave: boolean;
}

export interface ProjectFile {
  id: string;
  projectId: string;
  path: string;
  content: string;
  type: FileType;
  size: number;
  hash?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type FileType = 
  | 'typescript' 
  | 'javascript' 
  | 'jsx' 
  | 'tsx' 
  | 'css' 
  | 'html' 
  | 'json'
  | 'markdown'
  | 'yaml'
  | 'text';

export interface CreateProjectRequest {
  name: string;
  description?: string;
  visibility?: ProjectVisibility;
  template?: ProjectTemplate;
  techStack?: Partial<TechStack>;
}

export type ProjectTemplate = 'landing' | 'saas' | 'ecommerce' | 'blank';

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  visibility?: ProjectVisibility;
  settings?: Partial<ProjectSettings>;
}