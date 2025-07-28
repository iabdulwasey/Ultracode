import React from 'react';
import { DollarSign, Shield, Users, ArrowRight, Star } from 'lucide-react';

const HostSection: React.FC = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Earn extra income',
      description: 'Make money sharing your space with travelers from around the world.',
    },
    {
      icon: Shield,
      title: 'Host with confidence',
      description: 'Our comprehensive protection and support help you host with peace of mind.',
    },
    {
      icon: Users,
      title: 'Meet amazing people',
      description: 'Connect with guests from different cultures and create lasting memories.',
    },
  ];

  const stats = [
    { number: '4M+', label: 'Hosts worldwide' },
    { number: '$13K', label: 'Average annual earnings' },
    { number: '4.7', label: 'Average host rating' },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slide-up">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Try hosting
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Earn extra income and unlock new opportunities by sharing your space. 
              Join millions of hosts who have already started their hosting journey.
            </p>

            {/* Benefits */}
            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start space-x-4 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-airbnb-primary to-pink-500 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-3xl font-bold text-airbnb-primary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-airbnb-primary to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span>Learn more</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right Image */}
          <div className="relative animate-fade-in">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                alt="Happy host"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating testimonial card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl max-w-sm animate-float">
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
                  alt="Host"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah</h4>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "Hosting has been an incredible experience. I've met amazing people and earned enough to travel more myself!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostSection;