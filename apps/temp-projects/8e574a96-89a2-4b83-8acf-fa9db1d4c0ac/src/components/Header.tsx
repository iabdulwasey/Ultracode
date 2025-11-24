import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Heart, Calendar } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Destinations', href: '#destinations', icon: MapPin },
    { label: 'Culture', href: '#culture', icon: Heart },
    { label: 'Plan Trip', href: '#planning', icon: Calendar },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-japan-red to-japan-cherry rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">日</span>
            </div>
            <span className="text-xl lg:text-2xl font-bold gradient-text">Explore Japan</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-700 hover:text-japan-red transition-colors duration-200 group"
                >
                  <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">{item.label}</span>
                </a>
              );
            })}
            <button className="bg-gradient-to-r from-japan-red to-japan-cherry text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              Start Journey
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass-effect border-t border-white/20 animate-fade-in">
            <nav className="p-4 space-y-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 text-gray-700 hover:text-japan-red transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </a>
                );
              })}
              <button className="w-full bg-gradient-to-r from-japan-red to-japan-cherry text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-200 mt-4">
                Start Journey
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;