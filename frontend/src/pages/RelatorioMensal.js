import React, { useEffect, useState } from 'react';
import ItemService from '../services/ItemService';
import ItemsChart from '../components/ItemsChart'; // Gráfico de itens x valor
import '../assets/css/RelatorioMensal.css';

function RelatorioMensal() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ItemService.getItemsReportForLast30Days();
        setReportData(data);
      } catch (error) {
        setError('Erro ao carregar o relatório');
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

  const items = reportData?.items || [];
  const totalItems = reportData?.totalItems || 0;

  const totalSpent = items.reduce((total, item) => {
    const price = parseFloat(item.valor_venda) || 0;
    return total + price;
  }, 0);

  const averagePrice = totalItems > 0 ? (totalSpent / totalItems).toFixed(2) : '0.00';

  return (
    <div className="report-container">
      <h2>Relatório de Itens Cadastrados nos Últimos 30 Dias</h2>
      <p>Total de itens cadastrados: {totalItems}</p>
      <p>Valor total do estoque: R${totalSpent.toFixed(2)}</p>
      <p>Média de preço dos itens: R${averagePrice}</p>
      <ItemsChart data={items} />
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.nome} - Cadastrado em: {new Date(item.data).toLocaleDateString()} - Preço: R${(item.valor_venda ? parseFloat(item.valor_venda).toFixed(2) : '0.00')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RelatorioMensal;
