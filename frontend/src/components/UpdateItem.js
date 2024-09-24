import React, { useState, useEffect } from 'react';
import ItemService from '../services/ItemService';
import '../assets/css/updateItem.css';

function UpdateItem({ id, closeModal }) {
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemValue, setItemValue] = useState('');
  const [itemPurchasePrice, setItemPurchasePrice] = useState('');
  const [itemDate, setItemDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const result = await ItemService.getItemById(id);
        console.log(result);
        if (result) {
          setItemName(result.nome);
          setItemQuantity(result.quantidade);
          setItemValue(result.valor_venda);
          setItemPurchasePrice(result.valor_compra);
          setItemDate(result.data.split('T')[0]);
        }
      } catch (error) {
        setMessage('Erro ao carregar item: ' + error.message);
      }
    };

    fetchItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await ItemService.updateItem(id, {
        nome: itemName,
        quantidade: Number(itemQuantity),
        valor_venda: Number(itemValue),
        valor_compra: Number(itemPurchasePrice),
        data: itemDate,
      });

      if (result && result.success) {
        setMessage('Item atualizado com sucesso');
        closeModal(); // Fecha o modal após atualizar
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('Erro ao atualizar item: ' + error.message);
    }
  };

  return (
    <div className="update-container">
      <h2>Editar Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="itemName">Nome do Item</label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="itemQuantity">Quantidade</label>
          <input
            type="number"
            id="itemQuantity"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="itemValue">Preço de Venda</label>
          <input
            type="number"
            id="itemValue"
            value={itemValue}
            onChange={(e) => setItemValue(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="itemPurchasePrice">Preço de Compra</label>
          <input
            type="number"
            id="itemPurchasePrice"
            value={itemPurchasePrice}
            onChange={(e) => setItemPurchasePrice(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="itemDate">Data</label>
          <input
            type="date"
            id="itemDate"
            value={itemDate}
            onChange={(e) => setItemDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Atualizar</button>
        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
}

export default UpdateItem;
