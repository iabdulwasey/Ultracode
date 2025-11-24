import React from 'react';
import { Clock, Users, DollarSign, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';

const MetricsGrid: React.FC = () => {
  const metrics = [
    {
      title: 'Total Cases',
      value: '12,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Avg Throughput Time',
      value: '4.2 days',
      change: '-8.3%',
      trend: 'down',
      icon: Clock,
      color: 'green'
    },
    {
      title: 'Process Compliance',
      value: '87.3%',
      change: '+2.1%',
      trend: 'up',
      icon: CheckCircle,
      color: 'purple'
    },
    {
      title: 'Cost per Case',
      value: '$245',
      change: '-5.7%',
      trend: 'down',
      icon: DollarSign,
      color: 'yellow'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
        const trendColor = metric.trend === 'up' ? 'text-green-600' : 'text-red-600';
        
        return (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg bg-${metric.color}-50`}>
                <Icon className={`w-6 h-6 text-${metric.color}-600`} />
              </div>
              <div className={`flex items-center space-x-1 ${trendColor}`}>
                <TrendIcon className="w-4 h-4" />
                <span className="text-sm font-medium">{metric.change}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsGrid;