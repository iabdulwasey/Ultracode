import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProcessOverview: React.FC = () => {
  const data = [
    { name: 'Order Creation', cases: 1247, avgTime: 0.5 },
    { name: 'Payment Processing', cases: 1205, avgTime: 2.3 },
    { name: 'Inventory Check', cases: 1198, avgTime: 1.8 },
    { name: 'Shipping', cases: 1156, avgTime: 24.5 },
    { name: 'Delivery', cases: 1089, avgTime: 48.2 },
    { name: 'Order Completion', cases: 1067, avgTime: 0.3 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Process Activity Overview</h3>
        <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>Last 90 days</option>
        </select>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              formatter={(value, name) => [
                name === 'cases' ? `${value} cases` : `${value}h avg time`,
                name === 'cases' ? 'Cases' : 'Avg Time'
              ]}
            />
            <Bar dataKey="cases" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProcessOverview;