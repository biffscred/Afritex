// CategoriesList.js

import React from 'react';

const CategoriesList = ({ categories, onEdit, onDelete }) => {
  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>
          <span>{category.name}</span>
          <button onClick={() => onEdit(category.id)}>Modifier</button>
          <button onClick={() => onDelete(category.id)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
};

export default CategoriesList;
