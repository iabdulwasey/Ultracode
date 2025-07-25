import React from 'react';
import { Star, Award, Users } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
          alt="Luxury Salon Interior"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Welcome to
            <span className="block text-gold-400">Monu's Salon</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
            Where Beauty Meets Excellence. Experience luxury beauty treatments 
            and personalized care in our premium salon.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="btn-primary text-lg px-10 py-4">
              Book Your Appointment
            </button>
            <button className="btn-secondary text-lg px-10 py-4 text-white border-white hover:bg-white hover:text-primary-600">
              View Services
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-gold-500 p-3 rounded-full">
                  <Award className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">15+</h3>
              <p className="text-gray-300">Years of Excellence</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-gold-500 p-3 rounded-full">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">10K+</h3>
              <p className="text-gray-300">Happy Clients</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-gold-500 p-3 rounded-full">
                  <Star className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">4.9</h3>
              <p className="text-gray-300">Average Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;