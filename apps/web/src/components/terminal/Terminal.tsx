import { useEffect, useRef, useState } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { useTheme } from '@/components/theme-provider';
import 'xterm/css/xterm.css';

interface TerminalProps {
  projectId: string;
}

export function Terminal({ projectId }: TerminalProps) {
  const { theme } = useTheme();
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentLine, setCurrentLine] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    if (!terminalRef.current || xtermRef.current) return;

    // Initialize terminal
    const term = new XTerm({
      theme: {
        background: theme === 'dark' ? '#1e1e1e' : '#ffffff',
        foreground: theme === 'dark' ? '#cccccc' : '#333333',
        cursor: theme === 'dark' ? '#ffffff' : '#333333',
        black: '#000000',
        red: '#cd3131',
        green: '#0dbc79',
        yellow: '#e5e510',
        blue: '#2472c8',
        magenta: '#bc3fbc',
        cyan: '#11a8cd',
        white: '#e5e5e5',
        brightBlack: '#666666',
        brightRed: '#f14c4c',
        brightGreen: '#23d18b',
        brightYellow: '#f5f543',
        brightBlue: '#3b8eea',
        brightMagenta: '#d670d6',
        brightCyan: '#29b8db',
        brightWhite: '#e5e5e5',
      },
      fontFamily: 'Consolas, "Courier New", monospace',
      fontSize: 14,
      lineHeight: 1.2,
      cursorBlink: true,
      cursorStyle: 'block',
    });

    // Add addons
    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();
    
    term.loadAddon(fitAddon);
    term.loadAddon(webLinksAddon);
    
    // Open terminal
    term.open(terminalRef.current);
    
    // Wait for terminal to be properly mounted before fitting
    setTimeout(() => {
      if (terminalRef.current && terminalRef.current.offsetWidth > 0) {
        fitAddon.fit();
      }
    }, 100);
    
    // Store refs
    xtermRef.current = term;
    fitAddonRef.current = fitAddon;
    
    // Welcome message
    term.writeln('Ultracode Terminal - Project: ' + projectId);
    term.writeln('Type "help" for available commands');
    term.write('$ ');
    
    // Handle input
    let currentCommand = '';
    let cursorPos = 0;
    
    term.onData((data) => {
      const code = data.charCodeAt(0);
      
      // Handle special keys
      if (code === 27) { // ESC sequence
        const sequence = data.slice(1);
        if (sequence === '[A') { // Up arrow
          handleHistoryNavigation('up', term, currentCommand);
        } else if (sequence === '[B') { // Down arrow
          handleHistoryNavigation('down', term, currentCommand);
        } else if (sequence === '[D') { // Left arrow
          if (cursorPos > 0) {
            cursorPos--;
            term.write('\x1b[D');
          }
        } else if (sequence === '[C') { // Right arrow
          if (cursorPos < currentCommand.length) {
            cursorPos++;
            term.write('\x1b[C');
          }
        }
        return;
      }
      
      if (code === 13) { // Enter
        term.write('\r\n');
        if (currentCommand.trim()) {
          executeCommand(currentCommand.trim(), term);
          setCommandHistory(prev => [...prev, currentCommand.trim()]);
          setHistoryIndex(-1);
        }
        currentCommand = '';
        cursorPos = 0;
        term.write('$ ');
      } else if (code === 127) { // Backspace
        if (cursorPos > 0) {
          const before = currentCommand.slice(0, cursorPos - 1);
          const after = currentCommand.slice(cursorPos);
          currentCommand = before + after;
          cursorPos--;
          
          // Move cursor back, clear to end of line, rewrite text
          term.write('\b');
          term.write(after + ' ');
          for (let i = 0; i <= after.length; i++) {
            term.write('\b');
          }
        }
      } else if (code === 9) { // Tab (autocomplete)
        const completion = getAutocompletion(currentCommand);
        if (completion) {
          const remaining = completion.slice(currentCommand.length);
          currentCommand += remaining;
          cursorPos += remaining.length;
          term.write(remaining);
        }
      } else if (code >= 32) { // Printable characters
        const char = String.fromCharCode(code);
        const before = currentCommand.slice(0, cursorPos);
        const after = currentCommand.slice(cursorPos);
        currentCommand = before + char + after;
        cursorPos++;
        
        term.write(char);
        if (after) {
          term.write(after);
          for (let i = 0; i < after.length; i++) {
            term.write('\b');
          }
        }
      }
      
      setCurrentLine(currentCommand);
      setCursorPosition(cursorPos);
    });

    return () => {
      term.dispose();
      xtermRef.current = null;
      fitAddonRef.current = null;
    };
  }, [projectId, theme]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (fitAddonRef.current && xtermRef.current && terminalRef.current && terminalRef.current.offsetWidth > 0) {
        try {
          fitAddonRef.current.fit();
        } catch (error) {
          console.warn('Failed to fit terminal:', error);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleHistoryNavigation = (direction: 'up' | 'down', term: XTerm, currentCommand: string) => {
    if (commandHistory.length === 0) return;
    
    let newIndex = historyIndex;
    if (direction === 'up') {
      newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
    } else {
      newIndex = historyIndex === -1 ? -1 : Math.min(commandHistory.length - 1, historyIndex + 1);
    }
    
    if (newIndex !== historyIndex) {
      setHistoryIndex(newIndex);
      
      // Clear current line
      term.write('\r$ ' + ' '.repeat(currentCommand.length));
      term.write('\r$ ');
      
      // Write new command
      const newCommand = newIndex === -1 ? '' : commandHistory[newIndex];
      term.write(newCommand);
      setCurrentLine(newCommand);
      setCursorPosition(newCommand.length);
    }
  };

  const getAutocompletion = (partial: string): string | null => {
    const commands = ['help', 'clear', 'ls', 'cd', 'pwd', 'npm', 'yarn', 'pnpm', 'git', 'node', 'python'];
    const match = commands.find(cmd => cmd.startsWith(partial) && cmd !== partial);
    return match || null;
  };

  const executeCommand = (command: string, term: XTerm) => {
    const [cmd, ...args] = command.split(' ');
    
    switch (cmd) {
      case 'help':
        term.writeln('Available commands:');
        term.writeln('  help     - Show this help message');
        term.writeln('  clear    - Clear the terminal');
        term.writeln('  ls       - List files and directories');
        term.writeln('  cd       - Change directory');
        term.writeln('  pwd      - Print working directory');
        term.writeln('  npm      - Run npm commands');
        term.writeln('  yarn     - Run yarn commands');
        term.writeln('  git      - Run git commands');
        break;
        
      case 'clear':
        term.clear();
        break;
        
      case 'ls':
        term.writeln('src/');
        term.writeln('package.json');
        term.writeln('README.md');
        term.writeln('tsconfig.json');
        term.writeln('vite.config.ts');
        break;
        
      case 'pwd':
        term.writeln(`/projects/${projectId}`);
        break;
        
      case 'cd':
        if (args[0]) {
          term.writeln(`Changed directory to ${args[0]}`);
        } else {
          term.writeln('Usage: cd <directory>');
        }
        break;
        
      case 'npm':
        if (args[0] === 'run' && args[1] === 'dev') {
          term.writeln('Starting development server...');
          term.writeln('');
          term.writeln('  VITE v5.0.0  ready in 425 ms');
          term.writeln('');
          term.writeln('  ➜  Local:   http://localhost:5173/');
          term.writeln('  ➜  Network: use --host to expose');
          term.writeln('  ➜  press h to show help');
        } else if (args[0] === 'install') {
          term.writeln('Installing dependencies...');
          setTimeout(() => {
            term.writeln('✓ Dependencies installed');
          }, 1000);
        } else {
          term.writeln('npm command simulated');
        }
        break;
        
      case 'git':
        if (args[0] === 'status') {
          term.writeln('On branch main');
          term.writeln('nothing to commit, working tree clean');
        } else if (args[0] === 'init') {
          term.writeln('Initialized empty Git repository');
        } else {
          term.writeln('git command simulated');
        }
        break;
        
      default:
        term.writeln(`Command not found: ${cmd}`);
        term.writeln('Type "help" for available commands');
    }
  };

  return <div ref={terminalRef} className="h-full bg-[#1e1e1e]" />;
}