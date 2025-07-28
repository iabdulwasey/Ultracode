import React from 'react';
import { 
  Activity, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  Users,
  FileText,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const kpiData = [
    { title: 'Active Processes', value: '247', change: '+12%', icon: Activity, color: 'text-blue-600' },
    { title: 'Avg Process Time', value: '4.2h', change: '-8%', icon: Clock, color: 'text-green-600' },
    { title: 'Efficiency Score', value: '87%', change: '+5%', icon: TrendingUp, color: 'text-purple-600' },
    { title: 'Bottlenecks', value: '12', change: '-3', icon: AlertTriangle, color: 'text-red-600' },
  ];

  const processVolumeData = [
    { name: 'Mon', processes: 45, completed: 42 },
    { name: 'Tue', processes: 52, completed: 48 },
    { name: 'Wed', processes: 38, completed: 35 },
    { name: 'Thu', processes: 61, completed: 58 },
    { name: 'Fri', processes: 55, completed: 51 },
    { name: 'Sat', processes: 28, completed: 26 },
    { name: 'Sun', processes: 22, completed: 20 },
  ];

  const processTypeData = [
    { name: 'Order Processing', value: 35, color: '#3B82F6' },
    { name: 'Customer Service', value: 25, color: '#10B981' },
    { name: 'Invoice Management', value: 20, color: '#F59E0B' },
    { name: 'HR Processes', value: 12, color: '#EF4444' },
    { name: 'Other', value: 8, color: '#8B5CF6' },
  ];

  const recentActivities = [
    { id: 1, type: 'Process Completed', process: 'Order #12345', time: '2 min ago', status: 'success' },
    { id: 2, type: 'Bottleneck Detected', process: 'Invoice Processing', time: '5 min ago', status: 'warning' },
    { id: 3, type: 'Process Started', process: 'Customer Onboarding', time: '8 min ago', status: 'info' },
    { id: 4, type: 'Deviation Alert', process: 'Order #12344', time: '12 min ago', status: 'error' },
    { id: 5, type: 'Process Completed', process: 'HR Request #789', time: '15 min ago', status: 'success' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Process Mining Dashboard</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Generate Report
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
            Export Data
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{kpi.value}</p>
                  <p className={`text-sm mt-2 ${kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.change} from last week
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100`}>
                  <Icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Process Volume Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Process Volume Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={processVolumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="processes" fill="#3B82F6" name="Started" />
              <Bar dataKey="completed" fill="#10B981" name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Process Types Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Process Types Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={processTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {processTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`p-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-100' :
                  activity.status === 'warning' ? 'bg-yellow-100' :
                  activity.status === 'error' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  {activity.status === 'success' ? <CheckCircle className="h-4 w-4 text-green-600" /> :
                   activity.status === 'warning' ? <AlertTriangle className="h-4 w-4 text-yellow-600" /> :
                   activity.status === 'error' ? <XCircle className="h-4 w-4 text-red-600" /> :
                   <Activity className="h-4 w-4 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                  <p className="text-sm text-gray-600">{activity.process}</p>
                </div>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-gray-600">Active Users</span>
              </div>
              <span className="text-sm font-medium text-gray-900">1,247</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-600">Total Events</span>
              </div>
              <span className="text-sm font-medium text-gray-900">45,892</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-gray-600">Avg Cycle Time</span>
              </div>
              <span className="text-sm font-medium text-gray-900">4.2 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-orange-600" />
                <span className="text-sm text-gray-600">Efficiency</span>
              </div>
              <span className="text-sm font-medium text-gray-900">87.3%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;