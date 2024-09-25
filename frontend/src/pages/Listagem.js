import React, { useState, useEffect } from 'react';
import ItemService from '../services/ItemService';
import UpdateItem from '../components/UpdateItem';
import '../assets/css/listagem.css';

function Listagem() {
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const result = await ItemService.getItems();
        if (result && result.length > 0) {
          setItems(result);
        } else {
          setMessage('Nenhum item encontrado.');
          setMessageType('error');
        }
      } catch (error) {
        console.error('Erro ao buscar itens', error);
        setMessage('Erro ao buscar itens: ' + error.message);
        setMessageType('error');
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Você tem certeza que deseja remover este item?')) {
      try {
        const result = await ItemService.deleteItem(id);
        if (result) {
          setItems((prevItems) => prevItems.filter(item => item._id !== id));
          setMessage('Item removido com sucesso.');
          setMessageType('success');
        } else {
          setMessage('Erro ao remover item.');
          setMessageType('error');
        }
      } catch (error) {
        console.error('Erro ao deletar item', error);
        setMessage('Erro ao deletar item: ' + error.message);
        setMessageType('error');
      }
    }
  };

  const handleEdit = (id) => {
    setEditingItemId(id);
    setIsEditing(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setEditingItemId(null);
    setMessage('');
    setMessageType('');
  };

  const updateItemInList = (updatedItem) => {
    setItems((prevItems) => 
      prevItems.map(item => item._id === updatedItem._id ? updatedItem : item)
    );
    setMessage('Item atualizado com sucesso.');
    setMessageType('success');
  };

  const formatDate = (date) => {
    if (!date) return 'Data não disponível'; // Mensagem caso a data não esteja disponível

    const newDate = new Date(date);
    // Ajuste para o fuso horário para evitar a data anterior
    newDate.setHours(newDate.getHours() + newDate.getTimezoneOffset() / 60);
    
    // Formata a data no formato DD/MM/YYYY
    const day = String(newDate.getDate()).padStart(2, '0');
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Mês começa do zero
    const year = newDate.getFullYear();
    
    return `${day}/${month}/${year}`;
  };

  return (
    <div className={`listagem-container ${isEditing ? 'modal-open' : ''}`}>
      <h2>Listagem de Itens</h2>
      {message && <div className={`message ${messageType}`}>{message}</div>}
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
          {items.length > 0 ? (
            items.map(item => (
              <tr key={item._id}>
                <td>{item.nome}</td>
                <td>{item.quantidade}</td>
                <td>{item.valor_venda}</td>
                <td>{item.valor_compra}</td>
                <td>{formatDate(item.data)}</td> {/* Chama a função de formatação da data */}
                <td>
                  <button onClick={() => handleEdit(item._id)}>Editar</button>
                  <button onClick={() => handleDelete(item._id)}>Remover</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Nenhum item disponível.</td>
            </tr>
          )}
        </tbody>
      </table>

      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <UpdateItem 
              id={editingItemId} 
              closeModal={closeModal} 
              updateItemInList={updateItemInList} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Listagem;
