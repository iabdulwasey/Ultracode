import React from 'react';
import { ArrowRight, Shield, Clock, Award } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <section className="py-20 gradient-bg hero-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          {/* Main CTA Content */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Your Smoke-Free Life
              <span className="block text-yellow-300">Starts Today</span>
            </h2>
            
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
              Join thousands who have successfully quit smoking with Nicotex. 
              Take the first step towards better health, more money, and freedom.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-10 text-blue-100">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                <span>FDA Approved</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>30-Day Guarantee</span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                <span>Clinically Proven</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors shadow-xl flex items-center justify-center">
                Order Nicotex Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-nicotex-600 transition-colors">
                Speak to a Specialist
              </button>
            </div>

            {/* Special Offer */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
              <div className="text-yellow-300 font-bold text-lg mb-2">
                Limited Time Offer
              </div>
              <div className="text-2xl font-bold mb-2">
                Save 25% on Your First Order
              </div>
              <div className="text-blue-100">
                Use code: QUITNOW25 • Free shipping included
              </div>
            </div>
          </div>

          {/* Statistics Bar */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-300 mb-2">2x</div>
                <div className="text-blue-100">Better Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300 mb-2">50K+</div>
                <div className="text-blue-100">Success Stories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300 mb-2">$3000</div>
                <div className="text-blue-100">Average Savings</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300 mb-2">12 Weeks</div>
                <div className="text-blue-100">To Freedom</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="mt-20">
        <svg
          className="w-full h-12 text-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="currentColor"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="currentColor"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};

export default CTA;