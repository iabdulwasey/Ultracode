import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import QuitPlanModal from './QuitPlanModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-md fixed w-full top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">QuitSmart</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#benefits" className="text-gray-700 hover:text-blue-600 transition-colors">Benefits</a>
              <a href="#products" className="text-gray-700 hover:text-blue-600 transition-colors">Products</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">How It Works</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Success Stories</a>
              <a href="#faq" className="text-gray-700 hover:text-blue-600 transition-colors">FAQ</a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => setIsPlannerOpen(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Your Journey
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <a href="#benefits" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Benefits</a>
                <a href="#products" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Products</a>
                <a href="#how-it-works" className="block px-3 py-2 text-gray-700 hover:text-blue-600">How It Works</a>
                <a href="#testimonials" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Success Stories</a>
                <a href="#faq" className="block px-3 py-2 text-gray-700 hover:text-blue-600">FAQ</a>
                <button 
                  onClick={() => {
                    setIsPlannerOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mt-2"
                >
                  Start Your Journey
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <QuitPlanModal 
        isOpen={isPlannerOpen} 
        onClose={() => setIsPlannerOpen(false)} 
      />
    </>
  );
};

export default Header;