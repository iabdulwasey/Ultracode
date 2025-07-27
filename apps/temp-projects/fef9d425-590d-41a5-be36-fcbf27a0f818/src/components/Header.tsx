import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm text-gray-600 border-b">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              <span>1-800-NICOTEX</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              <span>support@nicotex.com</span>
            </div>
          </div>
          <div className="text-primary font-medium">
            Clinically Proven • FDA Approved
          </div>
        </div>

        {/* Main navigation */}
        <nav className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary">
              Nicotex
            </div>
            <span className="ml-2 text-sm text-gray-500">by Healthcare Plus</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#benefits" className="text-gray-700 hover:text-primary transition-colors">Benefits</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-primary transition-colors">How It Works</a>
            <a href="#products" className="text-gray-700 hover:text-primary transition-colors">Products</a>
            <a href="#quit-plan" className="text-gray-700 hover:text-primary transition-colors">Quit Plan</a>
            <a href="#faq" className="text-gray-700 hover:text-primary transition-colors">FAQ</a>
            <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Start Your Journey
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <a href="#benefits" className="text-gray-700 hover:text-primary transition-colors">Benefits</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-primary transition-colors">How It Works</a>
              <a href="#products" className="text-gray-700 hover:text-primary transition-colors">Products</a>
              <a href="#quit-plan" className="text-gray-700 hover:text-primary transition-colors">Quit Plan</a>
              <a href="#faq" className="text-gray-700 hover:text-primary transition-colors">FAQ</a>
              <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors w-full">
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