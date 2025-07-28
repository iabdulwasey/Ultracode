import React, { useState } from 'react';
import { Menu, X, User, Globe, Search } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-airbnb-primary to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold gradient-text">airbnb</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-airbnb-primary transition-colors font-medium">
              Stays
            </a>
            <a href="#" className="text-gray-700 hover:text-airbnb-primary transition-colors font-medium">
              Experiences
            </a>
            <a href="#" className="text-gray-700 hover:text-airbnb-primary transition-colors font-medium">
              Online Experiences
            </a>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block text-gray-700 hover:text-airbnb-primary transition-colors font-medium">
              Become a Host
            </button>
            
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Globe className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex items-center space-x-2 border border-gray-300 rounded-full py-2 px-4 hover:shadow-md transition-shadow cursor-pointer">
              <Menu className="w-4 h-4 text-gray-600" />
              <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-slide-up">
          <div className="px-4 py-2 space-y-2">
            <a href="#" className="block py-2 text-gray-700 hover:text-airbnb-primary">
              Stays
            </a>
            <a href="#" className="block py-2 text-gray-700 hover:text-airbnb-primary">
              Experiences
            </a>
            <a href="#" className="block py-2 text-gray-700 hover:text-airbnb-primary">
              Online Experiences
            </a>
            <a href="#" className="block py-2 text-gray-700 hover:text-airbnb-primary">
              Become a Host
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;