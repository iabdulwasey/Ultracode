/**
 * Conversation Manager - Context tracking and user preference learning
 * Based on Open-Lovable's conversation memory system
 * 
 * This service manages conversation state, tracks edit patterns, and learns
 * user preferences to improve future AI interactions.
 */

import { supabase } from '../config/supabase.js';
import { logger } from '../utils/logger.js';
import { 
  ConversationState, 
  ConversationMessage, 
  ConversationEdit, 
  ConversationContext,
  UserBehaviorPattern,
  ProjectEvolutionSnapshot,
  ConversationContextOptimization
} from '../types/conversation.js';
import { EditType } from './editIntentAnalyzer.js';

export class ConversationManager {
  private activeConversations = new Map<string, ConversationState>();
  private optimizationSettings: ConversationContextOptimization = {
    maxMessages: 20, // Keep last 20 messages in context
    maxTokens: 8000, // Maximum tokens for conversation context
    priorityWeights: {
      recentMessages: 1.0,
      importantEdits: 1.5,
      errorRecovery: 2.0,
      userPreferences: 1.2
    },
    pruningStrategy: 'importance_weighted'
  };

  /**
   * Initialize or retrieve conversation state for a project
   */
  async initializeConversation(
    projectId: string, 
    userId: string
  ): Promise<ConversationState> {
    const conversationId = `${projectId}:${userId}`;
    
    // Check if conversation already exists in memory
    if (this.activeConversations.has(conversationId)) {
      const existing = this.activeConversations.get(conversationId)!;
      existing.lastUpdated = Date.now();
      return existing;
    }

    try {
      // Try to load existing conversation from database
      let conversationState = await this.loadConversationFromDatabase(conversationId, projectId, userId);
      
      if (!conversationState) {
        // Create new conversation state
        conversationState = this.createNewConversation(conversationId, projectId, userId);
        logger.info('Created new conversation', { conversationId, projectId, userId });
      } else {
        logger.info('Loaded existing conversation', { 
          conversationId, 
          messageCount: conversationState.context.messages.length,
          editCount: conversationState.context.edits.length
        });
      }

      // Store in memory for quick access
      this.activeConversations.set(conversationId, conversationState);
      return conversationState;

    } catch (error) {
      logger.error('Failed to initialize conversation', { 
        conversationId, 
        error: error instanceof Error ? error.message : String(error) 
      });
      
      // Fallback: create new conversation
      const fallbackState = this.createNewConversation(conversationId, projectId, userId);
      this.activeConversations.set(conversationId, fallbackState);
      return fallbackState;
    }
  }

  /**
   * Add user message to conversation
   */
  async addUserMessage(
    projectId: string,
    userId: string,
    content: string,
    metadata?: Partial<ConversationMessage['metadata']>
  ): Promise<ConversationMessage> {
    const conversationState = await this.initializeConversation(projectId, userId);
    
    const message: ConversationMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      role: 'user',
      content,
      timestamp: Date.now(),
      metadata: metadata || {}
    };

    conversationState.context.messages.push(message);
    conversationState.context.sessionStats.totalMessages++;
    conversationState.context.sessionStats.lastActivity = Date.now();
    conversationState.lastUpdated = Date.now();

    // Optimize context if needed
    await this.optimizeConversationContext(conversationState);

    // Persist to database
    await this.saveConversationToDatabase(conversationState);

    logger.debug('Added user message', { 
      projectId, 
      messageLength: content.length,
      totalMessages: conversationState.context.messages.length
    });

