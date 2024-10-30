"use client";
import Footer from '@/components/footer';
import Header from '@/components/header';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchCartItems() {
      console.log("Début de la récupération des articles du panier.");
      try {
        const res = await fetch('/api/cart');
        const data = await res.json();

        if (res.ok) {
          console.log("Données du panier récupérées avec succès :", data);
          const groupedItems = data.reduce((acc, item) => {
            const existingItem = acc.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
              existingItem.quantity += item.quantity;
            } else {
              acc.push({ ...item });
            }
            return acc;
          }, []);

          setCartItems(groupedItems);
          calculateTotal(groupedItems);
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
    console.log("Total calculé pour le panier:", totalPrice);
    setTotal(totalPrice);
  };

  const handleRemoveItem = async (itemId) => {
    console.log("Tentative de suppression pour itemId:", itemId);
    try {
      const res = await fetch(`/api/cart/${itemId}`, { method: 'DELETE' });
      if (res.ok) {
        console.log("Article supprimé avec succès pour itemId:", itemId);
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        console.log("Nouveau contenu du panier après suppression :", updatedCartItems);
        setCartItems(updatedCartItems);
        calculateTotal(updatedCartItems);
        setMessage("Article supprimé avec succès !");
      } else {
        const data = await res.json();
        console.error("Erreur lors de la suppression de l'article :", data.message);
        setMessage("Erreur lors de la suppression de l'article.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article :", error);
      setMessage("Erreur de connexion au serveur.");
    }
  };

  const handleCheckout = async () => {
    console.log("Début de la procédure de checkout.");
    setLoading(true);
    const stripe = await stripePromise;

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems }),
      });

      const { id } = await response.json();
      console.log("ID de session de paiement Stripe reçu :", id);
      await stripe.redirectToCheckout({ sessionId: id });
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la création de la session de paiement :", error);
      setMessage("Erreur lors de la création de la session de paiement.");
      setLoading(false);
    }
  };

  return (
    <div className="cart-page bg-yellow-50 min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Votre panier</h1>
        {message && <p className="text-center text-red-500">{message}</p>}

        {cartItems.length === 0 ? (
          <p className="text-lg text-gray-700">Votre panier est vide.</p>
        ) : (
          <div className="cart-items space-y-6">
            {cartItems.map((item, index) => (
              <div key={`${item.id}-${index}`} className="cart-item flex items-center justify-between border-2 border-red-700 bg-yellow-200 p-4 rounded-lg shadow-md">
                <div className="item-info flex items-center space-x-4">
                  <img src={item.image || '/images/default.png'} alt={item.name} className="w-16 h-16 rounded-md border border-green-500" />
                  <div>
                    <p className="text-lg font-bold text-green-700">{item.name}</p>
                    <p className="text-gray-700">{item.price} €</p>
                    <p className="text-gray-700">Quantité : {item.quantity}</p>
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
          <button
            onClick={handleCheckout}
            disabled={loading}
            className={`mt-4 w-full bg-yellow-500 text-white py-2 rounded-md font-semibold hover:bg-yellow-600 transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Chargement..." : "Passer à la caisse"}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CartPage;
