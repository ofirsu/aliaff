import React, { useState } from 'react';
import { useProductContext } from '../context/ProductContext';
import { ArrowRight, ShoppingCart, Heart, Share2, Star, Truck, Shield, RefreshCcw } from 'lucide-react';

interface ProductPageProps {
  productId: string;
  onNavigate: (page: string, param?: string) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ productId, onNavigate }) => {
  const { products, categories } = useProductContext();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === productId);
  const category = product ? categories.find(c => c.id === product.category) : null;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">מוצר לא נמצא</h1>
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

  const handleBuyNow = () => {
    // פתיחת הקישור האפילייט בחלון חדש
    window.open(product.affiliateUrl, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ניווט */}
      <div className="flex items-center mb-6 text-sm">
        <button
          onClick={() => onNavigate('home')}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <ArrowRight className="h-4 w-4 ml-1" />
          עמוד הבית
        </button>
        <span className="mx-2 text-gray-500">/</span>
        <button
          onClick={() => onNavigate('category', product.category)}
          className="text-blue-600 hover:text-blue-800"
        >
          {category?.name}
        </button>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* תמונות מוצר */}
          <div>
            <div className="aspect-square bg-gray-100 rounded-xl mb-4 overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* פרטי מוצר */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* דירוג */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="mr-2 text-sm text-gray-600">
                  ({product.rating}) • {product.reviewsCount} ביקורות
                </span>
              </div>

              {/* מחיר */}
              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-blue-600">₪{product.price}</span>
                {product.originalPrice && (
                  <span className="mr-3 text-lg text-gray-500 line-through">₪{product.originalPrice}</span>
                )}
                {product.discount && (
                  <span className="mr-3 bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                    -{product.discount}%
                  </span>
                )}
              </div>
            </div>

            {/* תיאור */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">תיאור המוצר</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* יתרונות */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center text-green-700 bg-green-50 p-3 rounded-lg">
                <Truck className="h-5 w-5 ml-2" />
                <span className="text-sm font-medium">משלוח מהיר</span>
              </div>
              <div className="flex items-center text-blue-700 bg-blue-50 p-3 rounded-lg">
                <Shield className="h-5 w-5 ml-2" />
                <span className="text-sm font-medium">אחריות מלאה</span>
              </div>
              <div className="flex items-center text-purple-700 bg-purple-50 p-3 rounded-lg">
                <RefreshCcw className="h-5 w-5 ml-2" />
                <span className="text-sm font-medium">החלפה קלה</span>
              </div>
            </div>

            {/* פעולות */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  {product.inStock ? '✅ במלאי' : '❌ אזל מהמלאי'}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart className="h-5 w-5 ml-2" />
                  קנה עכשיו ב-AliExpress
                </button>
                <button className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
                <button className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                * לחיצה על "קנה עכשיו" תעביר אותך לאתר AliExpress לביצוע הרכישה
              </div>
            </div>
          </div>
        </div>

        {/* מפרט טכני */}
        {product.specifications && (
          <div className="border-t border-gray-200 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">מפרט טכני</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">{key}:</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};