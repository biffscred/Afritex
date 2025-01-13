"use client";

import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

// Création du contexte du panier
const CartContext = createContext();

// Fournisseur du panier
export function CartProvider({ children }) {
  const queryClient = useQueryClient();

  // Récupère les articles du panier depuis le serveur
  const { data: cartItems = [], isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await fetch("/api/cart");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du panier.");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes de cache
  });

  // Calcul des totaux
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Mutation pour ajouter un article au panier
  const addToCartMutation = useMutation({
    mutationFn: async (newItem) => {
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
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de l'ajout au panier.");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Article ajouté au panier !");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      toast.error(`Erreur : ${error.message}`);
    },
  });

  // Mutation pour supprimer un article
  const removeFromCartMutation = useMutation({
    mutationFn: async (itemId) => {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'article.");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Article supprimé !");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      toast.error(`Erreur : ${error.message}`);
    },
  });

  // Mutation pour vider le panier
  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/cart", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors du vidage du panier.");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Panier vidé !");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      toast.error(`Erreur : ${error.message}`);
    },
  });

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        isError,
        itemCount,
        totalPrice,
        addToCart: addToCartMutation.mutate,
        removeFromCart: removeFromCartMutation.mutate,
        clearCart: clearCartMutation.mutate,
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

// Validation des props avec PropTypes
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
