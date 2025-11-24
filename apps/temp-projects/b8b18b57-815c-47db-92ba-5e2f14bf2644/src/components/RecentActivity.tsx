import React from 'react';
import { Clock, AlertTriangle, CheckCircle, XCircle, User } from 'lucide-react';
import { format } from 'date-fns';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'conformance_violation',
      title: 'Conformance violation detected',
      description: 'Case PO-2024-0156 deviated from standard process',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      severity: 'high',
      user: 'System'
    },
    {
      id: 2,
      type: 'process_completed',
      title: 'Process analysis completed',
      description: 'Monthly performance report generated successfully',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      severity: 'info',
      user: 'John Doe'
    },
    {
      id: 3,
      type: 'bottleneck_detected',
      title: 'Bottleneck identified',
      description: 'Payment processing showing increased wait times',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      severity: 'medium',
      user: 'System'
    },
    {
      id: 4,
      type: 'data_sync',
      title: 'Data synchronization completed',
      description: 'Successfully imported 1,247 new process events',
      timestamp: new Date(Date.now() - 1000 * 60 * 180),
      severity: 'info',
      user: 'System'
    },
    {
      id: 5,
      type: 'performance_improvement',
      title: 'Performance improvement detected',
      description: 'Shipping process efficiency increased by 12%',
      timestamp: new Date(Date.now() - 1000 * 60 * 240),
      severity: 'good',
      user: 'System'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'conformance_violation':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'process_completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'bottleneck_detected':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'data_sync':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'performance_improvement':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'good':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All Activities
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className={`border rounded-lg p-4 ${getSeverityColor(activity.severity)}`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {format(activity.timestamp, 'HH:mm')}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mt-1">
                  {activity.description}
                </p>
                
                <div className="flex items-center space-x-2 mt-2">
                  <User className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{activity.user}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">
                    {format(activity.timestamp, 'MMM dd, HH:mm')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;