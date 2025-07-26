import { useState, useRef, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Paperclip, Code, Settings, Trash2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import type { AIModel } from '@ultracode/shared';

interface InputBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
  selectedModel: AIModel;
  onModelChange: (model: AIModel) => void;
  models: { value: AIModel; label: string }[];
  onClearChat: () => void;
  canClearChat: boolean;
}

export function InputBox({ value, onChange, onSend, disabled, placeholder, selectedModel, onModelChange, models, onClearChat, canClearChat }: InputBoxProps) {
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
            <TooltipProvider delayDuration={0}>
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
            
            <TooltipProvider delayDuration={0}>
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

            <DropdownMenu onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        disabled={disabled}
                        type="button"
                      >
                        <Settings className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Chat settings</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>AI Model</DropdownMenuLabel>
                {models.map((model) => (
                  <DropdownMenuItem
                    key={model.value}
                    onClick={() => onModelChange(model.value)}
                    className={selectedModel === model.value ? "bg-accent" : ""}
                  >
                    {model.label}
                    {selectedModel === model.value && (
                      <span className="ml-auto">✓</span>
                    )}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onClearChat}
                  disabled={!canClearChat}
                  className="text-destructive"
                >
                  <Trash2 className="h-3 w-3 mr-2" />
                  Clear chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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