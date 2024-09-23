// src/components/ItemsChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ItemsChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.nome),
    datasets: [
      {
        label: 'Valor Total',
        data: data.map(item => item.valor_venda),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Total de Itens x Valor',
        font: {
          size: 18,
        },
      },
      legend: {
        position: 'top',
      },
    },
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default ItemsChart;
