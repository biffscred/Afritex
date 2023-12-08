// DeleteProduct.js

import React from 'react';
import axios from 'axios';

const DeleteProduct = ({ productId, onProductDeleted }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/products/${productId}`);
      onProductDeleted(productId); // Mettre à jour l'état du parent pour refléter la suppression
    } catch (error) {
      console.error('Erreur lors de la suppression du produit', error);
    }
  };

  return (
    <button onClick={handleDelete}>Supprimer</button>
  );
};

export default DeleteProduct;
