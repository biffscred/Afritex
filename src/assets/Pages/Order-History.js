import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Remplacer par l'URL de votre API pour récupérer l'historique des commandes
    axios.get('https://127.0.0.1:8000/order/user')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération de l'historique des commandes', error");
      });
  }, []);

  return (
    <div className="order-history-page">
      <h1>Historique des Commandes</h1>
      {orders.length === 0 ? (
        <p>Aucune commande passée pour le moment.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div key={index} className="order-item">
              <h3>Commande #{order.id}</h3>
              <p>Date: {order.date}</p>
              <p>Total: {order.total} €</p>
              {/* Autres détails de la commande */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
