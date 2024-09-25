import React, { useState } from 'react';
import ItemService from '../services/ItemService';
import '../assets/css/cadastroItem.css';

function CadastroItem() {
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemValue, setItemValue] = useState('');
  const [itemPurchasePrice, setItemPurchasePrice] = useState('');
  const [itemDate, setItemDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage(''); // Limpa a mensagem antes de tentar cadastrar

    try {
      const result = await ItemService.createItem({
        nome: itemName,
        quantidade: Number(itemQuantity),
        valor_venda: Number(itemValue),
        valor_compra: Number(itemPurchasePrice),
        data: itemDate,
      });

      if (result && result.success) {
        setMessage('Item cadastrado com sucesso');
        setItemName('');
        setItemQuantity('');
        setItemValue('');
        setItemPurchasePrice('');
        setItemDate('');
      } else {
        setMessage(result.message || 'Erro ao cadastrar item.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar item:', error);
      setMessage('Erro ao cadastrar item: ' + error.message);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastrar Item</h2>
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
        <button type="submit">Cadastrar</button>
        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
}

export default CadastroItem;
