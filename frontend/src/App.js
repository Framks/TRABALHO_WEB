// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout'; // Ajuste o caminho conforme necessário
import Login from './pages/Login';
import Listagem from './pages/Listagem';
import CadastroItem from './pages/CadastroItem';
import RelatorioMensal from '../src/pages/RelatorioMensal';
import RelatorioGeral from '../src/pages/RelatorioGeral';
import ProtectedRoute from './components/ProtectedRoute';

//   <Route path='editar/:id' element={<Editar/>}/>

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
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
