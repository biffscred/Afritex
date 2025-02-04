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

  // Fonction pour récupérer les articles du panier
  useEffect(() => {
    async function fetchCartItems() {
      console.log("📢 Début de la récupération des articles du panier.");
      try {
        const res = await fetch('/api/cart');
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
    }

    fetchCartItems();
  }, []);

  // Fonction pour calculer le total
  const calculateTotal = (items) => {
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    console.log("💰 Total calculé pour le panier:", totalPrice);
    setTotal(totalPrice);
  };

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
  
        // 🔹 Mettre à jour immédiatement l'état du panier
        setCartItems((prevItems) => {
          const updatedItems = prevItems
            .map((item) =>
              item.id === itemId
                ? { ...item, quantity: action === "increment" ? item.quantity + 1 : item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0); // Supprimer si quantité = 0
  
          // 🔹 Recalculer le total immédiatement
          const newTotal = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
          setTotal(newTotal);
  
          return updatedItems;
        });
  
        // 🔹 Puis recharger le panier pour garantir la synchro avec l'API
        setTimeout(fetchCartItems, 200);
      } else {
        console.error("❌ Erreur lors de la mise à jour :", data.message);
      }
    } catch (error) {
      console.error("❌ Erreur :", error);
    }
  };
  


  // Fonction pour ajouter un article au panier
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

      const updateCartItem = async (itemId, action) => {
        try {
          const res = await fetch(`/api/cart/${itemId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action }), // "increment" ou "decrement"
          });
      
          const data = await res.json();
          if (res.ok) {
            console.log("✅ Mise à jour réussie :", data);
      
            // 🔹 Mettre à jour la quantité en local
            setCartItems((prevItems) =>
              prevItems
                .map((item) =>
                  item.id === itemId
                    ? { ...item, quantity: action === "increment" ? item.quantity + 1 : item.quantity - 1 }
                    : item
                )
                .filter((item) => item.quantity > 0) // Supprimer si la quantité atteint 0
            );
          } else {
            console.error("❌ Erreur lors de la mise à jour :", data.message);
          }
        } catch (error) {
          console.error("❌ Erreur :", error);
        }
      };
      const data = await res.json();
      if (res.ok) {
        fetchCartItems(); // Recharge le panier après ajout
      } else {
        console.error("❌ Erreur lors de l'ajout :", data.message);
      }
    } catch (error) {
      console.error("❌ Erreur :", error);
    }
  };

  // Fonction pour supprimer un article du panier
  const removeFromCart = async (itemId) => {
    try {
      const res = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE",
      });
  
      const data = await res.json();
      if (res.ok) {
        console.log("✅ Article supprimé :", data);
  
        // 🔹 Supprimer l'article en local pour éviter un affichage erroné
        setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
  
        // 🔹 Optionnel : Vérifier avec la console
        console.log("📦 Nouveau panier après suppression :", cartItems);
      } else {
        console.error("❌ Erreur lors de la suppression :", data.message);
      }
    } catch (error) {
      console.error("❌ Erreur :", error);
    }
  };
  

  // Fonction pour initier le paiement avec Stripe
  const handleCheckout = async () => {
    setLoading(true);
  
    try {
      const stripe = await stripePromise;
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems }),
      });
  
      const data = await res.json();
  
      // ✅ Vérifier que `data.id` existe bien
      console.log("🔍 Session Stripe ID reçue :", data.id);
  
      if (!data.id) {
        console.error("❌ Erreur : Session Stripe ID manquante !");
        setLoading(false);
        return;
      }
  
      // ✅ Redirection vers Stripe
      const result = await stripe.redirectToCheckout({ sessionId: data.id });
  
      if (result.error) {
        console.error("❌ Erreur Stripe :", result.error);
      }
    } catch (error) {
      console.error("❌ Erreur lors du paiement :", error);
    } finally {
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
    </div>
              </div>
            ))}

          </div>
        )}

        {/* Résumé du panier */}
        <div className="cart-summary mt-8 p-4 bg-green-100 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-green-700">Total : {total.toFixed(2)} €</h3>
          <button 
            onClick={handleCheckout} 
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Redirection en cours..." : "Payer"}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CartPage;