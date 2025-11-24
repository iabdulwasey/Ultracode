import React from 'react';
import MetricsGrid from './MetricsGrid';
import ProcessOverview from './ProcessOverview';
import RecentActivity from './RecentActivity';
import TopVariants from './TopVariants';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <MetricsGrid />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProcessOverview />
        <TopVariants />
      </div>
      
      <RecentActivity />
    </div>
  );
};

export default Dashboard;