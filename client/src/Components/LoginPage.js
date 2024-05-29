import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { getUsers, createUser, loginUser } from '../api.js';

function LoginPage({ onLogin }) {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user exists
    try {
      const user = await loginUser({ username, password });
      if (user) {
        onLogin(username);
      }
    } catch (error) {
      setError('Invalid username or password');
      console.error('Error logging in:', error);
    }
  };

  const handleRegister = async () => {
    const newUser = { name: username, password: password };

    try {
      const createdUser = await createUser(newUser);
      setUsers([...users, createdUser]);
      onLogin(username, password); // Automatically log in the new user
    } catch (error) {
      if (error.message.includes('Username already exists')) {
        setError('Username already exists');
      } else {
        console.error('Error creating user:', error);
        setError('Error creating user');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">CULINARY CRITIQUE</div>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label">
          Username:
          <input className="login-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label className="login-label">
          Password:
          <input className="login-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <div className="login-error">{error}</div>}
        <button className="login-button" type="submit">Login</button>
        <button className="login-button" type="button" onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
}

export default LoginPage;