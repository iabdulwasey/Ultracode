import { create } from 'zustand';
import type { ChatSession, ChatMessage, ChatContext, AIModel } from '@ultracode/shared';
import { api } from '@/lib/api';
import { supabase } from '@/lib/supabase';

interface ChatState {
  sessions: Record<string, ChatSession>;
  currentSessionId: string | null;
  loading: boolean;
  error: string | null;
  generating: boolean;
  streamingMessage: string;
  selectedModel: AIModel;
  
  // Actions
  loadChatSession: (projectId: string) => Promise<void>;
  sendMessage: (projectId: string, prompt: string, context?: ChatContext) => Promise<void>;
  clearChat: (sessionId: string) => Promise<void>;
  setSelectedModel: (model: AIModel) => void;
  updateStreamingMessage: (content: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  sessions: {},
  currentSessionId: null,
  loading: false,
  error: null,
  generating: false,
  streamingMessage: '',
  selectedModel: 'claude-sonnet-4-20250514',

  loadChatSession: async (projectId: string) => {
    console.log('chatStore: loadChatSession called for project', projectId);
    set({ loading: true, error: null });
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Fetch or create chat session
      const { data: sessions, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('project_id', projectId)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;

      let session: ChatSession;
      
      if (sessions && sessions.length > 0) {
        // Use existing session
        console.log('Loading existing chat session:', sessions[0].id, 'with', sessions[0].messages?.length || 0, 'messages');
        session = {
          id: sessions[0].id,
          projectId: sessions[0].project_id,
          userId: sessions[0].user_id,
          messages: sessions[0].messages || [],
          context: sessions[0].context || {},
          tokensUsed: sessions[0].tokens_used || 0,
          model: sessions[0].model || 'claude-sonnet-4-20250514',
          createdAt: new Date(sessions[0].created_at),
          updatedAt: new Date(sessions[0].updated_at),
        };
      } else {
        // Create new session
        const { data: newSession, error: createError } = await supabase
          .from('chat_sessions')
          .insert({
            project_id: projectId,
            user_id: user.id,
            messages: [],
            context: {},
            tokens_used: 0,
            model: get().selectedModel,
          })
          .select()
          .single();

        if (createError) throw createError;

        session = {
          id: newSession.id,
          projectId: newSession.project_id,
          userId: newSession.user_id,
          messages: [],
          context: {},
          tokensUsed: 0,
          model: newSession.model,
          createdAt: new Date(newSession.created_at),
          updatedAt: new Date(newSession.updated_at),
        };
      }

      set({
        sessions: { ...get().sessions, [session.id]: session },
        currentSessionId: session.id,
        loading: false,
      });
    } catch (error) {
      console.error('Failed to load chat session:', error);
      set({ error: error.message, loading: false });
    }
  },

  sendMessage: async (projectId: string, prompt: string, context?: ChatContext) => {
    const { currentSessionId, sessions, selectedModel } = get();
    
    if (!currentSessionId || !sessions[currentSessionId]) {
      await get().loadChatSession(projectId);
      return get().sendMessage(projectId, prompt, context);
    }

    const session = sessions[currentSessionId];
    
    // Add user message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: prompt,
      timestamp: new Date(),
    };

    const updatedMessages = [...session.messages, userMessage];
    
    set({
      sessions: {
        ...sessions,
        [currentSessionId]: {
          ...session,
          messages: updatedMessages,
        },
      },
      generating: true,
      streamingMessage: '',
      error: null,
    });

    try {
      // Call the AI generation API with streaming
      const response = await api.generateCode(projectId, prompt, {
        ...context,
        model: selectedModel,
      });

      if (!response.ok) {
        throw new Error('Generation failed');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';
      let buffer = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.trim() === '') continue;
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              
              try {
                const parsed = JSON.parse(data);
                
                if (parsed.event === 'chunk' && parsed.data?.content) {
                  assistantMessage += parsed.data.content;
                  set({ streamingMessage: assistantMessage });
                } else if (parsed.event === 'end' && parsed.data) {
                  // Handle final response with files
                  if (parsed.data.files && parsed.data.files.length > 0) {
                    console.log('Generated files:', parsed.data.files);
                    // Emit event for file updates (legacy support)
                    window.dispatchEvent(new CustomEvent('files-generated', {
                      detail: { projectId, files: parsed.data.files }
                    }));
                    
                    // WebSocket integration will automatically handle the real-time updates
                    // The database trigger will detect the file changes and broadcast via WebSocket
                    console.log('AI generation complete - WebSocket will handle real-time sync');
                  }
                } else if (parsed.event === 'error') {
                  throw new Error(parsed.data?.message || 'Generation failed');
                }
              } catch (e) {
                console.error('Failed to parse SSE data:', e);
              }
            }
          }
        }
      }

      // Add assistant message
      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: assistantMessage,
        timestamp: new Date(),
        metadata: {
          model: selectedModel,
        },
      };

      const finalMessages = [...updatedMessages, aiMessage];

      // Update session in database
      const { error: updateError } = await supabase
        .from('chat_sessions')
        .update({
          messages: finalMessages,
          context: context || session.context,
          updated_at: new Date().toISOString(),
        })
        .eq('id', currentSessionId);

      if (updateError) {
        console.error('Failed to update chat session:', updateError);
        // Still update local state even if database update fails
      } else {
        console.log('Successfully updated chat session with', finalMessages.length, 'messages');
      }

      set({
        sessions: {
          ...get().sessions,
          [currentSessionId]: {
            ...session,
            messages: finalMessages,
            context: context || session.context,
          },
        },
        generating: false,
        streamingMessage: '',
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to send message',
        generating: false,
        streamingMessage: '',
      });
    }
  },

  clearChat: async (sessionId: string) => {
    try {
      await supabase
        .from('chat_sessions')
        .update({
          messages: [],
          tokens_used: 0,
          updated_at: new Date().toISOString(),
        })
        .eq('id', sessionId);

      const sessions = get().sessions;
      if (sessions[sessionId]) {
        set({
          sessions: {
            ...sessions,
            [sessionId]: {
              ...sessions[sessionId],
              messages: [],
              tokensUsed: 0,
            },
          },
        });
      }
    } catch (error) {
      console.error('Failed to clear chat:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to clear chat' });
    }
  },

  setSelectedModel: (model: AIModel) => {
    set({ selectedModel: model });
  },

  updateStreamingMessage: (content: string) => {
    set({ streamingMessage: content });
  },
}));