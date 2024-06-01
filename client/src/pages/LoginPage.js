import React from 'react';
import './LoginPage.css';

function LoginPage() {
  return (
    <div className="login-page">
      <div className="container">
        <div className="logo">
          <h1>Culinary Critique</h1>
        </div>
        <form>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" name="username" />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" />
          </div>
          <div className="error">Error creating user</div>
          <button type="submit">Login</button>
          <button type="button">Register</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
