// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../src/components/Layout'; // Ajuste o caminho conforme necessário
import Login from '../src/components/Login';
import Listagem from '../src/components/Listagem';
import CadastroItem from '../src/components/CadastroItem';
import RelatorioMensal from '../src/components/RelatorioMensal';
import RelatorioGeral from '../src/components/RelatorioGeral';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="cadastro" element={<CadastroItem />} />
          <Route path="listagem" element={<Listagem />} />
          <Route path='relatorio-mensal' element={<RelatorioMensal />} />
          <Route path='relatorio-geral' element={<RelatorioGeral />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
