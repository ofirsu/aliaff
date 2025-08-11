import React from 'react';
import { ProductCard } from '../components/products/ProductCard';
import { CategoryCard } from '../components/categories/CategoryCard';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { useProductContext } from '../context/ProductContext';

interface HomePageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { products, categories } = useProductContext();
  
  const featuredProducts = products.filter(product => product.isFeatured).slice(0, 8);
  const popularCategories = categories.slice(0, 6);

  return (
    <div className="min-h-screen">
      <HeroSection onNavigate={onNavigate} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* קטגוריות פופולריות */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            קטגוריות פופולריות
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {popularCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => onNavigate('category', category.id)}
              />
            ))}
          </div>
        </section>

        {/* מוצרים מובלטים */}
        <FeaturedProducts products={featuredProducts} onNavigate={onNavigate} />

        {/* סטטיסטיקות */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">מוצרים פעילים</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-blue-100">קטגוריות</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">5000+</div>
              <div className="text-blue-100">לקוחות מרוצים</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">תמיכה</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};