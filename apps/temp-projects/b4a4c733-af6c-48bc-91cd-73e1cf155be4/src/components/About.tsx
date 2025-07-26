import React from 'react';
import { Award, Users, Globe, Leaf } from 'lucide-react';

const stats = [
  { icon: Award, label: 'Years of Excellence', value: '15+' },
  { icon: Users, label: 'Happy Customers', value: '50K+' },
  { icon: Globe, label: 'Countries Served', value: '25+' },
  { icon: Leaf, label: 'Eco-Friendly Products', value: '100%' }
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Crafting Quality Since 2008
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                At Combi, we believe that the right comb can transform your daily grooming routine. 
                Our passion for quality craftsmanship and sustainable materials drives us to create 
                combs that are not just functional, but beautiful works of art.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 rounded-lg p-3 flex-shrink-0">
                  <Leaf className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Sustainable Materials</h3>
                  <p className="text-gray-600">We source only the finest sustainable materials, from certified wood to recycled metals.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 rounded-lg p-3 flex-shrink-0">
                  <Award className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Craftsmanship</h3>
                  <p className="text-gray-600">Each comb is carefully crafted by skilled artisans with decades of experience.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 rounded-lg p-3 flex-shrink-0">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer First</h3>
                  <p className="text-gray-600">Your satisfaction is our priority, backed by our lifetime warranty and exceptional service.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-4">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 bg-primary-500 rounded-3xl p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h3>
          <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            To provide the world's finest combs while promoting sustainable practices and supporting 
            traditional craftsmanship. Every purchase helps preserve artisan skills and protect our environment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;