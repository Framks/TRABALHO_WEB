import React, { useState } from 'react';
import CadastroItem from './CadastroItem';

function Home() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(!showForm);

  return (
    <div className="home-container">
      <header className="topbar">
        <h1>Welcome to the Application</h1>
        <nav>
          <ul>
            <li><a href="#" onClick={toggleForm}>Cadastrar Item</a></li>
            <li><a href="/listagem">Listar Itens</a></li>
            <li><a href="/relatorio-geral">Relatório Geral</a></li>
          </ul>
        </nav>
      </header>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
            <CadastroItem />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
