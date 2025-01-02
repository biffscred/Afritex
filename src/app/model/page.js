"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useCart } from "../context/CartContext"; // Contexte pour le panier

const ModelPage = () => {
  const [models, setModels] = useState([]); // Liste des modèles
  const [error, setError] = useState(null); // Gestion des erreurs
  const [showModal, setShowModal] = useState(false); // État pour afficher le modal
  const [selectedModel, setSelectedModel] = useState(null); // Modèle sélectionné pour détail
  const { addToCart, removeFromCart, cartItems } = useCart(); // Fonctions du contexte pour gérer le panier

  // Fonction pour récupérer les modèles depuis l'API
  const fetchModels = async () => {
    try {
      const response = await fetch("/api/model");
      if (!response.ok) throw new Error("Erreur lors de la récupération des modèles.");
      const data = await response.json();
      setModels(data);
    } catch (error) {
      console.error("❌ Erreur :", error.message);
      setError("Impossible de charger les modèles.");
    }
  };

  // Appel initial pour récupérer les modèles
  useEffect(() => {
    fetchModels();
  }, []);

  // Fonction pour afficher les détails d'un modèle dans un modal
  const handleShowModal = (model) => {
    setSelectedModel(model);
    setShowModal(true);
  };

  // Fonction pour fermer le modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedModel(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="container mx-auto py-12 bg-gradient-to-b from-gray-100 to-gray-200 flex-grow">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          Modèles Africains
        </h2>

        {/* Gestion des erreurs */}
        {error && <div className="text-center text-red-500 mb-4">{error}</div>}

        {/* Liste des modèles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {models.map((model) => (
            <div key={model.id} className="p-6 bg-white rounded-2xl shadow-lg">
              {model.image && (
                <div className="relative w-full h-56 mb-6 rounded overflow-hidden shadow-lg">
                  <Image
                    src={model.image}
                    alt={model.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg border-4 border-gray-300"
                  />
                </div>
              )}
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{model.name}</h3>
              <p className="text-gray-800 mb-2">{model.description || "Non spécifié"}</p>
              <p className="text-lg font-bold text-green-800 mb-4">Prix: {model.price}€</p>

              <div className="flex justify-between mt-4">
                <button
                  className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-yellow-600 transition-all"
                  onClick={() => handleShowModal(model)}
                >
                  Voir plus
                </button>
                <button
                  className="bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-green-700 transition-all"
                  onClick={() => addToCart(model)}
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal pour afficher les détails d'un modèle */}
        {showModal && selectedModel && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={handleCloseModal}
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedModel.name}</h3>
              {selectedModel.image && (
                <div className="w-full h-48 relative mb-4">
                  <Image
                    src={selectedModel.image}
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
                onClick={() => {
                  addToCart(selectedModel);
                  handleCloseModal();
                }}
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
