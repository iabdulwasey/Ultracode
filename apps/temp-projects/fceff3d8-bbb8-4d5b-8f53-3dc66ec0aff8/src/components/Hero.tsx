import React from 'react';
import { Star, CheckCircle, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-20 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slide-up">
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <span className="text-gray-600 font-medium">4.9/5 from 2,000+ patients</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Your 
              <span className="gradient-text block">Perfect Smile</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Get straighter teeth with our premium clear aligners. Professional results 
              at home with expert monitoring and support throughout your journey.
            </p>

            {/* Key Benefits */}
            <div className="space-y-3 mb-8">
              {[
                'FDA-approved clear aligners',
                'Remote monitoring by orthodontists',
                '70% less expensive than traditional braces',
                'Average treatment time: 4-6 months'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 font-semibold">
                <span>Start Your Assessment</span>
                <ArrowRight size={20} />
              </button>
              <button className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg hover:bg-primary-50 transition-colors font-semibold">
                View Before & After
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Trusted by leading dental professionals</p>
              <div className="flex items-center space-x-8 opacity-60">
                <div className="font-bold text-lg">FDA</div>
                <div className="font-bold text-lg">ADA</div>
                <div className="font-bold text-lg">ISO 13485</div>
                <div className="font-bold text-lg">CE</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-fade-in">
            <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl p-8 relative overflow-hidden">
              {/* Placeholder for hero image - in a real app, this would be an actual image */}
              <div className="aspect-square bg-white rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="text-white text-4xl">😊</div>
                  </div>
                  <p className="text-gray-600 font-medium">Beautiful Smile Transformation</p>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                <div className="text-green-500">
                  <CheckCircle size={24} />
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg">
                <div className="text-sm font-semibold text-gray-900">4-6 months</div>
                <div className="text-xs text-gray-500">Average treatment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;