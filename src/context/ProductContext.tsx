import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  isFeatured: boolean;
  affiliateUrl: string;
  specifications?: Record<string, string>;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  parentId?: string;
  isActive: boolean;
  productsCount: number;
  createdAt: string;
}

interface ProductContextType {
  products: Product[];
  categories: Category[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Omit<Category, 'id' | 'createdAt' | 'productsCount'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// נתוני דמו
const demoProducts: Product[] = [
  {
    id: '1',
    name: 'אוזניות בלוטוס איכותיות',
    description: 'אוזניות בלוטוס עם ביטול רעש אקטיבי, איכות צליל מעולה ובטרייה שמחזיקה עד 30 שעות',
    price: 299,
    originalPrice: 399,
    discount: 25,
    images: [
      'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: 'electronics',
    rating: 4.8,
    reviewsCount: 1247,
    inStock: true,
    isFeatured: true,
    affiliateUrl: 'https://aliexpress.com/item/example1',
    specifications: {
      'טכנולוגיית החיבור': 'Bluetooth 5.0',
      'זמן פעולה': '30 שעות',
      'ביטול רעש': 'ANC פעיל',
      'משקל': '250 גרם'
    },
    tags: ['אוזניות', 'בלוטוס', 'ביטול רעש'],
    createdAt: '2025-01-10',
    updatedAt: '2025-01-10'
  },
  {
    id: '2',
    name: 'שעון חכם ספורטיבי',
    description: 'שעון חכם עם מסך AMOLED, מעקב אחר בריאות, GPS מובנה ועמידות במים IPX8',
    price: 450,
    originalPrice: 599,
    discount: 25,
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: 'electronics',
    rating: 4.6,
    reviewsCount: 892,
    inStock: true,
    isFeatured: true,
    affiliateUrl: 'https://aliexpress.com/item/example2',
    specifications: {
      'גודל מסך': '1.4 אינץ׳',
      'עמידות במים': 'IPX8',
      'זמן פעולה': '7 ימים',
      'GPS': 'כן'
    },
    tags: ['שעון חכם', 'ספורט', 'בריאות'],
    createdAt: '2025-01-09',
    updatedAt: '2025-01-09'
  },
  {
    id: '3',
    name: 'תיק גב למחשב נייד',
    description: 'תיק גב איכותי למחשבים ניידים עד 15.6 אינץ׳, עם תאים מרובים וחומר עמיד למים',
    price: 129,
    images: [
      'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: 'accessories',
    rating: 4.4,
    reviewsCount: 456,
    inStock: true,
    isFeatured: false,
    affiliateUrl: 'https://aliexpress.com/item/example3',
    tags: ['תיק', 'מחשב נייד', 'נסיעות'],
    createdAt: '2025-01-08',
    updatedAt: '2025-01-08'
  }
];

const demoCategories: Category[] = [
  {
    id: 'electronics',
    name: 'אלקטרוניקה',
    description: 'מוצרי אלקטרוניקה מתקדמים',
    icon: '📱',
    isActive: true,
    productsCount: 234,
    createdAt: '2025-01-01'
  },
  {
    id: 'fashion',
    name: 'אופנה',
    description: 'בגדים ואקססוריז אופנתיים',
    icon: '👕',
    isActive: true,
    productsCount: 567,
    createdAt: '2025-01-01'
  },
  {
    id: 'home',
    name: 'בית וגן',
    description: 'מוצרים לבית ולגינה',
    icon: '🏠',
    isActive: true,
    productsCount: 345,
    createdAt: '2025-01-01'
  },
  {
    id: 'sports',
    name: 'ספורט',
    description: 'ציוד ומוצרי ספורט',
    icon: '⚽',
    isActive: true,
    productsCount: 189,
    createdAt: '2025-01-01'
  },
  {
    id: 'beauty',
    name: 'יופי ובריאות',
    description: 'מוצרי יופי ובריאות',
    icon: '💄',
    isActive: true,
    productsCount: 278,
    createdAt: '2025-01-01'
  },
  {
    id: 'toys',
    name: 'צעצועים',
    description: 'צעצועים וחוגים לילדים',
    icon: '🧸',
    isActive: true,
    productsCount: 123,
    createdAt: '2025-01-01'
  }
];

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(demoProducts);
  const [categories, setCategories] = useState<Category[]>(demoCategories);

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id 
        ? { ...product, ...updates, updatedAt: new Date().toISOString().split('T')[0] }
        : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const addCategory = (categoryData: Omit<Category, 'id' | 'createdAt' | 'productsCount'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      productsCount: 0
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev => prev.map(category => 
      category.id === id ? { ...category, ...updates } : category
    ));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(category => category.id !== id));
  };

  return (
    <ProductContext.Provider value={{
      products,
      categories,
      addProduct,
      updateProduct,
      deleteProduct,
      addCategory,
      updateCategory,
      deleteCategory
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};