import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import ProductQuizModal from './ProductQuizModal';

const Hero = () => {
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Break Free from Smoking with{' '}
                <span className="text-blue-600">Confidence</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join thousands who've successfully quit smoking with our scientifically-proven nicotine gum. 
                Start your journey to a healthier, smoke-free life today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={() => setIsQuizModalOpen(true)}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center group"
                >
                  Take Product Quiz
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors">
                  Learn More
                </button>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  FDA Approved
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  30-Day Money Back
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Free Shipping
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-1">
                <img 
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Nicotine Gum Product" 
                  className="w-full h-80 object-cover rounded-xl"
                />
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Success Rate</h3>
                    <span className="text-3xl font-bold text-green-600">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">of users successfully quit within 12 weeks</p>
                </div>
              </div>
              
              {/* Floating testimonial */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-xs transform -rotate-2">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-2">"Finally quit after 15 years of smoking!"</p>
                <p className="text-xs text-gray-500">- Sarah M., Verified Customer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductQuizModal 
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
      />
    </>
  );
};

export default Hero;