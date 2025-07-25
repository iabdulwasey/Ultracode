import React from 'react';
import { Star, Award, Users } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-cream to-rose-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-serif font-bold text-charcoal leading-tight">
                Transform Your
                <span className="text-rose-gold block">Beauty</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Premium hair extensions crafted with the finest materials. 
                Enhance your natural beauty with our luxurious collection.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary">
                Book Consultation
              </button>
              <button className="btn-secondary">
                View Gallery
              </button>
            </div>

            {/* Stats */}
            <div className="flex space-x-8 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-rose-gold/20 rounded-full mb-2">
                  <Star className="h-6 w-6 text-rose-gold" />
                </div>
                <div className="text-2xl font-bold text-charcoal">5.0</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-rose-gold/20 rounded-full mb-2">
                  <Users className="h-6 w-6 text-rose-gold" />
                </div>
                <div className="text-2xl font-bold text-charcoal">500+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-rose-gold/20 rounded-full mb-2">
                  <Award className="h-6 w-6 text-rose-gold" />
                </div>
                <div className="text-2xl font-bold text-charcoal">3+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Beautiful woman with hair extensions"
                className="rounded-2xl shadow-2xl w-full h-[600px] object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-rose-gold/30 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-deep-rose/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;