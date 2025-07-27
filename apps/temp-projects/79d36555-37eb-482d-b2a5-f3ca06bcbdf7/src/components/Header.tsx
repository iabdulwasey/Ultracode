import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-nicotex-600">
              NICOTEX
            </div>
            <span className="ml-2 text-sm text-gray-600 hidden sm:block">
              Nicotine Replacement Therapy
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#benefits" className="text-gray-700 hover:text-nicotex-600 transition-colors">
              Benefits
            </a>
            <a href="#products" className="text-gray-700 hover:text-nicotex-600 transition-colors">
              Products
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-nicotex-600 transition-colors">
              How It Works
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-nicotex-600 transition-colors">
              Reviews
            </a>
            <a href="#faq" className="text-gray-700 hover:text-nicotex-600 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-4 w-4 mr-1" />
              1-800-NICOTEX
            </div>
            <button className="bg-nicotex-600 text-white px-4 py-2 rounded-lg hover:bg-nicotex-700 transition-colors">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-nicotex-600"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#benefits" className="text-gray-700 hover:text-nicotex-600 transition-colors">
                Benefits
              </a>
              <a href="#products" className="text-gray-700 hover:text-nicotex-600 transition-colors">
                Products
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-nicotex-600 transition-colors">
                How It Works
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-nicotex-600 transition-colors">
                Reviews
              </a>
              <a href="#faq" className="text-gray-700 hover:text-nicotex-600 transition-colors">
                FAQ
              </a>
              <div className="pt-4 border-t">
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <Phone className="h-4 w-4 mr-1" />
                  1-800-NICOTEX
                </div>
                <button className="w-full bg-nicotex-600 text-white px-4 py-2 rounded-lg hover:bg-nicotex-700 transition-colors">
                  Get Started
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;