import React, { useState, useEffect } from 'react';
import ItemService from '../services/ItemService'; // Importa o serviço de item
import { Link } from 'react-router-dom';
import '../assets/css/listagem.css';


function Listagem() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const result = await ItemService.getItems();
        if (result) {
          setItems(result);
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
        setItems(items.filter(item => item._id !== id));
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
            <tr key={item._id}>
              <td>{item.nome}</td>
              <td>{item.quantidade}</td>
              <td>{item.valor_venda}</td>
              <td>{item.valor_compra}</td>
              <td>{new Date(item.data).toLocaleDateString()}</td>
              <td>
                <Link to={`/editar/${item._id}`}>Editar</Link>
                <button onClick={() => handleDelete(item._id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Listagem;
