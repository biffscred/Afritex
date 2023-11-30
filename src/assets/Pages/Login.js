import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginForm.css';
import { AuthContext } from './AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Veuillez entrer un email et un mot de passe.');
      return;
    }

    try {
      const response = await axios.post('https://127.0.0.1:8000/login', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        login(); // Met à jour le contexte pour refléter l'état authentifié
        navigate('/'); // Redirige vers la page d'accueil ou le tableau de bord
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      setError('Erreur de connexion. Veuillez réessayer.');
      console.error('Erreur de connexion', error);
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        {error && <div className="error-message">{error}</div>} {/* Affichage des erreurs */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-button">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginForm;
