import React, { useEffect, useState } from 'react';
import ItemService from '../services/ItemService';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../assets/css/relatorioGeral.css';
import dayjs from 'dayjs'; // Certifique-se de que dayjs está instalado: npm install dayjs

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function RelatorioMensal() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month()); // Mês atual por padrão
  const [selectedYear, setSelectedYear] = useState(dayjs().year());

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

  const handleMonthChange = (monthIndex) => {
    setSelectedMonth(monthIndex);
  };

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const filteredItems = items.filter(item => {
    const itemDate = dayjs(item.data); // data de registro/modificação do item
    return itemDate.month() === selectedMonth && itemDate.year() === selectedYear;
  });

  /* if (filteredItems.length === 0) {
    return <p>Nenhum item registrado em {months[selectedMonth]} de {selectedYear}.</p>;
  } */

  const totalItems = filteredItems.reduce((total, item) => total + item.quantidade, 0);
  const totalValueVenda = filteredItems.reduce((total, item) => {
    const valorTotalItem = (parseFloat(item.valor_venda) || 0) * item.quantidade;
    return total + valorTotalItem;
  }, 0);
  const totalValueCompra = filteredItems.reduce((total, item) => {
    const valorTotalItem = (parseFloat(item.valor_compra) || 0) * item.quantidade;
    return total + valorTotalItem;
  }, 0);

  const averagePriceVenda = totalItems > 0 ? (totalValueVenda / totalItems).toFixed(2) : '0.00';
  const averagePriceCompra = totalItems > 0 ? (totalValueCompra / totalItems).toFixed(2) : '0.00';

  const barDataQuantity = {
    labels: filteredItems.map(item => item.nome),
    datasets: [
      {
        label: 'Quantidade de Itens',
        data: filteredItems.map(item => item.quantidade),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="general-report-container">
      <h2>Relatório Mensal de Estoque</h2>
      
      {/* Botões para selecionar o mês */}
      <div className="month-selector">
        {months.map((month, index) => (
          <button 
            key={index} 
            onClick={() => handleMonthChange(index)} 
            className={index === selectedMonth ? 'active-month' : ''}
          >
            {month}
          </button>
        ))}
      </div>

      {(filteredItems.length == 0 && (
        <h3>Nenhum item registrado em {months[selectedMonth]} de {selectedYear}.</h3>
      ))}

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

      <div className="chart-container">
        <h3>Quantidade de Itens em Estoque ({months[selectedMonth]} de {selectedYear})</h3>
        <Bar 
          data={barDataQuantity} 
          options={{ 
            responsive: true, 
            maintainAspectRatio: true, 
            scales: { 
              y: { 
                beginAtZero: true 
              } 
            } 
          }} 
          style={{ height: '300px', width: '100%' }}
        />
      </div>
    </div>
  );
}

export default RelatorioMensal;
