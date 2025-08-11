import React, { useState } from 'react';
import { 
  Settings, 
  Globe, 
  Palette, 
  Shield, 
  Zap, 
  Database,
  Mail,
  Smartphone,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export const SettingsManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // הגדרות כלליות
    siteName: 'עולם המוצרים',
    siteDescription: 'מערכת אפילייט מתקדמת למוצרי AliExpress',
    defaultLanguage: 'he',
    currency: 'ILS',
    
    // הגדרות AliExpress API
    aliexpressApiKey: '',
    aliexpressSecretKey: '',
    affiliateId: '',
    
    // הגדרות תרגום
    translationApiKey: '',
    autoTranslate: true,
    targetLanguage: 'he',
    
    // הגדרות עיצוב
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    accentColor: '#F59E0B',
    
    // הגדרות SEO
    metaTitle: 'עולם המוצרים - החנות המקוונת הטובה ביותר',
    metaDescription: 'גלה אלפי מוצרים איכותיים במחירים מעולים',
    googleAnalyticsId: '',
    
    // הגדרות מתקדמות
    cacheEnabled: true,
    autoImport: false,
    maxProductsPerPage: 20,
    enableNotifications: true
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const tabs = [
    { id: 'general', name: 'כללי', icon: Settings },
    { id: 'api', name: 'API הגדרות', icon: Database },
    { id: 'design', name: 'עיצוב', icon: Palette },
    { id: 'seo', name: 'SEO', icon: Globe },
    { id: 'advanced', name: 'מתקדם', icon: Zap }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      // כאן יהיה השמירה בפועל לשרת/דאטאבייס
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveMessage('ההגדרות נשמרו בהצלחה!');
      
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('שגיאה בשמירת ההגדרות');
    } finally {
      setIsSaving(false);
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">שם האתר</label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">מטבע</label>
          <select
            value={settings.currency}
            onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="ILS">שקל ישראלי (₪)</option>
            <option value="USD">דולר אמריקני ($)</option>
            <option value="EUR">יורו (€)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">תיאור האתר</label>
        <textarea
          value={settings.siteDescription}
          onChange={(e) => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">שפת ברירת מחדל</label>
        <select
          value={settings.defaultLanguage}
          onChange={(e) => setSettings(prev => ({ ...prev, defaultLanguage: e.target.value }))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent max-w-xs"
        >
          <option value="he">עברית</option>
          <option value="en">אנגלית</option>
          <option value="ar">ערבית</option>
        </select>
      </div>
    </div>
  );

  const renderApiSettings = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center mb-2">
          <AlertCircle className="h-5 w-5 text-blue-600 ml-2" />
          <h4 className="text-sm font-medium text-blue-900">הגדרת AliExpress API</h4>
        </div>
        <p className="text-sm text-blue-700">
          כדי לייבא מוצרים מ-AliExpress, יש צורך להשיג מפתח API מהפורטל למפתחים של AliExpress.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">מפתח API</label>
          <input
            type="password"
            value={settings.aliexpressApiKey}
            onChange={(e) => setSettings(prev => ({ ...prev, aliexpressApiKey: e.target.value }))}
            placeholder="הזן את מפתח ה-API"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">מפתח סודי</label>
          <input
            type="password"
            value={settings.aliexpressSecretKey}
            onChange={(e) => setSettings(prev => ({ ...prev, aliexpressSecretKey: e.target.value }))}
            placeholder="הזן את המפתח הסודי"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">מזהה שותף (Affiliate ID)</label>
          <input
            type="text"
            value={settings.affiliateId}
            onChange={(e) => setSettings(prev => ({ ...prev, affiliateId: e.target.value }))}
            placeholder="הזן מזהה שותף"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">הגדרות תרגום</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">מפתח API לתרגום</label>
            <input
              type="password"
              value={settings.translationApiKey}
              onChange={(e) => setSettings(prev => ({ ...prev, translationApiKey: e.target.value }))}
              placeholder="Google Translate API Key"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.autoTranslate}
                onChange={(e) => setSettings(prev => ({ ...prev, autoTranslate: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="mr-2 text-sm text-gray-700">תרגום אוטומטי של מוצרים חדשים</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDesignSettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-4">צבעי העיצוב</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">צבע ראשי</label>
            <div className="flex items-center space-x-2 space-x-reverse">
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => setSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                className="h-12 w-12 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={settings.primaryColor}
                onChange={(e) => setSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">צבע משני</label>
            <div className="flex items-center space-x-2 space-x-reverse">
              <input
                type="color"
                value={settings.secondaryColor}
                onChange={(e) => setSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                className="h-12 w-12 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={settings.secondaryColor}
                onChange={(e) => setSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">צבע הדגשה</label>
            <div className="flex items-center space-x-2 space-x-reverse">
              <input
                type="color"
                value={settings.accentColor}
                onChange={(e) => setSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                className="h-12 w-12 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={settings.accentColor}
                onChange={(e) => setSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h5 className="text-sm font-medium text-gray-900 mb-2">תצוגה מקדימה של הצבעים</h5>
        <div className="flex items-center space-x-3 space-x-reverse">
          <div
            className="w-16 h-16 rounded-lg shadow-md flex items-center justify-center text-white font-medium"
            style={{ backgroundColor: settings.primaryColor }}
          >
            ראשי
          </div>
          <div
            className="w-16 h-16 rounded-lg shadow-md flex items-center justify-center text-white font-medium"
            style={{ backgroundColor: settings.secondaryColor }}
          >
            משני
          </div>
          <div
            className="w-16 h-16 rounded-lg shadow-md flex items-center justify-center text-white font-medium"
            style={{ backgroundColor: settings.accentColor }}
          >
            הדגשה
          </div>
        </div>
      </div>
    </div>
  );

  const renderSeoSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">כותרת Meta (Title)</label>
        <input
          type="text"
          value={settings.metaTitle}
          onChange={(e) => setSettings(prev => ({ ...prev, metaTitle: e.target.value }))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          maxLength={60}
        />
        <p className="text-xs text-gray-500 mt-1">{settings.metaTitle.length}/60 תווים</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">תיאור Meta (Description)</label>
        <textarea
          value={settings.metaDescription}
          onChange={(e) => setSettings(prev => ({ ...prev, metaDescription: e.target.value }))}
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          maxLength={160}
        />
        <p className="text-xs text-gray-500 mt-1">{settings.metaDescription.length}/160 תווים</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Google Analytics ID</label>
        <input
          type="text"
          value={settings.googleAnalyticsId}
          onChange={(e) => setSettings(prev => ({ ...prev, googleAnalyticsId: e.target.value }))}
          placeholder="GA-XXXXXXXXX-X"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent max-w-md"
        />
      </div>
    </div>
  );

  const renderAdvancedSettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-4">הגדרות ביצועים</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">מטמון מופעל</label>
              <p className="text-xs text-gray-500">שיפור מהירות טעינת העמודים</p>
            </div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.cacheEnabled}
                onChange={(e) => setSettings(prev => ({ ...prev, cacheEnabled: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">ייבוא אוטומטי</label>
              <p className="text-xs text-gray-500">ייבוא מוצרים חדשים באופן אוטומטי</p>
            </div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.autoImport}
                onChange={(e) => setSettings(prev => ({ ...prev, autoImport: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">התראות</label>
              <p className="text-xs text-gray-500">התראות על פעילות במערכת</p>
            </div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.enableNotifications}
                onChange={(e) => setSettings(prev => ({ ...prev, enableNotifications: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">מספר מוצרים מקסימלי בעמוד</label>
        <input
          type="number"
          value={settings.maxProductsPerPage}
          onChange={(e) => setSettings(prev => ({ ...prev, maxProductsPerPage: parseInt(e.target.value) || 20 }))}
          min="1"
          max="100"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent max-w-xs"
        />
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'api':
        return renderApiSettings();
      case 'design':
        return renderDesignSettings();
      case 'seo':
        return renderSeoSettings();
      case 'advanced':
        return renderAdvancedSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* כותרת */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">הגדרות מערכת</h2>
        <p className="text-gray-600">נהל את כל ההגדרות של האתר</p>
      </div>

      {/* הודעת שמירה */}
      {saveMessage && (
        <div className={`p-4 rounded-lg flex items-center ${
          saveMessage.includes('שגיאה') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
        }`}>
          {saveMessage.includes('שגיאה') ? (
            <AlertCircle className="h-5 w-5 ml-2" />
          ) : (
            <CheckCircle className="h-5 w-5 ml-2" />
          )}
          {saveMessage}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* טאבים */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 space-x-reverse px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="h-5 w-5 ml-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* תוכן טאב */}
        <div className="p-6">
          {renderTabContent()}
        </div>

        {/* כפתורי שמירה */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 space-x-reverse">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            איפוס
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <RefreshCw className="h-4 w-4 ml-2 animate-spin" />
                שומר...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 ml-2" />
                שמור הגדרות
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};