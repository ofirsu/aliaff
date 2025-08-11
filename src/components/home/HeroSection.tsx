import React from 'react';
import { ShoppingBag, TrendingUp, Zap } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: string, param?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 overflow-hidden">
      {/* רקע דקורטיבי */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="absolute top-0 right-0 -mr-40 -mt-40">
        <div className="w-80 h-80 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20">
        <div className="w-60 h-60 bg-gradient-to-tr from-green-400 to-blue-400 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center text-white">
          <div className="mb-8">
            <div className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Zap className="h-4 w-4 ml-2 text-yellow-400" />
              מוצרים חדשים מתווספים יומית
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            עולם המוצרים
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            גלה אלפי מוצרים איכותיים מ-AliExpress עם תרגום לעברית, 
            מחירים מעולים ומשלוח מהיר ישירות אליך
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => onNavigate('category', 'electronics')}
              className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center"
            >
              <ShoppingBag className="h-5 w-5 ml-2" />
              התחל לקנות עכשיו
            </button>
            <button
              onClick={() => onNavigate('category', 'electronics')}
              className="border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200 backdrop-blur-sm flex items-center"
            >
              <TrendingUp className="h-5 w-5 ml-2" />
              מוצרים פופולריים
            </button>
          </div>

          {/* סטטיסטיקות */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div>
              <div className="text-3xl font-bold mb-2">1000+</div>
              <div className="text-blue-100 text-sm">מוצרים</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-blue-100 text-sm">קטגוריות</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">5000+</div>
              <div className="text-blue-100 text-sm">לקוחות</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};