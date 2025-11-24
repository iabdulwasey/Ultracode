import React, { useState } from 'react';
import { Clock, TrendingUp, TrendingDown, AlertTriangle, BarChart3, PieChart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter } from 'recharts';

const PerformanceAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bottlenecks' | 'efficiency'>('overview');
  
  const performanceData = [
    { date: '2024-01-01', throughput: 3.2, cycleTime: 2.8, utilization: 78 },
    { date: '2024-01-08', throughput: 2.9, cycleTime: 3.1, utilization: 82 },
    { date: '2024-01-15', throughput: 3.8, cycleTime: 2.4, utilization: 85 },
    { date: '2024-01-22', throughput: 3.5, cycleTime: 2.7, utilization: 79 },
    { date: '2024-01-29', throughput: 4.1, cycleTime: 2.2, utilization: 88 }
  ];

  const bottlenecks = [
    {
      activity: 'Payment Processing',
      avgWaitTime: 2.3,
      maxWaitTime: 8.5,
      frequency: 1205,
      impact: 'high' as const,
      trend: 'up' as const
    },
    {
      activity: 'Inventory Check',
      avgWaitTime: 1.8,
      maxWaitTime: 6.2,
      frequency: 456,
      impact: 'medium' as const,
      trend: 'down' as const
    },
    {
      activity: 'Shipping Preparation',
      avgWaitTime: 4.2,
      maxWaitTime: 12.8,
      frequency: 1156,
      impact: 'high' as const,
      trend: 'up' as const
    },
    {
      activity: 'Quality Check',
      avgWaitTime: 0.8,
      maxWaitTime: 3.1,
      frequency: 234,
      impact: 'low' as const,
      trend: 'stable' as const
    }
  ];

  const efficiencyMetrics = [
    { activity: 'Order Creation', workingTime: 0.5, waitingTime: 0.1, efficiency: 83.3 },
    { activity: 'Payment Processing', workingTime: 2.3, waitingTime: 1.2, efficiency: 65.7 },
    { activity: 'Inventory Check', workingTime: 1.8, waitingTime: 0.6, efficiency: 75.0 },
    { activity: 'Shipping', workingTime: 24.5, waitingTime: 8.3, efficiency: 74.7 },
    { activity: 'Delivery', workingTime: 48.2, waitingTime: 12.1, efficiency: 79.9 }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-red-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-green-600" />;
      default:
        return <BarChart3 className="w-4 h-4 text-gray-600" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Throughput Time</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">3.5 days</p>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingDown className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">-8.3% vs last month</span>
              </div>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resource Utilization</p>
              <p className="text-2xl font-bold text-green-600 mt-1">82.4%</p>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">+5.2% vs last month</span>
              </div>
            </div>
            <BarChart3 className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Process Efficiency</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">75.6%</p>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingDown className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-600">-2.1% vs last month</span>
              </div>
            </div>
            <PieChart className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Performance Trend */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Trend</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line 
                yAxisId="left" 
                type="monotone" 
                dataKey="throughput" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Throughput Time (days)"
              />
              <Line 
                yAxisId="left" 
                type="monotone" 
                dataKey="cycleTime" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Cycle Time (days)"
              />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="utilization" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="Utilization (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderBottlenecks = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Identified Bottlenecks</h3>
          <p className="text-sm text-gray-600 mt-1">Activities causing delays in your process</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {bottlenecks.map((bottleneck, index) => (
            <div key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <h4 className="font-medium text-gray-900">{bottleneck.activity}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(bottleneck.impact)}`}>
                    {bottleneck.impact} impact
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(bottleneck.trend)}
                  <span className="text-sm text-gray-600">{bottleneck.frequency} cases</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3">
                  <span className="font-medium text-gray-700">Avg Wait Time</span>
                  <p className="text-lg font-bold text-blue-600 mt-1">{bottleneck.avgWaitTime}h</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <span className="font-medium text-gray-700">Max Wait Time</span>
                  <p className="text-lg font-bold text-red-600 mt-1">{bottleneck.maxWaitTime}h</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <span className="font-medium text-gray-700">Efficiency Loss</span>
                  <p className="text-lg font-bold text-yellow-600 mt-1">
                    {Math.round((bottleneck.avgWaitTime / (bottleneck.avgWaitTime + 2)) * 100)}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Wait Time Analysis</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bottlenecks}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="activity" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="avgWaitTime" fill="#3b82f6" name="Avg Wait Time (h)" />
              <Bar dataKey="maxWaitTime" fill="#ef4444" name="Max Wait Time (h)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderEfficiency = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Activity Efficiency</h3>
          <p className="text-sm text-gray-600 mt-1">Working time vs waiting time analysis</p>
        </div>
        
        <div className="p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={efficiencyMetrics} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis 
                  type="category" 
                  dataKey="activity" 
                  tick={{ fontSize: 12 }}
                  width={120}
                />
                <Tooltip />
                <Bar dataKey="workingTime" stackId="a" fill="#10b981" name="Working Time (h)" />
                <Bar dataKey="waitingTime" stackId="a" fill="#ef4444" name="Waiting Time (h)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h4 className="font-semibold text-gray-900">Efficiency Scores</h4>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {efficiencyMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{metric.activity}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${metric.efficiency}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-12">
                      {metric.efficiency.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h4 className="font-semibold text-gray-900">Recommendations</h4>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Optimize Payment Processing</p>
                  <p className="text-xs text-gray-600">Reduce wait time by 40% through automation</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Streamline Shipping</p>
                  <p className="text-xs text-gray-600">Implement parallel processing for preparation</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Resource Allocation</p>
                  <p className="text-xs text-gray-600">Balance workload during peak hours</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Quality Checks</p>
                  <p className="text-xs text-gray-600">Maintain current efficiency levels</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Performance Analysis</h2>
              <p className="text-sm text-gray-600 mt-1">
                Analyze process performance, identify bottlenecks, and optimize efficiency
              </p>
            </div>
          </div>
          
          <div className="flex space-x-1 mt-4">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'bottlenecks', label: 'Bottlenecks' },
              { id: 'efficiency', label: 'Efficiency' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
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
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'bottlenecks' && renderBottlenecks()}
          {activeTab === 'efficiency' && renderEfficiency()}
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalysis;