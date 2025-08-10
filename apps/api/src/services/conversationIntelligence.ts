/**
 * Conversation Intelligence - Advanced user behavior analysis and learning
 * Based on Open-Lovable's sophisticated conversation memory system
 * 
 * This service provides deep insights into user behavior patterns,
 * enabling adaptive AI responses and personalized development experiences.
 */

import { supabase } from '../config/supabase.js';
import { logger } from '../utils/logger.js';
import { 
  UserBehaviorPattern,
  ConversationMessage,
  ConversationEdit,
  ProjectEvolutionSnapshot,
  ConversationContext
} from '../types/conversation.js';
import { EditType } from './editIntentAnalyzer.js';

export class ConversationIntelligence {
  private behaviorCache = new Map<string, UserBehaviorPattern>();
  private cacheExpiry = 30 * 60 * 1000; // 30 minutes

  /**
   * Track user preferences and behavior patterns from successful interactions
   */
  async trackUserPreferences(
    userId: string, 
    editType: string, 
    outcome: 'success' | 'failed',
    confidence: number,
    tokensUsed: number,
    targetFiles: string[],
    userRequest: string
  ): Promise<void> {
    try {
      let behaviorPattern = await this.getUserBehaviorPattern(userId);

      // Update edit type preferences
      if (!behaviorPattern.patterns.editTypePreferences[editType]) {
        behaviorPattern.patterns.editTypePreferences[editType] = 0;
      }
      behaviorPattern.patterns.editTypePreferences[editType]++;

      // Update success rates by edit type
      if (!behaviorPattern.patterns.successRateByEditType[editType]) {
        behaviorPattern.patterns.successRateByEditType[editType] = 0;
      }
      
      if (outcome === 'success') {
        behaviorPattern.patterns.successRateByEditType[editType] = 
          (behaviorPattern.patterns.successRateByEditType[editType] + 1) / 
          (behaviorPattern.patterns.editTypePreferences[editType] || 1);
      }

      // Update token usage patterns
      behaviorPattern.patterns.averageTokenUsage = this.updateMovingAverage(
        behaviorPattern.patterns.averageTokenUsage,
        tokensUsed,
        0.1 // Learning rate
      );

      // Update component targeting patterns
      const componentNames = this.extractComponentNamesFromFiles(targetFiles);
      for (const component of componentNames) {
        if (!behaviorPattern.patterns.commonComponentTargets.includes(component)) {
          behaviorPattern.patterns.commonComponentTargets.push(component);
        }
      }
      
      // Keep only top 15 most targeted components
      behaviorPattern.patterns.commonComponentTargets = 
        behaviorPattern.patterns.commonComponentTargets.slice(-15);

      // Determine preferred edit style based on successful patterns
      if (outcome === 'success' && confidence > 0.8) {
        const isSurgical = this.isSurgicalEditRequest(userRequest);
        if (isSurgical) {
          behaviorPattern.patterns.preferredEditStyle = 'surgical';
        } else if (confidence > 0.9) {
          behaviorPattern.patterns.preferredEditStyle = 'comprehensive';
        }
      }

      // Update time of day activity
      const hour = new Date().getHours().toString();
      if (!behaviorPattern.patterns.timeOfDayActivity[hour]) {
        behaviorPattern.patterns.timeOfDayActivity[hour] = 0;
      }
      behaviorPattern.patterns.timeOfDayActivity[hour]++;

      // Update learning metrics
      behaviorPattern.learningMetrics.totalInteractions++;
      if (outcome === 'success') {
        behaviorPattern.learningMetrics.successfulEdits++;
      }
      
      behaviorPattern.learningMetrics.averageConfidence = this.updateMovingAverage(
        behaviorPattern.learningMetrics.averageConfidence,
        confidence,
        0.1
      );

      // Update preference confidence based on data volume
      behaviorPattern.learningMetrics.preferenceConfidence = Math.min(
        behaviorPattern.learningMetrics.totalInteractions / 20, // Full confidence after 20 interactions
        1.0
      );

      behaviorPattern.learningMetrics.lastUpdated = Date.now();

      // Save to cache and database
      this.behaviorCache.set(userId, behaviorPattern);
      await this.saveBehaviorPattern(behaviorPattern);

      logger.debug('Updated user behavior pattern', {
        userId,
        editType,
        outcome,
        totalInteractions: behaviorPattern.learningMetrics.totalInteractions,
        preferenceConfidence: behaviorPattern.learningMetrics.preferenceConfidence
      });

    } catch (error) {
      logger.error('Failed to track user preferences', { 
        userId, 
        editType, 
        error: error instanceof Error ? error.message : String(error) 
      });
    }
  }

  /**
   * Manage project evolution timeline and prevent duplicate work
   */
  async manageProjectEvolution(
    projectId: string, 
    changes: string[],
    changeType: 'feature_add' | 'style_update' | 'bug_fix' | 'refactor' | 'full_rebuild',
    filesAffected: string[]
  ): Promise<void> {
    try {
      // Load existing project evolution
      let evolution = await this.getProjectEvolution(projectId);

      // Add new major change
      evolution.majorChanges.push({
        timestamp: Date.now(),
        description: changes.join(', '),
        filesAffected,
        changeType
      });

      // Keep only last 30 major changes
      if (evolution.majorChanges.length > 30) {
        evolution.majorChanges = evolution.majorChanges.slice(-30);
      }

      // Update project metrics
      evolution.fileCount = Math.max(evolution.fileCount, filesAffected.length);
      evolution.componentCount = Math.max(
        evolution.componentCount, 
        filesAffected.filter(f => f.includes('.tsx') || f.includes('.jsx')).length
      );

      // Update technical complexity based on patterns
      evolution.technicalComplexity = this.assessTechnicalComplexity(evolution);

      // Update last major change
      evolution.lastMajorChange = {
        type: changeType,
        description: changes.join(', '),
        timestamp: Date.now()
      };

      evolution.timestamp = Date.now();

      // Save evolution data
      await this.saveProjectEvolution(evolution);

      logger.info('Updated project evolution', {
        projectId,
        changeType,
        filesAffected: filesAffected.length,
        complexity: evolution.technicalComplexity
      });

    } catch (error) {
      logger.error('Failed to manage project evolution', { 
        projectId, 
        error: error instanceof Error ? error.message : String(error) 
      });
    }
  }

  /**
   * Optimize conversation context to prevent token overflow
   */
  async optimizeConversationContext(
    conversationHistory: ConversationMessage[]
  ): Promise<{
    optimizedMessages: ConversationMessage[];
    removedCount: number;
    tokensSaved: number;
  }> {
    const maxTokens = 8000;
    const maxMessages = 20;

    if (conversationHistory.length <= maxMessages) {
      return {
        optimizedMessages: conversationHistory,
        removedCount: 0,
        tokensSaved: 0
      };
    }

    // Calculate tokens for each message (rough estimate)
    const messagesWithTokens = conversationHistory.map(msg => ({
      ...msg,
      estimatedTokens: Math.ceil(msg.content.length / 4) + 50 // Base overhead
    }));

    // Sort by importance score
    const scoredMessages = messagesWithTokens.map((msg, index) => {
      let importance = 0;
      
      // Recent messages are more important
      const position = index / messagesWithTokens.length;
      importance += position * 100; // 0-100 based on position
      
      // Error recovery is important
      if (msg.content.toLowerCase().includes('error') || 
          msg.content.toLowerCase().includes('fix')) {
        importance += 50;
      }
      
      // Successful edits are important
      if (msg.metadata?.editedFiles?.length) {
        importance += 30;
      }
      
      // Long, detailed messages are often important
      if (msg.content.length > 500) {
        importance += 20;
      }

      return { ...msg, importance, originalIndex: index };
    });

    // Sort by importance (keep most important)
    scoredMessages.sort((a, b) => b.importance - a.importance);

    // Select messages that fit within token limit
    let totalTokens = 0;
    const selectedMessages: typeof scoredMessages = [];
    
    for (const msg of scoredMessages) {
      if (totalTokens + msg.estimatedTokens <= maxTokens && 
          selectedMessages.length < maxMessages) {
        selectedMessages.push(msg);
        totalTokens += msg.estimatedTokens;
      }
    }

    // Sort back to original order
    selectedMessages.sort((a, b) => a.originalIndex - b.originalIndex);

    const originalTokens = messagesWithTokens.reduce((sum, msg) => sum + msg.estimatedTokens, 0);
    const tokensSaved = originalTokens - totalTokens;

    const optimizedMessages = selectedMessages.map(({ importance, estimatedTokens, originalIndex, ...msg }) => msg);

    logger.debug('Optimized conversation context', {
      originalLength: conversationHistory.length,
      optimizedLength: optimizedMessages.length,
      removedCount: conversationHistory.length - optimizedMessages.length,
      tokensSaved
    });

    return {
      optimizedMessages,
      removedCount: conversationHistory.length - optimizedMessages.length,
      tokensSaved
    };
  }

