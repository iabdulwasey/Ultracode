import React from 'react';
import { CheckCircle, Award, Users, Clock } from 'lucide-react';

const Hero = () => {
  return (
    <section className="gradient-bg hero-pattern text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-6">
              <Award className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">#1 Doctor Recommended</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Break Free from
              <span className="block text-nicotex-200">Smoking Forever</span>
            </h1>
            
            <p className="text-xl mb-8 text-nicotex-100 leading-relaxed">
              Nicotex nicotine gum is clinically proven to double your chances of quitting smoking successfully. 
              Take control of your health with our FDA-approved nicotine replacement therapy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Your Quit Plan
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
                Find Nearby Store
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 mr-2" />
                  <span className="text-2xl font-bold">2M+</span>
                </div>
                <p className="text-sm text-nicotex-200">People Helped</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  <span className="text-2xl font-bold">85%</span>
                </div>
                <p className="text-sm text-nicotex-200">Success Rate</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 mr-2" />
                  <span className="text-2xl font-bold">12</span>
                </div>
                <p className="text-sm text-nicotex-200">Week Program</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-2xl">
                <h3 className="text-gray-800 text-xl font-semibold mb-4">Quick Assessment</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      How many cigarettes do you smoke per day?
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>Select range</option>
                      <option>1-10 cigarettes</option>
                      <option>11-20 cigarettes</option>
                      <option>21-30 cigarettes</option>
                      <option>More than 30</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      How long have you been smoking?
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>Select duration</option>
                      <option>Less than 1 year</option>
                      <option>1-5 years</option>
                      <option>6-10 years</option>
                      <option>More than 10 years</option>
                    </select>
                  </div>
                  <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                    Get My Personalized Plan
                  </button>
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