/**
 * Edit Intent Analyzer - Agentic surgical edit system
 * Based on Open-Lovable's advanced edit intent classification
 * 
 * This service analyzes user prompts to determine:
 * 1. Edit type (UPDATE_COMPONENT, ADD_FEATURE, FIX_ISSUE, etc.)
 * 2. Target files to modify (surgical precision)
 * 3. Confidence scoring
 * 4. Context requirements
 */

import { logger } from '../utils/logger.js';

// Edit classification types
export enum EditType {
  UPDATE_COMPONENT = 'UPDATE_COMPONENT',    // "update the header", "change button color"
  ADD_FEATURE = 'ADD_FEATURE',              // "add a videos page", "create new component"
  FIX_ISSUE = 'FIX_ISSUE',                 // "fix the styling", "resolve error"
  REFACTOR = 'REFACTOR',                   // "reorganize", "clean up"
  FULL_REBUILD = 'FULL_REBUILD',           // "start over", "recreate everything"
  UPDATE_STYLE = 'UPDATE_STYLE',           // "change colors", "update theme"
  ADD_DEPENDENCY = 'ADD_DEPENDENCY',       // "install package", "add library"
  REMOVE_ELEMENT = 'REMOVE_ELEMENT'        // "remove button", "delete section"
}

export interface EditIntent {
  type: EditType;
  targetFiles: string[];           // Predicted files to edit  
  confidence: number;              // 0-1 confidence score
  description: string;             // Human-readable description
  suggestedContext: string[];      // Additional files for context
  searchTerms: string[];           // Terms to search for in files
  regexPatterns?: string[];        // Regex patterns for advanced searching
}

export interface IntentPattern {
  patterns: RegExp[];
  type: EditType;
  fileResolver: (prompt: string, fileTree: Record<string, string>) => string[];
}

export interface FileInfo {
  path: string;
  content: string;
  type: string;
  lastModified?: number;
}

/**
 * Analyze user prompts to determine edit intent and target files
 */
export class EditIntentAnalyzer {
  
