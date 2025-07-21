import { supabase } from './supabase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

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

    if (error) throw error;

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

  // AI Generation endpoints - still use the backend API
  async generateCode(projectId: string, prompt: string, context?: any) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const response = await fetch(`${this.baseUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        projectId,
        prompt,
        context,
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
}

export const api = new ApiClient(API_URL);