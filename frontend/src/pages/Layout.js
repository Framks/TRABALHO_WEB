import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../assets/css/home.css';
import { useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');

    navigate('/login');
  }
  return (
    <div className="home-container">
      <header className="topbar">
        <h1>
          <Link to="/">Sistema de Armazenamento</Link>
        </h1>
        <nav>
          <ul className='navbar'>
            <li><Link to="/cadastro">Cadastrar Item</Link></li>
            <li><Link to="/listagem">Listar Itens</Link></li>
            <li><Link to="/relatorio-geral">Relatório Geral</Link></li>
            <li><Link to="/relatorio-mensal">Relatório Mensal</Link></li>
            <li><button onClick={logout}>Sair</button></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
