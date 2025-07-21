import type { ChatMessage } from '@ultracode/shared';
import { User, Bot, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CodeBlock } from './CodeBlock';
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

  return (
    <div
      className={cn(
        'flex gap-3',
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
          'max-w-[80%] rounded-lg px-4 py-2 relative group',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted'
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const language = match ? match[1] : '';
                  
                  if (!inline && language) {
                    return (
                      <CodeBlock
                        language={language}
                        code={String(children).replace(/\n$/, '')}
                      />
                    );
                  }
                  
                  return (
                    <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props}>
                      {children}
                    </code>
                  );
                },
                pre({ children }) {
                  return <>{children}</>;
                },
                p({ children }) {
                  return <p className="mb-2 last:mb-0">{children}</p>;
                },
                ul({ children }) {
                  return <ul className="list-disc pl-4 mb-2">{children}</ul>;
                },
                ol({ children }) {
                  return <ol className="list-decimal pl-4 mb-2">{children}</ol>;
                },
                li({ children }) {
                  return <li className="mb-1">{children}</li>;
                },
                h1({ children }) {
                  return <h1 className="text-xl font-bold mb-2">{children}</h1>;
                },
                h2({ children }) {
                  return <h2 className="text-lg font-semibold mb-2">{children}</h2>;
                },
                h3({ children }) {
                  return <h3 className="text-base font-medium mb-2">{children}</h3>;
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
        
        {!isUser && !isStreaming && (
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