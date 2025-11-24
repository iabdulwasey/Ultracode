import React, { useState } from 'react';
import ProcessMap from './ProcessMap';
import VariantAnalysis from './VariantAnalysis';
import { Play, Pause, RotateCcw, Download, Settings } from 'lucide-react';

const ProcessDiscovery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'map' | 'variants'>('map');
  const [isPlaying, setIsPlaying] = useState(false);

  const tabs = [
    { id: 'map', label: 'Process Map', component: ProcessMap },
    { id: 'variants', label: 'Variant Analysis', component: VariantAnalysis }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ProcessMap;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Process Discovery</h2>
              <p className="text-sm text-gray-600 mt-1">
                Discover and visualize your actual business processes from event data
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isPlaying 
                    ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                    : 'bg-green-50 text-green-600 hover:bg-green-100'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Play</span>
                  </>
                )}
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              
              <button className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex space-x-1 mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'map' | 'variants')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-6">
          <ActiveComponent isPlaying={isPlaying} />
        </div>
      </div>
    </div>
  );
};

export default ProcessDiscovery;