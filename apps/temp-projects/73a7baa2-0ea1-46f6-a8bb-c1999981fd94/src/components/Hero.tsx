import React from 'react';
import { CheckCircle, Award } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <div className="flex items-center mb-4">
              <Award className="h-6 w-6 text-green-600 mr-2" />
              <span className="text-green-600 font-semibold">Clinically Proven</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Break Free from Smoking with{' '}
              <span className="text-green-600">Nicotex</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Start your journey to a smoke-free life with our proven nicotine replacement therapy. 
              Nicotex gum helps reduce cravings and withdrawal symptoms effectively.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors">
                Find Your Quit Plan
              </button>
              <button className="border border-green-600 text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors">
                Learn More
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-gray-700">FDA Approved</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-gray-700">Doubles Success Rate</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-gray-700">Trusted by Millions</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">N</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Nicotex Gum</h3>
                <p className="text-gray-600 mb-6">
                  Available in multiple strengths and flavors to match your smoking habits
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-semibold text-gray-900">2mg</div>
                    <div className="text-gray-600">Light smokers</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-semibold text-gray-900">4mg</div>
                    <div className="text-gray-600">Heavy smokers</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4">
              <div className="text-2xl font-bold text-green-600">2x</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4">
              <div className="text-2xl font-bold text-blue-600">12 weeks</div>
              <div className="text-sm text-gray-600">Program</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;