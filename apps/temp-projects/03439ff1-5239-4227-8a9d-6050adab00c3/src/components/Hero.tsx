import React from 'react';
import { Star, Award, Truck } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background */}
      <div className="absolute inset-0 spice-gradient opacity-90"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="spices" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="2" fill="%23ffffff" opacity="0.3"/><circle cx="80" cy="40" r="1.5" fill="%23ffffff" opacity="0.2"/><circle cx="40" cy="70" r="1" fill="%23ffffff" opacity="0.4"/><circle cx="90" cy="90" r="2.5" fill="%23ffffff" opacity="0.2"/></pattern></defs><rect width="1000" height="1000" fill="url(%23spices)"/></svg>')`
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Premium Spices for
              <span className="block text-yellow-200">Extraordinary Flavors</span>
            </h1>
            <p className="text-xl mb-8 text-gray-100 leading-relaxed">
              Discover the world's finest spices, carefully sourced and expertly blended to elevate your culinary creations. From exotic seasonings to classic favorites.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-white text-spice-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors shadow-xl">
                Shop Collection
              </button>
              <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-spice-600 transition-colors">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Star className="text-yellow-300" size={24} />
                </div>
                <div className="text-2xl font-bold">4.9★</div>
                <div className="text-sm text-gray-200">Customer Rating</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Award className="text-yellow-300" size={24} />
                </div>
                <div className="text-2xl font-bold">200+</div>
                <div className="text-sm text-gray-200">Premium Spices</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Truck className="text-yellow-300" size={24} />
                </div>
                <div className="text-2xl font-bold">24h</div>
                <div className="text-sm text-gray-200">Fast Delivery</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🌶️</span>
                  </div>
                  <h3 className="font-bold text-white mb-2">Hot Spices</h3>
                  <p className="text-sm text-gray-200">Fiery flavors</p>
                </div>
                <div className="bg-white/20 rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 bg-green-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🌿</span>
                  </div>
                  <h3 className="font-bold text-white mb-2">Fresh Herbs</h3>
                  <p className="text-sm text-gray-200">Garden fresh</p>
                </div>
                <div className="bg-white/20 rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 bg-orange-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <h3 className="font-bold text-white mb-2">Exotic Blends</h3>
                  <p className="text-sm text-gray-200">Unique mixes</p>
                </div>
                <div className="bg-white/20 rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 bg-purple-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🧄</span>
                  </div>
                  <h3 className="font-bold text-white mb-2">Aromatics</h3>
                  <p className="text-sm text-gray-200">Rich scents</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;