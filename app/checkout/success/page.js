"use client";
import { useEffect } from "react";
import { useCart } from "./context/CartContext";
import Link from "next/link";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart(); // 🧹 Vide le panier dès l’arrivée sur la page
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-green-900 p-6">
      <h1 className="text-4xl font-bold mb-4">Merci pour votre achat !</h1>
      <p className="text-lg mb-8">Votre paiement a été traité avec succès.</p>
      <Link href="/" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-200">
        Retour à la boutique
      </Link>
    </div>
  );
}
