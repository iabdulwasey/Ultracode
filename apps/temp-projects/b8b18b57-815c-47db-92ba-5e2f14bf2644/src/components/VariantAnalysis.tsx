import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowRight, Clock, Users, Filter } from 'lucide-react';

interface VariantAnalysisProps {
  isPlaying: boolean;
}

const VariantAnalysis: React.FC<VariantAnalysisProps> = ({ isPlaying }) => {
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  
  const variants = [
    {
      id: 1,
      path: ['Order Creation', 'Payment Processing', 'Shipping', 'Delivery', 'Complete'],
      frequency: 8945,
      percentage: 67.8,
      avgDuration: 3.2,
      performance: 'good' as const
    },
    {
      id: 2,
      path: ['Order Creation', 'Inventory Check', 'Payment Processing', 'Shipping', 'Delivery', 'Complete'],
      frequency: 2134,
      percentage: 16.2,
      avgDuration: 4.8,
      performance: 'warning' as const
    },
    {
      id: 3,
      path: ['Order Creation', 'Payment Processing', 'Backorder Processing', 'Shipping', 'Delivery', 'Complete'],
      frequency: 1456,
      percentage: 11.0,
      avgDuration: 8.1,
      performance: 'critical' as const
    },
    {
      id: 4,
      path: ['Order Creation', 'Payment Processing', 'Cancellation'],
      frequency: 678,
      percentage: 5.0,
      avgDuration: 0.5,
      performance: 'good' as const
    }
  ];

  const pieData = variants.map(variant => ({
    name: `Variant ${variant.id}`,
    value: variant.percentage,
    frequency: variant.frequency,
    color: variant.performance === 'good' ? '#10b981' : 
           variant.performance === 'warning' ? '#f59e0b' : '#ef4444'
  }));

  const barData = variants.map(variant => ({
    name: `V${variant.id}`,
    frequency: variant.frequency,
    duration: variant.avgDuration
  }));

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'good':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-900">Process Variants</h3>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {variants.length} variants found
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
            <option>All variants</option>
            <option>High frequency (&gt;1000 cases)</option>
            <option>Performance issues</option>
            <option>Deviations only</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Variant Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Variant Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Frequency vs Duration */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Frequency vs Duration</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="frequency" fill="#3b82f6" name="Frequency" />
                <Bar yAxisId="right" dataKey="duration" fill="#f59e0b" name="Duration (days)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Variant List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h4 className="text-md font-semibold text-gray-900">Variant Details</h4>
        </div>
        
        <div className="divide-y divide-gray-200">
          {variants.map((variant) => (
            <div 
              key={variant.id} 
              className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedVariant === variant.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
              }`}
              onClick={() => setSelectedVariant(selectedVariant === variant.id ? null : variant.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <h5 className="text-lg font-medium text-gray-900">Variant {variant.id}</h5>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPerformanceColor(variant.performance)}`}>
                    {variant.performance}
                  </span>
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{variant.frequency.toLocaleString()} cases ({variant.percentage}%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{variant.avgDuration} days avg</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                {variant.path.map((step, index) => (
                  <React.Fragment key={index}>
                    <span className="px-3 py-1 bg-gray-100 rounded-md text-gray-700 font-medium">
                      {step}
                    </span>
                    {index < variant.path.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              {selectedVariant === variant.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Min Duration:</span>
                      <span className="ml-2 text-gray-600">{(variant.avgDuration * 0.6).toFixed(1)} days</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Max Duration:</span>
                      <span className="ml-2 text-gray-600">{(variant.avgDuration * 1.8).toFixed(1)} days</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Std Deviation:</span>
                      <span className="ml-2 text-gray-600">{(variant.avgDuration * 0.3).toFixed(1)} days</span>
                    </div>
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

export default VariantAnalysis;