import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Excellence in
              <span className="text-primary-600"> Education</span>
              <br />
              Since 1985
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
              At Brightwood Academy, we nurture young minds to become tomorrow's leaders. 
              Our comprehensive curriculum and dedicated faculty ensure every student reaches their full potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="btn-primary inline-flex items-center">
                Explore Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="btn-secondary inline-flex items-center">
                <Play className="mr-2 h-5 w-5" />
                Watch Video
              </button>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-600">1000+</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">50+</div>
                <div className="text-sm text-gray-600">Teachers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Students in classroom"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-primary-200 rounded-2xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary-200 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;