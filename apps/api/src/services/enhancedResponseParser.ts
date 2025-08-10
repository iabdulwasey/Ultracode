/**
 * Enhanced AI Response Parser - Advanced parsing with error recovery
 * Based on Open-Lovable's sophisticated response parsing system
 * 
 * This service handles complex AI response parsing with duplicate detection,
 * truncation recovery, and robust error handling.
 */

import { logger } from '../utils/logger.js';

export interface ParsedResponse {
  explanation: string;
  template: string;
  files: Array<{ path: string; content: string; type: string }>;
  packages: string[];
  commands: string[];
  structure: string | null;
  warnings: string[];
  errors: string[];
}

export interface ParsedFile {
  path: string;
  content: string;
  type: string;
  isComplete: boolean;
  hasWarnings: boolean;
  warnings: string[];
}

/**
 * Enhanced AI Response Parser with sophisticated error handling
 */
export class EnhancedResponseParser {
  private fileCompletionPatterns = [
    '...', // Generic truncation
    '// ... rest of component', // Component truncation
    '// ... other imports', // Import truncation
    '<!-- ... more content', // HTML truncation
    '/* ... additional styles', // CSS truncation
  ];

  /**
   * Parse AI response with enhanced duplicate handling and validation
   */
  parseAIResponse(response: string): ParsedResponse {
    const startTime = Date.now();
    const result: ParsedResponse = {
      explanation: '',
      template: '',
      files: [],
      packages: [],
      commands: [],
      structure: null,
      warnings: [],
      errors: []
    };

    try {
      // Parse file sections with enhanced duplicate handling
      const { files, warnings: fileWarnings } = this.parseFilesSections(response);
      result.files = files;
      result.warnings.push(...fileWarnings);

      // Parse packages with support for multiple formats
      result.packages = this.parsePackages(response);

      // Parse commands
      result.commands = this.parseCommands(response);

      // Parse structure
      result.structure = this.parseStructure(response);

      // Parse explanation
      result.explanation = this.parseExplanation(response);

      // Parse template
      result.template = this.parseTemplate(response);

      // Validate parsed results
      this.validateParsedResponse(result);

      const executionTime = Date.now() - startTime;
      logger.info('AI response parsing completed', {
        filesCount: result.files.length,
        packagesCount: result.packages.length,
        commandsCount: result.commands.length,
        warningsCount: result.warnings.length,
        errorsCount: result.errors.length,
        executionTime
      });

      return result;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown parsing error';
      logger.error('Failed to parse AI response', { error: errorMessage });
      
      result.errors.push(`Parsing failed: ${errorMessage}`);
      return result;
    }
  }

