import React, { useState } from 'react';
import { Check, Star, ShoppingCart } from 'lucide-react';

const Products: React.FC = () => {
  const [selectedStrength, setSelectedStrength] = useState('2mg');

  const products = [
    {
      strength: '2mg',
      title: 'Nicotex 2mg Gum',
      subtitle: 'For Light to Moderate Smokers',
      description: 'Perfect for those who smoke less than 20 cigarettes per day',
      features: [
        'Sugar-free formulation',
        'Multiple flavors available',
        'Fast-acting relief',
        '12-week program'
      ],
      price: '$29.99',
      originalPrice: '$39.99',
      image: '2mg',
      recommended: false
    },
    {
      strength: '4mg',
      title: 'Nicotex 4mg Gum',
      subtitle: 'For Heavy Smokers',
      description: 'Ideal for those who smoke 20+ cigarettes per day or smoke within 30 minutes of waking',
      features: [
        'Maximum strength formula',
        'Sugar-free formulation',
        'Multiple flavors available',
        'Fast-acting relief',
        '12-week program'
      ],
      price: '$34.99',
      originalPrice: '$44.99',
      image: '4mg',
      recommended: true
    }
  ];

  const flavors = [
    { name: 'Original', color: 'bg-gray-200' },
    { name: 'Mint', color: 'bg-green-200' },
    { name: 'Fruit', color: 'bg-orange-200' },
    { name: 'Cinnamon', color: 'bg-red-200' }
  ];

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Nicotex Solution
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the right strength based on your smoking habits for the most effective quit journey.
          </p>
        </div>

        {/* Strength Selector */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-lg">
            {['2mg', '4mg'].map((strength) => (
              <button
                key={strength}
                onClick={() => setSelectedStrength(strength)}
                className={`px-6 py-3 rounded-md font-semibold transition-all ${
                  selectedStrength === strength
                    ? 'bg-nicotex-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {strength} Strength
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden ${
                product.recommended ? 'ring-4 ring-nicotex-600' : 'border border-gray-200'
              }`}
            >
              {product.recommended && (
                <div className="absolute top-0 left-0 right-0 bg-nicotex-600 text-white text-center py-2 font-semibold">
                  Most Popular Choice
                </div>
              )}

              <div className={`p-8 ${product.recommended ? 'pt-16' : ''}`}>
                {/* Product Image */}
                <div className="text-center mb-8">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-nicotex-400 to-nicotex-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <div className="text-white text-3xl font-bold">{product.image}</div>
                  </div>
                  <div className="flex justify-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">(4.8/5)</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {product.title}
                  </h3>
                  <p className="text-nicotex-600 font-semibold mb-2">
                    {product.subtitle}
                  </p>
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {product.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <span className="text-3xl font-bold text-gray-900">{product.price}</span>
                    <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
                  </div>
                  <p className="text-sm text-gray-600">Per 30-day supply</p>
                </div>

                {/* CTA Button */}
                <button className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center ${
                  product.recommended
                    ? 'bg-nicotex-600 text-white hover:bg-nicotex-700'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Available Flavors */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Available Flavors</h3>
          <div className="flex justify-center space-x-8">
            {flavors.map((flavor, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${flavor.color} rounded-full mx-auto mb-2 shadow-lg`}></div>
                <span className="text-gray-700 font-medium">{flavor.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-16 bg-green-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">30-Day Money-Back Guarantee</h3>
          <p className="text-gray-700 max-w-2xl mx-auto">
            We're so confident in Nicotex that we offer a full refund if you're not satisfied 
            with your results within the first 30 days.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Products;