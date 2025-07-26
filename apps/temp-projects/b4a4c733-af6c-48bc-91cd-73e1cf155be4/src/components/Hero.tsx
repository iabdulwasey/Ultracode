import React from 'react';
import { ArrowRight, Star, Shield, Truck } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="bg-gradient-to-br from-primary-50 to-orange-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Premium
                <span className="text-primary-600 block">Combs</span>
                for Every Style
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover our curated collection of high-quality combs crafted from the finest materials. 
                From classic wooden combs to modern designs, find the perfect tool for your hair care routine.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4">
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                View Collections
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Star className="w-6 h-6 text-primary-500" />
                </div>
                <p className="text-sm font-medium text-gray-900">Premium Quality</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Shield className="w-6 h-6 text-primary-500" />
                </div>
                <p className="text-sm font-medium text-gray-900">Lifetime Warranty</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Truck className="w-6 h-6 text-primary-500" />
                </div>
                <p className="text-sm font-medium text-gray-900">Free Shipping</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-amber-100 to-amber-200 rounded-lg p-4 h-24"></div>
                    <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-4 h-32"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-primary-100 to-primary-200 rounded-lg p-4 h-32"></div>
                    <div className="bg-gradient-to-r from-stone-100 to-stone-200 rounded-lg p-4 h-24"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary-500 text-white rounded-full p-4 shadow-lg">
              <span className="text-sm font-bold">NEW</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;