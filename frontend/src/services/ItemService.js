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
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar item:', error);
      return null;
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
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
      return null;
    }
  },

  async getItemsReportForLast30Days() {
    try {
      const response = await axios.get(`${apiUrl}/items-report`, {
        params: { days: 30 },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar relatório de itens cadastrados nos últimos 30 dias:', error);
      return { totalItems: 0, items: [] };
    }
  },

  async getMonthlyExpenses() {
    try {
      const response = await axios.get(`${apiUrl}/monthly-expenses`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar despesas mensais:', error);
      return [];
    }
  },

  async getItemsReport() {
    try {
      const response = await axios.get(`${apiUrl}/items-report`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar relatório de itens:', error);
      return null;
    }
  },
};

export default ItemService;
