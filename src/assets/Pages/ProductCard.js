// ProductCard.js
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.images} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Prix: {product.price}€</p>
      {/* Ajoutez d'autres détails que vous souhaitez afficher */}
    </div>
  );
};

export default ProductCard;
