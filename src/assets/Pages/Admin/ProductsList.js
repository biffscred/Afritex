// ProductsList.js

import React from 'react';

const ProductsList = ({ products, onEdit, onDelete }) => {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <span>{product.name}</span>
          <span>{product.price}</span>
          {/* Affichez d'autres propriétés du produit ici */}
          <button onClick={() => onEdit(product.id)}>Modifier</button>
          <button onClick={() => onDelete(product.id)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
