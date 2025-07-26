import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-pink-50 to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Your Look with
              <span className="text-primary block">Premium Hair Extensions</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover our luxurious collection of 100% human hair extensions. 
              From clip-ins to tape-ins, find your perfect match for instant length and volume.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="btn btn-primary text-center">
                Shop Collection
              </Link>
              <a href="#about" className="btn btn-outline text-center">
                Learn More
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-purple-200 rounded-full flex items-center justify-center">
              <div className="w-80 h-80 bg-white rounded-full shadow-2xl flex items-center justify-center">
                <div className="text-6xl">💇‍♀️</div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute top-10 right-10 w-16 h-16 bg-primary/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-12 h-12 bg-purple-200 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;