import React from 'react';
import { CheckCircle, Star } from 'lucide-react';

const Products: React.FC = () => {
  const products = [
    {
      name: 'Nicotex 2mg',
      strength: '2mg',
      description: 'Perfect for light smokers (less than 20 cigarettes per day)',
      flavors: ['Fresh Mint', 'Original', 'Fruit Burst'],
      features: [
        'Gradual nicotine release',
        'Reduces cravings effectively',
        'Sugar-free formula',
        '12-week program'
      ],
      price: '$24.99',
      popular: false
    },
    {
      name: 'Nicotex 4mg',
      strength: '4mg',
      description: 'Ideal for heavy smokers (20+ cigarettes per day)',
      flavors: ['Fresh Mint', 'Original', 'Ice Cool', 'Fruit Burst'],
      features: [
        'Strong craving control',
        'Fast-acting relief',
        'Sugar-free formula',
        '12-week program'
      ],
      price: '$29.99',
      popular: true
    }
  ];

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Nicotex Product
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the right strength based on your smoking habits. Our products are designed to provide effective nicotine replacement therapy.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {products.map((product, index) => (
            <div key={index} className={`bg-white rounded-2xl shadow-lg overflow-hidden ${product.popular ? 'ring-2 ring-green-500' : ''}`}>
              {product.popular && (
                <div className="bg-green-500 text-white text-center py-2 px-4">
                  <div className="flex items-center justify-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-600">{product.strength}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Available Flavors:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.flavors.map((flavor, flavorIndex) => (
                      <span key={flavorIndex} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {flavor}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-gray-900">{product.price}</span>
                    <span className="text-gray-600">per pack</span>
                  </div>
                  <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    product.popular 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}>
                    Choose This Product
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Not Sure Which Strength to Choose?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Take our quick assessment to find the right Nicotex product for your smoking habits and quit journey.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Take Product Quiz
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;