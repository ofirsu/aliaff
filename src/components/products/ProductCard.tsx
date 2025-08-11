import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../../context/ProductContext';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            -{product.discount}%
          </div>
        )}
        {product.isFeatured && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            מובלט
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="mr-2 text-sm text-gray-600">({product.reviewsCount})</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-lg font-bold text-blue-600">₪{product.price}</span>
            {product.originalPrice && (
              <span className="mr-2 text-sm text-gray-500 line-through">₪{product.originalPrice}</span>
            )}
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${
            product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {product.inStock ? 'במלאי' : 'אזל'}
          </span>
        </div>
        
        <button 
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center font-medium"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <ShoppingCart className="h-4 w-4 ml-2" />
          צפה במוצר
        </button>
      </div>
    </div>
  );
};