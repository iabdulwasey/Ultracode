import React from 'react';
import { Menu, Bell, Search, User, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface HeaderProps {
  toggleSidebar: () => void;
  activeView: string;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, activeView }) => {
  const getViewTitle = (view: string) => {
    switch (view) {
      case 'dashboard':
        return 'Dashboard Overview';
      case 'discovery':
        return 'Process Discovery';
      case 'conformance':
        return 'Conformance Checking';
      case 'performance':
        return 'Performance Analysis';
      case 'datasources':
        return 'Data Sources';
      default:
        return 'Process Mining Platform';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {getViewTitle(activeView)}
            </h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
              <Calendar className="w-4 h-4" />
              <span>Last updated: {format(new Date(), 'MMM dd, yyyy HH:mm')}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search processes, cases..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>

          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">John Doe</div>
              <div className="text-xs text-gray-500">Process Analyst</div>
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;