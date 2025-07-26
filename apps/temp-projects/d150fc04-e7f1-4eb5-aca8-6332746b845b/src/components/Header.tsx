import React from 'react';
import { Film, User, Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Film className="h-8 w-8 text-primary-600" />
            <h1 className="ml-2 text-2xl font-bold text-gray-900">CinemaBook</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#movies" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
              Movies
            </a>
            <a href="#showtimes" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
              Showtimes
            </a>
            <a href="#theaters" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
              Theaters
            </a>
            <a href="#contact" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-primary-600 p-2 rounded-full transition-colors">
              <User className="h-5 w-5" />
            </button>
            <button className="md:hidden text-gray-700 hover:text-primary-600 p-2 rounded-full transition-colors">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;