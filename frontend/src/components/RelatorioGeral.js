import React, { useEffect, useState } from 'react';
import ItemService from '../services/ItemService';
import MonthlyExpensesChart from './MonthlyExpensesChart';
import '../assets/css/RelatorioGeral.css';

function RelatorioGeral() {
  const [items, setItems] = useState([]);
  const [monthlyExpenses] = useState([]);
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

  const totalItems = items.length;
  const totalValue = items.reduce((total, item) => {
    const price = parseFloat(item.valor_venda) || 0;
    return total + price;
  }, 0);

  const averagePrice = totalItems > 0 ? (totalValue / totalItems).toFixed(2) : '0.00';

  return (
    <div className="general-report-container">
      <h2>Relatório Geral de Estoque</h2>
      <p>Total de itens no estoque: {totalItems}</p>
      <p>Valor total do estoque: R${totalValue.toFixed(2)}</p>
      <p>Média de preço dos itens no estoque: R${averagePrice}</p>

      <MonthlyExpensesChart data={monthlyExpenses || []} />
    </div>
  );
}

export default RelatorioGeral;
