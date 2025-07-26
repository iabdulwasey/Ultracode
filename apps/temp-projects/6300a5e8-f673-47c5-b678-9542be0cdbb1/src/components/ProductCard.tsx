import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../context/CartContext';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square bg-gray-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      {/* Quick actions */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
          <Heart className="h-4 w-4 text-gray-600" />
        </button>
        <button
          onClick={handleAddToCart}
          className="p-2 bg-primary text-white rounded-full shadow-md hover:bg-primary/90 transition-colors"
          disabled={!product.inStock}
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2">{product.length} • {product.color}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">${product.price}</span>
          {!product.inStock && (
            <span className="text-sm text-red-500 font-medium">Out of Stock</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;