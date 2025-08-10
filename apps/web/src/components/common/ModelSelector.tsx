import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, CheckIcon, CpuChipIcon } from '@heroicons/react/24/outline';
import { useModelStore } from '../../stores/modelStore';

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

interface ModelSelectorProps {
  onModelChange?: (modelId: string) => void;
  className?: string;
  compact?: boolean;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ 
  onModelChange, 
  className = '', 
  compact = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { 
    models, 
    currentModel, 
    providers,
    providerStats,
    setCurrentModel,
    fetchModels 
  } = useModelStore();

  useEffect(() => {
    const loadModels = async () => {
      try {
        await fetchModels();
      } catch (error) {
        console.error('Failed to load models:', error);
      } finally {
        setLoading(false);
      }
    };

    loadModels();
  }, [fetchModels]);

  const handleModelSelect = (modelId: string) => {
    setCurrentModel(modelId);
    setIsOpen(false);
    onModelChange?.(modelId);
  };

  const getProviderColor = (provider: string): string => {
    switch (provider) {
      case 'anthropic':
        return 'text-orange-600 bg-orange-50';
      case 'openai':
        return 'text-green-600 bg-green-50';
      case 'groq':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getProviderIcon = (provider: string): string => {
    switch (provider) {
      case 'anthropic':
        return '🤖';
      case 'openai':
        return '🧠';
      case 'groq':
        return '⚡';
      default:
        return '🔮';
    }
  };

  const selectedModel = models.find(model => model.id === currentModel);
  const selectedProviderStat = providerStats[selectedModel?.provider || ''];

  if (loading) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        <span className="text-sm text-gray-500">Loading models...</span>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="relative inline-block text-left">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
        >
          <span className="mr-1">{getProviderIcon(selectedModel?.provider || '')}</span>
          <span className="truncate max-w-20">{selectedModel?.displayName || 'Select Model'}</span>
          <ChevronDownIcon className="w-3 h-3 ml-1" />
        </button>

        {isOpen && (
          <div className="absolute right-0 z-50 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
            <div className="py-1">
              {models.map((model) => {
                const isSelected = model.id === currentModel;
                const stat = providerStats[model.provider];
                
                return (
                  <button
                    key={model.id}
                    onClick={() => handleModelSelect(model.id)}
                    disabled={!stat?.isAvailable}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isSelected ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{getProviderIcon(model.provider)}</span>
                      <span className="truncate">{model.displayName}</span>
                    </div>
                    {isSelected && <CheckIcon className="w-3 h-3" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center space-x-2">
        <CpuChipIcon className="h-5 w-5 text-gray-400" />
        <h3 className="text-sm font-medium text-gray-900">AI Model</h3>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full bg-white border border-gray-300 rounded-lg shadow-sm pl-3 pr-10 py-3 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <div className="flex items-center">
            <span className="text-lg mr-3">{getProviderIcon(selectedModel?.provider || '')}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="block truncate font-medium text-gray-900">
                  {selectedModel?.displayName || 'Select a model'}
                </span>
                {selectedModel && (
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getProviderColor(selectedModel.provider)}`}>
                    {selectedModel.provider}
                  </span>
                )}
              </div>
              {selectedProviderStat && !selectedProviderStat.isAvailable && (
                <div className="text-xs text-red-600 mt-1">
                  Provider unavailable: {selectedProviderStat.lastError}
                </div>
              )}
            </div>
          </div>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {Object.entries(
              models.reduce((acc, model) => {
                if (!acc[model.provider]) acc[model.provider] = [];
                acc[model.provider].push(model);
                return acc;
              }, {} as Record<string, Model[]>)
            ).map(([provider, providerModels]) => {
              const stat = providerStats[provider];
              
              return (
                <div key={provider}>
                  <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide bg-gray-50 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span>{getProviderIcon(provider)}</span>
                      <span>{stat?.name || provider}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${stat?.isAvailable ? 'bg-green-400' : 'bg-red-400'}`}></div>
                      <span className="text-xs">
                        {stat?.isAvailable ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                  
                  {providerModels.map((model) => {
                    const isSelected = model.id === currentModel;
                    
                    return (
                      <button
                        key={model.id}
                        onClick={() => handleModelSelect(model.id)}
                        disabled={!stat?.isAvailable}
                        className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed ${
                          isSelected ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{model.displayName}</span>
                          <span className="text-xs text-gray-500">{model.id}</span>
                        </div>
                        {isSelected && <CheckIcon className="h-4 w-4" />}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Provider Status Summary */}
      <div className="space-y-1">
        {Object.entries(providerStats).map(([provider, stat]) => (
          <div key={provider} className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span>{getProviderIcon(provider)}</span>
              <span className="text-gray-600">{stat.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className={`w-1.5 h-1.5 rounded-full ${stat.isAvailable ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span className={stat.isAvailable ? 'text-green-600' : 'text-red-600'}>
                {stat.isAvailable ? `${stat.modelsCount} models` : 'Unavailable'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};