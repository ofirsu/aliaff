import React from 'react';
import { ShoppingBag, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* לוגו ותיאור */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <ShoppingBag className="h-8 w-8 text-blue-400 ml-2" />
              <span className="text-xl font-bold">עולם המוצרים</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              מערכת האפילייט המובילה למוצרי AliExpress בישראל. אנו מביאים לכם את המוצרים הטובים ביותר 
              במחירים הכי טובים, עם תרגום לעברית וממשק ידידותי למשתמש.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <div className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 ml-2" />
                support@worldproducts.co.il
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 ml-2" />
                03-1234567
              </div>
            </div>
          </div>

          {/* קישורים מהירים */}
          <div>
            <h3 className="text-lg font-semibold mb-4">קישורים מהירים</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">עמוד הבית</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">קטגוריות</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">מוצרים פופולריים</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">הצעות מיוחדות</a></li>
            </ul>
          </div>

          {/* מידע */}
          <div>
            <h3 className="text-lg font-semibold mb-4">מידע</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">אודותינו</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">תנאי שימוש</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">מדיניות פרטיות</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">צור קשר</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 עולם המוצרים. כל הזכויות שמורות. | מופעל על ידי Vite + React
          </p>
        </div>
      </div>
    </footer>
  );
};