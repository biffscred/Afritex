// Panier.js
import React, { useContext } from 'react';
import { CartContext } from './CartContext'; // Assurez-vous que le chemin est correct

const Cart= () => {
  const { articles, total, ajouterArticle, supprimerArticle } = useContext(CartContext);

  return (
    <div>
      <h2>Votre Panier</h2>
      {articles.map((article) => (
        <div key={article.id}>
          <h3>{article.nom}</h3>
          <p>Quantité: {article.quantite}</p>
          <button onClick={() => supprimerArticle(article.id)}>Supprimer</button>
        </div>
      ))}
      <p>Total: {total}€</p>
      {/* Ajoutez plus de fonctionnalités selon vos besoins */}
    </div>
  );
};

export default Cart;
