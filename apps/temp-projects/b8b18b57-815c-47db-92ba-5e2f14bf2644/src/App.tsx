import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ProcessDiscovery from './components/ProcessDiscovery';
import ConformanceChecking from './components/ConformanceChecking';
import PerformanceAnalysis from './components/PerformanceAnalysis';
import DataSources from './components/DataSources';

type ActiveView = 'dashboard' | 'discovery' | 'conformance' | 'performance' | 'datasources';

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'discovery':
        return <ProcessDiscovery />;
      case 'conformance':
        return <ConformanceChecking />;
      case 'performance':
        return <PerformanceAnalysis />;
      case 'datasources':
        return <DataSources />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          activeView={activeView}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;