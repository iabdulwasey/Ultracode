import { supabase } from './supabase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface RequestOptions extends RequestInit {
  requireAuth?: boolean;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { requireAuth = true, ...fetchOptions } = options;
    
    // Get the current session from Supabase
    let authToken: string | null = null;
    if (requireAuth) {
      const { data: { session } } = await supabase.auth.getSession();
      authToken = session?.access_token || null;
      
      if (!authToken) {
        throw new Error('Not authenticated');
      }
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
        ...fetchOptions.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: response.statusText,
      }));
      throw new Error(error.message || 'API request failed');
    }

    return response.json();
  }

  // Project endpoints using Supabase directly
  async getProjects() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getProject(id: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async createProject(projectData: any) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    console.log('Creating project with data:', {
      user_id: user.id,
      name: projectData.name,
      description: projectData.description,
      visibility: projectData.visibility || 'private',
      tech_stack: projectData.techStack || {},
      template: projectData.template,
    });

    const { data, error } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        name: projectData.name,
        description: projectData.description,
        visibility: projectData.visibility || 'private',
        tech_stack: projectData.techStack || {},
        template: projectData.template,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message || 'Failed to create project');
    }

    // If there's an initial prompt, create the first chat session
    if (projectData.initialPrompt) {
      await supabase.from('chat_sessions').insert({
        project_id: data.id,
        user_id: user.id,
        messages: [{
          role: 'user',
          content: projectData.initialPrompt,
          timestamp: new Date().toISOString(),
        }],
        model: 'claude-sonnet-4-20250514',
      });
    }

    return data;
  }

  async updateProject(id: string, data: any) {
    const { error } = await supabase
      .from('projects')
      .update(data)
      .eq('id', id);

    if (error) throw error;
    return { id, ...data };
  }

  async deleteProject(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // AI Generation endpoints - direct fetch for streaming support
  async generateCode(projectId: string, prompt: string, context?: any) {
    // Get the current session from Supabase
    const { data: { session } } = await supabase.auth.getSession();
    const authToken = session?.access_token;
    
    if (!authToken) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${this.baseUrl}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        projectId,
        prompt,
        context: context ? {
          currentFile: context.currentFile,
          selectedCode: context.selectedCode,
          fileTree: context.fileTree,
        } : undefined,
        options: context ? {
          model: context.model || 'claude-sonnet-4-20250514',
          temperature: context.temperature || 0.7,
          maxTokens: context.maxTokens || 32000,
        } : undefined,
      }),
    });

    if (!response.ok) {
      throw new Error('Generation failed');
    }

    return response;
  }

  // File management
  async getProjectFiles(projectId: string) {
    const { data, error } = await supabase
      .from('project_files')
      .select('*')
      .eq('project_id', projectId)
      .order('path');

    if (error) throw error;
    return data;
  }

  async createFile(projectId: string, path: string, content: string, type: string) {
    const { data, error } = await supabase
      .from('project_files')
      .insert({
        project_id: projectId,
        path,
        content,
        type,
        size: new Blob([content]).size,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateFile(id: string, content: string) {
    const { error } = await supabase
      .from('project_files')
      .update({
        content,
        size: new Blob([content]).size,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) throw error;
  }

  async deleteFile(id: string) {
    const { error } = await supabase
      .from('project_files')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Deployment endpoints
  async deployProject(projectId: string, provider: 'netlify' | 'vercel' = 'netlify') {
    return this.request<{
      success: boolean;
      deployment: {
        url: string;
        siteId?: string;
        deployId?: string;
        deploymentId?: string;
        status?: string;
      };
    }>(`/deploy/${projectId}`, {
      method: 'POST',
      body: JSON.stringify({ provider }),
    });
  }

  async getDeployments(projectId: string) {
    return this.request<{
      deployments: Array<{
        id: string;
        project_id: string;
        provider: string;
        url: string;
        status: string;
        metadata: any;
        created_at: string;
      }>;
    }>(`/deployments/${projectId}`);
  }

  async getDeploymentStatus(deploymentId: string) {
    return this.request<{
      deployment: {
        id: string;
        status: string;
        url: string;
        provider: string;
      };
    }>(`/deployment/${deploymentId}/status`);
  }

  // Preview/Sandbox endpoints
  async createPreview(projectId: string, forceRecreate = false) {
    return this.request<{
      success: boolean;
      message?: string;
      sandbox: {
        id?: string;
        previewUrl?: string;
        status: string;
        isExisting: boolean;
      };
    }>('/preview', {
      method: 'POST',
      body: JSON.stringify({ projectId, forceRecreate }),
    });
  }

  async getPreviewStatus(projectId: string) {
    return this.request<{
      success: boolean;
      sandbox: {
        id: string;
        previewUrl: string;
        status: string;
        projectType?: string;
        createdAt?: string;
        lastAccessed?: string;
        expiresAt?: string;
        isActive?: boolean;
      } | null;
    }>(`/preview/${projectId}`);
  }

  async updateSandboxAccess(sandboxId: string) {
    return this.request<{
      success: boolean;
      message: string;
    }>(`/preview/${sandboxId}/access`, {
      method: 'POST',
    });
  }

  async destroySandbox(sandboxId: string) {
    return this.request<{
      success: boolean;
      message: string;
    }>(`/preview/${sandboxId}`, {
      method: 'DELETE',
    });
  }

  async getUserSandboxes(status?: string, limit = 10) {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    params.append('limit', limit.toString());
    
    return this.request<{
      success: boolean;
      sandboxes: Array<{
        id: string;
        project_id: string;
        project_name: string;
        sandbox_id: string;
        preview_url: string;
        status: string;
        current_state: string;
        created_at: string;
        last_accessed: string;
        expires_at: string;
      }>;
      total: number;
    }>(`/preview?${params.toString()}`);
  }

  async syncSandboxFiles(sandboxId: string) {
    return this.request<{
      success: boolean;
      message: string;
      fileCount: number;
    }>(`/preview/${sandboxId}/sync`, {
      method: 'POST',
    });
  }

  async getSandboxStats() {
    return this.request<{
      success: boolean;
      currentStats: {
        total: number;
        active: number;
        creating: number;
        errors: number;
      };
      historicalStats: Array<{
        date: string;
        total_sandboxes: number;
        successful_sandboxes: number;
        failed_sandboxes: number;
        avg_setup_time_seconds: number;
        unique_users: number;
        unique_projects: number;
      }>;
    }>('/preview/stats/usage');
  }

  async cleanupSandboxes() {
    return this.request<{
      success: boolean;
      message: string;
    }>('/preview/cleanup', {
      method: 'POST',
    });
  }

  async getSyncStatus(projectId: string) {
    return this.request<{
      success: boolean;
      syncStatus: {
        isActive: boolean;
        pendingJobs: number;
        lastSync?: string;
      };
    }>(`/preview/${projectId}/sync-status`);
  }

  async triggerManualSync(projectId: string) {
    return this.request<{
      success: boolean;
      message: string;
      fileCount?: number;
    }>(`/preview/${projectId}/sync`, {
      method: 'POST',
    });
  }

  // Local Preview endpoints
  async createLocalPreview(projectId: string, forceRecreate = false) {
    return this.request<{
      success: boolean;
      preview: {
        projectId: string;
        url: string;
        port: number;
        status: string;
        isExisting: boolean;
      };
    }>('/local-preview', {
      method: 'POST',
      body: JSON.stringify({ projectId, forceRecreate }),
    });
  }

  async getLocalPreviewStatus(projectId: string) {
    return this.request<{
      success: boolean;
      preview: {
        projectId: string;
        url: string;
        port: number;
        status: string;
      } | null;
    }>(`/local-preview/${projectId}`);
  }

  async updateLocalPreview(projectId: string) {
    return this.request<{
      success: boolean;
      message: string;
      preview: {
        projectId: string;
        url: string;
        port: number;
        status: string;
      };
    }>(`/local-preview/${projectId}/update`, {
      method: 'POST',
    });
  }

  async stopLocalPreview(projectId: string) {
    return this.request<{
      success: boolean;
      message: string;
    }>(`/local-preview/${projectId}`, {
      method: 'DELETE',
    });
  }

  async getUserLocalPreviews() {
    return this.request<{
      success: boolean;
      previews: Array<{
        projectId: string;
        projectName: string;
        url: string;
        port: number;
        status: string;
      }>;
      total: number;
    }>('/local-preview');
  }
}

export const api = new ApiClient(API_URL);