import React from 'react';
import { Category } from '../../context/ProductContext';

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer p-6 text-center group hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50"
    >
      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
        {category.icon}
      </div>
      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {category.name}
      </h3>
      <p className="text-sm text-gray-600 mb-3">{category.description}</p>
      <div className="text-xs text-gray-500">
        {category.productsCount} מוצרים
      </div>
    </div>
  );
};