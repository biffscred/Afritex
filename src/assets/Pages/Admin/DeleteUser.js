// DeleteUser.js

import React from 'react';
import axios from 'axios';

const DeleteUser = ({ userId, onUserDeleted }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/users/${userId}`);
      onUserDeleted(userId); // Signaler au parent que l'utilisateur a été supprimé
    } catch (error) {
      console.error('Erreur lors de la suppression de l’utilisateur', error);
    }
  };

  return (
    <button onClick={handleDelete}>Supprimer</button>
  );
};

export default DeleteUser;
