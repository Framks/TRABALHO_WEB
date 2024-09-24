import React, { useState, useEffect } from 'react';
import ItemService from '../services/ItemService';
import UpdateItem from '../components/UpdateItem'; // Componente de edição
import '../assets/css/listagem.css';

function Listagem() {
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);

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
      if (result) {
        setItems(items.filter(item => item._id !== id));
      }
      
    } catch (error) {
      console.error('Erro ao deletar item', error);
    }
  };

  const handleEdit = (id) => {
    setIsEditing(true);  // Abre o modal
    setEditingItemId(id); // Define qual item está sendo editado
  };

  const closeModal = () => {
    setIsEditing(false);
    setEditingItemId(null);
  };

  const updateItemInList = (updatedItem) => {
    setItems(items.map(item => item._id === updatedItem._id ? updatedItem : item));
  };

  return (
    <div className={`listagem-container ${isEditing ? 'modal-open' : ''}`}>
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
                <button onClick={() => handleEdit(item._id)}>Editar</button>
                <button onClick={() => handleDelete(item._id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <UpdateItem id={editingItemId} closeModal={closeModal} updateItemInList={updateItemInList} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Listagem;
