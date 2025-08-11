import React, { useState } from 'react';
import { ProductManagement } from '../components/admin/ProductManagement';
import { CategoryManagement } from '../components/admin/CategoryManagement';
import { SettingsManagement } from '../components/admin/SettingsManagement';
import { Dashboard } from '../components/admin/Dashboard';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface AdminPanelProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

type AdminTab = 'dashboard' | 'products' | 'categories' | 'settings';

export const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const tabs = [
    { id: 'dashboard' as AdminTab, name: 'לוח בקרה', icon: LayoutDashboard },
    { id: 'products' as AdminTab, name: 'ניהול מוצרים', icon: Package },
    { id: 'categories' as AdminTab, name: 'ניהול קטגוריות', icon: Layers },
    { id: 'settings' as AdminTab, name: 'הגדרות כלליות', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={onNavigate} />;
      case 'products':
        return <ProductManagement />;
      case 'categories':
        return <CategoryManagement />;
      case 'settings':
        return <SettingsManagement />;
      default:
        return <Dashboard onNavigate={onNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* סיידבר */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform ${
        isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* כותרת */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">ממשק ניהול</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* תפריט */}
        <nav className="p-4">
          <ul className="space-y-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <li key={tab.id}>
                  <button
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 text-right rounded-lg transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="h-5 w-5 ml-3" />
                    {tab.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* כפתור יציאה */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center px-4 py-3 text-right text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <LogOut className="h-5 w-5 ml-3" />
            יציאה מהניהול
          </button>
        </div>
      </div>

      {/* תוכן ראשי */}
      <div className="flex-1 lg:mr-64">
        {/* כותרת עליונה */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 ml-4"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {tabs.find(tab => tab.id === activeTab)?.name}
              </h1>
            </div>
            <button
              onClick={() => onNavigate('home')}
              className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              צפייה באתר
            </button>
          </div>
        </header>

        {/* תוכן */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>

      {/* רקע כהה למובייל */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};