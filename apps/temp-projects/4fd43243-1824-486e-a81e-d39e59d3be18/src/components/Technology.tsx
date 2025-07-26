import React from 'react';
import { Atom, Cpu, Layers, Zap } from 'lucide-react';

const Technology: React.FC = () => {
  const technologies = [
    {
      icon: Atom,
      title: 'Lithium-Ion Innovation',
      description: 'Advanced cathode and anode materials for superior energy density and cycle life.',
      stats: ['5x Energy Density', '50% Faster Charging', '10,000+ Cycles']
    },
    {
      icon: Cpu,
      title: 'Smart Battery Management',
      description: 'AI-powered BMS for optimal performance, safety, and predictive maintenance.',
      stats: ['Real-time Monitoring', 'Predictive Analytics', 'Remote Diagnostics']
    },
    {
      icon: Layers,
      title: 'Thermal Management',
      description: 'Revolutionary cooling systems maintaining optimal temperature across all conditions.',
      stats: ['±2°C Precision', 'Liquid Cooling', 'Thermal Barriers']
    },
    {
      icon: Zap,
      title: 'Fast Charging Protocol',
      description: 'Proprietary charging algorithms that maximize speed while preserving battery health.',
      stats: ['0-80% in 15min', 'Adaptive Charging', 'Cell Balancing']
    }
  ];

  return (
    <section id="technology" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Breakthrough
            <span className="block gradient-text">Technology</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our cutting-edge innovations push the boundaries of what's possible 
            in energy storage, delivering unprecedented performance and reliability.
          </p>
        </div>

        {/* Technology Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {technologies.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-2xl border border-gray-100 hover:border-primary-200 transition-all duration-300 hover:shadow-xl"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-electric-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-primary-600" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{tech.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{tech.description}</p>

                  {/* Stats */}
                  <div className="space-y-2">
                    {tech.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                        <span className="text-gray-700 font-medium">{stat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Innovation Timeline */}
        <div className="bg-gradient-to-r from-primary-600 to-electric-600 rounded-3xl p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Innovation Timeline</h3>
            <p className="text-primary-100 max-w-2xl mx-auto">
              Our journey of continuous innovation and breakthrough achievements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">2020</div>
              <div className="text-primary-100">First Solid-State Prototype</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">2021</div>
              <div className="text-primary-100">AI-Powered BMS Launch</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">2022</div>
              <div className="text-primary-100">Ultra-Fast Charging Tech</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">2023</div>
              <div className="text-primary-100">Next-Gen Materials</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;