import React, { useState } from 'react';
import { TrendingUp, Clock, DollarSign, Users, Zap, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter } from 'recharts';

const ProcessEnhancement: React.FC = () => {
  const [selectedBottleneck, setSelectedBottleneck] = useState<string | null>(null);
  const [selectedOptimization, setSelectedOptimization] = useState<string | null>(null);

  // Sample bottleneck data
  const bottlenecks = [
    {
      id: 'approval_delay',
      activity: 'Order Approval',
      impact: 'High',
      avgWaitTime: '2.3 hours',
      frequency: 85,
      potentialSaving: '$12,500',
      description: 'Orders waiting for manager approval create significant delays',
      recommendations: [
        'Implement automated approval for orders under $1000',
        'Add approval delegation during manager absence',
        'Set SLA alerts for pending approvals'
      ]
    },
    {
      id: 'stock_check',
      activity: 'Stock Verification',
      impact: 'Medium',
      avgWaitTime: '1.8 hours',
      frequency: 67,
      potentialSaving: '$8,200',
      description: 'Manual stock checking causes processing delays',
      recommendations: [
        'Integrate real-time inventory system',
        'Automate stock level checks',
        'Implement low-stock alerts'
      ]
    },
    {
      id: 'document_prep',
      activity: 'Document Preparation',
      impact: 'Medium',
      avgWaitTime: '1.2 hours',
      frequency: 45,
      potentialSaving: '$5,800',
      description: 'Manual document generation slows down process',
      recommendations: [
        'Use document templates',
        'Implement automated document generation',
        'Digital signature integration'
      ]
    }
  ];

  // Sample optimization scenarios
  const optimizations = [
    {
      id: 'automation',
      title: 'Process Automation',
      type: 'Technology',
      impact: 'High',
      effort: 'High',
      timeReduction: '35%',
      costSaving: '$45,000/year',
      description: 'Automate routine tasks and approvals',
      benefits: [
        'Reduce manual errors by 80%',
        'Improve processing speed by 35%',
        'Free up staff for higher-value work',
        '24/7 processing capability'
      ],
      implementation: [
        'Identify automation candidates',
        'Design automated workflows',
        'Implement RPA solutions',
        'Train staff on new processes'
      ]
    },
    {
      id: 'parallel_processing',
      title: 'Parallel Processing',
      type: 'Process Redesign',
      impact: 'High',
      effort: 'Medium',
      timeReduction: '28%',
      costSaving: '$32,000/year',
      description: 'Execute independent activities in parallel',
      benefits: [
        'Reduce overall cycle time',
        'Better resource utilization',
        'Improved customer satisfaction',
        'Higher throughput'
      ],
      implementation: [
        'Identify parallel activities',
        'Redesign process flow',
        'Update system workflows',
        'Retrain staff'
      ]
    },
    {
      id: 'resource_optimization',
      title: 'Resource Optimization',
      type: 'Resource Management',
      impact: 'Medium',
      effort: 'Low',
      timeReduction: '18%',
      costSaving: '$22,000/year',
      description: 'Optimize resource allocation and scheduling',
      benefits: [
        'Reduce waiting times',
        'Better workload distribution',
        'Improved resource efficiency',
        'Lower operational costs'
      ],
      implementation: [
        'Analyze resource utilization',
        'Implement dynamic scheduling',
        'Cross-train staff',
        'Monitor performance metrics'
      ]
    }
  ];

  // Performance comparison data
  const performanceComparison = [
    { metric: 'Avg Cycle Time', current: 4.2, optimized: 2.8, unit: 'hours' },
    { metric: 'Processing Cost', current: 125, optimized: 89, unit: '$' },
    { metric: 'Customer Satisfaction', current: 78, optimized: 92, unit: '%' },
    { metric: 'Error Rate', current: 3.2, optimized: 1.1, unit: '%' },
    { metric: 'Throughput', current: 85, optimized: 120, unit: 'cases/day' }
  ];

  // Time series data for improvement tracking
  const improvementTrend = [
    { month: 'Jan', baseline: 4.5, current: 4.2, target: 2.8 },
    { month: 'Feb', baseline: 4.5, current: 4.0, target: 2.8 },
    { month: 'Mar', baseline: 4.5, current: 3.8, target: 2.8 },
    { month: 'Apr', baseline: 4.5, current: 3.5, target: 2.8 },
    { month: 'May', baseline: 4.5, current: 3.2, target: 2.8 },
    { month: 'Jun', baseline: 4.5, current: 2.9, target: 2.8 }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Process Enhancement</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Generate Enhancement Plan
          </button>
        </div>
      </div>

      {/* Enhancement Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Potential Savings</p>
              <p className="text-2xl font-bold text-green-600 mt-2">$67K/year</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Time Reduction</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">35%</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bottlenecks</p>
              <p className="text-2xl font-bold text-red-600 mt-2">{bottlenecks.length}</p>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Efficiency Gain</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">+41%</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Performance Comparison */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current vs. Optimized Performance</h3>
        <div className="space-y-4">
          {performanceComparison.map((metric, index) => {
            const improvement = metric.current > metric.optimized ? 
              ((metric.current - metric.optimized) / metric.current * 100).toFixed(1) :
              ((metric.optimized - metric.current) / metric.current * 100).toFixed(1);
            
            return (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{metric.metric}</h4>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="text-sm">
                      <span className="text-gray-600">Current: </span>
                      <span className="font-medium">{metric.current}{metric.unit}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="text-sm">
                      <span className="text-gray-600">Optimized: </span>
                      <span className="font-medium text-green-600">{metric.optimized}{metric.unit}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-green-600">
                    {metric.current > metric.optimized ? '-' : '+'}{improvement}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bottleneck Analysis */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bottleneck Analysis</h3>
          <div className="space-y-4">
            {bottlenecks.map((bottleneck) => (
              <div key={bottleneck.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-900">{bottleneck.activity}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(bottleneck.impact)}`}>
                    {bottleneck.impact} Impact
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{bottleneck.description}</p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Wait Time:</span>
                    <p className="font-medium">{bottleneck.avgWaitTime}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Frequency:</span>
                    <p className="font-medium">{bottleneck.frequency}%</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Savings:</span>
                    <p className="font-medium text-green-600">{bottleneck.potentialSaving}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBottleneck(selectedBottleneck === bottleneck.id ? null : bottleneck.id)}
                  className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  {selectedBottleneck === bottleneck.id ? 'Hide Recommendations' : 'View Recommendations'}
                </button>
                {selectedBottleneck === bottleneck.id && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Recommendations:</h5>
                    <ul className="space-y-1">
                      {bottleneck.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Improvement Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={improvementTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="baseline" stroke="#94A3B8" strokeDasharray="5 5" name="Baseline" />
              <Line type="monotone" dataKey="current" stroke="#3B82F6" strokeWidth={2} name="Current" />
              <Line type="monotone" dataKey="target" stroke="#10B981" strokeWidth={2} name="Target" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Optimization Scenarios */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Scenarios</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {optimizations.map((opt) => (
            <div key={opt.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-medium text-gray-900">{opt.title}</h4>
                <Zap className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-sm text-gray-600 mb-4">{opt.description}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(opt.impact)}`}>
                  {opt.impact} Impact
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEffortColor(opt.effort)}`}>
                  {opt.effort} Effort
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Time Reduction:</span>
                  <span className="font-medium text-green-600">{opt.timeReduction}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Cost Saving:</span>
                  <span className="font-medium text-green-600">{opt.costSaving}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedOptimization(selectedOptimization === opt.id ? null : opt.id)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                {selectedOptimization === opt.id ? 'Hide Details' : 'View Details'}
              </button>

              {selectedOptimization === opt.id && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Benefits:</h5>
                    <ul className="space-y-1">
                      {opt.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Implementation Steps:</h5>
                    <ol className="space-y-1">
                      {opt.implementation.map((step, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                          <span className="flex-shrink-0 w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center font-medium">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessEnhancement;