/**
 * File Analysis Engine - Advanced file parsing and relationship mapping
 * Based on Open-Lovable's sophisticated file analysis system
 * 
 * This service parses JavaScript/React files to extract imports, exports,
 * component information, and builds comprehensive dependency trees.
 */

import { logger } from '../utils/logger.js';

export interface ImportInfo {
  source: string; // e.g., './Header', 'react', '@/components/Button'
  imports: string[]; // Named imports
  defaultImport?: string; // Default import name
  isLocal: boolean; // true if starts with './' or '@/'
}

export interface ComponentInfo {
  name: string;
  props?: string[]; // Prop names if detectable
  hooks?: string[]; // Hooks used (useState, useEffect, etc)
  hasState: boolean;
  childComponents?: string[]; // Components rendered inside
}

export interface FileInfo {
  content: string;
  type: 'component' | 'page' | 'style' | 'config' | 'utility' | 'layout' | 'hook' | 'context';
  exports?: string[]; // Named exports and default export
  imports?: ImportInfo[]; // Dependencies
  lastModified: number;
  componentInfo?: ComponentInfo; // For React components
  path: string;
  relativePath: string; // Path relative to src/
}

export interface ComponentTree {
  [componentName: string]: {
    file: string;
    imports: string[]; // Components it imports
    importedBy: string[]; // Components that import it
    type: 'page' | 'layout' | 'component';
  };
}

export interface RouteInfo {
  path: string; // Route path (e.g., '/videos', '/about')
  component: string; // Component file path
  layout?: string; // Layout component if any
}

export interface FileManifest {
  files: Record<string, FileInfo>;
  routes: RouteInfo[];
  componentTree: ComponentTree;
  entryPoint: string; // Usually App.jsx or main.jsx
  styleFiles: string[]; // All CSS files
  timestamp: number;
}

/**
 * Advanced file analysis engine with component relationship mapping
 */
export class FileAnalysisEngine {

  /**
   * Parse a JavaScript/JSX file to extract comprehensive information
   * Based on Open-Lovable's file-parser.ts
   */
  parseJavaScriptFile(content: string, filePath: string): Partial<FileInfo> {
    const startTime = Date.now();
    
    try {
      const imports = this.extractImports(content);
      const exports = this.extractExports(content);
      const componentInfo = this.extractComponentInfo(content, filePath);
      const fileType = this.determineFileType(filePath, content);
      
      const result: Partial<FileInfo> = {
        imports,
        exports,
        componentInfo,
        type: fileType,
      };

      const executionTime = Date.now() - startTime;
      logger.debug('Parsed JavaScript file', {
        filePath,
        fileType,
        importsCount: imports.length,
        exportsCount: exports.length,
        hasComponent: !!componentInfo,
        executionTime
      });

      return result;

    } catch (error) {
      logger.error('Failed to parse JavaScript file', {
        filePath,
        error: error instanceof Error ? error.message : String(error)
      });
      
      return {
        type: 'utility',
        imports: [],
        exports: []
      };
    }
  }

  /**
   * Extract import statements from file content
   * Enhanced version of Open-Lovable's extractImports
   */
  private extractImports(content: string): ImportInfo[] {
    const imports: ImportInfo[] = [];
    
    // Match various import statement patterns
    const patterns = [
      // Standard imports: import ... from '...'
      /import\s+(?:(.+?)\s+from\s+)?['"](.+?)['"]/g,
      // Dynamic imports: import('...')  
      /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
      // Require statements: const ... = require('...')
      /(?:const|let|var)\s+.*?=\s*require\s*\(\s*['"]([^'"]+)['"]\s*\)/g
    ];
    
    for (const pattern of patterns) {
      const matches = content.matchAll(pattern);
      
      for (const match of matches) {
        let importClause: string | undefined;
        let source: string;
        
        if (pattern === patterns[0]) {
          // Standard import
          importClause = match[1];
          source = match[2];
        } else {
          // Dynamic import or require
          source = match[1];
        }

        const importInfo: ImportInfo = {
          source,
          imports: [],
          isLocal: this.isLocalImport(source),
        };
        
        if (importClause) {
          // Parse import clause
          this.parseImportClause(importClause, importInfo);
        }
        
        imports.push(importInfo);
      }
    }
    
    return imports;
  }

  /**
   * Parse import clause to extract default and named imports
   */
  private parseImportClause(importClause: string, importInfo: ImportInfo): void {
    const trimmed = importClause.trim();
    
    // Handle default import: import React from 'react'
    const defaultMatch = trimmed.match(/^(\w+)(?:,|$)/);
    if (defaultMatch) {
      importInfo.defaultImport = defaultMatch[1];
    }
    
    // Handle named imports: import { useState, useEffect } from 'react'
    const namedMatch = trimmed.match(/\{([^}]+)\}/);
    if (namedMatch) {
      importInfo.imports = namedMatch[1]
        .split(',')
        .map(imp => imp.trim())
        .map(imp => {
          // Handle "import as" syntax
          const parts = imp.split(/\s+as\s+/);
          return parts[0].trim();
        })
        .filter(imp => imp.length > 0);
    }
    
    // Handle namespace imports: import * as utils from './utils'
    const namespaceMatch = trimmed.match(/\*\s+as\s+(\w+)/);
    if (namespaceMatch) {
      importInfo.imports.push(`*:${namespaceMatch[1]}`);
    }
  }

  /**
   * Check if an import is local (relative or alias path)
   */
  private isLocalImport(source: string): boolean {
    return source.startsWith('./') || 
           source.startsWith('../') || 
           source.startsWith('@/') ||
           source.startsWith('~/');
  }

  /**
   * Extract export statements from file content
   * Enhanced version of Open-Lovable's extractExports
   */
  private extractExports(content: string): string[] {
    const exports: string[] = [];
    
    // Match default export
    const defaultExportPatterns = [
      /export\s+default\s+(?:function\s+)?(\w+)/,
      /export\s+default\s+(class\s+\w+)/,
      /export\s+{\s*(\w+)\s+as\s+default\s*}/
    ];
    
    for (const pattern of defaultExportPatterns) {
      const match = content.match(pattern);
      if (match) {
        exports.push(`default:${match[1]}`);
        break;
      }
    }
    
    // Check for anonymous default export
    if (!exports.some(exp => exp.startsWith('default:'))) {
      if (/export\s+default\s+(?!function\s+\w+|class\s+\w+)/.test(content)) {
        exports.push('default');
      }
    }
    
    // Match named exports
    const namedExportPatterns = [
      /export\s+(?:const|let|var|function|class)\s+(\w+)/g,
      /export\s*{\s*([^}]+)\s*}/g
    ];
    
    for (const pattern of namedExportPatterns) {
      const matches = content.matchAll(pattern);
      
      for (const match of matches) {
        if (pattern === namedExportPatterns[0]) {
          // Direct export declaration
          exports.push(match[1]);
        } else {
          // Export block
          const names = match[1]
            .split(',')
            .map(exp => exp.trim())
            .map(exp => {
              // Handle "export as" syntax
              const parts = exp.split(/\s+as\s+/);
              return parts[0].trim();
            })
            .filter(name => name.length > 0);
          exports.push(...names);
        }
      }
    }
    
