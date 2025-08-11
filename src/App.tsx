import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductPage } from './pages/ProductPage';
import { AdminPanel } from './pages/AdminPanel';
import { AdminLogin } from './components/admin/AdminLogin';
import { ProductProvider } from './context/ProductContext';

type Page = 'home' | 'category' | 'product' | 'admin' | 'admin-login';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [currentProduct, setCurrentProduct] = useState<string>('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    // בדיקת authentication במטמון
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth === 'true') {
      setIsAdminAuthenticated(true);
    }
  }, []);

  const handleNavigation = (page: Page, param?: string) => {
    setCurrentPage(page);
    if (page === 'category' && param) {
      setCurrentCategory(param);
    } else if (page === 'product' && param) {
      setCurrentProduct(param);
    }
  };

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
    localStorage.setItem('adminAuth', 'true');
    setCurrentPage('admin');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('adminAuth');
    setCurrentPage('home');
  };

  const renderCurrentPage = () => {
    if (currentPage === 'admin-login') {
      return <AdminLogin onLogin={handleAdminLogin} />;
    }

    if (currentPage === 'admin') {
      if (!isAdminAuthenticated) {
        return <AdminLogin onLogin={handleAdminLogin} />;
      }
      return <AdminPanel onLogout={handleAdminLogout} onNavigate={handleNavigation} />;
    }

    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navbar onNavigate={handleNavigation} />
        <main className="flex-1">
          {currentPage === 'home' && <HomePage onNavigate={handleNavigation} />}
          {currentPage === 'category' && <CategoryPage category={currentCategory} onNavigate={handleNavigation} />}
          {currentPage === 'product' && <ProductPage productId={currentProduct} onNavigate={handleNavigation} />}
        </main>
        <Footer />
      </div>
    );
  };

  return (
    <ProductProvider>
      {renderCurrentPage()}
    </ProductProvider>
  );
}

export default App;