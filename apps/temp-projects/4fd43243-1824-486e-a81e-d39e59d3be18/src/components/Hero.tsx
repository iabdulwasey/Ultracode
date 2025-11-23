import React from 'react';
import { ArrowRight, Zap, Shield, Recycle } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900">
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Animated background elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/20 text-primary-300 text-sm font-medium mb-8 border border-primary-500/30">
            <Zap className="w-4 h-4 mr-2" />
            Next-Generation Battery Technology
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Power Your Future with
            <span className="block gradient-text">Advanced Batteries</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Revolutionary energy storage solutions that deliver unmatched performance, 
            sustainability, and reliability for all your power needs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group bg-primary-600 text-white px-8 py-4 rounded-full hover:bg-primary-700 transition-all duration-300 font-semibold text-lg flex items-center battery-glow">
              Explore Products
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold text-lg">
              Watch Demo
            </button>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center mb-4 electric-glow">
                <Zap className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Fast Charging</h3>
              <p className="text-gray-400">Ultra-rapid charging technology</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-electric-600/20 rounded-full flex items-center justify-center mb-4 electric-glow">
                <Shield className="w-8 h-8 text-electric-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Safe & Reliable</h3>
              <p className="text-gray-400">Advanced safety protection</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center mb-4 electric-glow">
                <Recycle className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Eco-Friendly</h3>
              <p className="text-gray-400">Sustainable energy solutions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;