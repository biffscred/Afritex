// AddUser.js

import React, { useState } from 'react';
import axios from 'axios';

const AddUser = ({ onUserAdded }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    adress: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Supposons que vous avez une route d'API pour ajouter un utilisateur
      const response = await axios.post('/api/users', userData);
      onUserAdded(response.data); // Mettre à jour l'état du parent avec le nouvel utilisateur
    } catch (error) {
      console.error('Erreur lors de l’ajout d’un utilisateur', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Les champs de formulaire ici */}
      {/* ... */}
    </form>
  );
};

export default AddUser;