    return [...new Set(exports)]; // Remove duplicates
  }

  /**
   * Extract React component information
   * Enhanced version of Open-Lovable's extractComponentInfo
   */
  private extractComponentInfo(content: string, filePath: string): ComponentInfo | undefined {
    // Check if this is likely a React component
    const hasJSX = /<[A-Z]\w*|<[a-z]+\s+[^>]*\/?>/.test(content);
    const hasReactImport = content.includes('React') || content.includes('from \'react\'');
    
    if (!hasJSX && !hasReactImport) return undefined;
    
    // Try to find component name
    let componentName = this.extractComponentName(content, filePath);
    
    if (!componentName) return undefined;
    
    // Extract hooks used
    const hooks = this.extractHooks(content);
    
    // Check if component has state
    const hasState = hooks.includes('useState') || 
                    hooks.includes('useReducer') ||
                    content.includes('this.state');
    
    // Extract props (basic extraction)
    const props = this.extractProps(content, componentName);
    
    // Extract child components
    const childComponents = this.extractChildComponents(content, componentName);
    
    return {
      name: componentName,
      props,
      hooks,
      hasState,
      childComponents,
    };
  }

  /**
   * Extract component name from content and file path
   */
  private extractComponentName(content: string, filePath: string): string | undefined {
    // Check for function component
    const funcPatterns = [
      /(?:export\s+)?(?:default\s+)?function\s+([A-Z]\w*)\s*\(/,
      /(?:export\s+)?(?:default\s+)?(?:const|let)\s+([A-Z]\w*)\s*=\s*(?:\([^)]*\)|[^=])*=>/,
      /(?:export\s+)?(?:default\s+)?(?:const|let)\s+([A-Z]\w*)\s*=\s*forwardRef/,
      /(?:export\s+)?(?:default\s+)?class\s+([A-Z]\w*)\s+extends/
    ];
    
    for (const pattern of funcPatterns) {
      const match = content.match(pattern);
      if (match) {
        return match[1];
      }
    }
    
    // If no component name found, try to get from filename
    const fileName = filePath.split('/').pop()?.replace(/\.(jsx?|tsx?)$/, '');
    if (fileName && /^[A-Z]/.test(fileName)) {
      return fileName;
    }
    
    return undefined;
  }

  /**
   * Extract React hooks from content
   */
  private extractHooks(content: string): string[] {
    const hooks: string[] = [];
    const hookRegex = /\b(use[A-Z]\w*)\b/g;
    const matches = content.matchAll(hookRegex);
    
    for (const match of matches) {
      const hook = match[1];
      if (!hooks.includes(hook)) {
        hooks.push(hook);
      }
    }
    
    return hooks.sort();
  }

  /**
   * Extract component props (basic extraction)
   */
  private extractProps(content: string, componentName: string): string[] | undefined {
    const props: string[] = [];
    
    // Try to find props in function signature
    const funcPropPattern = new RegExp(`function\\s+${componentName}\\s*\\(\\s*(?:\\{([^}]+)\\}|([^)]+))\\s*\\)`);
    const arrowPropPattern = new RegExp(`${componentName}\\s*=\\s*(?:\\(\\s*)?(?:\\{([^}]+)\\}|([^)]+))(?:\\s*\\))?\\s*=>`);
    
    const funcMatch = content.match(funcPropPattern);
    const arrowMatch = content.match(arrowPropPattern);
    
    const propsMatch = funcMatch || arrowMatch;
    if (propsMatch) {
      const propsString = propsMatch[1] || propsMatch[2];
      if (propsString) {
        const extractedProps = propsString
          .split(',')
          .map(prop => prop.trim().split(/[:\s=]/)[0])
          .filter(prop => prop.length > 0 && /^[a-zA-Z_$]/.test(prop));
        
        props.push(...extractedProps);
      }
    }
    
    return props.length > 0 ? props : undefined;
  }

  /**
   * Extract child components (components used inside this component)
   */
  private extractChildComponents(content: string, componentName: string): string[] {
    const childComponents: string[] = [];
    
    // Find JSX component usage
    const componentRegex = /<([A-Z]\w*)[^>]*(?:\/?>|>)/g;
    const matches = content.matchAll(componentRegex);
    
    for (const match of matches) {
      const comp = match[1];
      if (!childComponents.includes(comp) && comp !== componentName) {
        childComponents.push(comp);
      }
    }
    
    return childComponents;
  }

  /**
   * Determine file type based on path and content
   * Enhanced version of Open-Lovable's determineFileType
   */
  private determineFileType(filePath: string, content: string): FileInfo['type'] {
    const fileName = filePath.split('/').pop()?.toLowerCase() || '';
    const dirPath = filePath.toLowerCase();
    
    // Style files
    if (fileName.endsWith('.css') || fileName.endsWith('.scss') || fileName.endsWith('.sass')) {
      return 'style';
    }
    
    // Config files
    if (fileName.includes('config') || 
        fileName === 'vite.config.js' ||
        fileName === 'vite.config.ts' ||
        fileName === 'tailwind.config.js' ||
        fileName === 'postcss.config.js' ||
        fileName === 'package.json' ||
        fileName === 'tsconfig.json') {
      return 'config';
    }
    
    // Hook files
    if (dirPath.includes('/hooks/') || fileName.startsWith('use') && fileName.endsWith('.ts')) {
      return 'hook';
    }
    
    // Context files
    if (dirPath.includes('/context/') || fileName.includes('context')) {
      return 'context';
    }
    
    // Layout components
    if (fileName.includes('layout') || 
        content.includes('children') && content.includes('props')) {
      return 'layout';
    }
    
    // Page components
    if (dirPath.includes('/pages/') || 
        dirPath.includes('/app/') ||
        content.includes('useRouter') ||
        content.includes('useParams') ||
        content.includes('useNavigate')) {
      return 'page';
    }
    
    // Utility files
    if (dirPath.includes('/utils/') || 
        dirPath.includes('/lib/') ||
        dirPath.includes('/helpers/') ||
        (!content.includes('export default') && !content.includes('JSX'))) {
      return 'utility';
    }
    
    // Default to component for React files
    return 'component';
  }

  /**
   * Build component dependency tree
   * Based on Open-Lovable's buildComponentTree
   */
  buildComponentTree(files: Record<string, FileInfo>): ComponentTree {
    const tree: ComponentTree = {};
    
    // First pass: collect all components
    for (const [path, fileInfo] of Object.entries(files)) {
      if (fileInfo.componentInfo) {
        const componentName = fileInfo.componentInfo.name;
        tree[componentName] = {
          file: path,
          imports: [],
          importedBy: [],
          type: fileInfo.type === 'page' ? 'page' : 
                fileInfo.type === 'layout' ? 'layout' : 'component',
        };
      }
    }
    
    // Second pass: build relationships
    for (const [path, fileInfo] of Object.entries(files)) {
      if (fileInfo.componentInfo && fileInfo.imports) {
        const componentName = fileInfo.componentInfo.name;
        
        // Find imported components
        for (const imp of fileInfo.imports) {
          if (imp.isLocal) {
            // Check default import
            if (imp.defaultImport && tree[imp.defaultImport]) {
              tree[componentName].imports.push(imp.defaultImport);
              tree[imp.defaultImport].importedBy.push(componentName);
            }
            
            // Check named imports
            for (const namedImport of imp.imports) {
              if (tree[namedImport]) {
                tree[componentName].imports.push(namedImport);
                tree[namedImport].importedBy.push(componentName);
              }
            }
          }
        }
      }
    }
    
    logger.info('Built component dependency tree', {
      componentsCount: Object.keys(tree).length,
      relationships: Object.values(tree).reduce((sum, comp) => sum + comp.imports.length, 0)
    });
    
    return tree;
  }

  /**
   * Create file manifest with comprehensive project analysis
   */
  createFileManifest(files: Array<{ path: string; content: string }>): FileManifest {
    const startTime = Date.now();
    const manifest: FileManifest = {
      files: {},
      routes: [],
      componentTree: {},
      entryPoint: '',
      styleFiles: [],
      timestamp: Date.now()
    };

    // Process each file
    for (const file of files) {
      const fileInfo = this.parseJavaScriptFile(file.content, file.path);
      
      manifest.files[file.path] = {
        content: file.content,
        path: file.path,
        relativePath: file.path.replace(/^(src\/|\.\/)?/, ''),
        lastModified: Date.now(),
        type: fileInfo.type || 'utility',
        imports: fileInfo.imports || [],
        exports: fileInfo.exports || [],
        componentInfo: fileInfo.componentInfo
      };
      
      // Track style files
      if (fileInfo.type === 'style' || file.path.endsWith('.css')) {
        manifest.styleFiles.push(file.path);
      }
    }

    // Build component tree
    manifest.componentTree = this.buildComponentTree(manifest.files);

    // Find entry point
    manifest.entryPoint = this.findEntryPoint(manifest.files);

    // Extract routes (basic detection)
    manifest.routes = this.extractRoutes(manifest.files);

    const executionTime = Date.now() - startTime;
    logger.info('Created file manifest', {
      filesCount: Object.keys(manifest.files).length,
      componentsCount: Object.keys(manifest.componentTree).length,
      routesCount: manifest.routes.length,
      styleFilesCount: manifest.styleFiles.length,
      entryPoint: manifest.entryPoint,
      executionTime
    });

    return manifest;
  }

  /**
   * Find the main entry point of the application
   */
  private findEntryPoint(files: Record<string, FileInfo>): string {
    const candidates = [
      'src/App.tsx', 'src/App.jsx',
      'App.tsx', 'App.jsx',
      'src/main.tsx', 'src/main.jsx',
      'main.tsx', 'main.jsx'
    ];

    for (const candidate of candidates) {
      if (files[candidate]) {
        return candidate;
      }
    }

    // Find any file with 'App' in the name
    for (const [path] of Object.entries(files)) {
      if (path.includes('App.') && (path.endsWith('.tsx') || path.endsWith('.jsx'))) {
        return path;
      }
    }

    return '';
  }

  /**
   * Extract route information from files
   */
  private extractRoutes(files: Record<string, FileInfo>): RouteInfo[] {
    const routes: RouteInfo[] = [];

    for (const [path, fileInfo] of Object.entries(files)) {
      if (fileInfo.type === 'page' && fileInfo.componentInfo) {
        // Basic route extraction - could be enhanced with actual router parsing
        const routePath = this.pathToRoute(path);
        routes.push({
          path: routePath,
          component: path
        });
      }
    }

    return routes;
  }

  /**
   * Convert file path to route path
   */
  private pathToRoute(filePath: string): string {
    let route = filePath
      .replace(/^src\//, '')
      .replace(/^pages\//, '')
      .replace(/\.(tsx|jsx)$/, '')
      .toLowerCase();

    if (route === 'index' || route === 'home') {
      return '/';
    }

    return `/${route}`;
  }

  /**
   * Get analysis statistics for monitoring
   */
  getAnalysisStats(): {
    totalFilesAnalyzed: number;
    componentsParsed: number;
    averageImportsPerFile: number;
    mostCommonFileTypes: Array<{ type: string; count: number }>;
  } {
    // This would be populated with actual statistics in a real implementation
    return {
      totalFilesAnalyzed: 0,
      componentsParsed: 0,
      averageImportsPerFile: 0,
      mostCommonFileTypes: []
    };
  }
}

// Export singleton instance
export const fileAnalysisEngine = new FileAnalysisEngine();