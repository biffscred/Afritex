import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext'; // Assurez-vous que le chemin d'accès est correct
import axios from 'axios';

const Profile = () => {
  const { user, updateUser } = useContext(UserContext);
  const [hasFetchedUser, setHasFetchedUser] = useState(false);

  useEffect(() => {
    // Vérifie si l'utilisateur n'est pas chargé et que l'appel API n'a pas encore été fait
    if (!user && !hasFetchedUser) {
      axios.get('https://127.0.0.1:8000/api/user/profile')
        .then(response => {
          updateUser(response.data); // Met à jour les informations de l'utilisateur dans le contexte global
          setHasFetchedUser(true); // Indique que l'appel API a été fait
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des données de l'utilisateur", error);
          setHasFetchedUser(true); // Indique également que l'appel API a été fait, même en cas d'erreur
        });
    }
  }, [user, hasFetchedUser, updateUser]); // Dépendances de l'effet

  if (!user) {
    return <div>Chargement...</div>;
  }

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
        {/* Autres liens de navigation */}
      </div>
      <div className="profile-navigation">
        <Link to="/settings">Paramètres</Link>
      </div>
      <div className="profile-content">
        {/* Contenu spécifique à la page, comme l'historique des commandes, les paramètres, etc. */}
      </div>
    </div>
  );
};

export default Profile;
