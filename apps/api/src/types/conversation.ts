/**
 * Conversation tracking types for maintaining context across interactions
 * Based on Open-Lovable's conversation memory system
 * 
 * This enables Ultracode to track conversation context, user preferences,
 * and project evolution for smarter AI interactions.
 */

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  metadata?: {
    editedFiles?: string[]; // Files edited in this interaction
    addedPackages?: string[]; // Packages added in this interaction
    editType?: string; // Type of edit performed (UPDATE_COMPONENT, ADD_FEATURE, etc.)
    sandboxId?: string; // Container ID at time of message
    tokenCount?: number; // Tokens used for this message
    model?: string; // AI model used
    confidence?: number; // Edit confidence score
    searchResults?: number; // Number of search results found
  };
}

export interface ConversationEdit {
  timestamp: number;
  userRequest: string;
  editType: string;
  targetFiles: string[];
  confidence: number;
  outcome: 'success' | 'partial' | 'failed';
  errorMessage?: string;
  tokensUsed?: number;
  executionTime?: number;
}

export interface ConversationContext {
  messages: ConversationMessage[];
  edits: ConversationEdit[];
  currentTopic?: string; // Current focus area (e.g., "header styling", "hero section")
  projectEvolution: {
    initialState?: string; // Description of initial project state
    majorChanges: Array<{
      timestamp: number;
      description: string;
      filesAffected: string[];
      changeType: 'feature_add' | 'style_update' | 'bug_fix' | 'refactor' | 'full_rebuild';
    }>;
    recentlyCreatedFiles: string[]; // Track recently created files to prevent duplicates
    componentTree?: Record<string, string[]>; // Component dependency mapping
  };
  userPreferences: {
    editStyle?: 'targeted' | 'comprehensive'; // How the user prefers edits
    commonRequests?: string[]; // Common patterns in user requests
    packagePreferences?: string[]; // Commonly used packages
    preferredComponents?: string[]; // Components user frequently modifies
    averageTokenUsage?: number; // User's typical token usage pattern
    successfulEditTypes?: Record<string, number>; // Edit types that work well for this user
  };
  sessionStats: {
    totalMessages: number;
    totalEdits: number;
    tokensUsed: number;
    successfulEdits: number;
    failedEdits: number;
    averageConfidence: number;
    startTime: number;
    lastActivity: number;
  };
}

export interface ConversationState {
  conversationId: string;
  projectId: string;
  userId: string;
  startedAt: number;
  lastUpdated: number;
  context: ConversationContext;
  isActive: boolean;
}

// User behavior patterns for intelligent adaptation
export interface UserBehaviorPattern {
  userId: string;
  patterns: {
    editTypePreferences: Record<string, number>; // Frequency of edit types
    averageTokenUsage: number;
    preferredEditStyle: 'surgical' | 'comprehensive';
    commonComponentTargets: string[]; // Components frequently edited
    packageUsageHistory: string[]; // Packages commonly used
    successRateByEditType: Record<string, number>; // Success rates per edit type
    timeOfDayActivity: Record<string, number>; // When user is most active
  };
  learningMetrics: {
    totalInteractions: number;
    successfulEdits: number;
    averageConfidence: number;
    preferenceConfidence: number; // How confident we are in learned preferences
    lastUpdated: number;
  };
}

// Project evolution tracking
export interface ProjectEvolutionSnapshot {
  projectId: string;
  timestamp: number;
  fileCount: number;
  componentCount: number;
  majorFeatures: string[]; // List of major features in the project
  technicalComplexity: 'simple' | 'moderate' | 'complex';
  lastMajorChange: {
    type: string;
    description: string;
    timestamp: number;
  };
}

// Context optimization for token management
export interface ConversationContextOptimization {
  maxMessages: number; // Maximum messages to keep in context
  maxTokens: number; // Maximum total tokens to include
  priorityWeights: {
    recentMessages: number; // Weight for recent messages
    importantEdits: number; // Weight for significant edits
    errorRecovery: number; // Weight for error/fix pairs
    userPreferences: number; // Weight for learned preferences
  };
  pruningStrategy: 'oldest_first' | 'token_based' | 'importance_weighted';
}

// Export types for external use
export type {
  ConversationMessage,
  ConversationEdit,
  ConversationContext,
  ConversationState,
  UserBehaviorPattern,
  ProjectEvolutionSnapshot,
  ConversationContextOptimization
};