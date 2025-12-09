import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import IdeaFormPage from '@/pages/IdeaFormPage';
import ReportPage from '@/pages/ReportPage';
import PaymentPage from '@/pages/PaymentPage';
import ProductPage from '@/pages/ProductPage';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>IdeBisnisAI - Validasi Ide Bisnis dengan AI</title>
        <meta name="description" content="Platform AI untuk validasi ide bisnis di Indonesia. Dapatkan analisis SWOT, riset kompetitor, dan strategi scaling dengan teknologi AI." />
      </Helmet>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" /> : <LoginPage />} 
        />
        <Route 
          path="/register" 
          element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <DashboardPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/new-idea" 
          element={user ? <IdeaFormPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/report/:id" 
          element={user ? <ReportPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/payment/:id" 
          element={user ? <PaymentPage /> : <Navigate to="/login" />} 
        />
      </Routes>
    </>
  );
}

export default App;