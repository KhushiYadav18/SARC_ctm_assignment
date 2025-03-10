import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', { username, password });
      localStorage.setItem('accessToken', response.data.access);
      alert('Login successful!');
      navigate('/profile');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-96">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded"
          />
        </div>
        <button className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
      </form>
    </div>
  );
}

export default Login;
