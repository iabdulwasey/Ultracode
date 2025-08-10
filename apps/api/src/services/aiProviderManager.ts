import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { createGroq } from '@ai-sdk/groq';
import { streamText, generateText } from 'ai';
import { appConfig } from '../config/app.config.js';
import { logger } from '../utils/logger.js';

export interface AIProvider {
  name: string;
  client: any; // AI SDK client
  isAvailable: boolean;
  lastError?: string;
  models: string[];
}

export interface GenerationOptions {
  model: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface GenerationResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model: string;
  provider: string;
  stream?: ReadableStream<string> | any; // For streaming responses
}

export class AIProviderManager {
  private providers: Map<string, AIProvider> = new Map();
  private initialized = false;

  constructor() {
    this.initializeProviders();
  }

  private initializeProviders(): void {
    try {
      // Initialize Anthropic (default provider) using AI SDK
      if (process.env.ANTHROPIC_API_KEY) {
        const anthropic = createAnthropic({
          apiKey: process.env.ANTHROPIC_API_KEY,
          baseURL: process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com/v1'
        });

        this.providers.set('anthropic', {
          name: 'Anthropic',
          client: anthropic,
          isAvailable: true,
          models: [
            'claude-sonnet-4-20250514',
            'claude-opus-4-20250514'
          ]
        });

        logger.info('✅ Anthropic provider initialized (AI SDK)');
      } else {
        logger.warn('⚠️ Anthropic API key not found - provider disabled');
      }

      // Initialize OpenAI using AI SDK
      if (process.env.OPENAI_API_KEY) {
        const openai = createOpenAI({
          apiKey: process.env.OPENAI_API_KEY,
          baseURL: process.env.OPENAI_BASE_URL
        });

        this.providers.set('openai', {
          name: 'OpenAI',
          client: openai,
          isAvailable: true,
          models: [
            'gpt-4o',
            'gpt-5'
          ]
        });

        logger.info('✅ OpenAI provider initialized (AI SDK)');
      } else {
        logger.warn('⚠️ OpenAI API key not found - provider disabled');
      }

      // Initialize Groq using AI SDK
      if (process.env.GROQ_API_KEY) {
        const groq = createGroq({
          apiKey: process.env.GROQ_API_KEY
        });

        this.providers.set('groq', {
          name: 'Groq',
          client: groq,
          isAvailable: true,
          models: [
            'mixtral-8x7b-32768',
            'llama3-groq-70b-8192'
          ]
        });

        logger.info('✅ Groq provider initialized (AI SDK)');
      } else {
        logger.warn('⚠️ Groq API key not found - provider disabled');
      }

      this.initialized = true;
      logger.info(`🤖 AI Provider Manager initialized with ${this.providers.size} providers (AI SDK)`);
      
      if (this.providers.size === 0) {
        logger.error('❌ No AI providers available - please configure API keys');
      }

    } catch (error) {
      logger.error('Failed to initialize AI providers:', error);
      this.initialized = false;
    }
  }

  public getAvailableProviders(): string[] {
    return Array.from(this.providers.keys()).filter(key => 
      this.providers.get(key)?.isAvailable
    );
  }

  public getAvailableModels(): string[] {
    const models: string[] = [];
    for (const [providerName, provider] of this.providers) {
      if (provider.isAvailable) {
        provider.models.forEach(model => {
          models.push(`${providerName}/${model}`);
        });
      }
    }
    return models;
  }

  public getModelDisplayName(modelId: string): string {
    return appConfig.ai.modelDisplayNames[modelId] || modelId;
  }

  private parseModelId(modelId: string): { provider: string; model: string } {
    const [provider, ...modelParts] = modelId.split('/');
    return {
      provider: provider || 'anthropic', // Default to anthropic
      model: modelParts.join('/') || modelId
    };
  }

  // Use AI SDK unified interface instead of provider-specific methods

