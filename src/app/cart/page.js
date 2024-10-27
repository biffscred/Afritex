"use client";
import Footer from '@/components/footer';
import Header from '@/components/header';
import { useEffect, useState } from 'react';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const res = await fetch('/api/cart');
        const data = await res.json();

        if (res.ok) {
          setCartItems(data);
          calculateTotal(data);
        } else {
          console.error("Erreur lors du chargement du panier :", data.message);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des articles du panier :", error);
      }
    }

    fetchCartItems();
  }, []);

  const calculateTotal = (items) => {
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalPrice);
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const res = await fetch(`/api/cart/${itemId}`, { method: 'DELETE' });
      if (res.ok) {
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCartItems);
        calculateTotal(updatedCartItems); // Mise à jour du total
      } else {
        const data = await res.json();
        console.error("Erreur lors de la suppression de l'article :", data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article :", error);
    }
  };

  return (
    <div className="cart-page bg-yellow-50 min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Votre panier</h1>

        {cartItems.length === 0 ? (
          <p className="text-lg text-gray-700">Votre panier est vide.</p>
        ) : (
          <div className="cart-items space-y-6">
            {cartItems.map((item, index) => (
              <div key={`${item.id}-${index}`} className="cart-item flex items-center justify-between border-2 border-red-700 bg-yellow-200 p-4 rounded-lg shadow-md">
                <div className="item-info flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md border border-green-500" />
                  <div>
                    <p className="text-lg font-bold text-green-700">{item.name}</p>
                    <p className="text-gray-700">{item.price} €</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 transition duration-200"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="cart-summary mt-8 p-4 bg-green-100 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-green-700">Total : {total.toFixed(2)} €</h3>
          <button className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-md font-semibold hover:bg-yellow-600 transition duration-200">
            Passer à la caisse
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CartPage;
