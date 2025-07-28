import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut, Download, Settings } from 'lucide-react';
import * as d3 from 'd3';

const ProcessDiscovery: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('alpha');
  const [threshold, setThreshold] = useState(0.1);
  const svgRef = useRef<SVGSVGElement>(null);

  // Sample process data
  const processData = {
    nodes: [
      { id: 'start', label: 'Start', type: 'start', x: 100, y: 200, frequency: 100 },
      { id: 'register', label: 'Register Order', type: 'activity', x: 250, y: 200, frequency: 100 },
      { id: 'check_stock', label: 'Check Stock', type: 'activity', x: 400, y: 150, frequency: 95 },
      { id: 'approve', label: 'Approve Order', type: 'activity', x: 400, y: 250, frequency: 85 },
      { id: 'prepare', label: 'Prepare Shipment', type: 'activity', x: 550, y: 200, frequency: 80 },
      { id: 'ship', label: 'Ship Order', type: 'activity', x: 700, y: 200, frequency: 78 },
      { id: 'end', label: 'End', type: 'end', x: 850, y: 200, frequency: 78 }
    ],
    edges: [
      { source: 'start', target: 'register', frequency: 100, duration: 0.5 },
      { source: 'register', target: 'check_stock', frequency: 95, duration: 1.2 },
      { source: 'register', target: 'approve', frequency: 85, duration: 2.1 },
      { source: 'check_stock', target: 'prepare', frequency: 80, duration: 0.8 },
      { source: 'approve', target: 'prepare', frequency: 75, duration: 1.5 },
      { source: 'prepare', target: 'ship', frequency: 78, duration: 1.0 },
      { source: 'ship', target: 'end', frequency: 78, duration: 0.3 }
    ]
  };

  const algorithms = [
    { id: 'alpha', name: 'Alpha Miner', description: 'Classic process discovery algorithm' },
    { id: 'heuristic', name: 'Heuristic Miner', description: 'Handles noise and incomplete logs' },
    { id: 'inductive', name: 'Inductive Miner', description: 'Guarantees sound process models' },
    { id: 'fuzzy', name: 'Fuzzy Miner', description: 'Adaptive process discovery' }
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 1000;
    const height = 400;

    // Create links
    const links = svg.selectAll('.link')
      .data(processData.edges)
      .enter()
      .append('g')
      .attr('class', 'link');

    // Add arrows
    svg.append('defs').selectAll('marker')
      .data(['end'])
      .enter()
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 25)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#666');

    // Draw edges
    links.append('line')
      .attr('x1', d => {
        const source = processData.nodes.find(n => n.id === d.source);
        return source ? source.x + 40 : 0;
      })
      .attr('y1', d => {
        const source = processData.nodes.find(n => n.id === d.source);
        return source ? source.y : 0;
      })
      .attr('x2', d => {
        const target = processData.nodes.find(n => n.id === d.target);
        return target ? target.x - 40 : 0;
      })
      .attr('y2', d => {
        const target = processData.nodes.find(n => n.id === d.target);
        return target ? target.y : 0;
      })
      .attr('stroke', '#666')
      .attr('stroke-width', d => Math.max(1, d.frequency / 20))
      .attr('marker-end', 'url(#arrow)')
      .attr('class', 'process-edge');

    // Add edge labels
    links.append('text')
      .attr('x', d => {
        const source = processData.nodes.find(n => n.id === d.source);
        const target = processData.nodes.find(n => n.id === d.target);
        return source && target ? (source.x + target.x) / 2 : 0;
      })
      .attr('y', d => {
        const source = processData.nodes.find(n => n.id === d.source);
        const target = processData.nodes.find(n => n.id === d.target);
        return source && target ? (source.y + target.y) / 2 - 10 : 0;
      })
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', '#666')
      .text(d => `${d.frequency} (${d.duration}h)`);

    // Create nodes
    const nodes = svg.selectAll('.node')
      .data(processData.nodes)
      .enter()
      .append('g')
      .attr('class', 'node process-node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`);

    // Add node shapes
    nodes.append('rect')
      .attr('x', -40)
      .attr('y', -20)
      .attr('width', 80)
      .attr('height', 40)
      .attr('rx', 5)
      .attr('fill', d => {
        switch (d.type) {
          case 'start': return '#10B981';
          case 'end': return '#EF4444';
          default: return '#3B82F6';
        }
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Add node labels
    nodes.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('font-size', '10px')
      .attr('fill', 'white')
      .attr('font-weight', 'bold')
      .text(d => d.label);

    // Add frequency badges
    nodes.append('circle')
      .attr('cx', 35)
      .attr('cy', -15)
      .attr('r', 12)
      .attr('fill', '#F59E0B')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    nodes.append('text')
      .attr('x', 35)
      .attr('y', -15)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('font-size', '8px')
      .attr('fill', 'white')
      .attr('font-weight', 'bold')
      .text(d => d.frequency);

  }, [selectedAlgorithm, threshold]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    // Reset animation logic here
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Process Discovery</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Model</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Discovery Algorithm</label>
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {algorithms.map(alg => (
                <option key={alg.id} value={alg.id}>{alg.name}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {algorithms.find(a => a.id === selectedAlgorithm)?.description}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frequency Threshold: {(threshold * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">Filter low-frequency paths</p>
          </div>

          <div className="flex items-end space-x-2">
            <button
              onClick={handlePlayPause}
              className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                isPlaying ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{isPlaying ? 'Pause' : 'Animate'}</span>
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </button>
          </div>

          <div className="flex items-end space-x-2">
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <ZoomIn className="h-4 w-4 text-gray-600" />
            </button>
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <ZoomOut className="h-4 w-4 text-gray-600" />
            </button>
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <Settings className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Process Model Visualization */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Discovered Process Model</h3>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <svg
            ref={svgRef}
            width="100%"
            height="400"
            viewBox="0 0 1000 400"
            className="bg-gray-50"
          />
        </div>
      </div>

      {/* Process Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Activities</span>
              <span className="text-sm font-medium text-gray-900">7</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Transitions</span>
              <span className="text-sm font-medium text-gray-900">7</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Start Events</span>
              <span className="text-sm font-medium text-gray-900">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">End Events</span>
              <span className="text-sm font-medium text-gray-900">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Parallel Gateways</span>
              <span className="text-sm font-medium text-gray-900">2</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Fitness</span>
              <span className="text-sm font-medium text-green-600">0.94</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Precision</span>
              <span className="text-sm font-medium text-blue-600">0.87</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Generalization</span>
              <span className="text-sm font-medium text-purple-600">0.82</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Simplicity</span>
              <span className="text-sm font-medium text-orange-600">0.91</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Overall Score</span>
              <span className="text-sm font-medium text-gray-900">0.89</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Variant Analysis</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Variants</span>
              <span className="text-sm font-medium text-gray-900">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Most Frequent</span>
              <span className="text-sm font-medium text-gray-900">45%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Top 3 Coverage</span>
              <span className="text-sm font-medium text-gray-900">78%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Unique Paths</span>
              <span className="text-sm font-medium text-gray-900">5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg Path Length</span>
              <span className="text-sm font-medium text-gray-900">5.2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessDiscovery;