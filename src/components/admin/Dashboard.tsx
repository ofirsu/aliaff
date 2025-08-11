import React from 'react';
import { useProductContext } from '../../context/ProductContext';
import { 
  Package, 
  Layers, 
  TrendingUp, 
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
  Star
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { products, categories } = useProductContext();

  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.inStock).length,
    totalCategories: categories.length,
    activeCategories: categories.filter(c => c.isActive).length,
    featuredProducts: products.filter(p => p.isFeatured).length,
    averageRating: products.reduce((acc, p) => acc + p.rating, 0) / products.length || 0
  };

  const recentProducts = products.slice(-5).reverse();
  const topCategories = categories
    .sort((a, b) => b.productsCount - a.productsCount)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* כרטיסי סטטיסטיקה */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">סה״כ מוצרים</p>
              <p className="text-3xl font-bold">{stats.totalProducts}</p>
            </div>
            <Package className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">מוצרים פעילים</p>
              <p className="text-3xl font-bold">{stats.activeProducts}</p>
            </div>
            <ShoppingCart className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">קטגוריות</p>
              <p className="text-3xl font-bold">{stats.totalCategories}</p>
            </div>
            <Layers className="h-8 w-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">דירוג ממוצע</p>
              <p className="text-3xl font-bold">{stats.averageRating.toFixed(1)}</p>
            </div>
            <Star className="h-8 w-8 text-yellow-200" />
          </div>
        </div>
      </div>

      {/* גרפים וטבלאות */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* מוצרים אחרונים */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">מוצרים שנוספו לאחרונה</h3>
          <div className="space-y-4">
            {recentProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg ml-3"
                  />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                    <p className="text-xs text-gray-600">₪{product.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? 'פעיל' : 'לא פעיל'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate('products')}
            className="mt-4 w-full text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            צפה בכל המוצרים
          </button>
        </div>

        {/* קטגוריות מובילות */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">קטגוריות מובילות</h3>
          <div className="space-y-4">
            {topCategories.map((category) => (
              <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="text-2xl ml-3">{category.icon}</div>
                  <div>
                    <p className="font-medium text-gray-900">{category.name}</p>
                    <p className="text-xs text-gray-600">{category.productsCount} מוצרים</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  category.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {category.isActive ? 'פעילה' : 'לא פעילה'}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate('categories')}
            className="mt-4 w-full text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            נהל קטגוריות
          </button>
        </div>
      </div>

      {/* פעולות מהירות */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">פעולות מהירות</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate('products')}
            className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 text-center transition-colors"
          >
            <Package className="h-8 w-8 mx-auto mb-2" />
            <p className="font-medium">הוסף מוצר חדש</p>
          </button>
          <button
            onClick={() => onNavigate('categories')}
            className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 text-center transition-colors"
          >
            <Layers className="h-8 w-8 mx-auto mb-2" />
            <p className="font-medium">נהל קטגוריות</p>
          </button>
          <button
            onClick={() => onNavigate('settings')}
            className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 text-center transition-colors"
          >
            <TrendingUp className="h-8 w-8 mx-auto mb-2" />
            <p className="font-medium">הגדרות מתקדמות</p>
          </button>
        </div>
      </div>
    </div>
  );
};