  public async generateWithFallback(
    messages: Array<{ role: string; content: string }>,
    options: GenerationOptions
  ): Promise<GenerationResponse> {
    if (!this.initialized) {
      throw new Error('AI Provider Manager not initialized');
    }

    const { provider: targetProvider, model: modelName } = this.parseModelId(options.model);
    const provider = this.providers.get(targetProvider);

    if (!provider) {
      throw new Error(`Provider ${targetProvider} not found`);
    }

    if (!provider.isAvailable) {
      // Try to find a fallback provider
      const fallbackProviders = ['anthropic', 'openai', 'groq'].filter(p => 
        p !== targetProvider && this.providers.get(p)?.isAvailable
      );

      if (fallbackProviders.length === 0) {
        throw new Error('No available AI providers for fallback');
      }

      const fallbackProvider = fallbackProviders[0];
      const fallbackModel = this.providers.get(fallbackProvider)?.models[0];
      
      if (!fallbackModel) {
        throw new Error('No fallback model available');
      }

      logger.warn(`Provider ${targetProvider} unavailable, falling back to ${fallbackProvider}/${fallbackModel}`);
      
      // Update options to use fallback
      options.model = `${fallbackProvider}/${fallbackModel}`;
      return this.generateWithFallback(messages, options);
    }

    try {
      // Use AI SDK unified interface like Open-Lovable
      const client = provider.client;
      const actualModel = client(modelName); // AI SDK pattern

      const aiMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const streamOptions: any = {
        model: actualModel,
        messages: aiMessages,
        maxTokens: options.maxTokens || appConfig.ai.maxTokens
      };

      // Add temperature for non-reasoning models (following Open-Lovable pattern)
      // Only GPT-5 models have reasoning capabilities, all others use temperature
      if (!options.model.startsWith('openai/gpt-5')) {
        streamOptions.temperature = options.temperature || 0.7;
      }

      // Add reasoning effort ONLY for GPT-5 models (following Open-Lovable pattern)
      // Anthropic Claude and Groq models do not have explicit reasoning effort parameters
      if (options.model === 'openai/gpt-5') {
        streamOptions.experimental_providerMetadata = {
          openai: {
            reasoningEffort: 'high'
          }
        };
      }

      if (options.stream) {
        // Use streamText for streaming
        const result = await streamText(streamOptions);
        
        return {
          content: '',
          model: options.model,
          provider: targetProvider,
          stream: result.textStream
        } as any;
      } else {
        // Use generateText for non-streaming
        const result = await generateText(streamOptions);
        
        return {
          content: result.text,
          usage: {
            promptTokens: result.usage.promptTokens || 0,
            completionTokens: result.usage.completionTokens || 0,
            totalTokens: result.usage.totalTokens || 0
          },
          model: options.model,
          provider: targetProvider
        };
      }
    } catch (error) {
      // Mark provider as temporarily unavailable
      provider.isAvailable = false;
      provider.lastError = error instanceof Error ? error.message : 'Unknown error';
      
      logger.error(`${targetProvider} generation error:`, error);
      
      // Try fallback if this was the primary attempt
      const fallbackProviders = ['anthropic', 'openai', 'groq'].filter(p => 
        p !== targetProvider && this.providers.get(p)?.isAvailable
      );

      if (fallbackProviders.length > 0) {
        const fallbackProvider = fallbackProviders[0];
        const fallbackModel = this.providers.get(fallbackProvider)?.models[0];
        
        if (fallbackModel) {
          logger.warn(`Primary provider ${targetProvider} failed, trying fallback ${fallbackProvider}/${fallbackModel}`);
          options.model = `${fallbackProvider}/${fallbackModel}`;
          return this.generateWithFallback(messages, options);
        }
      }

      throw error;
    }
  }

  public async healthCheck(): Promise<Record<string, boolean>> {
    const health: Record<string, boolean> = {};

    for (const [providerName, provider] of this.providers) {
      try {
        // Reset availability for health check
        provider.isAvailable = true;
        provider.lastError = undefined;

        // Test with a simple generation using AI SDK
        const result = await this.generateWithFallback(
          [{ role: 'user', content: 'Hello' }],
          { 
            model: `${providerName}/${provider.models[0]}`,
            maxTokens: 10,
            stream: false
          }
        );

        health[providerName] = !!(result && result.content);
      } catch (error) {
        health[providerName] = false;
        provider.isAvailable = false;
        provider.lastError = error instanceof Error ? error.message : 'Health check failed';
        
        logger.warn(`Health check failed for ${providerName}:`, error);
      }
    }

    return health;
  }

  public getProviderStats(): Record<string, any> {
    const stats: Record<string, any> = {};

    for (const [providerName, provider] of this.providers) {
      stats[providerName] = {
        name: provider.name,
        isAvailable: provider.isAvailable,
        lastError: provider.lastError,
        models: provider.models,
        modelsCount: provider.models.length
      };
    }

    return stats;
  }
}

// Export singleton instance
export const aiProviderManager = new AIProviderManager();