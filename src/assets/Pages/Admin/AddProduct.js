// AddProduct.js

import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ onProductAdded }) => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    // Ajoutez d'autres champs de produit ici
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/products', productData);
      onProductAdded(response.data); // Mettre à jour l'état du parent avec le nouveau produit
    } catch (error) {
      console.error('Erreur lors de l’ajout d’un produit', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Les champs de formulaire ici */}
      {/* ... */}
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddProduct;
