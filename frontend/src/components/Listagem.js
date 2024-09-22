import React, { useState, useEffect } from 'react';
import ItemService from '../services/ItemService'; // Importa o serviço de item
import { Link } from 'react-router-dom';
import '../assets/css/Listagem.css';


function Listagem() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const result = await ItemService.getItems();
        if (result && result.success) {
          setItems(result.items);
        }
      } catch (error) {
        console.error('Erro ao buscar itens', error);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await ItemService.deleteItem(id);
      if (result && result.success) {
        setItems(items.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Erro ao deletar item', error);
    }
  };

  return (
    <div className="listagem-container">
      <h2>Listagem de Itens</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Valor</th>
            <th>Preço de Compra</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.value}</td>
              <td>{item.purchasePrice}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td>
                <Link to={`/editar/${item.id}`}>Editar</Link>
                <button onClick={() => handleDelete(item.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Listagem;
