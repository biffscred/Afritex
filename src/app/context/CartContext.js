"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";

// Création du contexte du panier
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); // Liste des articles du panier
  const [itemCount, setItemCount] = useState(0); // Nombre total d'articles
  const [totalPrice, setTotalPrice] = useState(0); // Prix total

  // Calcul dynamique des totaux avec useMemo
  const calculatedItemCount = useMemo(
    () => cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems]
  );

  const calculatedTotalPrice = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  // Met à jour `itemCount` et `totalPrice` chaque fois que `cartItems` change
  useEffect(() => {
    setItemCount(calculatedItemCount);
    setTotalPrice(calculatedTotalPrice);
  }, [calculatedItemCount, calculatedTotalPrice]);

  // Charge les articles du panier depuis le backend au montage
  const loadCartFromServer = async () => {
    try {
      const response = await fetch("/api/cart");
      if (!response.ok) {
        console.error("Erreur lors de la récupération du panier");
        return;
      }
      const data = await response.json();
      const formattedData = data.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category: item.category,
      }));
      setCartItems(formattedData); // Synchronise le contexte avec les données du backend
      console.log("✅ Panier récupéré depuis le serveur :", formattedData);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération du panier :", error);
    }
  };

  // Appel au chargement initial du panier depuis le serveur
  useEffect(() => {
    console.log("🚀 Chargement initial du panier depuis le serveur");
    loadCartFromServer();
  }, []);

  // Ajoute un article au panier ou met à jour sa quantité
  const addToCart = async (newItem) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: newItem.id,
          quantity: 1,
          category: newItem.category,
        }),
      });

      if (!response.ok) {
        console.error("Erreur lors de l'ajout au panier :", response.statusText);
        return;
      }

      const updatedItem = await response.json();

      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === updatedItem.id);
        if (existingItem) {
          return prevItems.map((item) =>
            item.id === updatedItem.id ? { ...item, quantity: updatedItem.quantity } : item
          );
        } else {
          return [...prevItems, updatedItem];
        }
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
    }
  };

  // Supprime un article ou diminue sa quantité
  const removeFromCart = async (itemId) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Erreur lors de la suppression de l'article :", response.statusText);
        return;
      }

      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article :", error);
    }
  };

  // Vide complètement le panier
  const clearCart = async () => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Erreur lors du vidage du panier :", response.statusText);
        return;
      }

      setCartItems([]); // Vide localement après confirmation du backend
    } catch (error) {
      console.error("Erreur lors du vidage du panier :", error);
    }
  };

  // Retourne le contexte avec les valeurs nécessaires
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        itemCount,
        totalPrice,
        loadCartFromServer, // Expose la fonction pour un appel manuel si nécessaire
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook pour accéder au contexte du panier
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCart doit être utilisé à l'intérieur d'un CartProvider."
    );
  }
  return context;
};