    return message;
  }

  /**
   * Add assistant response to conversation
   */
  async addAssistantMessage(
    projectId: string,
    userId: string,
    content: string,
    metadata?: Partial<ConversationMessage['metadata']>
  ): Promise<ConversationMessage> {
    const conversationState = await this.initializeConversation(projectId, userId);
    
    const message: ConversationMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      role: 'assistant',
      content,
      timestamp: Date.now(),
      metadata: metadata || {}
    };

    conversationState.context.messages.push(message);
    conversationState.context.sessionStats.totalMessages++;
    
    // Update token usage if provided
    if (metadata?.tokenCount) {
      conversationState.context.sessionStats.tokensUsed += metadata.tokenCount;
    }

    conversationState.context.sessionStats.lastActivity = Date.now();
    conversationState.lastUpdated = Date.now();

    // Optimize context if needed
    await this.optimizeConversationContext(conversationState);

    // Persist to database
    await this.saveConversationToDatabase(conversationState);

    logger.debug('Added assistant message', { 
      projectId, 
      messageLength: content.length,
      tokenCount: metadata?.tokenCount
    });

    return message;
  }

  /**
   * Track edit operation with outcome
   */
  async trackEdit(
    projectId: string,
    userId: string,
    userRequest: string,
    editType: string,
    targetFiles: string[],
    confidence: number,
    outcome: 'success' | 'partial' | 'failed',
    errorMessage?: string,
    tokensUsed?: number,
    executionTime?: number
  ): Promise<void> {
    const conversationState = await this.initializeConversation(projectId, userId);
    
    const edit: ConversationEdit = {
      timestamp: Date.now(),
      userRequest,
      editType,
      targetFiles,
      confidence,
      outcome,
      errorMessage,
      tokensUsed,
      executionTime
    };

    conversationState.context.edits.push(edit);
    conversationState.context.sessionStats.totalEdits++;
    
    if (outcome === 'success') {
      conversationState.context.sessionStats.successfulEdits++;
    } else {
      conversationState.context.sessionStats.failedEdits++;
    }

    // Update average confidence
    const totalSuccessfulEdits = conversationState.context.sessionStats.successfulEdits;
    if (totalSuccessfulEdits > 0) {
      conversationState.context.sessionStats.averageConfidence = 
        (conversationState.context.sessionStats.averageConfidence * (totalSuccessfulEdits - 1) + confidence) / totalSuccessfulEdits;
    }

    // Track recently created files to prevent duplicates
    if (outcome === 'success') {
      conversationState.context.projectEvolution.recentlyCreatedFiles = [
        ...new Set([...conversationState.context.projectEvolution.recentlyCreatedFiles, ...targetFiles])
      ].slice(-10); // Keep last 10 created files
    }

    // Update user preferences based on successful edits
    await this.updateUserPreferences(conversationState, edit);

    conversationState.lastUpdated = Date.now();

    // Persist to database
    await this.saveConversationToDatabase(conversationState);

    logger.info('Tracked edit operation', {
      projectId,
      editType,
      outcome,
      confidence,
      targetFiles: targetFiles.length,
      tokensUsed
    });
  }

  /**
   * Get conversation context optimized for AI prompts
   */
  async getOptimizedContext(
    projectId: string,
    userId: string
  ): Promise<{
    recentMessages: ConversationMessage[];
    userPreferences: ConversationContext['userPreferences'];
    projectEvolution: ConversationContext['projectEvolution'];
    sessionStats: ConversationContext['sessionStats'];
  }> {
    const conversationState = await this.initializeConversation(projectId, userId);
    
    // Get recent messages (already optimized)
    const recentMessages = conversationState.context.messages.slice(-10);
    
    return {
      recentMessages,
      userPreferences: conversationState.context.userPreferences,
      projectEvolution: conversationState.context.projectEvolution,
      sessionStats: conversationState.context.sessionStats
    };
  }

  /**
   * Get user behavior patterns for intelligent editing
   */
  async getUserPreferences(userId: string): Promise<ConversationContext['userPreferences']> {
    try {
      if (!supabase) {
        return this.getDefaultUserPreferences();
      }

      const { data: behaviorData, error } = await supabase
        .from('user_behavior_patterns')
        .select('patterns, learning_metrics')
        .eq('user_id', userId)
        .single();

      if (error || !behaviorData) {
        logger.debug('No user behavior data found, using defaults', { userId });
        return this.getDefaultUserPreferences();
      }

      // Convert stored patterns to user preferences
      return {
        editStyle: behaviorData.patterns.preferredEditStyle === 'surgical' ? 'targeted' : 'comprehensive',
        commonRequests: [], // Would be populated from conversation history
        packagePreferences: behaviorData.patterns.packageUsageHistory || [],
        preferredComponents: behaviorData.patterns.commonComponentTargets || [],
        averageTokenUsage: behaviorData.patterns.averageTokenUsage || 1000,
        successfulEditTypes: behaviorData.patterns.successRateByEditType || {}
      };

    } catch (error) {
      logger.warn('Failed to load user preferences', { userId, error });
      return this.getDefaultUserPreferences();
    }
  }

  /**
   * Update conversation topic based on recent messages
   */
  async updateCurrentTopic(projectId: string, userId: string, userMessage: string): Promise<void> {
    const conversationState = await this.initializeConversation(projectId, userId);
    
    // Simple topic extraction (could be enhanced with NLP)
    const topicKeywords = {
      'header': ['header', 'navigation', 'nav', 'menu', 'logo'],
      'hero section': ['hero', 'banner', 'main section', 'landing'],
      'styling': ['color', 'style', 'css', 'theme', 'design', 'styling'],
      'components': ['component', 'add component', 'create component'],
      'layout': ['layout', 'grid', 'flex', 'responsive', 'mobile'],
      'content': ['text', 'content', 'copy', 'words', 'change text']
    };

    const lowerMessage = userMessage.toLowerCase();
    let detectedTopic = 'general';

    for (const [topic, keywords] of Object.entries(topicKeywords)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        detectedTopic = topic;
        break;
      }
    }

    conversationState.context.currentTopic = detectedTopic;
    conversationState.lastUpdated = Date.now();

    logger.debug('Updated conversation topic', { projectId, topic: detectedTopic });
  }

  /**
   * Add major change to project evolution tracking
   */
  async trackMajorChange(
    projectId: string,
    userId: string,
    description: string,
    filesAffected: string[],
    changeType: ConversationContext['projectEvolution']['majorChanges'][0]['changeType']
  ): Promise<void> {
    const conversationState = await this.initializeConversation(projectId, userId);
    
    conversationState.context.projectEvolution.majorChanges.push({
      timestamp: Date.now(),
      description,
      filesAffected,
      changeType
    });

    // Keep only last 20 major changes
    if (conversationState.context.projectEvolution.majorChanges.length > 20) {
      conversationState.context.projectEvolution.majorChanges = 
        conversationState.context.projectEvolution.majorChanges.slice(-20);
    }

    conversationState.lastUpdated = Date.now();
    await this.saveConversationToDatabase(conversationState);

    logger.info('Tracked major change', { projectId, changeType, filesAffected: filesAffected.length });
  }

  /**
   * Check if a file was recently created to prevent duplicates
   */
  async isRecentlyCreatedFile(projectId: string, userId: string, filePath: string): Promise<boolean> {
    const conversationState = await this.initializeConversation(projectId, userId);
    return conversationState.context.projectEvolution.recentlyCreatedFiles.includes(filePath);
  }

  /**
   * Private helper methods
   */

  private createNewConversation(conversationId: string, projectId: string, userId: string): ConversationState {
    const now = Date.now();
    return {
      conversationId,
      projectId,
      userId,
      startedAt: now,
      lastUpdated: now,
      isActive: true,
      context: {
        messages: [],
        edits: [],
        currentTopic: undefined,
        projectEvolution: {
          majorChanges: [],
          recentlyCreatedFiles: []
        },
        userPreferences: this.getDefaultUserPreferences(),
        sessionStats: {
          totalMessages: 0,
          totalEdits: 0,
          tokensUsed: 0,
          successfulEdits: 0,
          failedEdits: 0,
          averageConfidence: 0,
          startTime: now,
          lastActivity: now
        }
      }
    };
  }

  private getDefaultUserPreferences(): ConversationContext['userPreferences'] {
    return {
      editStyle: 'targeted',
      commonRequests: [],
      packagePreferences: [],
      preferredComponents: [],
      averageTokenUsage: 1000,
      successfulEditTypes: {}
    };
  }

  private async loadConversationFromDatabase(
    conversationId: string,
    projectId: string,
    userId: string
  ): Promise<ConversationState | null> {
    if (!supabase) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('conversation_states')
        .select('*')
        .eq('conversation_id', conversationId)
        .single();

      if (error || !data) {
        return null;
      }

      return {
        conversationId,
        projectId,
        userId,
        startedAt: data.started_at,
        lastUpdated: data.last_updated,
        isActive: data.is_active,
        context: data.context
      };

    } catch (error) {
      logger.warn('Failed to load conversation from database', { conversationId, error });
      return null;
    }
  }

  private async saveConversationToDatabase(conversationState: ConversationState): Promise<void> {
    if (!supabase) {
      return;
    }

    try {
      const { error } = await supabase
        .from('conversation_states')
        .upsert({
          conversation_id: conversationState.conversationId,
          project_id: conversationState.projectId,
          user_id: conversationState.userId,
          started_at: conversationState.startedAt,
          last_updated: conversationState.lastUpdated,
          is_active: conversationState.isActive,
          context: conversationState.context
        }, {
          onConflict: 'conversation_id'
        });

      if (error) {
        logger.error('Failed to save conversation to database', { 
          conversationId: conversationState.conversationId, 
          error 
        });
      }

    } catch (error) {
      logger.warn('Error saving conversation to database', { 
        conversationId: conversationState.conversationId, 
        error 
      });
    }
  }

  private async optimizeConversationContext(conversationState: ConversationState): Promise<void> {
    const context = conversationState.context;
    
    // Check if optimization is needed
    if (context.messages.length <= this.optimizationSettings.maxMessages) {
      return;
    }

    // Calculate token count (rough estimate)
    const totalTokens = context.messages.reduce((sum, msg) => 
      sum + Math.ceil(msg.content.length / 4), 0
    );

    if (totalTokens <= this.optimizationSettings.maxTokens) {
      return;
    }

    // Optimize based on strategy
    switch (this.optimizationSettings.pruningStrategy) {
      case 'importance_weighted':
        this.pruneByImportance(context);
        break;
      case 'token_based':
        this.pruneByTokens(context);
        break;
      case 'oldest_first':
      default:
        this.pruneOldestFirst(context);
        break;
    }

    logger.debug('Optimized conversation context', {
      conversationId: conversationState.conversationId,
      newMessageCount: context.messages.length,
      strategy: this.optimizationSettings.pruningStrategy
    });
  }

  private pruneOldestFirst(context: ConversationContext): void {
    // Keep the most recent messages
    context.messages = context.messages.slice(-this.optimizationSettings.maxMessages);
  }

  private pruneByTokens(context: ConversationContext): void {
    let tokenCount = 0;
    const keptMessages: ConversationMessage[] = [];

    // Start from the most recent and work backwards
    for (let i = context.messages.length - 1; i >= 0; i--) {
      const message = context.messages[i];
      const messageTokens = Math.ceil(message.content.length / 4);
      
      if (tokenCount + messageTokens <= this.optimizationSettings.maxTokens) {
        keptMessages.unshift(message);
        tokenCount += messageTokens;
      } else {
        break;
      }
    }

    context.messages = keptMessages;
  }

  private pruneByImportance(context: ConversationContext): void {
    const weights = this.optimizationSettings.priorityWeights;
    const now = Date.now();
    
    // Score messages by importance
    const scoredMessages = context.messages.map((message, index) => {
      let score = 0;
      
      // Recent messages get higher scores
      const ageHours = (now - message.timestamp) / (1000 * 60 * 60);
      score += weights.recentMessages * Math.exp(-ageHours / 24); // Decay over 24 hours
      
      // Important edits get higher scores
      if (message.metadata?.editedFiles?.length) {
        score += weights.importantEdits;
      }
      
      // Error recovery pairs get higher scores
      if (message.role === 'user' && message.content.toLowerCase().includes('error')) {
        score += weights.errorRecovery;
      }
      if (message.role === 'assistant' && index > 0 && 
          context.messages[index - 1].content.toLowerCase().includes('error')) {
        score += weights.errorRecovery;
      }
      
      return { message, score, index };
    });

    // Sort by score and take the top messages
    scoredMessages.sort((a, b) => b.score - a.score);
    const topMessages = scoredMessages.slice(0, this.optimizationSettings.maxMessages);
    
    // Sort back by original order
    topMessages.sort((a, b) => a.index - b.index);
    
    context.messages = topMessages.map(item => item.message);
  }

  private async updateUserPreferences(
    conversationState: ConversationState,
    edit: ConversationEdit
  ): Promise<void> {
    const preferences = conversationState.context.userPreferences;
    
    // Update successful edit types
    if (edit.outcome === 'success') {
      if (!preferences.successfulEditTypes) {
        preferences.successfulEditTypes = {};
      }
      preferences.successfulEditTypes[edit.editType] = 
        (preferences.successfulEditTypes[edit.editType] || 0) + 1;
    }

    // Update preferred components based on target files
    if (!preferences.preferredComponents) {
      preferences.preferredComponents = [];
    }
    
    const componentNames = edit.targetFiles
      .filter(file => file.includes('.tsx') || file.includes('.jsx'))
      .map(file => file.split('/').pop()?.replace(/\.(tsx|jsx)$/, '') || '')
      .filter(name => name.length > 0);

    for (const component of componentNames) {
      if (!preferences.preferredComponents.includes(component)) {
        preferences.preferredComponents.push(component);
      }
    }

    // Keep only top 10 preferred components
    preferences.preferredComponents = preferences.preferredComponents.slice(-10);

    // Update average token usage
    if (edit.tokensUsed) {
      if (!preferences.averageTokenUsage) {
        preferences.averageTokenUsage = edit.tokensUsed;
      } else {
        preferences.averageTokenUsage = 
          (preferences.averageTokenUsage * 0.9) + (edit.tokensUsed * 0.1);
      }
    }

    // Determine edit style preference based on confidence scores
    if (edit.confidence > 0.8 && edit.outcome === 'success') {
      // High confidence successful edits suggest user prefers targeted approach
      preferences.editStyle = 'targeted';
    }
  }

  /**
   * Get conversation summary for debugging/monitoring
   */
  getConversationSummary(projectId: string, userId: string): {
    messageCount: number;
    editCount: number;
    successRate: number;
    averageConfidence: number;
    isActive: boolean;
  } | null {
    const conversationId = `${projectId}:${userId}`;
    const conversation = this.activeConversations.get(conversationId);
    
    if (!conversation) {
      return null;
    }

    const stats = conversation.context.sessionStats;
    return {
      messageCount: stats.totalMessages,
      editCount: stats.totalEdits,
      successRate: stats.totalEdits > 0 ? stats.successfulEdits / stats.totalEdits : 0,
      averageConfidence: stats.averageConfidence,
      isActive: conversation.isActive
    };
  }

  /**
   * Cleanup inactive conversations from memory
   */
  cleanupInactiveConversations(): void {
    const now = Date.now();
    const inactiveThreshold = 30 * 60 * 1000; // 30 minutes

    for (const [conversationId, state] of this.activeConversations) {
      if (now - state.lastUpdated > inactiveThreshold) {
        this.activeConversations.delete(conversationId);
        logger.debug('Cleaned up inactive conversation', { conversationId });
      }
    }
  }
}

// Export singleton instance
export const conversationManager = new ConversationManager();

// Cleanup inactive conversations every 10 minutes
setInterval(() => {
  conversationManager.cleanupInactiveConversations();
}, 10 * 60 * 1000);