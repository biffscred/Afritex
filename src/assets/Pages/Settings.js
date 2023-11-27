import React, { useState } from 'react';
import axios from 'axios';

const Settings = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Remplacer par l'URL de votre API pour la mise à jour des paramètres
      await axios.post('/api/user/settings', {
        email,
        password,
        newPassword
      });
      alert('Paramètres mis à jour avec succès.');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des paramètres', error);
    }
  };

  return (
    <div className="settings-page">
      <h1>Paramètres</h1>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="password">Mot de passe actuel</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">Nouveau mot de passe</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="settings-button">Mettre à jour</button>
      </form>
    </div>
  );
};

export default Settings;
