export interface ChatSession {
  id: string;
  projectId: string;
  userId: string;
  messages: ChatMessage[];
  context: ChatContext;
  tokensUsed: number;
  model: AIModel;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: MessageMetadata;
  timestamp: Date;
}

export interface MessageMetadata {
  model?: string;
  tokens?: number;
  duration?: number;
  error?: string;
}

export interface ChatContext {
  files?: string[];
  selectedCode?: string;
  error?: string;
  currentFile?: string;
  fileTree?: Record<string, any>;
}

export type AIModel = 'claude-sonnet-4-20250514' | 'claude-opus-4-20250514' | 'gpt-4o' | 'gpt-4-turbo';

export interface GenerateRequest {
  projectId: string;
  prompt: string;
  context?: ChatContext;
  options?: GenerateOptions;
}

export interface GenerateOptions {
  model?: AIModel;
  temperature?: number;
  maxTokens?: number;
}

export interface GenerateResponse {
  content: string;
  files?: GeneratedFile[];
  usage: TokenUsage;
}

export interface GeneratedFile {
  path: string;
  content: string;
  type: string;
  action?: 'create' | 'update' | 'delete';
}

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}