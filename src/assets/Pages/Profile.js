import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // Remplacer par l'URL de votre API pour récupérer les données de l'utilisateur
    axios.get('/api/user/profile')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données de l'utilisateur', error");
      });
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Mon Profil</h1>
      </div>
      <div className="profile-info">
        <h2>Informations Personnelles</h2>
        <p>Nom : {user.name}</p>
        <p>Email : {user.email}</p>
        {/* Autres informations personnelles */}
      </div>
      <div className="profile-navigation">
        <Link to="/order-history">Historique des Commandes</Link>
        <Link to="/settings">Paramètres</Link>
        {/* Autres liens de navigation */}
      </div>
      <div className="profile-content">
        {/* Contenu spécifique à la page, comme l'historique des commandes, les paramètres, etc. */}
      </div>
    </div>
  );
};

export default Profile;
