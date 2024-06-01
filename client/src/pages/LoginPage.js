import React, { useState, useContext } from 'react';
import './LoginPage.css';
import { loginUser, createUser } from '../api.js';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserDataProvider.js';

function LoginPage() {
  const { setUserDataState } = useContext(UserDataContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser({ username, password });
      if (user) {
        setUserDataState(true, username);
        navigate('/');
      }
    } catch (error) {
      setError('Invalid username or password');
      console.error('Error logging in:', error);
    }
  };

  const handleRegister = async () => {
    const newUser = { name: username, password: password };

    try {
      await createUser(newUser);
      setUserDataState(true, username); // Automatically log in the new user
      navigate('/');
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
      <Link to="/profile">Go to Profile</Link>
    </div>
  );
}

export default LoginPage;
