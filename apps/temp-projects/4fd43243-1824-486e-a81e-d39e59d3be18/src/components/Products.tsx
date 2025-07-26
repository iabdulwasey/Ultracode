import React, { useState } from 'react';
import { Battery, Car, Home, Smartphone, ArrowRight } from 'lucide-react';

const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('automotive');

  const categories = [
    { id: 'automotive', name: 'Automotive', icon: Car },
    { id: 'residential', name: 'Residential', icon: Home },
    { id: 'portable', name: 'Portable', icon: Smartphone },
    { id: 'industrial', name: 'Industrial', icon: Battery },
  ];

  const products = {
    automotive: [
      {
        name: 'PowerDrive Pro',
        capacity: '100 kWh',
        voltage: '400V',
        features: ['Fast charging', '500+ mile range', '10-year warranty'],
        image: '🚗',
        price: 'From $15,999'
      },
      {
        name: 'PowerDrive Compact',
        capacity: '60 kWh',
        voltage: '400V',
        features: ['Urban optimized', '300+ mile range', '8-year warranty'],
        image: '🚙',
        price: 'From $9,999'
      },
      {
        name: 'PowerDrive Heavy',
        capacity: '200 kWh',
        voltage: '800V',
        features: ['Commercial grade', '600+ mile range', '12-year warranty'],
        image: '🚛',
        price: 'From $29,999'
      }
    ],
    residential: [
      {
        name: 'HomeCell Max',
        capacity: '20 kWh',
        voltage: '48V',
        features: ['Backup power', 'Solar integration', '15-year warranty'],
        image: '🏠',
        price: 'From $12,999'
      },
      {
        name: 'HomeCell Standard',
        capacity: '10 kWh',
        voltage: '48V',
        features: ['Essential backup', 'Grid-tie ready', '10-year warranty'],
        image: '🏡',
        price: 'From $6,999'
      }
    ],
    portable: [
      {
        name: 'PowerPack Ultra',
        capacity: '50 Wh',
        voltage: '3.7V',
        features: ['Wireless charging', '7-day battery', 'Water resistant'],
        image: '📱',
        price: 'From $199'
      },
      {
        name: 'PowerBank Pro',
        capacity: '100 Wh',
        voltage: '5V',
        features: ['Multiple ports', 'Fast charge', 'LED display'],
        image: '🔋',
        price: 'From $299'
      }
    ],
    industrial: [
      {
        name: 'IndustriCell Mega',
        capacity: '1 MWh',
        voltage: '1000V',
        features: ['Grid storage', 'Load balancing', '20-year warranty'],
        image: '🏭',
        price: 'Contact for pricing'
      },
      {
        name: 'IndustriCell Standard',
        capacity: '500 kWh',
        voltage: '800V',
        features: ['Backup power', 'Peak shaving', '15-year warranty'],
        image: '⚡',
        price: 'Contact for pricing'
      }
    ]
  };

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Product
            <span className="block gradient-text">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive battery solutions designed for every application, 
            from personal devices to industrial-scale energy storage.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                <IconComponent className="w-5 h-5 mr-2" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products[activeCategory as keyof typeof products].map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              {/* Product Image/Icon */}
              <div className="text-6xl mb-6 text-center">{product.image}</div>
              
              {/* Product Info */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h3>
              
              {/* Specs */}
              <div className="flex justify-between mb-6 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-primary-600">{product.capacity}</div>
                  <div className="text-gray-500">Capacity</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-electric-600">{product.voltage}</div>
                  <div className="text-gray-500">Voltage</div>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {product.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Price and CTA */}
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold gradient-text">{product.price}</div>
                <button className="flex items-center text-primary-600 hover:text-primary-700 font-semibold">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="bg-primary-600 text-white px-8 py-4 rounded-full hover:bg-primary-700 transition-colors duration-200 font-semibold text-lg">
            Request Custom Solution
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;