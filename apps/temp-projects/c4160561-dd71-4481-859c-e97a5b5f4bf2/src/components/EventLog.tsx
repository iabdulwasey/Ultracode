import React, { useState } from 'react';
import { Search, Filter, Download, Calendar, Clock, User, FileText, Eye } from 'lucide-react';

const EventLog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCase, setSelectedCase] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [dateRange, setDateRange] = useState('all');

  // Sample event log data
  const eventLog = [
    {
      id: 1,
      caseId: 'CASE_001',
      activity: 'Start Process',
      timestamp: '2024-01-15 09:00:00',
      user: 'System',
      resource: 'Automated',
      duration: null,
      attributes: { priority: 'High', amount: 1250.00 }
    },
    {
      id: 2,
      caseId: 'CASE_001',
      activity: 'Register Order',
      timestamp: '2024-01-15 09:02:15',
      user: 'John Smith',
      resource: 'Order Clerk',
      duration: '2m 15s',
      attributes: { priority: 'High', amount: 1250.00, customer: 'ACME Corp' }
    },
    {
      id: 3,
      caseId: 'CASE_001',
      activity: 'Check Stock',
      timestamp: '2024-01-15 09:15:30',
      user: 'Alice Johnson',
      resource: 'Inventory System',
      duration: '13m 15s',
      attributes: { priority: 'High', amount: 1250.00, items: 5 }
    },
    {
      id: 4,
      caseId: 'CASE_002',
      activity: 'Start Process',
      timestamp: '2024-01-15 10:30:00',
      user: 'System',
      resource: 'Automated',
      duration: null,
      attributes: { priority: 'Medium', amount: 750.00 }
    },
    {
      id: 5,
      caseId: 'CASE_001',
      activity: 'Approve Order',
      timestamp: '2024-01-15 11:45:20',
      user: 'Manager Bob',
      resource: 'Approval System',
      duration: '2h 29m 50s',
      attributes: { priority: 'High', amount: 1250.00, approved: true }
    },
    {
      id: 6,
      caseId: 'CASE_002',
      activity: 'Register Order',
      timestamp: '2024-01-15 10:33:45',
      user: 'Sarah Wilson',
      resource: 'Order Clerk',
      duration: '3m 45s',
      attributes: { priority: 'Medium', amount: 750.00, customer: 'TechStart Inc' }
    },
    {
      id: 7,
      caseId: 'CASE_001',
      activity: 'Prepare Shipment',
      timestamp: '2024-01-15 12:15:10',
      user: 'Tom Brown',
      resource: 'Warehouse',
      duration: '29m 50s',
      attributes: { priority: 'High', amount: 1250.00, packages: 3 }
    },
    {
      id: 8,
      caseId: 'CASE_003',
      activity: 'Start Process',
      timestamp: '2024-01-15 14:00:00',
      user: 'System',
      resource: 'Automated',
      duration: null,
      attributes: { priority: 'Low', amount: 350.00 }
    },
    {
      id: 9,
      caseId: 'CASE_002',
      activity: 'Check Stock',
      timestamp: '2024-01-15 11:00:15',
      user: 'Alice Johnson',
      resource: 'Inventory System',
      duration: '26m 30s',
      attributes: { priority: 'Medium', amount: 750.00, items: 2 }
    },
    {
      id: 10,
      caseId: 'CASE_001',
      activity: 'Ship Order',
      timestamp: '2024-01-15 13:30:45',
      user: 'Delivery Service',
      resource: 'Shipping System',
      duration: '1h 15m 35s',
      attributes: { priority: 'High', amount: 1250.00, tracking: 'TRK123456' }
    }
  ];

  // Get unique values for filters
  const uniqueCases = [...new Set(eventLog.map(event => event.caseId))];
  const uniqueActivities = [...new Set(eventLog.map(event => event.activity))];

  // Filter events based on search and filters
  const filteredEvents = eventLog.filter(event => {
    const matchesSearch = searchTerm === '' || 
      event.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCase = selectedCase === '' || event.caseId === selectedCase;
    const matchesActivity = selectedActivity === '' || event.activity === selectedActivity;
    
    return matchesSearch && matchesCase && matchesActivity;
  });

  // Statistics
  const totalEvents = eventLog.length;
  const totalCases = uniqueCases.length;
  const totalActivities = uniqueActivities.length;
  const avgEventsPerCase = (totalEvents / totalCases).toFixed(1);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Event Log</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Log</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{totalEvents}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Cases</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{totalCases}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Activities</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{totalActivities}</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <User className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Events/Case</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{avgEventsPerCase}</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Events</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by case ID, activity, or user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Case ID</label>
            <select
              value={selectedCase}
              onChange={(e) => setSelectedCase(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Cases</option>
              {uniqueCases.map(caseId => (
                <option key={caseId} value={caseId}>{caseId}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Activity</label>
            <select
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Activities</option>
              {uniqueActivities.map(activity => (
                <option key={activity} value={activity}>{activity}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Event Log Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Event Log ({filteredEvents.length} events)
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Case ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attributes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {event.caseId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {event.activity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatTimestamp(event.timestamp)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3 text-gray-400" />
                      <span>{event.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {event.duration ? (
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{event.duration}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="space-y-1">
                      {Object.entries(event.attributes).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                          {key === 'priority' ? (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(value as string)}`}>
                              {value as string}
                            </span>
                          ) : (
                            <span className="text-xs">
                              <span className="font-medium">{key}:</span> {String(value)}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No events found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventLog;