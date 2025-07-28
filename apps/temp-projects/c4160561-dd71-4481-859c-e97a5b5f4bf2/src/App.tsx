import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProcessDiscovery from './components/ProcessDiscovery';
import ConformanceChecking from './components/ConformanceChecking';
import ProcessEnhancement from './components/ProcessEnhancement';
import EventLog from './components/EventLog';
import Analytics from './components/Analytics';

export type TabType = 'dashboard' | 'discovery' | 'conformance' | 'enhancement' | 'eventlog' | 'analytics';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'discovery':
        return <ProcessDiscovery />;
      case 'conformance':
        return <ConformanceChecking />;
      case 'enhancement':
        return <ProcessEnhancement />;
      case 'eventlog':
        return <EventLog />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;