import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { getUsers, createUser } from '../api.js';

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if user exists
    const user = users.find(user => user.name === username && user.password === password);
    if (user) {
      onLogin(username, password);
    } else {
      setError('Invalid username or password');
    }
  };

  const handleRegister = async () => {
    const newUser = { name: username, password: password };

    try {
      const createdUser = await createUser(newUser);
      setUsers([...users, createdUser]);
      onLogin(username, password); // Automatically log in the new user
    } catch (error) {
      console.error('Error creating user:', error);
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