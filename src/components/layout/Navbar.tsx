import React, { useState } from 'react';
import { Search, Menu, X, ShoppingBag, Settings } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string, param?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'electronics', name: 'אלקטרוניקה', icon: '📱' },
    { id: 'fashion', name: 'אופנה', icon: '👕' },
    { id: 'home', name: 'בית וגן', icon: '🏠' },
    { id: 'sports', name: 'ספורט', icon: '⚽' },
    { id: 'beauty', name: 'יופי ובריאות', icon: '💄' },
    { id: 'toys', name: 'צעצועים', icon: '🧸' }
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* לוגו */}
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <ShoppingBag className="h-8 w-8 text-blue-600 ml-2" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              עולם המוצרים
            </span>
          </div>

          {/* חיפוש - דסקטופ */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="חפש מוצרים..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-4 pl-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* כפתורי ניווט */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <button
              onClick={() => onNavigate('admin-login')}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <Settings className="h-5 w-5 ml-1" />
              ניהול
            </button>
          </div>

          {/* כפתור תפריט מובייל */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* קטגוריות - דסקטופ */}
        <div className="hidden md:flex items-center justify-center py-3 border-t border-gray-100">
          <div className="flex space-x-8 space-x-reverse">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onNavigate('category', category.id)}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                <span className="ml-2 text-lg">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* תפריט מובייל */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-3">
            {/* חיפוש מובייל */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="חפש מוצרים..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-4 pl-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {/* קטגוריות מובייל */}
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    onNavigate('category', category.id);
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center px-3 py-3 text-right text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <span className="ml-3 text-lg">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4">
              <button
                onClick={() => {
                  onNavigate('admin-login');
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center px-3 py-3 text-right text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <Settings className="h-5 w-5 ml-3" />
                ניהול האתר
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};