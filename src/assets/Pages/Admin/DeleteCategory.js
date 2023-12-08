// DeleteCategory.js

import React from 'react';
import axios from 'axios';

const DeleteCategory = ({ categoryId, onCategoryDeleted }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/categories/${categoryId}`);
      onCategoryDeleted(categoryId); // Mettre à jour l'état du parent pour refléter la suppression
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie', error);
    }
  };

  return (
    <button onClick={handleDelete}>Supprimer</button>
  );
};

export default DeleteCategory;
