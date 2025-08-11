import React, { useState } from 'react';
import { ProductCard } from '../components/products/ProductCard';
import { ProductFilters } from '../components/products/ProductFilters';
import { useProductContext } from '../context/ProductContext';
import { ArrowRight } from 'lucide-react';

interface CategoryPageProps {
  category: string;
  onNavigate: (page: string, param?: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ category, onNavigate }) => {
  const { products, categories } = useProductContext();
  const [filters, setFilters] = useState({
    sortBy: 'popularity',
    priceRange: [0, 1000],
    inStock: true
  });

  const currentCategory = categories.find(cat => cat.id === category);
  const categoryProducts = products.filter(product => product.category === category);

  if (!currentCategory) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">קטגוריה לא נמצאה</h1>
          <button
            onClick={() => onNavigate('home')}
            className="text-blue-600 hover:text-blue-800"
          >
            חזור לעמוד הבית
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ניווט */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => onNavigate('home')}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <ArrowRight className="h-4 w-4 ml-1" />
          עמוד הבית
        </button>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-900 font-medium">{currentCategory.name}</span>
      </div>

      {/* כותרת קטגוריה */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
        <div className="text-center">
          <div className="text-6xl mb-4">{currentCategory.icon}</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{currentCategory.name}</h1>
          <p className="text-lg text-gray-600 mb-6">{currentCategory.description}</p>
          <div className="text-sm text-gray-500">
            {categoryProducts.length} מוצרים נמצאו
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* סינון */}
        <div className="lg:w-1/4">
          <ProductFilters
            filters={filters}
            onFiltersChange={setFilters}
            productsCount={categoryProducts.length}
          />
        </div>

        {/* רשימת מוצרים */}
        <div className="lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => onNavigate('product', product.id)}
              />
            ))}
          </div>

          {categoryProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                אין מוצרים בקטגוריה זו
              </h3>
              <p className="text-gray-600">בקרוב יתווספו מוצרים חדשים</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};