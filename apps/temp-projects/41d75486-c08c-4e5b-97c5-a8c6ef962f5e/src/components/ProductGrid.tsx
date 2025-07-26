import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart, Product } from '../context/CartContext';

const ProductGrid: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'straight', name: 'Straight' },
    { id: 'wavy', name: 'Wavy' },
    { id: 'curly', name: 'Curly' },
    { id: 'clip-in', name: 'Clip-In' },
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'Silky Straight Extensions',
      price: 299,
      image: 'straight-hair',
      length: '22 inches',
      texture: 'Straight',
      color: 'Natural Black',
    },
    {
      id: '2',
      name: 'Beach Wave Extensions',
      price: 349,
      image: 'wavy-hair',
      length: '20 inches',
      texture: 'Wavy',
      color: 'Honey Blonde',
    },
    {
      id: '3',
      name: 'Bouncy Curls Extensions',
      price: 399,
      image: 'curly-hair',
      length: '18 inches',
      texture: 'Curly',
      color: 'Chocolate Brown',
    },
    {
      id: '4',
      name: 'Clip-In Straight Set',
      price: 199,
      image: 'clip-straight',
      length: '16 inches',
      texture: 'Straight',
      color: 'Platinum Blonde',
    },
    {
      id: '5',
      name: 'Natural Wave Bundle',
      price: 279,
      image: 'natural-wave',
      length: '24 inches',
      texture: 'Wavy',
      color: 'Auburn',
    },
    {
      id: '6',
      name: 'Kinky Curly Extensions',
      price: 429,
      image: 'kinky-curly',
      length: '20 inches',
      texture: 'Curly',
      color: 'Natural Black',
    },
    {
      id: '7',
      name: 'Body Wave Extensions',
      price: 319,
      image: 'body-wave',
      length: '22 inches',
      texture: 'Wavy',
      color: 'Dark Brown',
    },
    {
      id: '8',
      name: 'Clip-In Curly Set',
      price: 249,
      image: 'clip-curly',
      length: '18 inches',
      texture: 'Curly',
      color: 'Caramel Highlights',
    },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => 
        product.texture.toLowerCase().includes(selectedCategory) ||
        product.name.toLowerCase().includes(selectedCategory)
      );

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const ProductImage: React.FC<{ product: Product }> = ({ product }) => (
    <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg overflow-hidden">
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-primary/30 rounded-full mx-auto mb-2 flex items-center justify-center">
            <div className="w-10 h-10 bg-primary rounded-full"></div>
          </div>
          <p className="text-xs text-muted-foreground">{product.texture}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section id="products" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Premium Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our range of high-quality hair extensions, crafted from 100% human hair
            for the most natural look and feel.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image */}
              <div className="relative">
                <ProductImage product={product} />
                
                {/* Overlay Actions */}
                <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-300 ${
                  hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                    <Eye className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                {/* Sale Badge */}
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                  Premium
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">(4.9)</span>
                </div>

                <div className="space-y-1 mb-4">
                  <p className="text-sm text-muted-foreground">Length: {product.length}</p>
                  <p className="text-sm text-muted-foreground">Color: {product.color}</p>
                  <p className="text-sm text-muted-foreground">Texture: {product.texture}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">${product.price}</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-primary text-primary-foreground p-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-medium hover:bg-accent transition-colors">
            Load More Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;