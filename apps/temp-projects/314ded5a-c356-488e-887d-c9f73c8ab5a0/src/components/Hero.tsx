import React from 'react';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-pink-50 to-blue-50 cherry-blossom-bg"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Japanese greeting */}
          <p className="text-red-600 font-japanese text-lg mb-4">
            いらっしゃいませ (Welcome)
          </p>
          
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Discover the
            <span className="text-red-600 block">Magic of Japan</span>
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            From ancient temples and cherry blossoms to modern cities and traditional cuisine, 
            embark on an unforgettable journey through the Land of the Rising Sun.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2">
              <span>Start Your Journey</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="border border-red-600 text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors duration-200">
              Watch Travel Guide
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <MapPin className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">47</h3>
              <p className="text-gray-600">Prefectures to Explore</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <Calendar className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">4</h3>
              <p className="text-gray-600">Beautiful Seasons</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <Users className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">1000+</h3>
              <p className="text-gray-600">Cultural Experiences</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-red-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-20 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-pulse delay-500"></div>
    </section>
  );
};

export default Hero;