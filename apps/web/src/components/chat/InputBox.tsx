import { useState, useRef, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Paperclip, Code } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface InputBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export function InputBox({ value, onChange, onSend, disabled, placeholder }: InputBoxProps) {
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleFileAttach = () => {
    // TODO: Implement file attachment from project files
    console.log('File attachment not yet implemented');
  };

  const handleCodeContext = () => {
    // TODO: Implement code context selection
    console.log('Code context selection not yet implemented');
  };

  return (
    <div className="flex flex-col gap-2">
      {attachedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 text-sm">
          {attachedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-2 py-1 bg-muted rounded"
            >
              <span>{file}</span>
              <button
                onClick={() => setAttachedFiles(files => files.filter((_, i) => i !== index))}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="min-h-[80px] max-h-[200px] resize-none pr-10"
            rows={3}
          />
          
          <div className="absolute bottom-2 right-2 flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={handleFileAttach}
                    disabled={disabled}
                    type="button"
                  >
                    <Paperclip className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Attach files from project</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={handleCodeContext}
                    disabled={disabled}
                    type="button"
                  >
                    <Code className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add code context</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        <Button
          onClick={onSend}
          disabled={disabled || !value.trim()}
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
}