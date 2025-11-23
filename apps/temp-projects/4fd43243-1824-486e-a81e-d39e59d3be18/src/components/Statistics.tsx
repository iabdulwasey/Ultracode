import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Globe, Award } from 'lucide-react';

const Statistics: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('statistics');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const stats = [
    {
      icon: TrendingUp,
      value: '10M+',
      label: 'Batteries Delivered',
      description: 'Powering devices worldwide'
    },
    {
      icon: Users,
      value: '50K+',
      label: 'Happy Customers',
      description: 'Across 80+ countries'
    },
    {
      icon: Globe,
      value: '99.8%',
      label: 'Reliability Rate',
      description: 'Industry-leading performance'
    },
    {
      icon: Award,
      value: '25+',
      label: 'Industry Awards',
      description: 'Recognition for innovation'
    }
  ];

  return (
    <section id="statistics" className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trusted by
            <span className="block gradient-text">Millions Worldwide</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our commitment to excellence has earned the trust of customers 
            and industry leaders across the globe.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="text-center group"
              >
                {/* Icon */}
                <div className="w-20 h-20 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 electric-glow">
                  <IconComponent className="w-10 h-10 text-primary-400" />
                </div>

                {/* Value */}
                <div className="text-5xl font-bold mb-2 gradient-text">
                  {isVisible ? stat.value : '0'}
                </div>

                {/* Label */}
                <div className="text-xl font-semibold mb-2">{stat.label}</div>

                {/* Description */}
                <div className="text-gray-400">{stat.description}</div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-20 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold mb-4">Join the Energy Revolution</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Be part of the sustainable future with our advanced battery solutions. 
              Experience the difference that cutting-edge technology makes.
            </p>
            <button className="bg-primary-600 text-white px-8 py-4 rounded-full hover:bg-primary-700 transition-colors duration-200 font-semibold text-lg battery-glow">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;