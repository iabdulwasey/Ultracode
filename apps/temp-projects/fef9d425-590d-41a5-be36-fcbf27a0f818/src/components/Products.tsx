import React, { useState } from 'react';
import { Star, Check, ShoppingCart, Info } from 'lucide-react';

const Products = () => {
  const [selectedStrength, setSelectedStrength] = useState('2mg');

  const products = [
    {
      id: '2mg',
      name: 'Nicotex 2mg',
      strength: '2mg',
      description: 'Perfect for light to moderate smokers (less than 25 cigarettes per day)',
      price: '$24.99',
      originalPrice: '$29.99',
      rating: 4.8,
      reviews: 1247,
      features: [
        'Sugar-free formula',
        'Fresh mint flavor',
        'Coated for better taste',
        '30 pieces per pack',
        'Gradual nicotine release'
      ],
      bestFor: 'Light smokers (10-24 cigarettes/day)',
      image: 'bg-gradient-to-br from-green-100 to-green-200'
    },
    {
      id: '4mg',
      name: 'Nicotex 4mg',
      strength: '4mg',
      description: 'Ideal for heavy smokers (25 or more cigarettes per day)',
      price: '$27.99',
      originalPrice: '$32.99',
      rating: 4.9,
      reviews: 2156,
      features: [
        'Maximum strength formula',
        'Cool mint flavor',
        'Extended relief',
        '30 pieces per pack',
        'Fast-acting formula'
      ],
      bestFor: 'Heavy smokers (25+ cigarettes/day)',
      image: 'bg-gradient-to-br from-blue-100 to-blue-200',
      popular: true
    }
  ];

  const selectedProduct = products.find(p => p.id === selectedStrength) || products[0];

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Nicotex Strength
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the right nicotine strength based on your current smoking habits. 
            Our products are designed to provide effective craving relief while you quit.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Strength Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-2 shadow-lg">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedStrength(product.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors relative ${
                    selectedStrength === product.id
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {product.strength}
                  {product.popular && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Display */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Product Image */}
              <div className={`${selectedProduct.image} p-12 flex items-center justify-center relative`}>
                {selectedProduct.popular && (
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-6 hover:rotate-0 transition-transform">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">NICOTEX</div>
                    <div className="text-xl font-semibold text-gray-800">{selectedProduct.strength}</div>
                    <div className="text-sm text-gray-600 mt-2">Nicotine Gum</div>
                    <div className="text-xs text-gray-500 mt-1">30 Pieces</div>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h3>
                  <div className="ml-4 flex items-center">
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(selectedProduct.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{selectedProduct.description}</p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center mb-2">
                    <Info className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-semibold text-blue-800">Best For:</span>
                  </div>
                  <p className="text-blue-700">{selectedProduct.bestFor}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {selectedProduct.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-primary">{selectedProduct.price}</span>
                    <span className="text-lg text-gray-500 line-through ml-2">{selectedProduct.originalPrice}</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold ml-2">
                      Save $5
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </button>
                  <button className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
                    Find in Store
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    Free shipping on orders over $35 • 30-day money-back guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">FDA Approved</h4>
              <p className="text-gray-600 text-sm">
                Clinically tested and approved by the FDA as a safe smoking cessation aid.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Doctor Recommended</h4>
              <p className="text-gray-600 text-sm">
                Trusted by healthcare professionals and recommended by doctors worldwide.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Money-Back Guarantee</h4>
              <p className="text-gray-600 text-sm">
                Not satisfied? Get a full refund within 30 days of purchase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;