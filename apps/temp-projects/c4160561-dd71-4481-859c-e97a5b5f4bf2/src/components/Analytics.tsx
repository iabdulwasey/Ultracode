import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, Clock, Users, Activity, Calendar, Filter, Download } from 'lucide-react';

const Analytics: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('cycle-time');
  const [timeRange, setTimeRange] = useState('30d');

  // Sample analytics data
  const cycleTimeData = [
    { date: '2024-01-01', avgTime: 4.2, cases: 45 },
    { date: '2024-01-02', avgTime: 3.8, cases: 52 },
    { date: '2024-01-03', avgTime: 4.5, cases: 38 },
    { date: '2024-01-04', avgTime: 3.9, cases: 61 },
    { date: '2024-01-05', avgTime: 4.1, cases: 55 },
    { date: '2024-01-06', avgTime: 3.7, cases: 28 },
    { date: '2024-01-07', avgTime: 4.0, cases: 42 },
  ];

  const activityPerformance = [
    { activity: 'Register Order', avgDuration: 0.5, frequency: 100, efficiency: 95 },
    { activity: 'Check Stock', avgDuration: 1.2, frequency: 95, efficiency: 88 },
    { activity: 'Approve Order', avgDuration: 2.1, frequency: 85, efficiency: 72 },
    { activity: 'Prepare Shipment', avgDuration: 0.8, frequency: 80, efficiency: 91 },
    { activity: 'Ship Order', avgDuration: 1.0, frequency: 78, efficiency: 94 },
  ];

  const resourceUtilization = [
    { resource: 'Order Clerks', utilization: 78, capacity: 100, workload: 'High' },
    { resource: 'Managers', utilization: 45, capacity: 100, workload: 'Medium' },
    { resource: 'Warehouse Staff', utilization: 82, capacity: 100, workload: 'High' },
    { resource: 'Quality Team', utilization: 34, capacity: 100, workload: 'Low' },
    { resource: 'Shipping Team', utilization: 67, capacity: 100, workload: 'Medium' },
  ];

  const processVariants = [
    { variant: 'Standard Path', frequency: 45, avgTime: 3.8, color: '#3B82F6' },
    { variant: 'Express Path', frequency: 25, avgTime: 2.1, color: '#10B981' },
    { variant: 'Review Required', frequency: 20, avgTime: 5.2, color: '#F59E0B' },
    { variant: 'Exception Handling', frequency: 10, avgTime: 7.8, color: '#EF4444' },
  ];

  const timeAnalysis = [
    { hour: '09:00', volume: 12, avgTime: 3.2 },
    { hour: '10:00', volume: 18, avgTime: 3.8 },
    { hour: '11:00', volume: 25, avgTime: 4.1 },
    { hour: '12:00', volume: 15, avgTime: 4.5 },
    { hour: '13:00', volume: 10, avgTime: 3.9 },
    { hour: '14:00', volume: 22, avgTime: 3.6 },
    { hour: '15:00', volume: 28, avgTime: 4.2 },
    { hour: '16:00', volume: 20, avgTime: 4.0 },
  ];

  const correlationData = [
    { caseVolume: 10, avgCycleTime: 2.1 },
    { caseVolume: 15, avgCycleTime: 2.8 },
    { caseVolume: 20, avgCycleTime: 3.2 },
    { caseVolume: 25, avgCycleTime: 3.9 },
    { caseVolume: 30, avgCycleTime: 4.5 },
    { caseVolume: 35, avgCycleTime: 5.1 },
    { caseVolume: 40, avgCycleTime: 5.8 },
    { caseVolume: 45, avgCycleTime: 6.2 },
  ];

  const getWorkloadColor = (workload: string) => {
    switch (workload) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const metrics = [
    { id: 'cycle-time', name: 'Cycle Time Analysis', icon: Clock },
    { id: 'activity-performance', name: 'Activity Performance', icon: Activity },
    { id: 'resource-utilization', name: 'Resource Utilization', icon: Users },
    { id: 'process-variants', name: 'Process Variants', icon: TrendingUp },
  ];

  const renderMetricContent = () => {
    switch (selectedMetric) {
      case 'cycle-time':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cycle Time Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={cycleTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgTime" stroke="#3B82F6" strokeWidth={2} name="Avg Time (hours)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Volume vs Cycle Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart data={correlationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="caseVolume" name="Case Volume" />
                  <YAxis dataKey="avgCycleTime" name="Avg Cycle Time" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter dataKey="avgCycleTime" fill="#3B82F6" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'activity-performance':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Performance Metrics</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avg Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Frequency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Efficiency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activityPerformance.map((activity, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {activity.activity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {activity.avgDuration}h
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {activity.frequency}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {activity.efficiency}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${activity.efficiency}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">{activity.efficiency}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'resource-utilization':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Utilization</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={resourceUtilization}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="resource" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="utilization" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Details</h3>
              <div className="space-y-4">
                {resourceUtilization.map((resource, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{resource.resource}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getWorkloadColor(resource.workload)}`}>
                        {resource.workload}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-3 mr-3">
                        <div 
                          className={`h-3 rounded-full ${
                            resource.utilization > 80 ? 'bg-red-500' :
                            resource.utilization > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${resource.utilization}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{resource.utilization}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'process-variants':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Variant Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={processVariants}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, frequency }) => `${name} ${frequency}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="frequency"
                  >
                    {processVariants.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Variant Performance</h3>
              <div className="space-y-4">
                {processVariants.map((variant, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{variant.variant}</h4>
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: variant.color }}></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Frequency:</span>
                        <p className="font-medium">{variant.frequency}%</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Avg Time:</span>
                        <p className="font-medium">{variant.avgTime}h</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Process Analytics</h1>
        <div className="flex space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Analytics</span>
          </button>
        </div>
      </div>

      {/* Analytics Navigation */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <button
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  selectedMetric === metric.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{metric.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Metric Content */}
      {renderMetricContent()}

      {/* Time-based Analysis */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hourly Process Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={timeAnalysis}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Bar yAxisId="left" dataKey="volume" fill="#3B82F6" name="Volume" />
            <Line yAxisId="right" type="monotone" dataKey="avgTime" stroke="#EF4444" strokeWidth={2} name="Avg Time" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Key Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <h4 className="text-sm font-medium text-gray-900">Performance Improvement</h4>
            </div>
            <p className="text-sm text-gray-600">
              Average cycle time has decreased by 12% over the last month, indicating improved process efficiency.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <h4 className="text-sm font-medium text-gray-900">Peak Hours Impact</h4>
            </div>
            <p className="text-sm text-gray-600">
              Process times increase by 23% during peak hours (11 AM - 3 PM), suggesting resource constraints.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="h-5 w-5 text-blue-600" />
              <h4 className="text-sm font-medium text-gray-900">Resource Optimization</h4>
            </div>
            <p className="text-sm text-gray-600">
              Order Clerks and Warehouse Staff are operating at high utilization (78-82%), consider capacity expansion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;