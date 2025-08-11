import React, { useState } from 'react';
import { useProductContext, Category } from '../../context/ProductContext';
import { Plus, Search, Edit3, Trash2, Layers, X } from 'lucide-react';

export const CategoryManagement: React.FC = () => {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useProductContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // חישוב מספר המוצרים בכל קטגוריה
  const getCategoryProductCount = (categoryId: string) => {
    return products.filter(product => product.category === categoryId).length;
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
  };

  const handleDelete = (categoryId: string) => {
    const productCount = getCategoryProductCount(categoryId);
    if (productCount > 0) {
      alert(`לא ניתן למחוק קטגוריה שמכילה ${productCount} מוצרים. נא להעביר את המוצרים לקטגוריה אחרת תחילה.`);
      return;
    }
    
    if (confirm('האם אתה בטוח שברצונך למחוק את הקטגוריה?')) {
      deleteCategory(categoryId);
    }
  };

  return (
    <div className="space-y-6">
      {/* כותרת וכפתור הוספה */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">ניהול קטגוריות</h2>
          <p className="text-gray-600">נהל את כל הקטגוריות באתר</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center shadow-lg"
        >
          <Plus className="h-5 w-5 ml-2" />
          הוסף קטגוריה חדשה
        </button>
      </div>

      {/* סטטיסטיקות */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">סה״כ קטגוריות</p>
              <p className="text-3xl font-bold">{categories.length}</p>
            </div>
            <Layers className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">קטגוריות פעילות</p>
              <p className="text-3xl font-bold">{categories.filter(c => c.isActive).length}</p>
            </div>
            <Layers className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">ממוצע מוצרים לקטגוריה</p>
              <p className="text-3xl font-bold">
                {Math.round(products.length / categories.length) || 0}
              </p>
            </div>
            <Layers className="h-8 w-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* חיפוש */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="relative max-w-md">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="חפש קטגוריות..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mt-2 text-sm text-gray-600">
          {filteredCategories.length} קטגוריות נמצאו
        </div>
      </div>

      {/* רשימת קטגוריות */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => {
          const productCount = getCategoryProductCount(category.id);
          return (
            <div key={category.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{category.icon}</div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button
                      onClick={() => handleEdit(category)}
                      className="text-blue-600 hover:text-blue-800 p-1 rounded"
                      title="עריכה"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-800 p-1 rounded"
                      title="מחיקה"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{category.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {productCount} מוצרים
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    category.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {category.isActive ? 'פעילה' : 'לא פעילה'}
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    נוצר: {category.createdAt}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <Layers className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">אין קטגוריות</h3>
          <p className="text-gray-500">לא נמצאו קטגוריות התואמות לחיפוש</p>
        </div>
      )}

      {/* מודל הוספת קטגוריה */}
      <CategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={(categoryData) => {
          addCategory(categoryData);
          setIsAddModalOpen(false);
        }}
        title="הוסף קטגוריה חדשה"
      />

      {/* מודל עריכת קטגוריה */}
      {editingCategory && (
        <CategoryModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingCategory(null);
          }}
          onSubmit={(categoryData) => {
            updateCategory(editingCategory.id, categoryData);
            setIsEditModalOpen(false);
            setEditingCategory(null);
          }}
          title="ערוך קטגוריה"
          initialData={editingCategory}
        />
      )}
    </div>
  );
};

// רכיב מודל להוספה/עריכה של קטגוריה
interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  title: string;
  initialData?: Category;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title, 
  initialData 
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    icon: initialData?.icon || '📦',
    isActive: initialData?.isActive ?? true,
    parentId: initialData?.parentId || ''
  });

  const popularIcons = ['📱', '👕', '🏠', '⚽', '💄', '🧸', '📚', '🎮', '🍕', '🚗', '💻', '🎵', '🌟', '💎', '🛍️', '🏆'];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">שם הקטגוריה</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">אייקון הקטגוריה</label>
            <div className="grid grid-cols-8 gap-2 mb-3">
              {popularIcons.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, icon }))}
                  className={`p-2 text-2xl rounded-lg border-2 hover:bg-gray-50 ${
                    formData.icon === icon ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
              placeholder="או הקלד אייקון מותאם אישית"
              className="w-full p-2 border border-gray-300 rounded-lg text-center text-xl"
            />
          </div>

          <div className="flex items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="mr-2 text-sm text-gray-700">קטגוריה פעילה</span>
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
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
            >
              {initialData ? 'עדכן קטגוריה' : 'הוסף קטגוריה'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};