  /**
   * Get personalized recommendations for user
   */
  async getPersonalizedRecommendations(userId: string): Promise<{
    preferredEditStyle: 'surgical' | 'comprehensive';
    suggestedComponents: string[];
    optimalTokenRange: { min: number; max: number };
    bestPerformingEditTypes: string[];
    timeRecommendations: string[];
  }> {
    const behaviorPattern = await this.getUserBehaviorPattern(userId);

    // Calculate best performing edit types
    const editTypeScores = Object.entries(behaviorPattern.patterns.successRateByEditType)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([type]) => type);

    // Calculate optimal token range
    const avgTokens = behaviorPattern.patterns.averageTokenUsage;
    const optimalRange = {
      min: Math.max(500, avgTokens * 0.8),
      max: Math.min(4000, avgTokens * 1.2)
    };

    // Find best performance times
    const timeActivity = Object.entries(behaviorPattern.patterns.timeOfDayActivity)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([hour]) => {
        const h = parseInt(hour);
        if (h < 12) return `${h}:00 AM`;
        if (h === 12) return '12:00 PM';
        return `${h - 12}:00 PM`;
      });

    return {
      preferredEditStyle: behaviorPattern.patterns.preferredEditStyle,
      suggestedComponents: behaviorPattern.patterns.commonComponentTargets.slice(-5),
      optimalTokenRange: optimalRange,
      bestPerformingEditTypes: editTypeScores,
      timeRecommendations: timeActivity
    };
  }

  /**
   * Detect potential user frustration patterns
   */
  detectFrustrationPatterns(
    recentEdits: ConversationEdit[],
    recentMessages: ConversationMessage[]
  ): {
    frustrationLevel: 'low' | 'medium' | 'high';
    indicators: string[];
    recommendations: string[];
  } {
    const indicators: string[] = [];
    const recommendations: string[] = [];
    let frustrationScore = 0;

    // Check for repeated failed edits
    const recentFailures = recentEdits.filter(edit => edit.outcome === 'failed').length;
    if (recentFailures > 2) {
      frustrationScore += recentFailures * 20;
      indicators.push(`${recentFailures} recent failed edits`);
      recommendations.push('Try simpler, more specific requests');
    }

    // Check for repeated similar requests
    const requestPatterns = recentMessages
      .filter(msg => msg.role === 'user')
      .map(msg => msg.content.toLowerCase().slice(0, 50));
    
    const duplicates = requestPatterns.filter((pattern, index) => 
      requestPatterns.indexOf(pattern) !== index
    ).length;

    if (duplicates > 1) {
      frustrationScore += duplicates * 15;
      indicators.push('Repeated similar requests');
      recommendations.push('Try rephrasing your request with more detail');
    }

    // Check for negative sentiment words
    const negativeWords = ['error', 'wrong', 'broken', 'not working', 'fix', 'problem'];
    const negativeCount = recentMessages
      .filter(msg => msg.role === 'user')
      .reduce((count, msg) => {
        return count + negativeWords.filter(word => 
          msg.content.toLowerCase().includes(word)
        ).length;
      }, 0);

    if (negativeCount > 3) {
      frustrationScore += negativeCount * 10;
      indicators.push('Multiple mentions of issues/problems');
      recommendations.push('Consider starting with a simple component to build confidence');
    }

    // Check for low confidence edits
    const lowConfidenceEdits = recentEdits.filter(edit => edit.confidence < 0.5).length;
    if (lowConfidenceEdits > 1) {
      frustrationScore += lowConfidenceEdits * 25;
      indicators.push('Low confidence in recent edits');
      recommendations.push('Provide more specific details about what you want to change');
    }

    // Determine frustration level
    let frustrationLevel: 'low' | 'medium' | 'high';
    if (frustrationScore < 30) {
      frustrationLevel = 'low';
    } else if (frustrationScore < 70) {
      frustrationLevel = 'medium';
      recommendations.push('Take a break and try a different approach');
    } else {
      frustrationLevel = 'high';
      recommendations.push('Consider starting a new project or asking for help in the community');
    }

    return {
      frustrationLevel,
      indicators,
      recommendations
    };
  }

  /**
   * Private helper methods
   */

  private async getUserBehaviorPattern(userId: string): Promise<UserBehaviorPattern> {
    // Check cache first
    const cached = this.behaviorCache.get(userId);
    if (cached && Date.now() - cached.learningMetrics.lastUpdated < this.cacheExpiry) {
      return cached;
    }

    // Load from database
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('user_behavior_patterns')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (!error && data) {
          const pattern: UserBehaviorPattern = {
            userId,
            patterns: data.patterns,
            learningMetrics: data.learning_metrics
          };
          this.behaviorCache.set(userId, pattern);
          return pattern;
        }
      } catch (error) {
        logger.debug('Failed to load user behavior pattern from database', { userId });
      }
    }

    // Return default pattern
    const defaultPattern: UserBehaviorPattern = {
      userId,
      patterns: {
        editTypePreferences: {},
        averageTokenUsage: 1000,
        preferredEditStyle: 'surgical',
        commonComponentTargets: [],
        packageUsageHistory: [],
        successRateByEditType: {},
        timeOfDayActivity: {}
      },
      learningMetrics: {
        totalInteractions: 0,
        successfulEdits: 0,
        averageConfidence: 0,
        preferenceConfidence: 0,
        lastUpdated: Date.now()
      }
    };

    this.behaviorCache.set(userId, defaultPattern);
    return defaultPattern;
  }

  private async saveBehaviorPattern(pattern: UserBehaviorPattern): Promise<void> {
    if (!supabase) return;

    try {
      const { error } = await supabase
        .from('user_behavior_patterns')
        .upsert({
          user_id: pattern.userId,
          patterns: pattern.patterns,
          learning_metrics: pattern.learningMetrics
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        logger.warn('Failed to save user behavior pattern', { 
          userId: pattern.userId, 
          error 
        });
      }
    } catch (error) {
      logger.debug('Error saving behavior pattern to database', { 
        userId: pattern.userId 
      });
    }
  }

  private async getProjectEvolution(projectId: string): Promise<ProjectEvolutionSnapshot> {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('project_evolution_snapshots')
          .select('*')
          .eq('project_id', projectId)
          .single();

        if (!error && data) {
          return {
            projectId,
            timestamp: data.timestamp,
            fileCount: data.file_count,
            componentCount: data.component_count,
            majorFeatures: data.major_features || [],
            technicalComplexity: data.technical_complexity,
            lastMajorChange: data.last_major_change
          };
        }
      } catch (error) {
        logger.debug('Failed to load project evolution from database', { projectId });
      }
    }

    // Return default evolution
    return {
      projectId,
      timestamp: Date.now(),
      fileCount: 0,
      componentCount: 0,
      majorFeatures: [],
      technicalComplexity: 'simple',
      lastMajorChange: {
        type: 'initial_creation',
        description: 'Project created',
        timestamp: Date.now()
      },
      majorChanges: []
    } as ProjectEvolutionSnapshot & { majorChanges: any[] };
  }

  private async saveProjectEvolution(evolution: ProjectEvolutionSnapshot & { majorChanges: any[] }): Promise<void> {
    if (!supabase) return;

    try {
      const { error } = await supabase
        .from('project_evolution_snapshots')
        .upsert({
          project_id: evolution.projectId,
          timestamp: evolution.timestamp,
          file_count: evolution.fileCount,
          component_count: evolution.componentCount,
          major_features: evolution.majorFeatures,
          technical_complexity: evolution.technicalComplexity,
          last_major_change: evolution.lastMajorChange
        }, {
          onConflict: 'project_id'
        });

      if (error) {
        logger.warn('Failed to save project evolution', { 
          projectId: evolution.projectId, 
          error 
        });
      }
    } catch (error) {
      logger.debug('Error saving project evolution to database', { 
        projectId: evolution.projectId 
      });
    }
  }

  private extractComponentNamesFromFiles(targetFiles: string[]): string[] {
    return targetFiles
      .filter(file => file.includes('.tsx') || file.includes('.jsx'))
      .map(file => {
        const name = file.split('/').pop()?.replace(/\.(tsx|jsx)$/, '') || '';
        return name;
      })
      .filter(name => name.length > 0);
  }

  private isSurgicalEditRequest(userRequest: string): boolean {
    const surgicalKeywords = [
      'change color', 'update text', 'fix spelling', 'modify button',
      'replace image', 'adjust spacing', 'update link', 'change background',
      'remove element', 'hide component', 'show component', 'toggle'
    ];

    const lowerRequest = userRequest.toLowerCase();
    return surgicalKeywords.some(keyword => lowerRequest.includes(keyword));
  }

  private assessTechnicalComplexity(evolution: ProjectEvolutionSnapshot & { majorChanges: any[] }): 'simple' | 'moderate' | 'complex' {
    let complexityScore = 0;

    // File count contributes to complexity
    if (evolution.fileCount > 20) complexityScore += 2;
    else if (evolution.fileCount > 10) complexityScore += 1;

    // Component count contributes to complexity  
    if (evolution.componentCount > 15) complexityScore += 2;
    else if (evolution.componentCount > 8) complexityScore += 1;

    // Feature count contributes to complexity
    if (evolution.majorFeatures.length > 10) complexityScore += 2;
    else if (evolution.majorFeatures.length > 5) complexityScore += 1;

    // Number of major changes indicates complexity
    if (evolution.majorChanges && evolution.majorChanges.length > 20) complexityScore += 1;

    if (complexityScore >= 4) return 'complex';
    if (complexityScore >= 2) return 'moderate';
    return 'simple';
  }

  private updateMovingAverage(current: number, newValue: number, learningRate: number): number {
    return current * (1 - learningRate) + newValue * learningRate;
  }

  /**
   * Get intelligence summary for monitoring
   */
  getIntelligenceSummary(): {
    cachedUsers: number;
    totalInteractions: number;
    averageConfidence: number;
    topEditTypes: Array<{ type: string; usage: number }>;
  } {
    const users = Array.from(this.behaviorCache.values());
    
    const totalInteractions = users.reduce(
      (sum, user) => sum + user.learningMetrics.totalInteractions, 0
    );
    
    const averageConfidence = users.length > 0 
      ? users.reduce((sum, user) => sum + user.learningMetrics.averageConfidence, 0) / users.length
      : 0;

    // Aggregate edit type usage
    const editTypeCounts: Record<string, number> = {};
    users.forEach(user => {
      Object.entries(user.patterns.editTypePreferences).forEach(([type, count]) => {
        editTypeCounts[type] = (editTypeCounts[type] || 0) + count;
      });
    });

    const topEditTypes = Object.entries(editTypeCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([type, usage]) => ({ type, usage }));

    return {
      cachedUsers: users.length,
      totalInteractions,
      averageConfidence,
      topEditTypes
    };
  }
}

// Export singleton instance
export const conversationIntelligence = new ConversationIntelligence();