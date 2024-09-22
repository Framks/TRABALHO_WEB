import axios from 'axios';
const apiUrl = 'http://localhost:3002/login'; // Altere para sua URL de API
const UserService = {
  async login(username, password) {
    try {
      const response = await axios.post(`${apiUrl}/login`, { username, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro durante o login:', error);
      return null;
    }
  },
};
export default UserService;