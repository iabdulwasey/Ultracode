import React from 'react';
import { ArrowRight, Clock, Users } from 'lucide-react';

const TopVariants: React.FC = () => {
  const variants = [
    {
      id: 1,
      path: ['Order Creation', 'Payment', 'Shipping', 'Delivery'],
      frequency: 8945,
      percentage: 67.8,
      avgDuration: '3.2 days',
      performance: 'good' as const
    },
    {
      id: 2,
      path: ['Order Creation', 'Inventory Check', 'Payment', 'Shipping'],
      frequency: 2134,
      percentage: 16.2,
      avgDuration: '4.8 days',
      performance: 'warning' as const
    },
    {
      id: 3,
      path: ['Order Creation', 'Payment', 'Backorder', 'Shipping'],
      frequency: 1456,
      percentage: 11.0,
      avgDuration: '8.1 days',
      performance: 'critical' as const
    },
    {
      id: 4,
      path: ['Order Creation', 'Cancellation'],
      frequency: 678,
      percentage: 5.0,
      avgDuration: '0.5 days',
      performance: 'good' as const
    }
  ];

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'good':
        return 'text-green-600 bg-green-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'critical':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top Process Variants</h3>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {variants.map((variant) => (
          <div key={variant.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-900">{variant.frequency.toLocaleString()}</span>
                <span className="text-sm text-gray-500">cases ({variant.percentage}%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{variant.avgDuration}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(variant.performance)}`}>
                  {variant.performance}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              {variant.path.map((step, index) => (
                <React.Fragment key={index}>
                  <span className="px-2 py-1 bg-gray-100 rounded text-gray-700 font-medium">
                    {step}
                  </span>
                  {index < variant.path.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopVariants;