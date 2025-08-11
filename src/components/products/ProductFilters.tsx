import React from 'react';
import { Filter, X } from 'lucide-react';

interface Filters {
  sortBy: string;
  priceRange: [number, number];
  inStock: boolean;
}

interface ProductFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  productsCount: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({ 
  filters, 
  onFiltersChange, 
  productsCount 
}) => {
  const handleSortChange = (sortBy: string) => {
    onFiltersChange({ ...filters, sortBy });
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    onFiltersChange({ ...filters, priceRange: range });
  };

  const handleStockChange = (inStock: boolean) => {
    onFiltersChange({ ...filters, inStock });
  };

  const clearFilters = () => {
    onFiltersChange({
      sortBy: 'popularity',
      priceRange: [0, 1000],
      inStock: true
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 lg:mb-0 lg:sticky lg:top-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="h-5 w-5 ml-2" />
          מסננים
        </h3>
        <button
          onClick={clearFilters}
          className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
        >
          <X className="h-4 w-4 ml-1" />
          נקה הכל
        </button>
      </div>

      <div className="space-y-6">
        {/* מיון */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            מיון לפי:
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="popularity">פופולריות</option>
            <option value="price-low">מחיר: נמוך לגבוה</option>
            <option value="price-high">מחיר: גבוה לנמוך</option>
            <option value="rating">דירוג הגבוה ביותר</option>
            <option value="newest">החדש ביותר</option>
          </select>
        </div>

        {/* טווח מחירים */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            טווח מחירים (₪):
          </label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 space-x-reverse">
              <input
                type="number"
                placeholder="מ-"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange([parseInt(e.target.value) || 0, filters.priceRange[1]])}
                className="w-full p-2 border border-gray-300 rounded-lg text-center"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="עד"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange([filters.priceRange[0], parseInt(e.target.value) || 1000])}
                className="w-full p-2 border border-gray-300 rounded-lg text-center"
              />
            </div>
          </div>
        </div>

        {/* זמינות */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => handleStockChange(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="mr-2 text-sm text-gray-700">רק מוצרים במלאי</span>
          </label>
        </div>

        {/* תוצאות */}
        <div className="pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            {productsCount} מוצרים נמצאו
          </div>
        </div>
      </div>
    </div>
  );
};