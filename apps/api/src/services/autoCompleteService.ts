/**
 * Auto-Complete Service - Generate missing components automatically
 * Based on Open-Lovable's auto-completion system (apply-ai-code/route.ts:570-609)
 * 
 * This service automatically generates missing components that are referenced
 * in imports but don't have corresponding files, preventing build failures.
 */

import Anthropic from '@anthropic-ai/sdk';
import { logger } from '../utils/logger.js';
import { fileAnalysisEngine, FileManifest } from './fileAnalysisEngine.js';

interface MissingComponent {
  name: string;
  importPath: string;
  usedInFile: string;
  contextInfo?: {
    parentComponent: string;
    usage: string; // How it's used (e.g., "<Button />", "Button({...})")
    propsPattern?: string; // Inferred props from usage
  };
}

interface AutoCompleteResult {
  success: boolean;
  generatedFiles: Array<{ path: string; content: string; type: string }>;
  failedComponents: string[];
  warnings: string[];
  executionTime: number;
}

/**
 * Auto-Complete Service for missing component generation
 */
export class AutoCompleteService {
  private anthropic: Anthropic;

  constructor() {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('Anthropic API key not configured for auto-complete service');
    }
    this.anthropic = new Anthropic({ apiKey });
  }

  /**
   * Generate missing components based on import analysis
   * Based on Open-Lovable's approach
   */
  async generateMissingComponents(
    missingImports: string[],
    existingFiles: Array<{ path: string; content: string; type: string }>,
    options: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
    } = {}
  ): Promise<AutoCompleteResult> {
    const startTime = Date.now();
    const result: AutoCompleteResult = {
      success: false,
      generatedFiles: [],
      failedComponents: [],
      warnings: [],
      executionTime: 0
    };

    try {
      logger.info('Starting auto-completion for missing components', {
        missingImports,
        existingFilesCount: existingFiles.length
      });

      // Analyze existing files to understand project context
      const manifest = fileAnalysisEngine.createFileManifest(existingFiles);
      
      // Analyze missing components for context
      const missingComponents = this.analyzeMissingComponents(missingImports, manifest);

      if (missingComponents.length === 0) {
        result.warnings.push('No valid missing components detected for auto-completion');
        result.executionTime = Date.now() - startTime;
        return result;
      }

      // Build context-aware prompt for component generation
      const prompt = this.buildAutoCompletePrompt(missingComponents, manifest);

      // Generate missing components using AI
      const generatedContent = await this.generateWithAI(prompt, options);

      // Parse generated components
      const parsedFiles = this.parseGeneratedComponents(generatedContent, missingComponents);

      // Validate generated components
      const validationResult = this.validateGeneratedComponents(parsedFiles, missingComponents);

      result.generatedFiles = validationResult.validFiles;
      result.failedComponents = validationResult.failedComponents;
      result.warnings = validationResult.warnings;
      result.success = result.generatedFiles.length > 0;
      result.executionTime = Date.now() - startTime;

      logger.info('Auto-completion completed', {
        requestedComponents: missingComponents.length,
        generatedFiles: result.generatedFiles.length,
        failedComponents: result.failedComponents.length,
        executionTime: result.executionTime
      });

      return result;

    } catch (error) {
      logger.error('Auto-completion failed', {
        missingImports,
        error: error instanceof Error ? error.message : String(error)
      });

      result.warnings.push(`Auto-completion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      result.executionTime = Date.now() - startTime;
      return result;
    }
  }

  /**
   * Analyze missing components to understand context and usage
   */
  private analyzeMissingComponents(
    missingImports: string[],
    manifest: FileManifest
  ): MissingComponent[] {
    const missingComponents: MissingComponent[] = [];

    for (const importPath of missingImports) {
      // Extract component name from import path
      const componentName = importPath.split('/').pop()?.replace(/^\.\//, '') || importPath;
      
      if (!componentName || componentName.length === 0) continue;

      // Find where this component is used
      const usageContext = this.findComponentUsage(componentName, manifest);

      const missingComponent: MissingComponent = {
        name: componentName,
        importPath,
        usedInFile: usageContext?.parentFile || 'unknown',
        contextInfo: usageContext
      };

      missingComponents.push(missingComponent);
    }

    return missingComponents;
  }

  /**
   * Find how and where a component is used in the project
   */
  private findComponentUsage(
    componentName: string,
    manifest: FileManifest
  ): MissingComponent['contextInfo'] | undefined {
    for (const [filePath, fileInfo] of Object.entries(manifest.files)) {
      if (fileInfo.content.includes(`<${componentName}`)) {
        // Extract usage pattern
        const usageRegex = new RegExp(`<${componentName}[^>]*(?:/>|>[\\s\\S]*?</${componentName}>)`, 'g');
        const usageMatch = fileInfo.content.match(usageRegex);
        
        if (usageMatch) {
          // Extract props pattern
          const propsPattern = this.extractPropsPattern(usageMatch[0]);
          
          return {
            parentComponent: fileInfo.componentInfo?.name || filePath,
            usage: usageMatch[0],
            propsPattern
          };
        }
      }
    }
    
    return undefined;
  }

  /**
   * Extract props pattern from component usage
   */
  private extractPropsPattern(usage: string): string | undefined {
    // Extract props from JSX usage
    const propsRegex = /(\w+)=\{?([^}\s>]+)\}?/g;
    const props: string[] = [];
    let match;
    
    while ((match = propsRegex.exec(usage)) !== null) {
      props.push(`${match[1]}: ${match[2].includes('{') ? 'any' : 'string'}`);
    }
    
    return props.length > 0 ? `{ ${props.join(', ')} }` : undefined;
  }

  /**
   * Build auto-complete prompt with context awareness
   */
  private buildAutoCompletePrompt(
    missingComponents: MissingComponent[],
    manifest: FileManifest
  ): string {
    const sections: string[] = [];

    sections.push('# Auto-Complete Missing React Components');
    sections.push('');
    sections.push('You are generating missing React components for an existing application.');
    sections.push('Generate ONLY the missing components listed below with proper TypeScript types.');
    sections.push('');

    // Add project context
    sections.push('## Existing Project Context');
    sections.push(`- Entry Point: ${manifest.entryPoint}`);
    sections.push(`- Total Components: ${Object.keys(manifest.componentTree).length}`);
    sections.push(`- Style System: ${manifest.styleFiles.includes('tailwind.config.js') ? 'Tailwind CSS' : 'CSS'}`);
    sections.push('');

    // Add existing component patterns
    const existingComponents = Object.keys(manifest.componentTree).slice(0, 5);
    if (existingComponents.length > 0) {
      sections.push('## Existing Component Patterns');
      for (const comp of existingComponents) {
        const treeNode = manifest.componentTree[comp];
        sections.push(`- ${comp} (${treeNode.type}) - imports: ${treeNode.imports.join(', ') || 'none'}`);
      }
      sections.push('');
    }

    // Add missing components details
    sections.push('## Missing Components to Generate');
    for (const missing of missingComponents) {
      sections.push(`### ${missing.name}`);
      sections.push(`- **File Path**: src/components/${missing.name}.tsx`);
      sections.push(`- **Used In**: ${missing.usedInFile}`);
      
      if (missing.contextInfo) {
        sections.push(`- **Usage**: ${missing.contextInfo.usage}`);
        if (missing.contextInfo.propsPattern) {
          sections.push(`- **Props**: ${missing.contextInfo.propsPattern}`);
        }
      }
      sections.push('');
    }

    // Add generation requirements
    sections.push('## Generation Requirements');
    sections.push('1. Create functional React components with TypeScript');
    sections.push('2. Use Tailwind CSS for styling to match existing components');
    sections.push('3. Include proper prop types and interfaces');
    sections.push('4. Follow existing component patterns and naming conventions');
    sections.push('5. Make components responsive and accessible');
    sections.push('6. Keep components simple but functional');
    sections.push('');

    // Add example pattern from existing components
    const exampleComponent = this.getExampleComponent(manifest);
    if (exampleComponent) {
      sections.push('## Example Component Pattern (for reference)');
      sections.push('```typescript');
      sections.push(exampleComponent.content.split('\n').slice(0, 20).join('\n'));
      sections.push('```');
      sections.push('');
    }

    sections.push('## Output Format');
    sections.push('Generate each component using this EXACT format:');
    sections.push('');
    sections.push('```typescript src/components/ComponentName.tsx');
    sections.push('// Component code here');
    sections.push('```');

    return sections.join('\n');
  }

  /**
   * Get an example component for pattern reference
   */
  private getExampleComponent(manifest: FileManifest): { path: string; content: string } | null {
    // Find a small, well-structured component as an example
    for (const [path, fileInfo] of Object.entries(manifest.files)) {
      if (fileInfo.type === 'component' && 
          fileInfo.componentInfo && 
          fileInfo.content.length > 200 && 
          fileInfo.content.length < 1000) {
        return { path, content: fileInfo.content };
      }
    }
    
    return null;
  }

  /**
   * Generate components using AI
   */
  private async generateWithAI(
    prompt: string,
    options: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
    }
  ): Promise<string> {
    const stream = await this.anthropic.messages.create({
      model: options.model || 'claude-sonnet-4-20250514',
      max_tokens: options.maxTokens || 8000,
      temperature: options.temperature || 0.7,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      stream: true,
    });

    let generatedContent = '';
    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        generatedContent += chunk.delta.text;
      }
    }

    return generatedContent;
  }

  /**
   * Parse generated components from AI response
   */
  private parseGeneratedComponents(
    generatedContent: string,
    expectedComponents: MissingComponent[]
  ): Array<{ path: string; content: string; type: string }> {
    const files: Array<{ path: string; content: string; type: string }> = [];
    
    // Parse using markdown code block format
    const codeBlockRegex = /```(?:typescript\s+)?([^\n\r]+)\n([\s\S]*?)```/g;
    let match;

    while ((match = codeBlockRegex.exec(generatedContent)) !== null) {
      const filePath = match[1].trim();
      const content = match[2].trim();
      
      if (filePath && content) {
        files.push({
          path: filePath,
          content,
          type: 'typescript'
        });
      }
    }

    logger.debug('Parsed generated components', {
      expectedCount: expectedComponents.length,
      generatedCount: files.length,
      generatedFiles: files.map(f => f.path)
    });

    return files;
  }

  /**
   * Validate generated components against expectations
   */
  private validateGeneratedComponents(
    generatedFiles: Array<{ path: string; content: string; type: string }>,
    expectedComponents: MissingComponent[]
  ): {
    validFiles: Array<{ path: string; content: string; type: string }>;
    failedComponents: string[];
    warnings: string[];
  } {
    const validFiles: Array<{ path: string; content: string; type: string }> = [];
    const failedComponents: string[] = [];
    const warnings: string[] = [];

    // Check each expected component
    for (const expected of expectedComponents) {
      const generatedFile = generatedFiles.find(f => 
        f.path.includes(expected.name) || 
        f.content.includes(`function ${expected.name}`) ||
        f.content.includes(`const ${expected.name}`)
      );

      if (generatedFile) {
        // Validate component content
        const validation = this.validateComponentContent(generatedFile, expected);
        
        if (validation.isValid) {
          validFiles.push(generatedFile);
        } else {
          failedComponents.push(expected.name);
          warnings.push(`Generated ${expected.name} failed validation: ${validation.reason}`);
        }
      } else {
        failedComponents.push(expected.name);
        warnings.push(`Component ${expected.name} was not generated`);
      }
    }

    // Check for extra generated files
    const expectedNames = expectedComponents.map(c => c.name);
    const extraFiles = generatedFiles.filter(f => 
      !expectedNames.some(name => f.path.includes(name))
    );

    if (extraFiles.length > 0) {
      warnings.push(`Generated ${extraFiles.length} unexpected files: ${extraFiles.map(f => f.path).join(', ')}`);
      // Include extra files if they look valid
      for (const extraFile of extraFiles) {
        if (this.isValidComponentFile(extraFile)) {
          validFiles.push(extraFile);
        }
      }
    }

    return { validFiles, failedComponents, warnings };
  }

  /**
   * Validate individual component content
   */
  private validateComponentContent(
    file: { path: string; content: string; type: string },
    expected: MissingComponent
  ): { isValid: boolean; reason?: string } {
    const content = file.content;

    // Check for component export
    if (!content.includes('export') && !content.includes(expected.name)) {
      return { isValid: false, reason: 'Missing component export' };
    }

    // Check for basic React structure
    if (!content.includes('React') && !content.includes('import')) {
      return { isValid: false, reason: 'Missing React imports' };
    }

    // Check for JSX return
    if (!content.includes('return') && !content.includes('=>')) {
      return { isValid: false, reason: 'Missing component return statement' };
    }

    // Check for truncation patterns
    if (content.includes('...') && !content.includes('...props')) {
      return { isValid: false, reason: 'Component appears to be truncated' };
    }

    // Validate basic syntax (simplified)
    const openBraces = (content.match(/\{/g) || []).length;
    const closeBraces = (content.match(/\}/g) || []).length;
    if (Math.abs(openBraces - closeBraces) > 2) { // Allow some tolerance
      return { isValid: false, reason: 'Potential syntax errors (unmatched braces)' };
    }

    return { isValid: true };
  }

  /**
   * Check if a file looks like a valid component
   */
  private isValidComponentFile(file: { path: string; content: string; type: string }): boolean {
    const fileName = file.path.split('/').pop() || '';
    
    // Must be a React file
    if (!(fileName.endsWith('.tsx') || fileName.endsWith('.jsx'))) {
      return false;
    }

    // Must start with capital letter (component naming convention)
    const componentName = fileName.replace(/\.(tsx|jsx)$/, '');
    if (!/^[A-Z]/.test(componentName)) {
      return false;
    }

    // Must have basic React structure
    const hasExport = file.content.includes('export');
    const hasReact = file.content.includes('React') || file.content.includes('import');
    const hasReturn = file.content.includes('return') || file.content.includes('=>');

    return hasExport && hasReact && hasReturn;
  }

  /**
   * Create auto-complete prompt optimized for missing components
   */
  private buildAutoCompletePrompt(
    missingComponents: MissingComponent[],
    manifest: FileManifest
  ): string {
    const prompt = `Generate the missing React TypeScript components for an existing application.

EXISTING PROJECT CONTEXT:
- Framework: React 18+ with TypeScript
- Styling: ${manifest.styleFiles.some(f => f.includes('tailwind')) ? 'Tailwind CSS' : 'CSS Modules'}
- Component Count: ${Object.keys(manifest.componentTree).length}
- Entry Point: ${manifest.entryPoint}

MISSING COMPONENTS TO GENERATE:
${missingComponents.map(comp => `
${comp.name}:
- Import Path: ${comp.importPath}
- Used In: ${comp.usedInFile}
${comp.contextInfo ? `- Usage: ${comp.contextInfo.usage}` : ''}
${comp.contextInfo?.propsPattern ? `- Props: ${comp.contextInfo.propsPattern}` : ''}
`).join('')}

REQUIREMENTS:
1. Generate ONLY the missing components listed above
2. Use TypeScript with proper interfaces for props
3. Follow React functional component patterns
4. Use Tailwind CSS classes for styling
5. Make components responsive and accessible
6. Keep components simple but functional
7. Export as default from each file

OUTPUT FORMAT:
For each component, use this EXACT format:

\`\`\`typescript src/components/ComponentName.tsx
import React from 'react';

interface ComponentNameProps {
  // Define props based on usage context
}

const ComponentName: React.FC<ComponentNameProps> = (props) => {
  return (
    <div className="component-container">
      {/* Component content here */}
    </div>
  );
};

export default ComponentName;
\`\`\`

Generate all missing components now:`;

    return prompt;
  }

  /**
   * Generate components using Anthropic AI
   */
  private async generateWithAI(
    prompt: string,
    options: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
    }
  ): Promise<string> {
    try {
      const message = await this.anthropic.messages.create({
        model: options.model || 'claude-sonnet-4-20250514',
        max_tokens: options.maxTokens || 8000,
        temperature: options.temperature || 0.7,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      });

      const content = message.content[0];
      if (content.type === 'text') {
        return content.text;
      }

      throw new Error('Unexpected AI response format');

    } catch (error) {
      logger.error('AI generation failed in auto-complete', { error });
      throw error;
    }
  }

  /**
   * Get auto-complete statistics for monitoring
   */
  getAutoCompleteStats(): {
    totalRequests: number;
    successfulGenerations: number;
    averageComponentsPerRequest: number;
    commonFailureReasons: Array<{ reason: string; count: number }>;
  } {
    // This would be populated with actual statistics in a real implementation
    return {
      totalRequests: 0,
      successfulGenerations: 0,
      averageComponentsPerRequest: 0,
      commonFailureReasons: []
    };
  }
}

// Export singleton instance
export const autoCompleteService = new AutoCompleteService();