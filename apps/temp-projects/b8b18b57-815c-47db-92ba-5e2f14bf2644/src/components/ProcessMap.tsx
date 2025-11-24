import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, Users, AlertCircle } from 'lucide-react';

interface ProcessMapProps {
  isPlaying: boolean;
}

const ProcessMap: React.FC<ProcessMapProps> = ({ isPlaying }) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  
  const nodes = [
    { id: 'start', label: 'Start', x: 50, y: 200, type: 'start' },
    { id: 'order', label: 'Order Creation', x: 200, y: 200, frequency: 1247, avgTime: 0.5 },
    { id: 'payment', label: 'Payment Processing', x: 400, y: 150, frequency: 1205, avgTime: 2.3 },
    { id: 'inventory', label: 'Inventory Check', x: 400, y: 250, frequency: 456, avgTime: 1.8 },
    { id: 'shipping', label: 'Shipping', x: 600, y: 200, frequency: 1156, avgTime: 24.5 },
    { id: 'delivery', label: 'Delivery', x: 800, y: 200, frequency: 1089, avgTime: 48.2 },
    { id: 'complete', label: 'Complete', x: 950, y: 200, frequency: 1067, avgTime: 0.3 },
  ];

  const edges = [
    { from: 'start', to: 'order', frequency: 1247 },
    { from: 'order', to: 'payment', frequency: 1205 },
    { from: 'order', to: 'inventory', frequency: 456 },
    { from: 'payment', to: 'shipping', frequency: 891 },
    { from: 'inventory', to: 'shipping', frequency: 265 },
    { from: 'shipping', to: 'delivery', frequency: 1156 },
    { from: 'delivery', to: 'complete', frequency: 1067 },
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        setActiveNode(randomNode.id);
        setTimeout(() => setActiveNode(null), 500);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const getNodeColor = (node: any) => {
    if (node.type === 'start') return 'bg-green-500';
    if (activeNode === node.id) return 'bg-blue-600 animate-pulse';
    if (node.avgTime > 20) return 'bg-red-500';
    if (node.avgTime > 5) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const getEdgeWidth = (frequency: number) => {
    if (frequency > 1000) return 4;
    if (frequency > 500) return 3;
    if (frequency > 100) return 2;
    return 1;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Start/End</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">Normal (&lt;5h)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-600">Slow (5-20h)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-600">Bottleneck (&gt;20h)</span>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          {isPlaying ? 'Live simulation running...' : 'Static view'}
        </div>
      </div>
      
      <div className="relative bg-gray-50 rounded-lg p-8 process-flow" style={{ height: '500px' }}>
        {/* Edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {edges.map((edge, index) => {
            const fromNode = nodes.find(n => n.id === edge.from);
            const toNode = nodes.find(n => n.id === edge.to);
            if (!fromNode || !toNode) return null;
            
            return (
              <g key={index}>
                <line
                  x1={fromNode.x + 60}
                  y1={fromNode.y + 20}
                  x2={toNode.x}
                  y2={toNode.y + 20}
                  stroke="#6b7280"
                  strokeWidth={getEdgeWidth(edge.frequency)}
                  markerEnd="url(#arrowhead)"
                />
                <text
                  x={(fromNode.x + toNode.x + 60) / 2}
                  y={(fromNode.y + toNode.y) / 2 + 10}
                  textAnchor="middle"
                  className="text-xs fill-gray-500"
                >
                  {edge.frequency}
                </text>
              </g>
            );
          })}
          
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="10"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="#6b7280"
              />
            </marker>
          </defs>
        </svg>
        
        {/* Nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ left: node.x, top: node.y }}
          >
            <div className={`w-12 h-12 rounded-full ${getNodeColor(node)} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110`}>
              {node.type === 'start' ? (
                <div className="w-4 h-4 bg-white rounded-full"></div>
              ) : (
                <span className="text-white text-xs font-bold">
                  {node.frequency ? Math.floor(node.frequency / 100) : ''}
                </span>
              )}
            </div>
            
            <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 whitespace-nowrap">
              <h4 className="font-medium text-gray-900 text-sm">{node.label}</h4>
              {node.frequency && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center space-x-2 text-xs">
                    <Users className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-600">{node.frequency.toLocaleString()} cases</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <Clock className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-600">{node.avgTime}h avg</span>
                  </div>
                  {node.avgTime > 20 && (
                    <div className="flex items-center space-x-2 text-xs">
                      <AlertCircle className="w-3 h-3 text-red-500" />
                      <span className="text-red-600">Bottleneck detected</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessMap;