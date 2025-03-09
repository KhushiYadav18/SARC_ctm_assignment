import React, { useState } from 'react';
import '../styles/Register.css';
import UseLogin from '../../hooks/useLogin';
import { Navigate } from 'react-router-dom';

function Login() {
  const [password, setPassword] = useState('');
  const [rollNumber, setRollNumber] = useState('');

  const allFieldsFilled = () => {
    return (
      password !== '' &&
      rollNumber !== ''
    );
  };
  const { Login, error, setError, success, loading } = UseLogin();

  const handlePasswordChange = (event) => {setPassword(event.target.value); setError("")}
  const handleRollNumberChange = (event) => {setRollNumber(event.target.value); setError("")};


  const handleLogin = () => {
    const userData = {
      "ldap": rollNumber + '@iitb.ac.in',
      "password": password
    };

    Login(userData);
  };

  const inputStyle = ['input'];
  const buttonStyle = ['button'];
  const disabledButtonStyle = ['button', 'button-disabled'];

  

  return (
    localStorage.getItem('accessToken') !== null ? <Navigate to="/projectCards" /> :
    <div className='form-container'>
      <h1 className='heading'>Login</h1>
      <div className='email-input'>
        <input
          type="text"
          placeholder="Roll Number"
          value={rollNumber}
          onChange={handleRollNumberChange}
          className={inputStyle.join(' ')}
        />
        <span className='email-domain'>@iitb.ac.in</span>
      </div>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        className={inputStyle.join(' ')}
      />
      <div style={{color:"white"}}>{error}</div>
      <button
        onClick={handleLogin}
        className={allFieldsFilled() ? buttonStyle.join(' ') : disabledButtonStyle.join(' ')}
        disabled={!allFieldsFilled()}
      >
        Login
      </button>
      <div style={{color: "rgba(255,255,255,0.8)", fontSize: "medium"}}>
        New User ? <a href="/register">Register here</a>
      </div>
    </div>
  );
}

export default Login;
