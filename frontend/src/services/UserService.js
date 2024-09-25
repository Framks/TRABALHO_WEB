import axios from 'axios';
const apiUrl = 'http://localhost:3002/usuario'; 
const UserService = {
  async login(username, password) {
    try {
      const response = await axios.post(`${apiUrl}/login`, { nome:username, senha:password }, {
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