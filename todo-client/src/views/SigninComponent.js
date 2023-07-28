import React, { useEffect, useState } from 'react';
import { USER_SIGN_IN_URL } from "../apiUrls/constants";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { LOCAL_STORAGE_USER_KEY, getLocalUserData, saveToLocalStorage } from '../utils/localStorageHelpers';
import { routesInformation } from '../utils/constants';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    const loggedInUserData = getLocalUserData();

    console.log({loggedInUserData});

    if(loggedInUserData){
        navigate(routesInformation.home.path);
    }
    
}, [])

  const handleLogin = (e) => {
    e.preventDefault();

    // Make API call to your sign-in endpoint
    axios.post(USER_SIGN_IN_URL, { username, password }, { AccessControlAllowOrigin: "*" })
      .then((response) => {
        // Handle successful login (e.g., redirect to dashboard)
        saveToLocalStorage(LOCAL_STORAGE_USER_KEY, response?.data);
        navigate(routesInformation.home.path);
        <div>
            <h1>Logged In</h1>
        </div>
        console.log('Login successful:', response.data);
      })
      .catch((error) => {
        // Handle login error
        setError('Invalid credentials. Please try again.');
        console.error('Login error:', error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