  /**
   * Parse file sections with sophisticated duplicate handling
   * Based on Open-Lovable's approach (Lines 28-79)
   */
  private parseFilesSections(response: string): { 
    files: Array<{ path: string; content: string; type: string }>;
    warnings: string[];
  } {
    const fileMap = new Map<string, { 
      content: string; 
      isComplete: boolean; 
      warnings: string[];
      confidence: number;
    }>();
    const warnings: string[] = [];

    // Enhanced regex patterns for different file formats
    const filePatterns = [
      // Standard format: <file path="...">content</file>
      /<file path="([^"]+)">([\s\S]*?)(?:<\/file>|$)/g,
      // Markdown format: ```language filename
      /```(?:(\w+)\s+)?([^\n\r]+)\n([\s\S]*?)```/g,
      // Alternative format: **filename**
      /\*\*([^*]+)\*\*\n```(?:\w+\n)?([\s\S]*?)```/g
    ];

    for (const pattern of filePatterns) {
      let match;
      while ((match = pattern.exec(response)) !== null) {
        let filePath: string;
        let content: string;
        let hasClosingTag = true;

        if (pattern === filePatterns[0]) {
          // Standard <file> format
          filePath = match[1];
          content = match[2].trim();
          hasClosingTag = response.substring(match.index!, match.index! + match[0].length).includes('</file>');
        } else if (pattern === filePatterns[1]) {
          // Markdown code block format  
          filePath = match[2];
          content = match[3].trim();
          hasClosingTag = true; // Code blocks are always complete
        } else {
          // Alternative markdown format
          filePath = match[1];
          content = match[2].trim();
          hasClosingTag = true;
        }

        // Validate file path
        if (!this.isValidFilePath(filePath)) {
          warnings.push(`Invalid file path detected: ${filePath}`);
          continue;
        }

        const existing = fileMap.get(filePath);
        const isComplete = hasClosingTag && !this.hasCompletionPatterns(content);
        const fileWarnings: string[] = [];
        
        // Check for truncation patterns
        if (this.hasCompletionPatterns(content)) {
          fileWarnings.push('File appears to be truncated or incomplete');
        }

        // Validate content quality
        const contentValidation = this.validateFileContent(filePath, content);
        fileWarnings.push(...contentValidation.warnings);

        // Calculate confidence score
        let confidence = this.calculateFileConfidence(filePath, content, isComplete);

        // Decide whether to keep this version using Open-Lovable's logic
        let shouldReplace = false;
        if (!existing) {
          shouldReplace = true; // First occurrence
        } else if (!existing.isComplete && isComplete) {
          shouldReplace = true; // Replace incomplete with complete
          logger.debug(`Replacing incomplete ${filePath} with complete version`);
        } else if (existing.isComplete && isComplete && content.length > existing.content.length) {
          shouldReplace = true; // Replace with longer complete version
          logger.debug(`Replacing ${filePath} with longer complete version`);
        } else if (!existing.isComplete && !isComplete && confidence > existing.confidence) {
          shouldReplace = true; // Both incomplete, keep higher confidence
        }

        if (shouldReplace) {
          fileMap.set(filePath, {
            content,
            isComplete,
            warnings: fileWarnings,
            confidence
          });
        }
      }
    }

    // Convert map to array and add file types
    const files: Array<{ path: string; content: string; type: string }> = [];
    
    for (const [path, fileData] of fileMap.entries()) {
      if (!fileData.isComplete) {
        warnings.push(`File ${path} appears to be truncated (no closing tag or incomplete content)`);
      }

      warnings.push(...fileData.warnings);

      files.push({
        path,
        content: fileData.content,
        type: this.determineFileType(path)
      });
    }

    return { files, warnings };
  }

  /**
   * Parse packages with support for multiple formats
   * Based on Open-Lovable's approach (Lines 87-103)
   */
  private parsePackages(response: string): string[] {
    const packages: string[] = [];

    // Parse individual <package> tags
    const pkgRegex = /<package>(.*?)<\/package>/g;
    let match;
    while ((match = pkgRegex.exec(response)) !== null) {
      const packageName = match[1].trim();
      if (this.isValidPackageName(packageName)) {
        packages.push(packageName);
      }
    }

    // Parse <packages> block with multiple packages
    const packagesRegex = /<packages>([\s\S]*?)<\/packages>/;
    const packagesMatch = response.match(packagesRegex);
    if (packagesMatch) {
      const packagesContent = packagesMatch[1].trim();
      const packagesList = packagesContent.split(/[\n,]+/)
        .map(pkg => pkg.trim())
        .filter(pkg => pkg.length > 0 && this.isValidPackageName(pkg));
      packages.push(...packagesList);
    }

    // Parse packages from markdown code blocks (npm install commands)
    const npmRegex = /npm install\s+([\w\s@/.-]+)/g;
    while ((match = npmRegex.exec(response)) !== null) {
      const packageList = match[1].trim().split(/\s+/)
        .filter(pkg => this.isValidPackageName(pkg));
      packages.push(...packageList);
    }

    // Remove duplicates and sort
    return [...new Set(packages)].sort();
  }

  /**
   * Parse commands from response
   */
  private parseCommands(response: string): string[] {
    const commands: string[] = [];
    
    const cmdRegex = /<command>(.*?)<\/command>/g;
    let match;
    while ((match = cmdRegex.exec(response)) !== null) {
      const command = match[1].trim();
      if (command.length > 0) {
        commands.push(command);
      }
    }

    return commands;
  }

  /**
   * Parse structure from response
   */
  private parseStructure(response: string): string | null {
    const structureMatch = response.match(/<structure>([\s\S]*?)<\/structure>/);
    return structureMatch ? structureMatch[1].trim() : null;
  }

  /**
   * Parse explanation from response
   */
  private parseExplanation(response: string): string {
    const explanationMatch = response.match(/<explanation>([\s\S]*?)<\/explanation>/);
    return explanationMatch ? explanationMatch[1].trim() : '';
  }

  /**
   * Parse template from response
   */
  private parseTemplate(response: string): string {
    const templateMatch = response.match(/<template>(.*?)<\/template>/);
    return templateMatch ? templateMatch[1].trim() : '';
  }

  /**
   * Check if content has completion patterns indicating truncation
   */
  private hasCompletionPatterns(content: string): boolean {
    return this.fileCompletionPatterns.some(pattern => 
      content.toLowerCase().includes(pattern.toLowerCase())
    );
  }

  /**
   * Validate file path format
   */
  private isValidFilePath(filePath: string): boolean {
    // Check for basic validity
    if (!filePath || filePath.trim().length === 0) return false;
    
    // Should not contain invalid characters
    if (/[<>:"|?*]/.test(filePath)) return false;
    
    // Should not be a command (like "npm install")
    if (filePath.includes('npm ') || filePath.includes('run ')) return false;
    
    // Should have a valid extension or be a config file
    const hasValidExtension = /\.(tsx?|jsx?|css|json|js|ts|html|md)$/i.test(filePath);
    const isConfigFile = /^(package\.json|vite\.config|tailwind\.config|postcss\.config)/i.test(filePath.split('/').pop() || '');
    
    return hasValidExtension || isConfigFile;
  }

  /**
   * Validate package name format
   */
  private isValidPackageName(packageName: string): boolean {
    if (!packageName || packageName.trim().length === 0) return false;
    
    // Basic npm package name validation
    const npmPackageRegex = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/i;
    return npmPackageRegex.test(packageName.trim());
  }

  /**
   * Validate file content quality
   */
  private validateFileContent(filePath: string, content: string): { 
    isValid: boolean; 
    warnings: string[];
  } {
    const warnings: string[] = [];
    
    // Check for empty or very short content
    if (content.trim().length < 10) {
      warnings.push('File content is too short or empty');
    }

    // Check for React component validity
    if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) {
      if (!content.includes('export') && !content.includes('function') && !content.includes('const')) {
        warnings.push('React component file missing export statement');
      }
      
      // Check for unmatched JSX tags (basic validation)
      const openTags = (content.match(/<[^/][^>]*>/g) || []).length;
      const closeTags = (content.match(/<\/[^>]*>/g) || []).length;
      const selfClosingTags = (content.match(/<[^>]*\/>/g) || []).length;
      
      if (openTags - selfClosingTags !== closeTags) {
        warnings.push('Potential JSX tag mismatch detected');
      }
    }

    // Check for JSON validity
    if (filePath.endsWith('.json')) {
      try {
        JSON.parse(content);
      } catch {
        warnings.push('Invalid JSON format detected');
      }
    }

    return {
      isValid: warnings.length === 0,
      warnings
    };
  }

  /**
   * Calculate confidence score for file content
   */
  private calculateFileConfidence(filePath: string, content: string, isComplete: boolean): number {
    let confidence = 0.5; // Base confidence

    // Complete files get higher confidence
    if (isComplete) confidence += 0.3;

    // Longer content generally more confident (but not always better)
    if (content.length > 100) confidence += 0.1;
    if (content.length > 500) confidence += 0.1;

    // Valid structure increases confidence
    if (content.includes('export') && (filePath.endsWith('.tsx') || filePath.endsWith('.jsx'))) {
      confidence += 0.2;
    }

    // Package.json should be valid JSON
    if (filePath === 'package.json') {
      try {
        JSON.parse(content);
        confidence += 0.2;
      } catch {
        confidence -= 0.3;
      }
    }

    // Penalize truncation patterns
    if (this.hasCompletionPatterns(content)) {
      confidence -= 0.4;
    }

    return Math.max(0, Math.min(1, confidence));
  }

  /**
   * Determine file type from path
   */
  private determineFileType(filePath: string): string {
    const ext = filePath.split('.').pop()?.toLowerCase();
    const fileName = filePath.split('/').pop()?.toLowerCase();
    
    switch (ext) {
      case 'ts':
      case 'tsx':
        return 'typescript';
      case 'js':
      case 'jsx':
        return 'javascript';
      case 'json':
        return 'json';
      case 'css':
        return 'css';
      case 'html':
        return 'html';
      case 'md':
        return 'markdown';
      default:
        // Check for config files without extensions
        if (fileName?.includes('config') || fileName === 'dockerfile') {
          return 'config';
        }
        return 'text';
    }
  }

  /**
   * Validate the overall parsed response
   */
  private validateParsedResponse(result: ParsedResponse): void {
    // Check for essential files in full projects
    const hasAppFile = result.files.some(f => 
      f.path.toLowerCase().includes('app.') && 
      (f.path.endsWith('.tsx') || f.path.endsWith('.jsx'))
    );
    
    const hasPackageJson = result.files.some(f => 
      f.path.toLowerCase() === 'package.json'
    );

    if (result.files.length > 5 && !hasAppFile) {
      result.warnings.push('No main App component found in project files');
    }

    if (result.files.length > 3 && !hasPackageJson) {
      result.warnings.push('No package.json found - project may not build correctly');
    }

    // Check for component import mismatches
    this.validateComponentImports(result);
  }

  /**
   * Validate that imported components have corresponding files
   */
  private validateComponentImports(result: ParsedResponse): void {
    const componentFiles = result.files.filter(f => 
      f.path.endsWith('.tsx') || f.path.endsWith('.jsx')
    );

    for (const file of componentFiles) {
      // Extract import statements
      const importRegex = /import\s+(\w+)\s+from\s+['"]\.\/([^'"]+)['"];/g;
      let match;
      
      while ((match = importRegex.exec(file.content)) !== null) {
        const importedComponent = match[1];
        const importPath = match[2];
        
        // Check if the imported file exists
        const expectedPaths = [
          `${importPath}.tsx`,
          `${importPath}.jsx`,
          `${importPath}/index.tsx`,
          `${importPath}/index.jsx`
        ];
        
        const fileExists = expectedPaths.some(path => 
          result.files.some(f => f.path.endsWith(path))
        );
        
        if (!fileExists) {
          result.warnings.push(
            `Missing component: ${importedComponent} imported in ${file.path} but ${importPath} file not found`
          );
        }
      }
    }
  }

  /**
   * Get parsing statistics for monitoring
   */
  getParsingStats(): {
    totalParses: number;
    averageFileCount: number;
    commonWarnings: Array<{ warning: string; count: number }>;
  } {
    // This would be populated with actual statistics in a real implementation
    return {
      totalParses: 0,
      averageFileCount: 0,
      commonWarnings: []
    };
  }
}

// Export singleton instance
export const enhancedResponseParser = new EnhancedResponseParser();