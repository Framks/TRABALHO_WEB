// src/services/ItemService.js
import axios from 'axios';

const apiUrl = 'http://localhost:3002/items'; // Altere para sua URL de API

const ItemService = {
  async createItem(item) {
    try {
      const response = await axios.post(`${apiUrl}/`, item, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return {
        success: true,
        item: response.data, // Supondo que a resposta contenha o item criado
      };
    } catch (error) {
      console.error('Erro ao cadastrar item:', error);
      
      // Verificando se o erro tem uma resposta
      if (error.response) {
        return {
          success: false,
          message: error.response.data.message || 'Erro desconhecido no servidor.',
        };
      } else if (error.request) {
        return {
          success: false,
          message: 'Erro ao conectar ao servidor. Tente novamente mais tarde.',
        };
      } else {
        return {
          success: false,
          message: 'Erro ao cadastrar item: ' + error.message,
        };
      }
    }
  },

  async getItems() {
    try {
      const response = await axios.get(`${apiUrl}/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
      return null;
    }
  },

  async getItemById(id) {
    try {
      const response = await axios.get(`${apiUrl}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar item:', error);
      throw error; // Lança o erro para que possa ser tratado no componente
    }
  },

  async deleteItem(id) {
    try {
      const response = await axios.delete(`${apiUrl}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar item:', error);
      return null;
    }
  },

  async updateItem(id, updatedItem) {
    try {
      const response = await axios.put(`${apiUrl}/${id}`, updatedItem, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return {
        success: true,
        updatedItem: response.data,
      };
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
  
      // Verificando se o erro tem uma resposta
      if (error.response) {
        return {
          success: false,
          message: error.response.data.message || 'Erro desconhecido no servidor.',
        };
      } else if (error.request) {
        return {
          success: false,
          message: 'Erro ao conectar ao servidor. Tente novamente mais tarde.',
        };
      } else {
        return {
          success: false,
          message: 'Erro ao atualizar item: ' + error.message,
        };
      }
    }
  }
  
};

export default ItemService;
