import React, { useState } from 'react';
import '../styles/SignUpForm.css'; // Assurez-vous de créer un fichier CSS avec ce nom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Traitement de l'inscription ici
  };

  return (
    <div className="signup-form-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
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
        <button type="submit" className="signup-button">S'inscrire</button>
        <div className="social-login">
          <p>Ou inscrivez-vous avec</p>
          <button type="button" className="google-button">
  <FontAwesomeIcon icon={faGoogle} />
</button>
<button type="button" className="facebook-button">
  <FontAwesomeIcon icon={faFacebookF} />
</button>
<button type="button" className="instagram-button">
  <FontAwesomeIcon icon={faInstagram} />
</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
