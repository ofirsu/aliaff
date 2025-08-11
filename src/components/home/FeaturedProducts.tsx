import React from 'react';
import { ProductCard } from '../products/ProductCard';
import { Product } from '../../context/ProductContext';
import { Star, ArrowLeft } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
  onNavigate: (page: string, param?: string) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products, onNavigate }) => {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Star className="h-8 w-8 text-yellow-500 fill-current ml-3" />
          <h2 className="text-3xl font-bold text-gray-900">מוצרים מובלטים</h2>
        </div>
        <button
          onClick={() => onNavigate('category', 'electronics')}
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center group"
        >
          צפה בכל המוצרים
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => onNavigate('product', product.id)}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <div className="text-6xl mb-4">🌟</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">בקרוב יתווספו מוצרים מובלטים</h3>
          <p className="text-gray-600">אנו עובדים על הוספת המוצרים הטובים ביותר עבורכם</p>
        </div>
      )}
    </section>
  );
};