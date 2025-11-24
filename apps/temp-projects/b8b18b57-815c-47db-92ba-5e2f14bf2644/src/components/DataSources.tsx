import React, { useState } from 'react';
import { Database, Plus, RefreshCw, AlertCircle, CheckCircle, XCircle, Upload, Download, Settings } from 'lucide-react';
import { format } from 'date-fns';

const DataSources: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  
  const dataSources = [
    {
      id: 'erp_system',
      name: 'ERP System (SAP)',
      type: 'database',
      status: 'connected',
      lastSync: new Date('2024-01-29T15:30:00'),
      recordCount: 45678,
      description: 'Main ERP system containing order and process data',
      tables: ['orders', 'order_items', 'payments', 'shipments'],
      health: 98.5
    },
    {
      id: 'crm_data',
      name: 'CRM Database',
      type: 'database',
      status: 'connected',
      lastSync: new Date('2024-01-29T14:45:00'),
      recordCount: 23456,
      description: 'Customer relationship management data',
      tables: ['customers', 'interactions', 'support_tickets'],
      health: 94.2
    },
    {
      id: 'warehouse_logs',
      name: 'Warehouse Management',
      type: 'api',
      status: 'warning',
      lastSync: new Date('2024-01-29T12:15:00'),
      recordCount: 12890,
      description: 'Warehouse operations and inventory data',
      tables: ['inventory_movements', 'picking_lists', 'shipping_labels'],
      health: 87.3
    },
    {
      id: 'payment_gateway',
      name: 'Payment Gateway Logs',
      type: 'api',
      status: 'error',
      lastSync: new Date('2024-01-28T18:20:00'),
      recordCount: 8934,
      description: 'Payment processing and transaction data',
      tables: ['transactions', 'payment_methods', 'refunds'],
      health: 45.8
    },
    {
      id: 'csv_import',
      name: 'Manual CSV Import',
      type: 'csv',
      status: 'connected',
      lastSync: new Date('2024-01-29T09:30:00'),
      recordCount: 5670,
      description: 'Manually uploaded CSV files with process data',
      tables: ['process_events', 'case_attributes'],
      health: 100.0
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Database className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-600';
    if (health >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'database':
        return <Database className="w-4 h-4" />;
      case 'api':
        return <RefreshCw className="w-4 h-4" />;
      case 'csv':
        return <Upload className="w-4 h-4" />;
      default:
        return <Database className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Data Sources</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage and monitor your process data connections
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Data Source</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>Sync All</span>
          </button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sources</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{dataSources.length}</p>
            </div>
            <Database className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Connected</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {dataSources.filter(s => s.status === 'connected').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Issues</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {dataSources.filter(s => s.status === 'error').length}
              </p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Records</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {dataSources.reduce((sum, source) => sum + source.recordCount, 0).toLocaleString()}
              </p>
            </div>
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Data Sources List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Data Sources</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {dataSources.map((source) => (
            <div 
              key={source.id} 
              className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => setSelectedSource(selectedSource === source.id ? null : source.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(source.type)}
                    <h4 className="font-medium text-gray-900">{source.name}</h4>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(source.status)}`}>
                    {source.status}
                  </span>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {source.recordCount.toLocaleString()} records
                    </p>
                    <p className="text-xs text-gray-500">
                      Last sync: {format(source.lastSync, 'MMM dd, HH:mm')}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(source.status)}
                    <span className={`text-sm font-medium ${getHealthColor(source.health)}`}>
                      {source.health}%
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mt-2">{source.description}</p>
              
              {selectedSource === source.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Available Tables</h5>
                      <div className="space-y-1">
                        {source.tables.map((table, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-700">{table}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Actions</h5>
                      <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
                          <RefreshCw className="w-4 h-4" />
                          <span>Sync Now</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 px-3 py-1 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                          <Settings className="w-4 h-4" />
                          <span>Configure</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 px-3 py-1 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                          <Download className="w-4 h-4" />
                          <span>Export</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Connection Type:</span>
                        <p className="text-gray-600 capitalize">{source.type}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Health Score:</span>
                        <p className={`font-medium ${getHealthColor(source.health)}`}>{source.health}%</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Records:</span>
                        <p className="text-gray-600">{source.recordCount.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Last Updated:</span>
                        <p className="text-gray-600">{format(source.lastSync, 'MMM dd, yyyy HH:mm')}</p>
                      </div>
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

export default DataSources;