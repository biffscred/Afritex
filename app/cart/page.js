"use client";
import Footer from '../../components/footer';
import Header from '../../components/header';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fonction pour récupérer les articles du panier
  const fetchCartItems = async () => {
    console.log("📢 Début de la récupération des articles du panier.");
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();

      console.log("✅ Réponse brute de l'API :", data);

      if (res.ok) {
        if (!Array.isArray(data.items)) {
          console.error("❌ Erreur: le format retourné par l'API n'est pas valide", data);
          return;
        }

        console.log("✅ Données du panier récupérées avec succès :", data.items);
        setCartItems(data.items); // Mettre à jour l'état avec les articles
        calculateTotal(data.items);
      } else {
        console.error("❌ Erreur lors du chargement du panier :", data.message);
      }
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des articles du panier :", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // ✅ Fonction pour calculer le total
  const calculateTotal = (items) => {
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    console.log("💰 Total calculé pour le panier:", totalPrice);
    setTotal(totalPrice);
  };

  // ✅ Fonction pour modifier la quantité d'un article
  const updateCartItem = async (itemId, action) => {
    try {
      const res = await fetch(`/api/cart/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("✅ Mise à jour réussie :", data);
        fetchCartItems(); // 🔄 Recharger le panier après mise à jour
      } else {
        console.error("❌ Erreur lors de la mise à jour :", data.message);
      }
    } catch (error) {
      console.error("❌ Erreur :", error);
    }
  };

  // ✅ Fonction pour ajouter un article au panier
  const addToCart = async (item) => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: item.productId || null,
          fabricId: item.fabricId || null,
          accessoryId: item.accessoryId || null,
          modelId: item.modelId || null,
          quantity: 1,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        fetchCartItems(); // 🔄 Recharger le panier après ajout
      } else {
        console.error("❌ Erreur lors de l'ajout :", data.message);
      }
    } catch (error) {
      console.error("❌ Erreur :", error);
    }
  };

  // ✅ Fonction pour supprimer un article du panier
  const removeFromCart = async (itemId) => {
    try {
      const res = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok) {
        console.log("✅ Article supprimé :", data);
        fetchCartItems(); // 🔄 Recharger le panier après suppression
      } else {
        console.error("❌ Erreur lors de la suppression :", data.message);
      }
    } catch (error) {
      console.error("❌ Erreur :", error);
    }
  };

  const clearCart = async () => {
    try {
      const res = await fetch('/api/cart/clear', { method: "DELETE" });
      if (res.ok) {
        setCartItems([]);
        setTotal(0);
      }
    } catch (error) {
      console.error("❌ Erreur :", error);
    }
  };


  // ✅ Fonction pour initier le paiement avec Stripe
  const handleCheckout = async () => {
    console.log("📢 Bouton Payer cliqué !");
    setLoading(true);

    try {
      // 🔍 Vérifier si l'utilisateur est connecté avant de continuer
      const session = await fetch("/api/auth/session");
      const userSession = await session.json();

      if (!userSession || !userSession.user) {
        console.error("❌ Utilisateur non authentifié.");
        setMessage("Vous devez être connecté pour payer.");
        setLoading(false);
        return;
      }

      const stripe = await stripePromise;
      console.log("🔍 Initialisation de Stripe réussie.");

      console.log("📤 Envoi des articles du panier à /api/checkout :", cartItems);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems }),
      });

      console.log("🔄 Statut de la réponse :", res.status);
      const data = await res.json();
      console.log("🔍 Réponse complète de /api/checkout :", data);

      if (!data.sessionId) {
        console.error("❌ Erreur : Session Stripe ID manquante !");
        setLoading(false);
        return;
      }

      console.log("✅ Session Stripe ID reçue :", data.sessionId);

      if (!stripe) {
        console.error("❌ Erreur : Stripe n'est pas initialisé !");
        return;
      }

      console.log("🔗 Redirection vers Stripe...");
      const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });

      if (result.error) {
        console.error("❌ Erreur Stripe :", result.error);
      }
    } catch (error) {
      console.error("❌ Erreur lors du paiement :", error);
      setMessage("Une erreur est survenue lors du paiement. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  
  
  return (
    <div className="cart-page bg-yellow-50 min-h-screen">
      
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Votre panier</h1>
        {message && <p className="text-center text-red-500">{message}</p>}

        {cartItems.length === 0 ? (
          <p className="text-lg text-gray-700">
            ❌ Panier vide ! <br />
            <strong>cartItems.length = {cartItems.length}</strong>
          </p>
        ) : (
          <div className="cart-items space-y-6">
            <p className="text-lg text-green-700">
              ✅ Panier affiché avec {cartItems.reduce((sum, item) => sum + item.quantity, 0)} articles
            </p>

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

                 {/* Boutons Incrémentation et Décrémentation */}
    <div className="flex items-center space-x-2">
      <button 
        onClick={() => updateCartItem(item.id, "decrement")} 
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
        disabled={item.quantity <= 1} // Désactiver si la quantité est 1
      >
        -
      </button>

      <button 
        onClick={() => updateCartItem(item.id, "increment")} 
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition"
      >
        +
      </button>
      <button onClick={() => removeFromCart(item.id)} className="bg-gray-500 text-white px-3 py-1 rounded">🗑️</button>
    </div>
              </div>
            ))}

          </div>
        )}

        {/* Résumé du panier */}
        <div className="cart-summary mt-8 p-4 bg-green-100 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-green-700">Total : {total.toFixed(2)} €</h3>
          <button onClick={clearCart} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800">Vider le panier</button>
          <button 
            onClick={handleCheckout} 
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Redirection en cours..." : "Payer"}
            {loading && <p className="text-blue-500 mt-2">Redirection vers Stripe...</p>}

          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CartPage;