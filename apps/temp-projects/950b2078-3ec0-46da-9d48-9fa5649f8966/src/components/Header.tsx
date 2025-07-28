import React, { useState } from 'react';
import { Menu, X, MapPin } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Destinations', href: '#destinations' },
    { name: 'Cuisine', href: '#cuisine' },
    { name: 'Culture', href: '#culture' },
    { name: 'Travel Tips', href: '#tips' },
    { name: 'Reviews', href: '#reviews' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-chinese-red to-chinese-gold rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Explore China</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-chinese-red transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
            <button className="bg-gradient-to-r from-chinese-red to-chinese-gold text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-200 font-medium">
              Plan Your Trip
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-chinese-red transition-colors duration-200 font-medium px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <button className="bg-gradient-to-r from-chinese-red to-chinese-gold text-white px-6 py-2 rounded-full mt-4 font-medium">
                Plan Your Trip
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;