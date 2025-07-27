import React, { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-green-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">Nicotex</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#benefits" className="text-gray-700 hover:text-green-600 transition-colors">
              Benefits
            </a>
            <a href="#products" className="text-gray-700 hover:text-green-600 transition-colors">
              Products
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-green-600 transition-colors">
              How It Works
            </a>
            <a href="#quit-plan" className="text-gray-700 hover:text-green-600 transition-colors">
              Quit Plan
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-green-600 transition-colors">
              Success Stories
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Start Your Journey
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-green-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="#benefits" className="block px-3 py-2 text-gray-700 hover:text-green-600">
                Benefits
              </a>
              <a href="#products" className="block px-3 py-2 text-gray-700 hover:text-green-600">
                Products
              </a>
              <a href="#how-it-works" className="block px-3 py-2 text-gray-700 hover:text-green-600">
                How It Works
              </a>
              <a href="#quit-plan" className="block px-3 py-2 text-gray-700 hover:text-green-600">
                Quit Plan
              </a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-700 hover:text-green-600">
                Success Stories
              </a>
              <button className="w-full mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Start Your Journey
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;