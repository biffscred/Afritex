import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Supposons que vous vérifiez cela via le token

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/admin', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits', error);
        setIsLoggedIn(false);
      }
    };

    fetchProducts();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mt-4">
      <h1>Tableau de Bord Administrateur</h1>
      <div className="row">
        {Array.isArray(products) && products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card">
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">Prix : {product.price}</p>
                  <p className="card-text">Quantité en stock : {product.quantity}</p>
                  {/* Autres propriétés du produit selon vos besoins */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Pas de produits à afficher</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
