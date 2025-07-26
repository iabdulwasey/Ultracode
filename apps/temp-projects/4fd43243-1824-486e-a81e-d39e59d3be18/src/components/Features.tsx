import React from 'react';
import { Battery, Zap, Shield, Thermometer, Clock, Leaf } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Battery,
      title: 'Long-Lasting Power',
      description: 'Our batteries deliver exceptional longevity with up to 10,000+ charge cycles.',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
    {
      icon: Zap,
      title: 'Rapid Charging',
      description: 'Industry-leading fast charging technology gets you powered up in minutes.',
      color: 'text-electric-600',
      bgColor: 'bg-electric-50',
    },
    {
      icon: Shield,
      title: 'Advanced Safety',
      description: 'Multi-layer protection systems ensure safe operation in all conditions.',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      icon: Thermometer,
      title: 'Temperature Resistant',
      description: 'Optimized performance across extreme temperature ranges from -40°C to 85°C.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Clock,
      title: 'Extended Lifespan',
      description: 'Engineered for durability with industry-leading warranty coverage.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Sustainable materials and recycling programs for environmental responsibility.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Our
            <span className="block gradient-text">Battery Solutions?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the perfect combination of cutting-edge technology, reliability, 
            and environmental consciousness in every battery we create.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-gray-100 hover:border-primary-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="bg-primary-600 text-white px-8 py-4 rounded-full hover:bg-primary-700 transition-colors duration-200 font-semibold text-lg">
            Learn More About Our Technology
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;