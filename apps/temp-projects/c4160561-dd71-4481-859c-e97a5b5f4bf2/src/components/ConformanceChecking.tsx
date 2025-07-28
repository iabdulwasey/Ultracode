import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Eye, Filter, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ConformanceChecking: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [filterType, setFilterType] = useState('all');

  // Sample conformance data
  const conformanceResults = [
    { 
      caseId: 'CASE_001', 
      fitness: 0.95, 
      deviations: 1, 
      status: 'conforming',
      activities: ['Start', 'Register', 'Check Stock', 'Approve', 'Ship', 'End'],
      deviationDetails: ['Missing activity: Prepare Shipment']
    },
    { 
      caseId: 'CASE_002', 
      fitness: 0.78, 
      deviations: 3, 
      status: 'non-conforming',
      activities: ['Start', 'Register', 'Ship', 'End'],
      deviationDetails: ['Skipped: Check Stock', 'Skipped: Approve', 'Skipped: Prepare Shipment']
    },
    { 
      caseId: 'CASE_003', 
      fitness: 1.0, 
      deviations: 0, 
      status: 'conforming',
      activities: ['Start', 'Register', 'Check Stock', 'Approve', 'Prepare', 'Ship', 'End'],
      deviationDetails: []
    },
    { 
      caseId: 'CASE_004', 
      fitness: 0.65, 
      deviations: 4, 
      status: 'non-conforming',
      activities: ['Start', 'Approve', 'Register', 'Ship', 'End'],
      deviationDetails: ['Wrong order: Approve before Register', 'Skipped: Check Stock', 'Skipped: Prepare Shipment', 'Extra activity: Quality Check']
    },
    { 
      caseId: 'CASE_005', 
      fitness: 0.89, 
      deviations: 2, 
      status: 'conforming',
      activities: ['Start', 'Register', 'Check Stock', 'Prepare', 'Ship', 'End'],
      deviationDetails: ['Skipped: Approve', 'Extra activity: Expedite']
    }
  ];

  const fitnessDistribution = [
    { range: '0.9-1.0', count: 25, color: '#10B981' },
    { range: '0.8-0.9', count: 18, color: '#F59E0B' },
    { range: '0.7-0.8', count: 12, color: '#EF4444' },
    { range: '0.6-0.7', count: 8, color: '#DC2626' },
    { range: '0.0-0.6', count: 5, color: '#991B1B' }
  ];

  const deviationTypes = [
    { name: 'Skipped Activities', value: 45, color: '#EF4444' },
    { name: 'Wrong Order', value: 25, color: '#F59E0B' },
    { name: 'Extra Activities', value: 20, color: '#8B5CF6' },
    { name: 'Missing Activities', value: 10, color: '#EC4899' }
  ];

  const filteredResults = conformanceResults.filter(result => {
    if (filterType === 'all') return true;
    if (filterType === 'conforming') return result.status === 'conforming';
    if (filterType === 'non-conforming') return result.status === 'non-conforming';
    return true;
  });

  const getStatusIcon = (status: string) => {
    return status === 'conforming' ? 
      <CheckCircle className="h-5 w-5 text-green-600" /> : 
      <XCircle className="h-5 w-5 text-red-600" />;
  };

  const getStatusColor = (status: string) => {
    return status === 'conforming' ? 'text-green-600' : 'text-red-600';
  };

  const getFitnessColor = (fitness: number) => {
    if (fitness >= 0.9) return 'text-green-600';
    if (fitness >= 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Conformance Checking</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Cases</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{conformanceResults.length}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conforming Cases</p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {conformanceResults.filter(r => r.status === 'conforming').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Non-Conforming</p>
              <p className="text-2xl font-bold text-red-600 mt-2">
                {conformanceResults.filter(r => r.status === 'non-conforming').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Fitness</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {(conformanceResults.reduce((sum, r) => sum + r.fitness, 0) / conformanceResults.length).toFixed(2)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <AlertTriangle className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fitness Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fitness Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fitnessDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Deviation Types */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Deviation Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviationTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {deviationTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Case Analysis */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Case Analysis</h3>
          <div className="flex items-center space-x-3">
            <Filter className="h-4 w-4 text-gray-600" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Cases</option>
              <option value="conforming">Conforming Only</option>
              <option value="non-conforming">Non-Conforming Only</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Case ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fitness Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deviations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResults.map((result) => (
                <tr key={result.caseId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {result.caseId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(result.status)}
                      <span className={`text-sm font-medium ${getStatusColor(result.status)}`}>
                        {result.status === 'conforming' ? 'Conforming' : 'Non-Conforming'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getFitnessColor(result.fitness)}`}>
                      {result.fitness.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {result.deviations}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => setSelectedCase(selectedCase === result.caseId ? null : result.caseId)}
                      className="text-blue-600 hover:text-blue-900 font-medium"
                    >
                      {selectedCase === result.caseId ? 'Hide Details' : 'View Details'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Case Details */}
        {selectedCase && (
          <div className="mt-6 border-t border-gray-200 pt-6">
            {(() => {
              const caseData = conformanceResults.find(r => r.caseId === selectedCase);
              if (!caseData) return null;

              return (
                <div className="space-y-4">
                  <h4 className="text-md font-semibold text-gray-900">
                    Case Details: {selectedCase}
                  </h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Activity Sequence</h5>
                      <div className="flex flex-wrap gap-2">
                        {caseData.activities.map((activity, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {index + 1}. {activity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Deviations Found</h5>
                      {caseData.deviationDetails.length > 0 ? (
                        <ul className="space-y-1">
                          {caseData.deviationDetails.map((deviation, index) => (
                            <li key={index} className="flex items-center space-x-2 text-sm text-red-600">
                              <AlertTriangle className="h-3 w-3" />
                              <span>{deviation}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-green-600 flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3" />
                          <span>No deviations found</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConformanceChecking;