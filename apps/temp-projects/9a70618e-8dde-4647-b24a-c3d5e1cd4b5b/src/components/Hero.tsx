import React from 'react';
import { ArrowRight, MapPin, Calendar, Users } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Not sure where to go?
            <span className="block bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
              Perfect.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover amazing places to stay, unique experiences, and unforgettable moments around the world.
          </p>

          {/* Enhanced Search Card */}
          <div className="glass-effect rounded-2xl p-8 max-w-4xl mx-auto mb-12 animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Where</label>
                <div className="flex items-center space-x-2 bg-white rounded-lg p-3 border border-gray-200 hover:border-airbnb-primary transition-colors">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search destinations"
                    className="flex-1 outline-none text-gray-700"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Check in</label>
                <div className="flex items-center space-x-2 bg-white rounded-lg p-3 border border-gray-200 hover:border-airbnb-primary transition-colors">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    className="flex-1 outline-none text-gray-700"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Check out</label>
                <div className="flex items-center space-x-2 bg-white rounded-lg p-3 border border-gray-200 hover:border-airbnb-primary transition-colors">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    className="flex-1 outline-none text-gray-700"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Guests</label>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 bg-white rounded-lg p-3 border border-gray-200 hover:border-airbnb-primary transition-colors flex-1 mr-2">
                    <Users className="w-5 h-5 text-gray-400" />
                    <select className="flex-1 outline-none text-gray-700 bg-transparent">
                      <option>1 guest</option>
                      <option>2 guests</option>
                      <option>3 guests</option>
                      <option>4+ guests</option>
                    </select>
                  </div>
                  <button className="bg-gradient-to-r from-airbnb-primary to-pink-500 text-white p-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-airbnb-primary to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2">
              <span>I'm flexible</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="glass-effect text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105">
              Explore nearby
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;