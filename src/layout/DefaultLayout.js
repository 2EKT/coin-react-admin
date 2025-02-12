import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index';

const DefaultLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (!username || !password) {
      navigate('/login'); // Redirect if not logged in
    }
  }, [navigate]);


  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default DefaultLayout;

