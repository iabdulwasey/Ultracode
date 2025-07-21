import { useState, useEffect, useRef } from 'react';
import { useChatStore } from '@/stores/chatStore';
import { MessageList } from './MessageList';
import { InputBox } from './InputBox';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2, Settings } from 'lucide-react';
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
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadChatSession(projectId);
  }, [projectId, loadChatSession]);

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
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <h3 className="font-semibold">AI Assistant</h3>
          <Select
            value={selectedModel}
            onValueChange={(value) => setSelectedModel(value as AIModel)}
            disabled={generating}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  {model.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClearChat}
            disabled={messages.length === 0 || generating}
            title="Clear chat"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Chat settings">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-4">
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

      {/* Error Display */}
      {error && (
        <div className="px-4 py-2 bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Input Area */}
      <div className="border-t p-4">
        <InputBox
          value={input}
          onChange={setInput}
          onSend={handleSendMessage}
          disabled={generating}
          placeholder={generating ? 'AI is thinking...' : 'Ask me anything...'}
        />
      </div>
    </div>
  );
}