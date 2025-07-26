import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../data/products';
import { Filter } from 'lucide-react';

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLength, setSelectedLength] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('name');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', ...Array.from(new Set(mockProducts.map(p => p.category)))];
  const lengths = ['All', ...Array.from(new Set(mockProducts.map(p => p.length)))];
  const colors = ['All', ...Array.from(new Set(mockProducts.map(p => p.color)))];

  const filteredProducts = mockProducts
    .filter(product => {
      return (
        (selectedCategory === 'All' || product.category === selectedCategory) &&
        (selectedLength === 'All' || product.length === selectedLength) &&
        (selectedColor === 'All' || product.color === selectedColor)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-lg text-gray-600">
            Discover our complete collection of premium hair extensions
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-2 hover:bg-gray-100 rounded-md"
                >
                  <Filter className="h-5 w-5" />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Category Filter */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="text-primary focus:ring-primary"
                        />
                        <span className="ml-2 text-sm text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Length Filter */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Length</h4>
                  <div className="space-y-2">
                    {lengths.map(length => (
                      <label key={length} className="flex items-center">
                        <input
                          type="radio"
                          name="length"
                          value={length}
                          checked={selectedLength === length}
                          onChange={(e) => setSelectedLength(e.target.value)}
                          className="text-primary focus:ring-primary"
                        />
                        <span className="ml-2 text-sm text-gray-700">{length}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Color</h4>
                  <div className="space-y-2">
                    {colors.map(color => (
                      <label key={color} className="flex items-center">
                        <input
                          type="radio"
                          name="color"
                          value={color}
                          checked={selectedColor === color}
                          onChange={(e) => setSelectedColor(e.target.value)}
                          className="text-primary focus:ring-primary"
                        />
                        <span className="ml-2 text-sm text-gray-700">{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and Results */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} products
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedLength('All');
                    setSelectedColor('All');
                  }}
                  className="btn btn-primary mt-4"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;