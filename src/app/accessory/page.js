"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useCart } from "../context/CartContext";

const AccessoryProductPage = () => {
  const [accessories, setAccessories] = useState([]); // Produits accessoires
  const [cartItems, setCartItems] = useState([]); // Articles dans le panier
  const [error, setError] = useState(null); // Gestion des erreurs
  const [showModal, setShowModal] = useState(false); // État pour le modal
  const [selectedAccessory, setSelectedAccessory] = useState(null); // Produit sélectionné
  const { itemCount } = useCart(); // Contexte pour le panier

  // Fonction pour récupérer les articles du panier
  const fetchCartItems = async () => {
    try {
      const response = await fetch("/api/cart");
      if (!response.ok) throw new Error("Erreur lors de la récupération du panier.");
      const data = await response.json();
      console.log("✅ Articles du panier :", data);
      setCartItems(data);
    } catch (error) {
      console.error("❌ Erreur panier :", error.message);
      setError("Impossible de charger les articles du panier.");
    }
  };

  // Récupération des produits et des articles du panier au montage
  useEffect(() => {
    const fetchAccessoryProducts = async () => {
      try {
        const response = await fetch("/api/accessory");
        if (!response.ok) throw new Error("Erreur lors de la récupération des produits.");
        const data = await response.json();
        console.log("✅ Produits accessoires récupérés :", data);
        setAccessories(data);
      } catch (error) {
        console.error("❌ Erreur produits :", error.message);
        setError("Impossible de charger les produits.");
      }
    };

    fetchAccessoryProducts();
    fetchCartItems();
  }, []);

  // Fonction pour ouvrir le modal
  const handleShowModal = (accessory) => {
    console.log("🛠️ Ouverture du modal pour :", accessory);
    setSelectedAccessory(accessory);
    setShowModal(true);
  };

  // Fonction pour fermer le modal
  const handleCloseModal = () => {
    console.log("🛠️ Fermeture du modal");
    setShowModal(false);
    setSelectedAccessory(null);
  };

  // Fonction pour ajouter un produit au panier
  const addProductToServerCart = async (product) => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
          category: "ACCESSORY", // Catégorie de produit
        }),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message || "Erreur serveur.");
      }

      console.log(`✅ Produit ajouté : ${product.name}`);
      fetchCartItems(); // Mise à jour du panier
    } catch (error) {
      console.error("❌ Erreur ajout panier :", error.message);
      setError("Erreur lors de l'ajout au panier.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="container mx-auto py-12 bg-gradient-to-b from-blue-100 via-blue-50 to-blue-200 flex-grow">
        <h2 className="text-4xl font-extrabold text-center text-blue-900 mb-12">
          Accessoires Africains
        </h2>

        {/* Gestion des erreurs */}
        {error && <div className="text-center text-red-500 mb-4">{error}</div>}

        {/* Liste des produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
          {accessories.map((accessory) => (
            <div key={accessory.id} className="p-6 bg-white rounded-2xl shadow-lg">
              {accessory.image && (
                <div className="relative w-full h-56 mb-6 rounded overflow-hidden shadow-lg">
                  <Image
                    src={accessory.image}
                    alt={accessory.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg border-4 border-blue-500"
                  />
                </div>
              )}
              <h3 className="text-2xl font-semibold text-blue-900 mb-2">{accessory.name}</h3>
              <p className="text-gray-800 mb-2">{accessory.description || "Non spécifié"}</p>
              <p className="text-lg font-bold text-green-800 mb-4">Prix: {accessory.price}€</p>

              <div className="flex justify-between mt-4">
                <button
                  className="bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-blue-800 transition-all"
                  onClick={() => handleShowModal(accessory)}
                >
                  Voir plus
                </button>
                <button
                  className="bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-green-700 transition-all"
                  onClick={() => addProductToServerCart(accessory)}
                >
                  Acheter
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Voir Plus */}
        {showModal && selectedAccessory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={handleCloseModal}
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">{selectedAccessory.name}</h3>
              {selectedAccessory.image && (
                <div className="w-full h-48 relative mb-4">
                  <Image
                    src={selectedAccessory.image}
                    alt={selectedAccessory.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              )}
              <p className="text-gray-800 mb-2">{selectedAccessory.description}</p>
              <p className="text-lg font-bold text-green-800">Prix: {selectedAccessory.price}€</p>
              <button
                className="bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg mt-4 hover:bg-green-700 transition-all"
                onClick={() => addProductToServerCart(selectedAccessory)}
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AccessoryProductPage;
