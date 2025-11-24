import React from 'react';
import { ArrowRight, Play, Star, Users, Award } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-japan-navy to-slate-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23FFB7C5%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%222%22/%3E%3Ccircle%20cx%3D%2253%22%20cy%3D%2213%22%20r%3D%221.5%22/%3E%3Ccircle%20cx%3D%2241%22%20cy%3D%2241%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        {/* Floating cherry blossoms */}
        <div className="absolute top-20 left-10 w-4 h-4 cherry-blossom rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-6 h-6 cherry-blossom rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 cherry-blossom rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 cherry-blossom rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <Star className="w-4 h-4 text-japan-gold fill-current" />
            <span className="text-white text-sm font-medium">Rated #1 Japan Travel Guide</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Discover the
            <span className="block gradient-text">Magic of Japan</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            From ancient temples to modern cities, experience the perfect blend of tradition and innovation 
            in the Land of the Rising Sun.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <button className="group bg-gradient-to-r from-japan-red to-japan-cherry text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <button className="group glass-effect text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Watch Video</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-japan-cherry mr-2" />
                <span className="text-3xl font-bold text-white">50K+</span>
              </div>
              <p className="text-gray-400">Happy Travelers</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-6 h-6 text-japan-gold mr-2" />
                <span className="text-3xl font-bold text-white">100+</span>
              </div>
              <p className="text-gray-400">Destinations</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-japan-gold mr-2 fill-current" />
                <span className="text-3xl font-bold text-white">4.9</span>
              </div>
              <p className="text-gray-400">Rating</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;