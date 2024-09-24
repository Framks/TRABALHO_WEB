import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o dado está no localStorage
    const authData = localStorage.getItem('user'); // Substitua 'authToken' pelo dado que deseja verificar

    if (!authData) {
      // Redireciona para a página de login se o dado não for encontrado
      navigate('/login');
    }
  }, [navigate]);

  // Renderiza os filhos (conteúdo protegido) apenas se o dado for encontrado
  return <>{children}</>;
};

export default ProtectedRoute;
