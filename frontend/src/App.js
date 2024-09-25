import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout'; 
import Login from './pages/Login';
import Listagem from './pages/Listagem';
import CadastroItem from './pages/CadastroItem';
import RelatorioGeral from '../src/pages/RelatorioGeral';
import RelatorioMensal from './pages/RelatorioMensal';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="cadastro" element={<CadastroItem />} />
          <Route path="listagem" element={<Listagem />} />
          <Route path='relatorio-geral' element={<RelatorioGeral />} />
          <Route path='relatorio-mensal' element={<RelatorioMensal />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
