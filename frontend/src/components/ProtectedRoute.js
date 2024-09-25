import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const authData = localStorage.getItem('user'); 

    if (!authData) {
      navigate('/login');
    }
  }, [navigate]);
  return <>{children}</>;
};

export default ProtectedRoute;
