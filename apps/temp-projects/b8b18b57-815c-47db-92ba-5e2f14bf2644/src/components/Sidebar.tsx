import React from 'react';
import { 
  BarChart3, 
  GitBranch, 
  CheckCircle, 
  Zap, 
  Database,
  Home,
  Settings,
  Users,
  HelpCircle
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'discovery', label: 'Process Discovery', icon: GitBranch },
    { id: 'conformance', label: 'Conformance', icon: CheckCircle },
    { id: 'performance', label: 'Performance', icon: Zap },
    { id: 'datasources', label: 'Data Sources', icon: Database },
  ];

  const bottomMenuItems = [
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  if (!isOpen) {
    return (
      <div className="w-16 bg-white shadow-lg flex flex-col">
        <div className="p-4">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full p-3 rounded-lg transition-colors ${
                  activeView === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                title={item.label}
              >
                <Icon className="w-5 h-5 mx-auto" />
              </button>
            );
          })}
        </nav>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">ProcessMine</h1>
        </div>
      </div>
      
      <nav className="flex-1 px-4 pb-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeView === item.id
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-4 space-y-2">
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;