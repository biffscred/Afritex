"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Création du contexte du panier
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); // Liste des articles du panier
  const [itemCount, setItemCount] = useState(0); // Nombre total d'articles
  const [totalPrice, setTotalPrice] = useState(0); // Prix total

  // Met à jour `itemCount` et `totalPrice` à chaque changement de `cartItems`
  useEffect(() => {
    const totalQuantity = cartItems.reduce((count, item) => count + item.quantity, 0);
    const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    setItemCount(totalQuantity);
    setTotalPrice(totalCost);
  }, [cartItems]);

  // Charge les articles du panier depuis le backend
  const loadCartFromServer = async () => {
    try {
      const response = await fetch("/api/cart");
      if (!response.ok) {
        console.error("Erreur lors de la récupération du panier");
        return;
      }
      const data = await response.json();
      setCartItems(data); // Synchronise le contexte avec les données du backend
      console.log("Panier récupéré depuis le serveur :", data);
    } catch (error) {
      console.error("Erreur lors de la récupération du panier :", error);
    }
  };

  // Ajoute un article au panier ou met à jour sa quantité
  const addToCart = (newItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  // Supprime un article ou diminue sa quantité
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevItems.filter((item) => item.id !== itemId);
      }
    });
  };

  // Vide complètement le panier
  const clearCart = () => {
    setCartItems([]);
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
        loadCartFromServer, // Expose la fonction pour charger les données depuis le serveur
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
