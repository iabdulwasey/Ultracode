import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Model {
  id: string;
  displayName: string;
  provider: string;
}

interface ProviderStat {
  name: string;
  isAvailable: boolean;
  lastError?: string;
  models: string[];
  modelsCount: number;
}

interface ModelState {
  // State
  models: Model[];
  currentModel: string;
  providers: string[];
  providerStats: Record<string, ProviderStat>;
  defaultModel: string;
  loading: boolean;
  error: string | null;
  lastFetch: number | null;

  // Actions
  setCurrentModel: (modelId: string) => void;
  setModels: (models: Model[]) => void;
  setProviders: (providers: string[]) => void;
  setProviderStats: (stats: Record<string, ProviderStat>) => void;
  setDefaultModel: (modelId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchModels: () => Promise<void>;
  checkProviderHealth: () => Promise<void>;
  reset: () => void;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useModelStore = create<ModelState>()(
  persist(
    (set, get) => ({
      // Initial state
      models: [],
      currentModel: 'anthropic/claude-sonnet-4-20250514', // Default to Anthropic as requested
      providers: [],
      providerStats: {},
      defaultModel: 'anthropic/claude-sonnet-4-20250514',
      loading: false,
      error: null,
      lastFetch: null,

      // Actions
      setCurrentModel: (modelId: string) => {
        set({ currentModel: modelId });
      },

      setModels: (models: Model[]) => {
        set({ models });
      },

      setProviders: (providers: string[]) => {
        set({ providers });
      },

      setProviderStats: (stats: Record<string, ProviderStat>) => {
        set({ providerStats: stats });
      },

      setDefaultModel: (modelId: string) => {
        set({ defaultModel: modelId, currentModel: modelId });
      },

      setLoading: (loading: boolean) => {
        set({ loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      fetchModels: async () => {
        const { lastFetch } = get();
        
        // Check if we need to refresh the cache
        if (lastFetch && Date.now() - lastFetch < CACHE_DURATION) {
          return; // Use cached data
        }

        set({ loading: true, error: null });

        try {
          const response = await fetch('/api/generate/models');
          
          if (!response.ok) {
            throw new Error(`Failed to fetch models: ${response.status}`);
          }

          const data = await response.json();

          if (!data.success) {
            throw new Error(data.error || 'Failed to fetch models');
          }

          set({
            models: data.models || [],
            providers: data.providers || [],
            providerStats: data.providerStats || {},
            defaultModel: data.defaultModel || 'anthropic/claude-sonnet-4-20250514',
            lastFetch: Date.now(),
            loading: false,
            error: null
          });

          // Update current model to default if not set or not available
          const { currentModel, models } = get();
          if (!currentModel || !models.some(m => m.id === currentModel)) {
            set({ currentModel: data.defaultModel });
          }

        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.error('Failed to fetch models:', error);
          
          set({
            loading: false,
            error: errorMessage
          });
        }
      },

      checkProviderHealth: async () => {
        try {
          const response = await fetch('/api/generate/providers/health');
          
          if (!response.ok) {
            throw new Error(`Health check failed: ${response.status}`);
          }

          const data = await response.json();

          if (data.success && data.health) {
            // Update provider availability based on health check
            const { providerStats } = get();
            const updatedStats = { ...providerStats };

            Object.entries(data.health).forEach(([provider, isHealthy]) => {
              if (updatedStats[provider]) {
                updatedStats[provider].isAvailable = isHealthy as boolean;
                if (!isHealthy) {
                  updatedStats[provider].lastError = 'Health check failed';
                }
              }
            });

            set({ providerStats: updatedStats });
          }
        } catch (error) {
          console.error('Provider health check failed:', error);
        }
      },

      reset: () => {
        set({
          models: [],
          currentModel: 'anthropic/claude-sonnet-4-20250514',
          providers: [],
          providerStats: {},
          defaultModel: 'anthropic/claude-sonnet-4-20250514',
          loading: false,
          error: null,
          lastFetch: null
        });
      }
    }),
    {
      name: 'ultracode-model-store',
      partialize: (state) => ({
        currentModel: state.currentModel,
        models: state.models,
        providers: state.providers,
        providerStats: state.providerStats,
        defaultModel: state.defaultModel,
        lastFetch: state.lastFetch
      })
    }
  )
);

// Selectors for common use cases
export const useCurrentModel = () => useModelStore(state => state.currentModel);
export const useAvailableModels = () => useModelStore(state => state.models);
export const useProviderStats = () => useModelStore(state => state.providerStats);
export const useModelLoading = () => useModelStore(state => state.loading);

// Helper functions
export const getModelDisplayName = (modelId: string): string => {
  const models = useModelStore.getState().models;
  return models.find(m => m.id === modelId)?.displayName || modelId;
};

export const getModelProvider = (modelId: string): string => {
  return modelId.split('/')[0] || 'unknown';
};

export const isProviderAvailable = (provider: string): boolean => {
  const stats = useModelStore.getState().providerStats[provider];
  return stats?.isAvailable ?? false;
};

export const isModelAvailable = (modelId: string): boolean => {
  const provider = getModelProvider(modelId);
  return isProviderAvailable(provider);
};