  analyzePrompt(prompt: string, fileTree: Record<string, string>): EditIntent {
    const lowerPrompt = prompt.toLowerCase();
    
    logger.info('Analyzing edit intent', { prompt, fileCount: Object.keys(fileTree).length });
    
    // Define intent patterns based on Open-Lovable's approach
    const patterns: IntentPattern[] = [
      {
        patterns: [
          /update\s+(the\s+)?(\w+)\s+(component|section|page)/i,
          /change\s+(the\s+)?(\w+)/i,
          /modify\s+(the\s+)?(\w+)/i,
          /edit\s+(the\s+)?(\w+)/i,
          /fix\s+(the\s+)?(\w+)\s+(styling|style|css|layout)/i,
        ],
        type: EditType.UPDATE_COMPONENT,
        fileResolver: (p, ft) => this.findComponentByContent(p, ft),
      },
      {
        patterns: [
          /remove\s+.*\s+(button|link|text|element|section)/i,
          /delete\s+.*\s+(button|link|text|element|section)/i,
          /hide\s+.*\s+(button|link|text|element|section)/i,
        ],
        type: EditType.REMOVE_ELEMENT,
        fileResolver: (p, ft) => this.findComponentByContent(p, ft),
      },
      {
        patterns: [
          /add\s+(a\s+)?new\s+(\w+)\s+(page|section|feature|component)/i,
          /create\s+(a\s+)?(\w+)\s+(page|section|feature|component)/i,
          /implement\s+(a\s+)?(\w+)\s+(page|section|feature)/i,
          /build\s+(a\s+)?(\w+)\s+(page|section|feature)/i,
          /add\s+(\w+)\s+to\s+(?:the\s+)?(\w+)/i,
          /add\s+(?:a\s+)?(\w+)\s+(?:component|section)/i,
          /include\s+(?:a\s+)?(\w+)/i,
        ],
        type: EditType.ADD_FEATURE,
        fileResolver: (p, ft) => this.findFeatureInsertionPoints(p, ft),
      },
      {
        patterns: [
          /fix\s+(the\s+)?(\w+|\w+\s+\w+)(?!\s+styling|\s+style)/i,
          /resolve\s+(the\s+)?error/i,
          /debug\s+(the\s+)?(\w+)/i,
          /repair\s+(the\s+)?(\w+)/i,
        ],
        type: EditType.FIX_ISSUE,
        fileResolver: (p, ft) => this.findProblemFiles(p, ft),
      },
      {
        patterns: [
          /change\s+(the\s+)?(color|theme|style|styling|css)/i,
          /update\s+(the\s+)?(color|theme|style|styling|css)/i,
          /make\s+it\s+(dark|light|blue|red|green)/i,
          /style\s+(the\s+)?(\w+)/i,
        ],
        type: EditType.UPDATE_STYLE,
        fileResolver: (p, ft) => this.findStyleFiles(p, ft),
      },
      {
        patterns: [
          /refactor\s+(the\s+)?(\w+)/i,
          /clean\s+up\s+(the\s+)?code/i,
          /reorganize\s+(the\s+)?(\w+)/i,
          /optimize\s+(the\s+)?(\w+)/i,
        ],
        type: EditType.REFACTOR,
        fileResolver: (p, ft) => this.findComponentFiles(p, ft),
      },
      {
        patterns: [
          /start\s+over/i,
          /recreate\s+everything/i,
          /rebuild\s+(the\s+)?app/i,
          /new\s+app/i,
          /from\s+scratch/i,
        ],
        type: EditType.FULL_REBUILD,
        fileResolver: (p, ft) => this.findEntryPoint(ft),
      },
      {
        patterns: [
          /install\s+(\w+)/i,
          /add\s+(\w+)\s+(package|library|dependency)/i,
          /use\s+(\w+)\s+(library|framework)/i,
        ],
        type: EditType.ADD_DEPENDENCY,
        fileResolver: (p, ft) => this.findPackageFiles(ft),
      },
    ];
    
    // Find matching pattern
    for (const pattern of patterns) {
      for (const regex of pattern.patterns) {
        if (regex.test(lowerPrompt)) {
          const targetFiles = pattern.fileResolver(prompt, fileTree);
          const suggestedContext = this.getSuggestedContext(targetFiles, fileTree);
          const searchTerms = this.extractSearchTerms(prompt, pattern.type);
          
          const editIntent: EditIntent = {
            type: pattern.type,
            targetFiles,
            confidence: this.calculateConfidence(prompt, pattern, targetFiles),
            description: this.generateDescription(pattern.type, prompt, targetFiles),
            suggestedContext,
            searchTerms,
            regexPatterns: this.generateRegexPatterns(prompt, pattern.type)
          };
          
          logger.info('Edit intent analyzed', {
            type: editIntent.type,
            targetFiles: editIntent.targetFiles,
            confidence: editIntent.confidence,
            searchTerms: editIntent.searchTerms
          });
          
          return editIntent;
        }
      }
    }
    
    // Default to component update if no pattern matches
    const defaultIntent: EditIntent = {
      type: EditType.UPDATE_COMPONENT,
      targetFiles: this.findEntryPoint(fileTree),
      confidence: 0.3,
      description: 'General update to application',
      suggestedContext: [],
      searchTerms: this.extractSearchTerms(prompt, EditType.UPDATE_COMPONENT)
    };
    
    logger.info('Using default edit intent', defaultIntent);
    return defaultIntent;
  }

