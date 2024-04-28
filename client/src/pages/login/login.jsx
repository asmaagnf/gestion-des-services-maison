// LoginPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/users/login', {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);

      const decodedToken = jwtDecode(token);
      handleRedirection(decodedToken);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || 'Login failed');
      } else {
        setError('Network error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirection = (decodedToken) => {
    switch (decodedToken.role) {
      case 'client':
        navigate('/client-interface', { replace: true });
        break;
      case 'pro':
        navigate('/pro-interface', { replace: true });
        break;
      case 'admin':
        navigate('/admin-interface', { replace: true });
        break;
      default:
        navigate('/404', { replace: true });
    }
  };


  
  
    return (
      <div className="form-container">
        <h2 className="primaryText">se connecter</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              disabled={isLoading} // Disable form during loading
            />
 
          </div>
          <div className="form-group">
            <label>Mot de passe:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              disabled={isLoading}
            />
 
          </div>
          <button className="button" type="submit"  disabled={isLoading}>
            {isLoading ? 'Loading...' : 'connecter'}
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
        <span>
        Vous n'avez pas de compte ?&nbsp;
        <Link to="/register" className='linktext'>
              s'inscrire
            </Link>
        </span>
      </div>
    );
  };
  
  export default LoginPage;