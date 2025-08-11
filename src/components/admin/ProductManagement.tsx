import React, { useState } from 'react';
import Papa from 'papaparse';
import { useProductContext, Product, Category } from '../../context/ProductContext';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  Star,
  Package,
  Filter,
  X,
  Upload
} from 'lucide-react';

export const ProductManagement: React.FC = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useProductContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [importResults, setImportResults] = useState<{success: number, errors: number}>({success: 0, errors: 0});

  const findCategoryByName = (name: string, availableCategories: Category[]): Category | undefined => {
    return availableCategories.find(c => c.name.toLowerCase() === name.toLowerCase());
  };

  const handleImport = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        let successCount = 0;
        let errorCount = 0;
        results.data.forEach((row: any) => {
          try {
            const category = findCategoryByName(row.category, categories);
            if (!category) {
              console.warn(`Category not found for product: ${row.name}`);
              errorCount++;
              return;
            }

            const productData = {
              name: row.product_name || row.name,
              description: row.description,
              price: parseFloat(row.price),
              originalPrice: row.originalPrice ? parseFloat(row.originalPrice) : undefined,
              images: row.images.split(',').map((s: string) => s.trim()),
              category: category.id,
              affiliateUrl: row.affiliateUrl,
              inStock: row.inStock ? row.inStock.toLowerCase() === 'true' : true,
              isFeatured: row.isFeatured ? row.isFeatured.toLowerCase() === 'true' : false,
              rating: row.rating ? parseFloat(row.rating) : 0,
              reviewsCount: row.reviewsCount ? parseInt(row.reviewsCount) : 0,
              tags: row.tags ? row.tags.split(',').map((s: string) => s.trim()) : [],
            };
            addProduct(productData);
            successCount++;
          } catch (e) {
            console.error('Error processing row:', row, e);
            errorCount++;
          }
        });
        setImportResults({ success: successCount, errors: errorCount });
        setIsImportModalOpen(false);
        // We can show a notification with the results later
      }
    });
  };

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
        <div className="flex items-center space-x-2 space-x-reverse">
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 flex items-center shadow-sm"
          >
            <Upload className="h-5 w-5 ml-2" />
            ייבוא מ-CSV
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center shadow-lg"
          >
            <Plus className="h-5 w-5 ml-2" />
            הוסף מוצר חדש
          </button>
        </div>
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

      <CsvImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImport}
        categories={categories}
      />

      {(importResults.success > 0 || importResults.errors > 0) && (
        <Notification
          type={importResults.errors > 0 ? "error" : "success"}
          message={
            importResults.errors > 0
              ? `ייבוא נכשל עבור ${importResults.errors} מוצרים. ${importResults.success} מוצרים נוספו בהצלחה.`
              : `ייבוא הושלם בהצלחה! ${importResults.success} מוצרים נוספו.`
          }
          onClose={() => setImportResults({ success: 0, errors: 0 })}
        />
      )}
    </div>
  );
};

// רכיב מודל לייבוא מוצרים מ-CSV
interface CsvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => void;
  categories: any[];
}

const CsvImportModal: React.FC<CsvImportModalProps> = ({ isOpen, onClose, onImport, categories }) => {
  const [file, setFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (file) {
      onImport(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">ייבוא מוצרים מ-CSV</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 rounded"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              בחר קובץ CSV
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>העלה קובץ</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".csv" />
                  </label>
                  <p className="pr-1">או גרור ושחרר</p>
                </div>
                <p className="text-xs text-gray-500">
                  קובץ CSV בלבד, עד 10MB
                </p>
              </div>
            </div>
            {file && (
              <div className="mt-4 text-sm text-gray-700">
                <span className="font-medium">קובץ שנבחר:</span> {file.name}
              </div>
            )}
          </div>

          <div className="pt-2">
            <h4 className="text-md font-medium text-gray-800 mb-2">הוראות</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>הקובץ חייב להיות בפורמט CSV.</li>
              <li>העמודה הראשונה צריכה להיות <code className="bg-gray-100 p-1 rounded">product_name</code>.</li>
              <li>יש לוודא שהקטגוריות בקובץ תואמות לקטגוריות הקיימות במערכת.</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end space-x-3 space-x-reverse p-6 bg-gray-50 rounded-b-xl">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ביטול
          </button>
          <button
            type="button"
            onClick={handleImport}
            disabled={!file}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ייבא מוצרים
          </button>
        </div>
      </div>
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

interface NotificationProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ type, message, onClose }) => {
  return (
    <div className={`fixed bottom-5 right-5 p-4 rounded-lg shadow-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

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