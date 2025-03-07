"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useCart } from "../context/CartContext";

const ModelPage = () => {
  const [models, setModels] = useState([]); // Produits modèles
  const [cartItems, setCartItems] = useState([]); // Articles dans le panier
  const [error, setError] = useState(null); // Gestion des erreurs
  const [showModal, setShowModal] = useState(false); // État pour le modal
  const [selectedModel, setSelectedModel] = useState(null); // Produit sélectionné
  const { itemCount } = useCart(); // Contexte pour le panier
  const [successMessage, setSuccessMessage] = useState("");

  // Récupération des articles du panier
  const fetchCartItems = async () => {
    try {
      console.log("🔄 Récupération du panier...");
      const response = await fetch("/api/cart");

      if (!response.ok) {
        console.error("❌ Erreur HTTP lors de la récupération du panier :", response.status);
        throw new Error("Erreur lors de la récupération du panier.");
      }

      const data = await response.json();
      console.log("✅ Articles du panier récupérés :", data);
      setCartItems(data);
    } catch (error) {
      console.error("❌ Erreur panier :", error.message);
      setError("Impossible de charger les articles du panier.");
    }
  };

  // Récupération des produits modèles
  useEffect(() => {
    const fetchModels = async () => {
      try {
        console.log("🔄 Récupération des modèles...");
        const response = await fetch("/api/model");

        if (!response.ok) {
          console.error("❌ Erreur HTTP lors de la récupération des modèles :", response.status);
          throw new Error("Erreur lors de la récupération des modèles.");
        }

        const data = await response.json();
        console.log("✅ Modèles récupérés :", data);
        setModels(data);
      } catch (error) {
        console.error("❌ Erreur modèles :", error.message);
        setError("Impossible de charger les modèles.");
      }
    };

    fetchModels();
    fetchCartItems();
  }, []);

  // Fonction pour ouvrir le modal
  const handleShowModal = (model) => {
    console.log("🛠️ Ouverture du modal pour :", model);
    setSelectedModel(model);
    setShowModal(true);
  };

  // Fonction pour fermer le modal
  const handleCloseModal = () => {
    console.log("🛠️ Fermeture du modal");
    setShowModal(false);
    setSelectedModel(null);
  };

  // Fonction pour ajouter un modèle au panier
  const addProductToServerCart = async (model) => {
    console.log("🛒 Clic sur le bouton Acheter !");
    if (!model || !model.id) {
      console.error("❌ Aucun modèle sélectionné !");
      return;
    }

    const data = {
      modelId: model.id, // 🛠️ Utiliser `modelId` au lieu de `productId`
      quantity: 1,
    };

    console.log("📤 Envoi des données au serveur :", data);

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        console.error("❌ Erreur serveur :", errorResponse);
        throw new Error(errorResponse.message || "Erreur serveur.");
      }

      const responseData = await res.json();
      console.log("✅ Produit ajouté au panier :", responseData);

      setSuccessMessage("🎉 Modèle ajouté au panier !");
      setTimeout(() => {
        setSuccessMessage(""); // Efface le message après 3 secondes
      }, 3000);

      fetchCartItems(); // Mise à jour du panier
    } catch (error) {
      console.error("❌ Erreur ajout panier :", error.message);
      setError("Erreur lors de l'ajout au panier.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
     

      <main className="container mx-auto py-12 bg-gradient-to-b from-blue-100 via-white to-blue-200 flex-grow">
        <h2 className="text-4xl font-extrabold text-center text-blue-900 mb-12">
          Modèles Africains
        </h2>

        {successMessage && (
          <div className="bg-green-500 text-white p-3 rounded-md text-center mb-4">
            {successMessage}
          </div>
        )}

        {/* Gestion des erreurs */}
        {error && <div className="text-center text-red-500 mb-4">{error}</div>}

        {/* Liste des modèles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
          {models.map((model) => (
            <div key={model.id} className="p-6 bg-white rounded-2xl shadow-lg">
              {model.product?.image && (
                <div className="relative w-full h-56 mb-6 rounded overflow-hidden shadow-lg">
                  <Image
                    src={model.product.image}
                    alt={model.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg border-4 border-blue-500"
                  />
                </div>
              )}
              <h3 className="text-2xl font-semibold text-blue-900 mb-2">{model.name}</h3>
              <p className="text-gray-800 mb-2">{model.description || "Non spécifié"}</p>
              <p className="text-lg font-bold text-green-800 mb-4">Prix: {model.price}€</p>

              <div className="flex justify-between mt-4">
                <button
                  className="bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-blue-800 transition-all"
                  onClick={() => handleShowModal(model)}
                >
                  Voir plus
                </button>
                <button
                  className="bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-green-700 transition-all"
                  onClick={() => addProductToServerCart(model)}
                >
                  Acheter
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Voir Plus */}
        {showModal && selectedModel && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={handleCloseModal}
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">{selectedModel.name}</h3>
              {selectedModel.product?.image && (
                <div className="w-full h-48 relative mb-4">
                  <Image
                    src={selectedModel.product.image}
                    alt={selectedModel.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              )}
              <p className="text-gray-800 mb-2">{selectedModel.description}</p>
              <p className="text-lg font-bold text-green-800">Prix: {selectedModel.price}€</p>
              <button
                className="bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg mt-4 hover:bg-green-700 transition-all"
                onClick={() => addProductToServerCart(selectedModel)}
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

export default ModelPage;
