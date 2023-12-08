// UpdateUser.js

import React from 'react';
import axios from 'axios';

const UpdateUser = ({ userData, onUserUpdated }) => {
  // Formulaire et logique pour mettre à jour un utilisateur
  // ...
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mettre à jour l'utilisateur via l'API
      const response = await axios.put(`/api/users/${userData.id}`, userData);
      onUserUpdated(response.data); // Mettre à jour l'état du parent avec les données de l'utilisateur modifié
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l’utilisateur', error);
    }
  };

  // Formulaire de mise à jour ici
};

export default UpdateUser;
