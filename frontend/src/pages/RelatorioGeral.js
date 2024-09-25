import React, { useEffect, useState } from 'react';
import ItemService from '../services/ItemService';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../assets/css/relatorioGeral.css';

// Registrar os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function RelatorioGeral() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ItemService.getItems();
        setItems(data);
      } catch (error) {
        setError('Erro ao carregar os itens');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Cálculo das métricas
  const totalItems = items.reduce((total, item) => total + item.quantidade, 0);
  const totalValueVenda = items.reduce((total, item) => {
    const valorTotalItem = (parseFloat(item.valor_venda) || 0) * item.quantidade;
    return total + valorTotalItem;
  }, 0);
  const totalValueCompra = items.reduce((total, item) => {
    const valorTotalItem = (parseFloat(item.valor_compra) || 0) * item.quantidade;
    return total + valorTotalItem;
  }, 0);

  const averagePriceVenda = totalItems > 0 ? (totalValueVenda / totalItems).toFixed(2) : '0.00';
  const averagePriceCompra = totalItems > 0 ? (totalValueCompra / totalItems).toFixed(2) : '0.00';

  // Dados para o gráfico de barras
  const barDataQuantity = {
    labels: items.map(item => item.nome), // Nomes dos itens
    datasets: [
      {
        label: 'Quantidade de Itens',
        data: items.map(item => item.quantidade), // Quantidades dos itens
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="general-report-container">
      <h2>Relatório Geral de Estoque</h2>
      
      {/* Barra de Métricas */}
      <div className="metrics-bar">
        <div className="metric-card">
          <h3>Total de Itens</h3>
          <p>{totalItems}</p>
        </div>
        <div className="metric-card">
          <h3>Valor Total (Venda)</h3>
          <p>R${totalValueVenda.toFixed(2)}</p>
        </div>
        <div className="metric-card">
          <h3>Valor Total (Compra)</h3>
          <p>R${totalValueCompra.toFixed(2)}</p>
        </div>
        <div className="metric-card">
          <h3>Média Preço (Venda)</h3>
          <p>R${averagePriceVenda}</p>
        </div>
        <div className="metric-card">
          <h3>Média Preço (Compra)</h3>
          <p>R${averagePriceCompra}</p>
        </div>
      </div>

      {/* Gráfico de Barra para Quantidade de Itens em Estoque */}
      <div className="chart-container">
        <h3>Quantidade de Itens em Estoque</h3>
        <Bar 
          data={barDataQuantity} 
          options={{ 
            responsive: true, 
            maintainAspectRatio: true,  // Mantém a proporção do gráfico
            scales: { 
              y: { 
                beginAtZero: true 
              } 
            } 
          }} 
          style={{ height: '300px', width: '100%' }} // Define a altura e largura do gráfico
        />
      </div>
    </div>
  );  
}

export default RelatorioGeral;