  /**
   * Find component files mentioned in the prompt by searching content
   */
  private findComponentByContent(prompt: string, fileTree: Record<string, string>): string[] {
    const files: string[] = [];
    const lowerPrompt = prompt.toLowerCase();
    
    logger.debug('Finding component by content', { prompt });
    
    // Extract quoted strings or specific button/link text
    const quotedStrings = prompt.match(/["']([^"']+)["']/g) || [];
    const searchTerms: string[] = quotedStrings.map(s => s.replace(/["']/g, ''));
    
    // Also look for specific terms after 'remove', 'delete', 'hide'
    const actionMatch = prompt.match(/(?:remove|delete|hide)\s+(?:the\s+)?(.+?)(?:\s+button|\s+link|\s+text|\s+element|\s+section|$)/i);
    if (actionMatch) {
      searchTerms.push(actionMatch[1].trim());
    }
    
    // If we have search terms, look for them in file contents
    if (searchTerms.length > 0) {
      for (const [path, content] of Object.entries(fileTree)) {
        // Only search in component files
        if (!path.includes('.jsx') && !path.includes('.tsx')) continue;
        
        const lowerContent = content.toLowerCase();
        
        for (const term of searchTerms) {
          if (lowerContent.includes(term.toLowerCase())) {
            logger.debug('Found content match', { term, path });
            files.push(path);
            break; // Only add file once
          }
        }
      }
    }
    
    // If no files found by content, fall back to component name search
    if (files.length === 0) {
      return this.findComponentFiles(prompt, fileTree);
    }
    
    // Return only the first match to avoid editing multiple files
    return [files[0]];
  }

  /**
   * Find component files by extracting component names from prompt
   */
  private findComponentFiles(prompt: string, fileTree: Record<string, string>): string[] {
    const files: string[] = [];
    const lowerPrompt = prompt.toLowerCase();
    
    // Extract component names from prompt
    const componentWords = this.extractComponentNames(prompt);
    
    // First pass: Look for exact component file matches
    for (const [path, content] of Object.entries(fileTree)) {
      const fileName = path.split('/').pop()?.toLowerCase() || '';
      
      for (const word of componentWords) {
        if (fileName.includes(word)) {
          logger.debug('Component file match', { word, path });
          files.push(path);
          break;
        }
      }
    }
    
    // If no specific component found, check for common UI elements
    if (files.length === 0) {
      const uiElements = [
        'header', 'footer', 'nav', 'sidebar', 'button', 'card', 'modal', 
        'hero', 'banner', 'about', 'services', 'features', 'testimonials', 
        'gallery', 'contact', 'team', 'pricing'
      ];
      
      for (const element of uiElements) {
        if (lowerPrompt.includes(element)) {
          // Look for exact component file matches first
          for (const [path, content] of Object.entries(fileTree)) {
            const fileName = path.split('/').pop()?.toLowerCase() || '';
            if (fileName.includes(element + '.') || fileName === element) {
              files.push(path);
              logger.debug('UI element match', { element, path });
              return [path]; // Return immediately with just this file
            }
          }
        }
      }
    }
    
    return files.length > 0 ? [files[0]] : this.findEntryPoint(fileTree);
  }

  /**
   * Find where to add new features
   */
  private findFeatureInsertionPoints(prompt: string, fileTree: Record<string, string>): string[] {
    const files: string[] = [];
    const lowerPrompt = prompt.toLowerCase();
    
    // For new pages, we need routing files and layout
    if (lowerPrompt.includes('page')) {
      // Find router configuration
      for (const [path, content] of Object.entries(fileTree)) {
        if (content.includes('Route') || 
            content.includes('createBrowserRouter') ||
            path.includes('router') ||
            path.includes('routes')) {
          files.push(path);
        }
      }
      
      // Also include App.jsx for navigation updates
      const entryPoint = this.findEntryPoint(fileTree);
      if (entryPoint.length > 0) {
        files.push(entryPoint[0]);
      }
    }
    
    // For new components, find the most appropriate parent
    if (lowerPrompt.includes('component') || lowerPrompt.includes('section') || 
        lowerPrompt.includes('add') || lowerPrompt.includes('create')) {
      // Extract where to add it (e.g., "to the footer", "in header")
      const locationMatch = prompt.match(/(?:in|to|on|inside)\s+(?:the\s+)?(\w+)/i);
      if (locationMatch) {
        const location = locationMatch[1];
        const parentFiles = this.findComponentFiles(location, fileTree);
        files.push(...parentFiles);
      } else {
        // Default to App.jsx if no specific location found
        files.push(...this.findEntryPoint(fileTree));
      }
    }
    
    // Remove duplicates
    return [...new Set(files)];
  }

  /**
   * Find files that might have problems
   */
  private findProblemFiles(prompt: string, fileTree: Record<string, string>): string[] {
    const files: string[] = [];
    
    // Look for error keywords
    if (prompt.match(/error|bug|issue|problem|broken|not working/i)) {
      // For now, check recently modified files or just return all component files
      // In a real implementation, you'd check git history or error logs
      const componentFiles = Object.keys(fileTree).filter(path => 
        path.includes('.jsx') || path.includes('.tsx')
      ).slice(0, 3); // Limit to 3 files
      
      files.push(...componentFiles);
    }
    
    // Also check for specific component mentions
    const componentFiles = this.findComponentFiles(prompt, fileTree);
    files.push(...componentFiles);
    
    return [...new Set(files)];
  }

  /**
   * Find style-related files
   */
  private findStyleFiles(prompt: string, fileTree: Record<string, string>): string[] {
    const files: string[] = [];
    
    // Add CSS files if they exist
    for (const [path, content] of Object.entries(fileTree)) {
      if (path.includes('.css') || path.includes('tailwind.config')) {
        files.push(path);
      }
    }
    
    // If specific component styling mentioned, include that component
    const componentFiles = this.findComponentFiles(prompt, fileTree);
    files.push(...componentFiles);
    
    return [...new Set(files)];
  }

  /**
   * Find package configuration files
   */
  private findPackageFiles(fileTree: Record<string, string>): string[] {
    const files: string[] = [];
    
    for (const path of Object.keys(fileTree)) {
      if (path.endsWith('package.json') || 
          path.endsWith('vite.config.js') ||
          path.endsWith('vite.config.ts') ||
          path.endsWith('tsconfig.json')) {
        files.push(path);
      }
    }
    
    return files;
  }

  /**
   * Find the main entry point (App.tsx/jsx)
   */
  private findEntryPoint(fileTree: Record<string, string>): string[] {
    for (const path of Object.keys(fileTree)) {
      if (path.includes('App.') && (path.includes('.jsx') || path.includes('.tsx'))) {
        return [path];
      }
    }
    
    // Fallback to first component file
    const firstComponent = Object.keys(fileTree).find(path => 
      path.includes('.jsx') || path.includes('.tsx')
    );
    
    return firstComponent ? [firstComponent] : [];
  }

  /**
   * Extract component names from prompt
   */
  private extractComponentNames(prompt: string): string[] {
    const words: string[] = [];
    
    // Remove common words but keep component-related words
    const cleanPrompt = prompt
      .replace(/\b(the|a|an|in|on|to|from|update|change|modify|edit|fix|make)\b/gi, '')
      .toLowerCase();
    
    // Extract potential component names (words that might be components)
    const matches = cleanPrompt.match(/\b\w+\b/g) || [];
    
    for (const match of matches) {
      if (match.length > 2) { // Skip very short words
        words.push(match);
      }
    }
    
    return words;
  }

  /**
   * Extract search terms from prompt based on edit type
   */
  private extractSearchTerms(prompt: string, editType: EditType): string[] {
    const terms: string[] = [];
    
    // Extract quoted strings
    const quotedStrings = prompt.match(/["']([^"']+)["']/g) || [];
    terms.push(...quotedStrings.map(s => s.replace(/["']/g, '')));
    
    // Extract component names
    const componentWords = this.extractComponentNames(prompt);
    terms.push(...componentWords);
    
    // Add edit-type specific terms
    switch (editType) {
      case EditType.UPDATE_STYLE:
        terms.push('className', 'style', 'css', 'color', 'background');
        break;
      case EditType.REMOVE_ELEMENT:
        const removeMatch = prompt.match(/(?:remove|delete|hide)\s+(?:the\s+)?(.+?)(?:\s+button|\s+link|\s+text|\s+element|\s+section|$)/i);
        if (removeMatch) {
          terms.push(removeMatch[1].trim());
        }
        break;
      case EditType.ADD_FEATURE:
        terms.push('return', 'render', 'jsx', 'component');
        break;
    }
    
    return [...new Set(terms)]; // Remove duplicates
  }

  /**
   * Generate regex patterns for advanced searching
   */
  private generateRegexPatterns(prompt: string, editType: EditType): string[] | undefined {
    const patterns: string[] = [];
    
    switch (editType) {
      case EditType.UPDATE_STYLE:
        patterns.push('className\\s*=\\s*["\'][^"\']*["\']');
        patterns.push('style\\s*=\\s*\\{[^}]*\\}');
        break;
      case EditType.REMOVE_ELEMENT:
        // Extract the element to remove and create pattern
        const removeMatch = prompt.match(/(?:remove|delete|hide)\s+(?:the\s+)?(.+?)(?:\s+button|\s+link|\s+text|\s+element|\s+section|$)/i);
        if (removeMatch) {
          const element = removeMatch[1].trim();
          patterns.push(`<[^>]*>${element}</[^>]*>`);
          patterns.push(`["']${element}["']`);
        }
        break;
      case EditType.ADD_FEATURE:
        patterns.push('return\\s*\\(');
        patterns.push('export\\s+default\\s+function');
        break;
    }
    
    return patterns.length > 0 ? patterns : undefined;
  }

  /**
   * Get additional files for context
   */
  private getSuggestedContext(targetFiles: string[], fileTree: Record<string, string>): string[] {
    // Return related component files but limit to avoid overwhelming the AI
    const allFiles = Object.keys(fileTree).filter(path => 
      path.includes('.jsx') || path.includes('.tsx')
    );
    
    const contextFiles = allFiles
      .filter(file => !targetFiles.includes(file))
      .slice(0, 3); // Limit context to 3 additional files
    
    return contextFiles;
  }

  /**
   * Calculate confidence score
   */
  private calculateConfidence(
    prompt: string,
    pattern: IntentPattern,
    targetFiles: string[]
  ): number {
    let confidence = 0.5; // Base confidence
    
    // Higher confidence if we found specific files
    if (targetFiles.length > 0 && targetFiles[0] !== '') {
      confidence += 0.2;
    }
    
    // Higher confidence for more specific prompts
    if (prompt.split(' ').length > 5) {
      confidence += 0.1;
    }
    
    // Higher confidence for exact pattern matches
    for (const regex of pattern.patterns) {
      if (regex.test(prompt)) {
        confidence += 0.2;
        break;
      }
    }
    
    return Math.min(confidence, 1.0);
  }

  /**
   * Generate human-readable description
   */
  private generateDescription(
    type: EditType,
    prompt: string,
    targetFiles: string[]
  ): string {
    const fileNames = targetFiles.map(f => f.split('/').pop()).join(', ');
    
    switch (type) {
      case EditType.UPDATE_COMPONENT:
        return `Updating component(s): ${fileNames}`;
      case EditType.ADD_FEATURE:
        return `Adding new feature to: ${fileNames}`;
      case EditType.FIX_ISSUE:
        return `Fixing issue in: ${fileNames}`;
      case EditType.UPDATE_STYLE:
        return `Updating styles in: ${fileNames}`;
      case EditType.REMOVE_ELEMENT:
        return `Removing element from: ${fileNames}`;
      case EditType.REFACTOR:
        return `Refactoring: ${fileNames}`;
      case EditType.FULL_REBUILD:
        return 'Rebuilding entire application';
      case EditType.ADD_DEPENDENCY:
        return 'Adding new dependency';
      default:
        return `Editing: ${fileNames}`;
    }
  }
}

// Export singleton instance
export const editIntentAnalyzer = new EditIntentAnalyzer();