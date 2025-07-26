import React from 'react';
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-20 bg-gradient-to-br from-primary-50 to-secondary-50 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Nurturing Tomorrow's
              <span className="text-primary-600"> Leaders</span>
            </h1>
            <p className="text-xl text-gray-600 mt-6 leading-relaxed">
              At Greenwood Academy, we provide exceptional education that prepares students 
              for success in an ever-changing world. Join our community of learners, 
              innovators, and future leaders.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="btn-primary flex items-center justify-center">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="btn-secondary">
                Schedule a Tour
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mx-auto mb-3">
                  <BookOpen className="h-6 w-6 text-primary-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-lg mx-auto mb-3">
                  <Users className="h-6 w-6 text-secondary-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">Teachers</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mx-auto mb-3">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">25+</div>
                <div className="text-sm text-gray-600">Years</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="bg-gradient-to-r from-primary-400 to-secondary-400 rounded-2xl p-8 text-white">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-4">Why Choose Greenwood Academy?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    Small class sizes for personalized attention
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    Experienced and dedicated faculty
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    Modern facilities and technology
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    Comprehensive extracurricular programs
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    Strong college preparation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;