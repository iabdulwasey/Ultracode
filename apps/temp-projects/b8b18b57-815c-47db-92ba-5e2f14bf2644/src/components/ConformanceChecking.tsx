import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Eye, Download, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const ConformanceChecking: React.FC = () => {
  const [selectedRule, setSelectedRule] = useState<string | null>(null);
  
  const complianceData = [
    { date: '2024-01-01', compliance: 89.2, violations: 156 },
    { date: '2024-01-08', compliance: 87.5, violations: 178 },
    { date: '2024-01-15', compliance: 91.3, violations: 134 },
    { date: '2024-01-22', compliance: 88.7, violations: 167 },
    { date: '2024-01-29', compliance: 92.1, violations: 121 }
  ];

  const rules = [
    {
      id: 'rule_1',
      name: 'Payment before Shipping',
      description: 'Payment processing must be completed before shipping',
      compliance: 94.2,
      violations: 78,
      severity: 'high' as const,
      status: 'active' as const
    },
    {
      id: 'rule_2',
      name: 'Inventory Check Required',
      description: 'Inventory must be checked for high-value orders',
      compliance: 87.5,
      violations: 156,
      severity: 'medium' as const,
      status: 'active' as const
    },
    {
      id: 'rule_3',
      name: 'Approval for Large Orders',
      description: 'Orders over $1000 require manager approval',
      compliance: 91.8,
      violations: 89,
      severity: 'high' as const,
      status: 'active' as const
    },
    {
      id: 'rule_4',
      name: 'Customer Notification',
      description: 'Customer must be notified within 24h of order',
      compliance: 83.2,
      violations: 234,
      severity: 'low' as const,
      status: 'warning' as const
    }
  ];

  const violations = [
    {
      id: 1,
      caseId: 'PO-2024-0156',
      rule: 'Payment before Shipping',
      type: 'sequence_violation',
      description: 'Shipping started before payment confirmation',
      timestamp: new Date('2024-01-29T14:30:00'),
      severity: 'high' as const,
      status: 'open' as const
    },
    {
      id: 2,
      caseId: 'PO-2024-0157',
      rule: 'Inventory Check Required',
      type: 'missing_activity',
      description: 'Inventory check skipped for $2500 order',
      timestamp: new Date('2024-01-29T13:15:00'),
      severity: 'medium' as const,
      status: 'investigating' as const
    },
    {
      id: 3,
      caseId: 'PO-2024-0158',
      rule: 'Approval for Large Orders',
      type: 'unauthorized_activity',
      description: '$1500 order processed without manager approval',
      timestamp: new Date('2024-01-29T11:45:00'),
      severity: 'high' as const,
      status: 'resolved' as const
    },
    {
      id: 4,
      caseId: 'PO-2024-0159',
      rule: 'Customer Notification',
      type: 'timeout_violation',
      description: 'Customer notification sent after 28 hours',
      timestamp: new Date('2024-01-29T09:20:00'),
      severity: 'low' as const,
      status: 'open' as const
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'inactive':
        return 'text-gray-600 bg-gray-50';
      case 'open':
        return 'text-red-600 bg-red-50';
      case 'investigating':
        return 'text-yellow-600 bg-yellow-50';
      case 'resolved':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getViolationIcon = (type: string) => {
    switch (type) {
      case 'sequence_violation':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'missing_activity':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'unauthorized_activity':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'timeout_violation':
        return <AlertTriangle className="w-5 h-5 text-blue-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Compliance</p>
              <p className="text-2xl font-bold text-green-600 mt-1">87.3%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Rules</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{rules.filter(r => r.status === 'active').length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open Violations</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{violations.filter(v => v.status === 'open').length}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Violations</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{violations.length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Compliance Trend */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Compliance Trend</h3>
          <div className="flex items-center space-x-2">
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
            </select>
            <button className="flex items-center space-x-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={complianceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" domain={[80, 100]} tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'compliance' ? `${value}%` : value,
                  name === 'compliance' ? 'Compliance' : 'Violations'
                ]}
              />
              <Line 
                yAxisId="left" 
                type="monotone" 
                dataKey="compliance" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="violations" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Rules */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Compliance Rules</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Add Rule
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {rules.map((rule) => (
              <div 
                key={rule.id} 
                className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setSelectedRule(selectedRule === rule.id ? null : rule.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{rule.name}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(rule.severity)}`}>
                      {rule.severity}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(rule.status)}`}>
                      {rule.status}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{rule.description}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Compliance: {rule.compliance}%</span>
                  <span className="text-gray-500">{rule.violations} violations</span>
                </div>
                
                {selectedRule === rule.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      <button className="px-3 py-1 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                        Edit Rule
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Violations */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Violations</h3>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select className="border border-gray-300 rounded-md px-2 py-1 text-sm">
                  <option>All violations</option>
                  <option>High severity</option>
                  <option>Open only</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {violations.map((violation) => (
              <div key={violation.id} className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getViolationIcon(violation.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">
                        {violation.caseId}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(violation.severity)}`}>
                          {violation.severity}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(violation.status)}`}>
                          {violation.status}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1">
                      {violation.rule}: {violation.description}
                    </p>
                    
                    <p className="text-xs text-gray-500 mt-2">
                      {violation.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConformanceChecking;