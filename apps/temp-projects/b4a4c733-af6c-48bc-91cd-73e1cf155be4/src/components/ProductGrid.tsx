import React, { useState } from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useCart, Product } from '../context/CartContext';

const products: Product[] = [
  {
    id: 1,
    name: 'Classic Wooden Comb',
    price: 24.99,
    image: 'bg-gradient-to-br from-amber-100 to-amber-200',
    category: 'Wooden',
    material: 'Sandalwood',
    description: 'Handcrafted sandalwood comb with smooth finish'
  },
  {
    id: 2,
    name: 'Professional Steel Comb',
    price: 18.99,
    image: 'bg-gradient-to-br from-gray-100 to-gray-300',
    category: 'Metal',
    material: 'Stainless Steel',
    description: 'Precision-cut steel comb for professional styling'
  },
  {
    id: 3,
    name: 'Pocket Travel Comb',
    price: 12.99,
    image: 'bg-gradient-to-br from-blue-100 to-blue-200',
    category: 'Pocket',
    material: 'Carbon Fiber',
    description: 'Lightweight and compact for on-the-go styling'
  },
  {
    id: 4,
    name: 'Wide Tooth Detangler',
    price: 16.99,
    image: 'bg-gradient-to-br from-green-100 to-green-200',
    category: 'Wide Tooth',
    material: 'Bamboo',
    description: 'Gentle detangling for curly and thick hair'
  },
  {
    id: 5,
    name: 'Vintage Horn Comb',
    price: 45.99,
    image: 'bg-gradient-to-br from-yellow-100 to-yellow-200',
    category: 'Premium',
    material: 'Buffalo Horn',
    description: 'Luxurious horn comb with anti-static properties'
  },
  {
    id: 6,
    name: 'Fine Tooth Precision',
    price: 21.99,
    image: 'bg-gradient-to-br from-purple-100 to-purple-200',
    category: 'Metal',
    material: 'Titanium',
    description: 'Ultra-fine teeth for precise styling and parting'
  },
  {
    id: 7,
    name: 'Beard Grooming Comb',
    price: 19.99,
    image: 'bg-gradient-to-br from-red-100 to-red-200',
    category: 'Specialty',
    material: 'Pearwood',
    description: 'Specially designed for beard grooming and maintenance'
  },
  {
    id: 8,
    name: 'Double-Sided Styling',
    price: 28.99,
    image: 'bg-gradient-to-br from-pink-100 to-pink-200',
    category: 'Professional',
    material: 'Acetate',
    description: 'Dual-density teeth for versatile styling options'
  }
];

const ProductGrid: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [favorites, setFavorites] = useState<number[]>([]);
  const { addItem } = useCart();

  const categories = ['All', 'Wooden', 'Metal', 'Pocket', 'Wide Tooth', 'Premium', 'Specialty', 'Professional'];
  
  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(product => product.category === filter);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  return (
    <section id="products" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover our handpicked selection of premium combs, each crafted with attention to detail and quality.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Product Image */}
              <div className={`${product.image} h-48 relative overflow-hidden`}>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      favorites.includes(product.id) 
                        ? 'text-red-500 fill-current' 
                        : 'text-gray-400'
                    }`} 
                  />
                </button>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">(4.8)</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-primary-500 hover:bg-primary-600 text-white p-2 rounded-lg transition-colors duration-200 group"
                  >
                    <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;