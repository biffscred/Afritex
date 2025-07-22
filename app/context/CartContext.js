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

  // 🔄 Récupère les articles du panier depuis l'API
  const { data: cartData, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await fetch("/api/cart");
      if (!response.ok) {
        throw new Error("❌ Erreur lors de la récupération du panier.");
      }
      const jsonData = await response.json();
      return jsonData.items || [];
    },
    staleTime: 0, // ⏱️ Toujours refetch si invalidé
  });

  const cartItems = cartData || [];

  // 🧮 Données calculées
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // ✅ Ajout d’un article au panier
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
        throw new Error(error.message || "❌ Erreur lors de l'ajout.");
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast.success("🎉 Article ajouté au panier !");
      queryClient.setQueryData(["cart"], (oldData) => (oldData ? [...oldData, data] : [data]));
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      toast.error(`Erreur : ${error.message}`);
    },
  });

  // ✅ Vidage du panier
  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/cart/clear", { method: "DELETE" });
      if (!response.ok) {
        throw new Error("❌ Erreur lors du vidage du panier.");
      }
      return response.json();
    },
    onSuccess: async () => {
      toast.success("🧹 Panier vidé !");
      queryClient.setQueryData(["cart"], []); 
      await queryClient.invalidateQueries({ queryKey: ["cart"], refetchType: "all" });
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
        clearCart: clearCartMutation.mutate,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook pour utiliser le panier
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé à l'intérieur d'un CartProvider.");
  }
  return context;
};

// Validation des props
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
