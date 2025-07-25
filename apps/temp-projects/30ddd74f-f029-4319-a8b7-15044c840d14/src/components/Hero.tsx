import React from 'react';
import { Star, Award, Users } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-32 pb-16 bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
                Transform Your
                <span className="block bg-gradient-to-r from-primary-600 to-gold-600 bg-clip-text text-transparent">
                  Natural Beauty
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Premium hair extensions that blend seamlessly with your natural hair. 
                Experience luxury, quality, and confidence with MBeauty's exclusive collection.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center space-x-2">
                <div className="bg-primary-100 p-2 rounded-full">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-gold-100 p-2 rounded-full">
                  <Award className="w-6 h-6 text-gold-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">5 Years</div>
                  <div className="text-sm text-gray-600">Experience</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-primary-100 p-2 rounded-full">
                  <Star className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary text-lg px-8 py-4">
                Shop Extensions
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                Free Consultation
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-600 ml-2">
                Rated 4.9/5 by 2,000+ customers
              </span>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-primary-100 to-gold-100 rounded-3xl p-8 shadow-2xl">
                <div className="aspect-w-4 aspect-h-5 bg-gradient-to-br from-primary-200 to-gold-200 rounded-2xl">
                  <div className="flex items-center justify-center text-gray-600">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-4xl">💁‍♀️</span>
                      </div>
                      <p className="text-lg font-medium">Beautiful Hair Extensions</p>
                      <p className="text-sm text-gray-500">Premium Quality</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg z-20">
              <Star className="w-8 h-8 text-gold-500" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg z-20">
              <Award className="w-8 h-8 text-primary-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;