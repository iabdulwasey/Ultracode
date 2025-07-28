import { useState, useEffect, useRef } from 'react';
import { useChatStore } from '@/stores/chatStore';
import { MessageList } from './MessageList';
import { InputBox } from './InputBox';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useProjectSync } from '@/hooks';
import type { AIModel } from '@ultracode/shared';

interface ChatInterfaceProps {
  projectId: string;
}

const models: { value: AIModel; label: string }[] = [
  { value: 'claude-sonnet-4-20250514', label: 'Claude Sonnet 4' },
  { value: 'claude-opus-4-20250514', label: 'Claude Opus 4' },
  { value: 'gpt-4o', label: 'GPT-4' },
  { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
];

export function ChatInterface({ projectId }: ChatInterfaceProps) {
  const {
    sessions,
    currentSessionId,
    loading,
    error,
    generating,
    streamingMessage,
    selectedModel,
    loadChatSession,
    sendMessage,
    clearChat,
    setSelectedModel,
  } = useChatStore();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // WebSocket integration for real-time updates
  const {
    isConnected,
    buildStatus,
    isBuilding,
    hasError,
    buildProgress,
    buildMessage
  } = useProjectSync({
    projectId,
    onFilesUpdated: (files) => {
      console.log('Files updated in chat interface:', files);
      // Files are automatically synced via WebSocket
      // The IDE and preview will be notified automatically
    },
    onPreviewReady: () => {
      console.log('Preview is ready for project:', projectId);
    },
    onError: (errorMessage) => {
      console.error('WebSocket error in chat:', errorMessage);
    }
  });

  useEffect(() => {
    // Only load chat session if we don't already have one for this project
    const currentSession = currentSessionId ? sessions[currentSessionId] : null;
    const isCorrectProject = currentSession?.projectId === projectId;
    
    if (!isCorrectProject) {
      console.log('ChatInterface: Loading chat session for project', projectId);
      loadChatSession(projectId);
    } else {
      console.log('ChatInterface: Already have session for project', projectId, 'with', currentSession.messages.length, 'messages');
    }
  }, [projectId, currentSessionId, sessions]); // Only reload when actually needed

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sessions[currentSessionId!]?.messages, streamingMessage]);

  const handleSendMessage = async () => {
    if (!input.trim() || generating) return;

    const message = input.trim();
    setInput('');
    await sendMessage(projectId, message);
  };

  const handleClearChat = async () => {
    if (currentSessionId) {
      await clearChat(currentSessionId);
    }
  };

  const currentSession = currentSessionId ? sessions[currentSessionId] : null;
  const messages = currentSession?.messages || [];

  if (loading && messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Loading chat...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden">

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 min-h-0">
            {messages.length === 0 && !generating ? (
              <div className="text-center py-8">
                <h4 className="text-lg font-medium mb-2">Start a conversation</h4>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  Ask me to help you build features, fix bugs, or explain code. I can generate complete applications from your descriptions.
                </p>
                <div className="mt-6 space-y-2">
                  <p className="text-sm font-medium">Try asking:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setInput('Create a modern landing page with a hero section')}
                    >
                      Create a landing page
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setInput('Add user authentication with login and signup')}
                    >
                      Add authentication
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setInput('Build a contact form that sends emails')}
                    >
                      Build contact form
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <MessageList
                messages={messages}
                streamingMessage={streamingMessage}
                generating={generating}
              />
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex-shrink-0 px-4 py-2 bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Build Status Indicator */}
      {(isBuilding || hasError) && (
        <div className={`flex-shrink-0 px-4 py-2 text-sm ${
          hasError 
            ? 'bg-destructive/10 text-destructive' 
            : 'bg-blue-50 text-blue-700'
        }`}>
          <div className="flex items-center space-x-2">
            {isBuilding && (
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            )}
            <span>{buildMessage || (hasError ? 'Build failed' : 'Building...')}</span>
            {buildProgress > 0 && (
              <div className="flex-1 bg-gray-200 rounded-full h-2 ml-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${buildProgress}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Connection Status */}
      {!isConnected && (
        <div className="flex-shrink-0 px-4 py-1 bg-yellow-50 text-yellow-700 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Reconnecting to real-time updates...</span>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex-shrink-0 p-4">
        <InputBox
          value={input}
          onChange={setInput}
          onSend={handleSendMessage}
          disabled={generating}
          placeholder={generating ? 'AI is thinking...' : 'Ask me anything...'}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          models={models}
          onClearChat={handleClearChat}
          canClearChat={messages.length > 0 && !generating}
        />
      </div>
    </div>
  );
}