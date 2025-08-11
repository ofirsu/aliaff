import React, { useState } from 'react';
import { useProductContext, Product } from '../../context/ProductContext';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  Star,
  Package,
  Filter,
  X
} from 'lucide-react';

export const ProductManagement: React.FC = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useProductContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDelete = (productId: string) => {
    if (confirm('האם אתה בטוח שברצונך למחוק את המוצר?')) {
      deleteProduct(productId);
    }
  };

  return (
    <div className="space-y-6">
      {/* כותרת וכפתור הוספה */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">ניהול מוצרים</h2>
          <p className="text-gray-600">נהל את כל המוצרים באתר</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center shadow-lg"
        >
          <Plus className="h-5 w-5 ml-2" />
          הוסף מוצר חדש
        </button>
      </div>

      {/* סינון וחיפוש */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="חפש מוצרים..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">כל הקטגוריות</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {filteredProducts.length} מוצרים נמצאו
            </div>
            <button className="flex items-center text-blue-600 hover:text-blue-800">
              <Filter className="h-4 w-4 ml-1" />
              מסננים נוספים
            </button>
          </div>
        </div>
      </div>

      {/* רשימת מוצרים */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">מוצר</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">קטגוריה</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">מחיר</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">דירוג</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">סטטוס</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">פעולות</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => {
                const category = categories.find(c => c.id === product.category);
                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg ml-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {product.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {category?.icon} {category?.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="font-bold">₪{product.price}</div>
                      {product.originalPrice && (
                        <div className="text-xs text-gray-500 line-through">₪{product.originalPrice}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current ml-1" />
                        <span className="text-sm text-gray-900">{product.rating}</span>
                        <span className="text-xs text-gray-500 mr-1">({product.reviewsCount})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.inStock ? 'במלאי' : 'אזל'}
                        </span>
                        {product.isFeatured && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            מובלט
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          title="עריכה"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="מחיקה"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => window.open(product.affiliateUrl, '_blank')}
                          className="text-green-600 hover:text-green-900 p-1 rounded"
                          title="צפייה באתר"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">אין מוצרים</h3>
            <p className="text-gray-500">לא נמצאו מוצרים התואמים לחיפוש</p>
          </div>
        )}
      </div>

      {/* מודל הוספת מוצר */}
      <ProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={(productData) => {
          addProduct(productData);
          setIsAddModalOpen(false);
        }}
        categories={categories}
        title="הוסף מוצר חדש"
      />

      {/* מודל עריכת מוצר */}
      {editingProduct && (
        <ProductModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingProduct(null);
          }}
          onSubmit={(productData) => {
            updateProduct(editingProduct.id, productData);
            setIsEditModalOpen(false);
            setEditingProduct(null);
          }}
          categories={categories}
          title="ערוך מוצר"
          initialData={editingProduct}
        />
      )}
    </div>
  );
};

// רכיב מודל להוספה/עריכה של מוצר
interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  categories: any[];
  title: string;
  initialData?: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  categories, 
  title, 
  initialData 
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    originalPrice: initialData?.originalPrice || 0,
    category: initialData?.category || '',
    images: initialData?.images?.join('\n') || '',
    affiliateUrl: initialData?.affiliateUrl || '',
    inStock: initialData?.inStock ?? true,
    isFeatured: initialData?.isFeatured ?? false,
    rating: initialData?.rating || 5.0,
    reviewsCount: initialData?.reviewsCount || 0,
    tags: initialData?.tags?.join(', ') || ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      images: formData.images.split('\n').filter(img => img.trim()),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      discount: formData.originalPrice ? Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100) : undefined
    };
    
    onSubmit(productData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 rounded"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">שם המוצר</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">קטגוריה</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">בחר קטגוריה</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">תיאור</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">מחיר (₪)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">מחיר מקורי (₪)</label>
              <input
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) || 0 }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">תמונות (כתובת אחת בכל שורה)</label>
            <textarea
              value={formData.images}
              onChange={(e) => setFormData(prev => ({ ...prev, images: e.target.value }))}
              rows={3}
              placeholder="https://example.com/image1.jpg"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">קישור אפילייט</label>
            <input
              type="url"
              value={formData.affiliateUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, affiliateUrl: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">תגיות (מופרדות בפסיקים)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="תגית1, תגית2, תגית3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-6 space-x-reverse">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="mr-2 text-sm text-gray-700">במלאי</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="mr-2 text-sm text-gray-700">מוצר מובלט</span>
            </label>
          </div>

          <div className="flex justify-end space-x-3 space-x-reverse pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              ביטול
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              {initialData ? 'עדכן מוצר' : 'הוסף מוצר'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};