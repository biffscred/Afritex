import React, { useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom'; // Ajouté pour la redirection
import '../styles/LoginForm.css'; // Assurez-vous que le chemin vers votre fichier CSS est correct
import { AuthContext } from './AuthContext';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // Hook pour la redirection
  const { login } = useContext(AuthContext); // Accéder à la fonction login de AuthContext

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', {
        email: email,
        password: password
      });
      console.log('Token:', response.data.token);
      // Stockez le token dans le localStorage ou le sessionStorage
      localStorage.setItem('token', response.data.token);
     // Redirection vers la page d'accueil après la connexion réussie
     login(); // Mettre à jour l'état de connexion
     navigate('/'); // Redirige vers la page d'accueil
    } catch (error) {
      console.error('Erreur de connexion', error);
      // Gérez les erreurs ici (par exemple, afficher un message d'erreur)
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-options">
          <div className="form-remember">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Se souvenir de moi</label>
          </div>
          {/* Assurez-vous que le lien mène à un composant ou une route existante pour réinitialiser le mot de passe */}
          <a href="/forgot-password" className="forgot-password">
            Mot de passe oublié ?
          </a>
        </div>
        
        <button type="submit" className="login-button">Se connecter</button>
      
      </form>
    </div>
  );
};

export default LoginForm;
