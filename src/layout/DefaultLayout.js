import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index';

const DefaultLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const username = localStorage.getItem('usernamees');
    const password = localStorage.getItem('passwordes');
    const token = localStorage.getItem('token');

    if (!username || !password || token) {
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

