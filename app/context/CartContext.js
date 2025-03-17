"use client";

import { createContext, useContext, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

// Création du contexte du panier
const CartContext = createContext();

// Fournisseur du panier
export function CartProvider({ children }) {
  const queryClient = useQueryClient();

  // 🔄 Récupère les articles du panier depuis le serveur
  const { data: cartData, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await fetch("/api/cart");
      if (!response.ok) {
        throw new Error("❌ Erreur lors de la récupération du panier.");
      }
      const jsonData = await response.json();

      console.log("📦 Format JSON retourné par `/api/cart` :", jsonData);
  
      return jsonData.items || [];
    },
    staleTime: 1000 * 60 * 5, // Cache 5 minutes
  });

  const cartItems = cartData || []; // Par défaut, un tableau vide

  // 🧮 Calcul des totaux
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  console.log("📊 Nombre total d'articles :", itemCount);
  console.log("💰 Prix total des articles :", totalPrice);

  // ✅ Mutation pour ajouter un produit au panier
  const addToCartMutation = useMutation({
    mutationFn: async (newItem) => {
      console.log("🛒 Tentative d'ajout au panier :", newItem);
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
        throw new Error(error.message || "❌ Erreur lors de l'ajout au panier.");
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log("✅ Produit ajouté, réponse du serveur :", data);
      toast.success("🎉 Article ajouté au panier !");
      
      // 🟢 Met à jour immédiatement le panier dans React Query
      queryClient.setQueryData(["cart"], (oldData) => {
        const updatedData = oldData ? [...oldData, data] : [data];
    console.log("🟡 Mise à jour immédiate du panier (setQueryData) :", updatedData);
        return oldData ? [...oldData, data] : [data];
      });

      // 🔄 Force la mise à jour des données du panier
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      console.error("❌ Erreur lors de l'ajout au panier :", error.message);
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
        addToCart: addToCartMutation.mutate, // Utilisation correcte
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 🔗 Hook pour utiliser le panier
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé à l'intérieur d'un CartProvider.");
  }
  return context;
};

// ✅ Validation des props
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
