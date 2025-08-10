/**
 * File Search Service - Agentic file search with line-level targeting
 * Based on Open-Lovable's sophisticated search executor
 * 
 * This service executes search plans to find exact code locations before editing:
 * 1. Multi-strategy search with fallback mechanisms
 * 2. Context-aware search result formatting
 * 3. Confidence scoring for search results
 * 4. Line-level targeting for surgical edits
 */

import { logger } from '../utils/logger.js';

export interface SearchResult {
  filePath: string;
  lineNumber: number;
  lineContent: string;
  matchedTerm?: string;
  matchedPattern?: string;
  contextBefore: string[];
  contextAfter: string[];
  confidence: 'high' | 'medium' | 'low';
}

export interface SearchPlan {
  editType: string;
  reasoning: string;
  searchTerms: string[];
  regexPatterns?: string[];
  fileTypesToSearch?: string[];
  expectedMatches?: number;
  fallbackSearch?: {
    terms: string[];
    patterns?: string[];
  };
}

export interface SearchExecutionResult {
  success: boolean;
  results: SearchResult[];
  filesSearched: number;
  executionTime: number;
  usedFallback: boolean;
  error?: string;
}

/**
 * File Search Service with agentic search capabilities
 */
export class FileSearchService {

  /**
   * Execute a search plan against the codebase to find exact locations
   */
  executeSearchPlan(
    searchPlan: SearchPlan,
    files: Record<string, string>
  ): SearchExecutionResult {
    const startTime = Date.now();
    const results: SearchResult[] = [];
    let filesSearched = 0;
    let usedFallback = false;

    const { 
      searchTerms = [], 
      regexPatterns = [], 
      fileTypesToSearch = ['.jsx', '.tsx', '.js', '.ts'],
      fallbackSearch 
    } = searchPlan;

    logger.info('Executing search plan', {
      editType: searchPlan.editType,
      searchTerms,
      regexPatterns,
      fileTypesToSearch,
      totalFiles: Object.keys(files).length
    });

    // Helper function to perform search
    const performSearch = (terms: string[], patterns?: string[]): SearchResult[] => {
      const searchResults: SearchResult[] = [];

      for (const [filePath, content] of Object.entries(files)) {
        // Skip files that don't match the desired extensions
        const shouldSearch = fileTypesToSearch.some(ext => filePath.endsWith(ext));
        if (!shouldSearch) continue;

        filesSearched++;
        const lines = content.split('\n');

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          let matched = false;
          let matchedTerm: string | undefined;
          let matchedPattern: string | undefined;

          // Check simple search terms (case-insensitive)
          for (const term of terms) {
            if (line.toLowerCase().includes(term.toLowerCase())) {
              matched = true;
              matchedTerm = term;
              break;
            }
          }

          // Check regex patterns if no term match
          if (!matched && patterns) {
            for (const pattern of patterns) {
              try {
                const regex = new RegExp(pattern, 'i');
                if (regex.test(line)) {
                  matched = true;
                  matchedPattern = pattern;
                  break;
                }
              } catch (e) {
                logger.warn('Invalid regex pattern', { pattern });
              }
            }
          }

          if (matched) {
            // Get context lines (3 before, 3 after)
            const contextBefore = lines.slice(Math.max(0, i - 3), i);
            const contextAfter = lines.slice(i + 1, Math.min(lines.length, i + 4));

            // Determine confidence based on match type and context
            const confidence = this.calculateSearchConfidence(line, matchedTerm, matchedPattern);

            const result: SearchResult = {
              filePath,
              lineNumber: i + 1,
              lineContent: line.trim(),
              matchedTerm,
              matchedPattern,
              contextBefore,
              contextAfter,
              confidence
            };

            searchResults.push(result);
            
            logger.debug('Search match found', {
              filePath,
              lineNumber: i + 1,
              matchedTerm,
              confidence
            });
          }
        }
      }

      return searchResults;
    };

    // Execute primary search
    results.push(...performSearch(searchTerms, regexPatterns));

    // If no results and we have a fallback, try it
    if (results.length === 0 && fallbackSearch) {
      logger.info('No results from primary search, trying fallback', {
        fallbackTerms: fallbackSearch.terms,
        fallbackPatterns: fallbackSearch.patterns
      });
      usedFallback = true;
      results.push(...performSearch(
        fallbackSearch.terms,
        fallbackSearch.patterns
      ));
    }

    const executionTime = Date.now() - startTime;

