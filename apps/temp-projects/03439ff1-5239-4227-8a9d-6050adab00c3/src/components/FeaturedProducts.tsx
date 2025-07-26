import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  emoji: string;
  badge?: string;
}

const FeaturedProducts: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Himalayan Pink Salt",
      description: "Pure, unrefined salt with a delicate flavor and beautiful pink color",
      price: "$12.99",
      originalPrice: "$16.99",
      rating: 4.9,
      reviews: 234,
      emoji: "🧂",
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Garam Masala Blend",
      description: "Authentic Indian spice blend perfect for curries and rice dishes",
      price: "$8.99",
      rating: 4.8,
      reviews: 189,
      emoji: "🌶️"
    },
    {
      id: 3,
      name: "Mediterranean Herbs",
      description: "A fragrant mix of oregano, thyme, rosemary, and basil",
      price: "$10.99",
      rating: 4.7,
      reviews: 156,
      emoji: "🌿",
      badge: "New"
    },
    {
      id: 4,
      name: "Smoked Paprika",
      description: "Rich, smoky flavor that adds depth to any dish",
      price: "$7.99",
      rating: 4.9,
      reviews: 298,
      emoji: "🫑"
    },
    {
      id: 5,
      name: "Vanilla Bean Powder",
      description: "Premium Madagascar vanilla beans ground to perfection",
      price: "$24.99",
      originalPrice: "$29.99",
      rating: 5.0,
      reviews: 87,
      emoji: "🍦",
      badge: "Premium"
    },
    {
      id: 6,
      name: "Chinese Five Spice",
      description: "Traditional blend of star anise, cloves, cinnamon, and more",
      price: "$9.99",
      rating: 4.6,
      reviews: 145,
      emoji: "⭐"
    }
  ];

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most popular spices and seasonings, carefully selected for their exceptional quality and flavor
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              {/* Product Image Area */}
              <div className="relative bg-gradient-to-br from-spice-100 to-spice-200 p-8 text-center">
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      product.badge === 'Best Seller' ? 'bg-spice-600 text-white' :
                      product.badge === 'New' ? 'bg-green-600 text-white' :
                      'bg-purple-600 text-white'
                    }`}>
                      {product.badge}
                    </span>
                  </div>
                )}
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {product.emoji}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-spice-600">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button className="bg-spice-600 hover:bg-spice-700 text-white p-3 rounded-lg transition-colors duration-200 group-hover:scale-105">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="btn-primary text-lg px-8 py-4">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;