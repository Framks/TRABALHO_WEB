import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';
import '../assets/css/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const result = await UserService.login(username, password);
      console.log(result);
      if (result && result.success) {
        localStorage.setItem('user', JSON.stringify(result.user));
        navigate('/');
      } else {
        setLoginMessage('Credenciais inválidas. Tente novamente.');
      }
    } catch (error) {
      setLoginMessage('Erro durante o login. Tente mais tarde.');
    }
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {loginMessage && <div className="loginMessage">{loginMessage}</div>}
      </form>
    </div>
  );
}

export default Login;