    // Sort results by confidence and relevance
    results.sort((a, b) => {
      const confidenceOrder = { high: 3, medium: 2, low: 1 };
      const confidenceDiff = confidenceOrder[b.confidence] - confidenceOrder[a.confidence];
      
      // If confidence is the same, prefer results with shorter file names (more specific)
      if (confidenceDiff === 0) {
        return a.filePath.length - b.filePath.length;
      }
      
      return confidenceDiff;
    });

    const searchResult: SearchExecutionResult = {
      success: results.length > 0,
      results,
      filesSearched,
      executionTime,
      usedFallback,
      error: results.length === 0 ? 'No matches found for search terms' : undefined
    };

    logger.info('Search execution completed', {
      success: searchResult.success,
      resultsFound: results.length,
      filesSearched,
      executionTime,
      usedFallback
    });

    return searchResult;
  }

  /**
   * Find exact code location for a specific search term
   */
  findExactLocation(
    searchTerms: string[], 
    files: Record<string, string>
  ): SearchExecutionResult {
    
    const searchPlan: SearchPlan = {
      editType: 'LOCATE',
      reasoning: 'Finding exact location of search terms',
      searchTerms,
      fileTypesToSearch: ['.jsx', '.tsx', '.js', '.ts'],
      expectedMatches: 1,
      fallbackSearch: {
        terms: searchTerms.map(term => term.toLowerCase()),
        patterns: searchTerms.map(term => `["']${term}["']`) // Look for quoted versions
      }
    };

    return this.executeSearchPlan(searchPlan, files);
  }

  /**
   * Format search results for AI consumption
   */
  formatSearchResultsForAI(results: SearchResult[]): string {
    if (results.length === 0) {
      return 'No search results found.';
    }

    const sections: string[] = [];
    
    sections.push('🔍 SEARCH RESULTS - EXACT LOCATIONS FOUND:\n');
    
    // Group by file for better readability
    const resultsByFile = new Map<string, SearchResult[]>();
    for (const result of results) {
      if (!resultsByFile.has(result.filePath)) {
        resultsByFile.set(result.filePath, []);
      }
      resultsByFile.get(result.filePath)!.push(result);
    }

    for (const [filePath, fileResults] of resultsByFile) {
      sections.push(`\n📄 FILE: ${filePath}`);
      
      for (const result of fileResults.slice(0, 3)) { // Limit to top 3 results per file
        sections.push(`\n  📍 Line ${result.lineNumber} (${result.confidence} confidence)`);
        
        if (result.matchedTerm) {
          sections.push(`     Matched: "${result.matchedTerm}"`);
        } else if (result.matchedPattern) {
          sections.push(`     Pattern: ${result.matchedPattern}`);
        }
        
        sections.push(`     Code: ${result.lineContent}`);
        
        // Only include context for high confidence results to save tokens
        if (result.confidence === 'high' && (result.contextBefore.length > 0 || result.contextAfter.length > 0)) {
          sections.push(`     Context:`);
          for (const line of result.contextBefore.slice(-2)) { // Last 2 lines before
            sections.push(`       ${line.trim()}`);
          }
          sections.push(`     → ${result.lineContent.trim()}`);
          for (const line of result.contextAfter.slice(0, 2)) { // First 2 lines after
            sections.push(`       ${line.trim()}`);
          }
        }
      }
    }

    sections.push('\n\n🎯 RECOMMENDED ACTION:');
    
    // Recommend the highest confidence result
    const bestResult = results[0];
    sections.push(`Edit ${bestResult.filePath} at line ${bestResult.lineNumber}`);
    
    if (bestResult.matchedTerm) {
      sections.push(`Target: "${bestResult.matchedTerm}" in line: ${bestResult.lineContent.trim()}`);
    }

    return sections.join('\n');
  }

  /**
   * Select the best file to edit based on search results
   */
  selectTargetFile(
    results: SearchResult[],
    editType: string
  ): { filePath: string; lineNumber: number; reason: string } | null {
    if (results.length === 0) return null;

    // For style updates, prefer components over CSS files
    if (editType === 'UPDATE_STYLE') {
      const componentResult = results.find(r => 
        r.filePath.endsWith('.jsx') || r.filePath.endsWith('.tsx')
      );
      if (componentResult) {
        return {
          filePath: componentResult.filePath,
          lineNumber: componentResult.lineNumber,
          reason: 'Found component with style to update'
        };
      }
    }

    // For remove operations, find the component that renders the element
    if (editType === 'REMOVE_ELEMENT') {
      const renderResult = results.find(r => 
        r.lineContent.includes('return') || 
        r.lineContent.includes('<') ||
        r.lineContent.includes('render')
      );
      if (renderResult) {
        return {
          filePath: renderResult.filePath,
          lineNumber: renderResult.lineNumber,
          reason: 'Found element to remove in render output'
        };
      }
    }

    // For component updates, prefer results in functional components
    if (editType === 'UPDATE_COMPONENT') {
      const componentResult = results.find(r => {
        const line = r.lineContent.toLowerCase();
        return line.includes('function') || line.includes('const') || line.includes('export');
      });
      if (componentResult) {
        return {
          filePath: componentResult.filePath,
          lineNumber: componentResult.lineNumber,
          reason: 'Found target in component definition'
        };
      }
    }

    // Default: use highest confidence result
    const best = results[0];
    return {
      filePath: best.filePath,
      lineNumber: best.lineNumber,
      reason: `Highest confidence match (${best.confidence})`
    };
  }

  /**
   * Create a search plan for finding specific content
   */
  createSearchPlan(
    prompt: string,
    editType: string,
    searchTerms: string[]
  ): SearchPlan {
    
    const fallbackTerms: string[] = [];
    const regexPatterns: string[] = [];
    
    // Extract quoted strings for exact matching
    const quotedStrings = prompt.match(/["']([^"']+)["']/g) || [];
    const exactTerms = quotedStrings.map(s => s.replace(/["']/g, ''));
    
    // Add exact terms to search
    searchTerms.push(...exactTerms);
    
    // Create fallback terms (lowercase versions)
    fallbackTerms.push(...searchTerms.map(term => term.toLowerCase()));
    
    // Generate patterns based on edit type
    switch (editType) {
      case 'UPDATE_STYLE':
        regexPatterns.push('className\\s*=\\s*["\'][^"\']*["\']');
        break;
      case 'REMOVE_ELEMENT':
        for (const term of exactTerms) {
          regexPatterns.push(`["']${term}["']`);
          regexPatterns.push(`>${term}<`);
        }
        break;
      case 'ADD_FEATURE':
        regexPatterns.push('return\\s*\\(');
        regexPatterns.push('export\\s+default');
        break;
    }

    return {
      editType,
      reasoning: `Finding exact location for ${editType} operation`,
      searchTerms: [...new Set(searchTerms)], // Remove duplicates
      regexPatterns: regexPatterns.length > 0 ? regexPatterns : undefined,
      fileTypesToSearch: ['.jsx', '.tsx', '.js', '.ts'],
      expectedMatches: 1,
      fallbackSearch: {
        terms: [...new Set(fallbackTerms)],
        patterns: regexPatterns.length > 0 ? regexPatterns : undefined
      }
    };
  }

  /**
   * Calculate confidence score for search matches
   */
  private calculateSearchConfidence(
    line: string,
    matchedTerm?: string,
    matchedPattern?: string
  ): 'high' | 'medium' | 'low' {
    
    // High confidence criteria
    if (matchedTerm && line.includes(matchedTerm)) {
      // Exact term match gets high confidence
      if (line.includes('function') || line.includes('export') || line.includes('return')) {
        return 'high';
      }
      
      // Button or element definitions
      if (line.includes('<') && line.includes('>')) {
        return 'high';
      }
      
      return 'medium';
    }
    
    // Pattern matches
    if (matchedPattern) {
      return 'medium';
    }
    
    // Default confidence
    return 'low';
  }

  /**
   * Filter search results to avoid overwhelming the AI
   */
  filterResults(results: SearchResult[], maxResults: number = 5): SearchResult[] {
    // Take top results by confidence, but ensure variety across files
    const resultsByFile = new Map<string, SearchResult[]>();
    
    for (const result of results) {
      if (!resultsByFile.has(result.filePath)) {
        resultsByFile.set(result.filePath, []);
      }
      resultsByFile.get(result.filePath)!.push(result);
    }
    
    const filteredResults: SearchResult[] = [];
    let remainingSlots = maxResults;
    
    // Take the best result from each file first
    for (const [filePath, fileResults] of resultsByFile) {
      if (remainingSlots <= 0) break;
      
      const best = fileResults[0]; // Already sorted by confidence
      filteredResults.push(best);
      remainingSlots--;
    }
    
    return filteredResults;
  }
}

// Export singleton instance
export const fileSearchService = new FileSearchService();