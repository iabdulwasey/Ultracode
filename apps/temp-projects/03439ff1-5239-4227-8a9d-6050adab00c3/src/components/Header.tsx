import React, { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 spice-gradient rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">Y</span>
            </div>
            <span className="ml-3 text-2xl font-bold text-spice-800">Yum Spices</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-spice-600 font-medium transition-colors">Home</a>
            <a href="#products" className="text-gray-700 hover:text-spice-600 font-medium transition-colors">Products</a>
            <a href="#about" className="text-gray-700 hover:text-spice-600 font-medium transition-colors">About</a>
            <a href="#services" className="text-gray-700 hover:text-spice-600 font-medium transition-colors">Services</a>
            <a href="#contact" className="text-gray-700 hover:text-spice-600 font-medium transition-colors">Contact</a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:text-spice-600 transition-colors">
              <ShoppingCart size={24} />
            </button>
            <button className="btn-primary">
              Shop Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-spice-600"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-spice-600 font-medium">Home</a>
              <a href="#products" className="text-gray-700 hover:text-spice-600 font-medium">Products</a>
              <a href="#about" className="text-gray-700 hover:text-spice-600 font-medium">About</a>
              <a href="#services" className="text-gray-700 hover:text-spice-600 font-medium">Services</a>
              <a href="#contact" className="text-gray-700 hover:text-spice-600 font-medium">Contact</a>
              <div className="flex items-center space-x-4 pt-4">
                <button className="p-2 text-gray-700 hover:text-spice-600">
                  <ShoppingCart size={24} />
                </button>
                <button className="btn-primary">
                  Shop Now
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