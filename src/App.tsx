// App component
import { useEffect } from 'react';
// ConfigProvider import removed as it's not used in this component
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UniversitySearchPage from './pages/UniversitySearchPage';
import UniversityDetailPage from './pages/UniversityDetailPage';
import MajorDetailPage from './pages/MajorDetailPage';
import ApplicationPage from './pages/ApplicationPage';
import QSRankingPage from './pages/QSRankingPage';
import CustomerServicePage from './pages/CustomerServicePage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  const location = useLocation();
  
  // 当路由变化时，自动滚动到页面顶部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
      <div className="app">
        <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/university/search" element={<UniversitySearchPage />} />
          <Route path="/search" element={<UniversitySearchPage />} />
          <Route path="/university/:id" element={<UniversityDetailPage />} />
          <Route path="/major/:id" element={<MajorDetailPage />} />
          <Route path="/apply/:majorId" element={<ApplicationPage />} />
          <Route path="/application" element={<ApplicationPage />} />
          <Route path="/qs-ranking" element={<QSRankingPage />} />
          <Route path="/customer-service" element={<CustomerServicePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
        <Footer />
      </div>
  )
}

export default App