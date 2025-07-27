import React from 'react';
import { CheckCircle, Award, Shield } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="gradient-bg hero-pattern py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-white">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium">
                <Award className="h-4 w-4 mr-2" />
                Clinically Proven Solution
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Break Free from
              <span className="block text-yellow-300">Smoking Today</span>
            </h1>
            
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              Nicotex nicotine gum provides medically proven nicotine replacement therapy 
              to help you quit smoking safely and effectively. Take control of your health journey.
            </p>

            {/* Key Benefits */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-3 text-green-300" />
                <span className="text-lg">Reduces withdrawal symptoms</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-3 text-green-300" />
                <span className="text-lg">Doubles your chances of quitting</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-3 text-green-300" />
                <span className="text-lg">Available without prescription</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors shadow-lg">
                Start Your Journey
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-nicotex-600 transition-colors">
                Learn More
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center mt-8 pt-8 border-t border-white/20">
              <Shield className="h-6 w-6 mr-3 text-green-300" />
              <span className="text-sm text-blue-100">
                FDA Approved • Doctor Recommended • 20+ Years of Trust
              </span>
            </div>
          </div>

          {/* Right Column - Product Image */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-8 text-center">
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-nicotex-400 to-nicotex-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <div className="text-white text-6xl font-bold">Nx</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Nicotex Gum</h3>
                <p className="text-gray-600 mb-4">2mg & 4mg Available</p>
                <div className="flex justify-center space-x-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Sugar Free</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Fast Acting</span>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold shadow-lg">
              ✓ Clinically Proven
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-400 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
              ✓ No Prescription
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;