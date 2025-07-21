import type { ChatMessage } from '@ultracode/shared';
import { MessageItem } from './MessageItem';
import { Loader2 } from 'lucide-react';

interface MessageListProps {
  messages: ChatMessage[];
  streamingMessage?: string;
  generating?: boolean;
}

export function MessageList({ messages, streamingMessage, generating }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      
      {generating && streamingMessage && (
        <MessageItem
          message={{
            id: 'streaming',
            role: 'assistant',
            content: streamingMessage,
            timestamp: new Date(),
          }}
          isStreaming
        />
      )}
      
      {generating && !streamingMessage && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>AI is thinking...</span>
        </div>
      )}
    </div>
  );
}