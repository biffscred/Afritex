'use client';

import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    // Met à jour le compteur d'articles chaque fois que le panier change
    setItemCount(cartItems.reduce((count, item) => count + item.quantity, 0));
  }, [cartItems]);

  const addToCart = (newItem) => {
    setCartItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook pour utiliser le contexte du panier
export const useCart = () => useContext(CartContext);
