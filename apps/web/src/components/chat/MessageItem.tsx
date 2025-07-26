import type { ChatMessage } from '@ultracode/shared';
import { User, Bot, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CodeBlock } from './CodeBlock';
import { GenerationTimeline } from './GenerationTimeline';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageItemProps {
  message: ChatMessage;
  isStreaming?: boolean;
}

export function MessageItem({ message, isStreaming }: MessageItemProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Detect if this is an AI code generation response
  const isGeneration = !isUser && (
    message.content.includes('```typescript') || 
    message.content.includes('```tsx') || 
    message.content.includes('```javascript') || 
    message.content.includes('```jsx') ||
    message.content.includes('```json') ||
    message.content.includes('package.json') ||
    message.content.includes('vite.config') ||
    message.content.includes('tailwind.config') ||
    message.content.includes('src/App.tsx') ||
    message.content.includes('src/components/') ||
    (message.content.includes('```') && message.content.length > 1000) // Long responses with code blocks
  );

  return (
    <div
      className={cn(
        'flex gap-3 w-full',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot className="h-4 w-4 text-primary" />
        </div>
      )}
      
      <div
        className={cn(
          'max-w-[80%] min-w-0 rounded-lg px-4 py-2 relative group overflow-hidden word-wrap',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted'
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap break-words overflow-wrap-anywhere">{message.content}</p>
        ) : isGeneration ? (
          // Show visual timeline for code generation
          <GenerationTimeline content={message.content} isStreaming={isStreaming} />
        ) : (
          // Show regular markdown for other responses
          <div className="prose prose-sm dark:prose-invert max-w-none overflow-hidden break-words">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const language = match ? match[1] : '';
                  
                  if (!inline && language) {
                    return (
                      <div className="overflow-hidden">
                        <CodeBlock
                          language={language}
                          code={String(children).replace(/\n$/, '')}
                        />
                      </div>
                    );
                  }
                  
                  return (
                    <code className="bg-muted px-1 py-0.5 rounded text-sm break-all overflow-wrap-anywhere" {...props}>
                      {children}
                    </code>
                  );
                },
                pre({ children }) {
                  return <div className="overflow-auto max-w-full">{children}</div>;
                },
                p({ children }) {
                  return <p className="mb-2 last:mb-0 break-words overflow-wrap-anywhere">{children}</p>;
                },
                ul({ children }) {
                  return <ul className="list-disc pl-4 mb-2 break-words">{children}</ul>;
                },
                ol({ children }) {
                  return <ol className="list-decimal pl-4 mb-2 break-words">{children}</ol>;
                },
                li({ children }) {
                  return <li className="mb-1 break-words overflow-wrap-anywhere">{children}</li>;
                },
                h1({ children }) {
                  return <h1 className="text-xl font-bold mb-2 break-words overflow-wrap-anywhere">{children}</h1>;
                },
                h2({ children }) {
                  return <h2 className="text-lg font-semibold mb-2 break-words overflow-wrap-anywhere">{children}</h2>;
                },
                h3({ children }) {
                  return <h3 className="text-base font-medium mb-2 break-words overflow-wrap-anywhere">{children}</h3>;
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
        
        {!isUser && !isStreaming && !isGeneration && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
            onClick={copyToClipboard}
          >
            {copied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        )}
        
        {isStreaming && (
          <span className="inline-block w-1 h-4 bg-primary animate-pulse ml-1" />
        )}
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}