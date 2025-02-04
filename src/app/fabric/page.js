"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useCart } from "../context/CartContext";

const FabricProductPage = () => {
  const [fabrics, setFabrics] = useState([]); // Produits tissus
  const [cartItems, setCartItems] = useState([]); // Articles dans le panier
  const [error, setError] = useState(null); // Gestion des erreurs
  const [showModal, setShowModal] = useState(false); // État pour le modal
  const [selectedFabric, setSelectedFabric] = useState(null); // Produit sélectionné
  const { itemCount } = useCart(); // Contexte pour le panier
  const [successMessage, setSuccessMessage] = useState("");

  const fetchCartItems = async () => {
    try {
      console.log("🔄 Début de la récupération du panier...");
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
  
  // Récupération des produits et des articles du panier au montage
  useEffect(() => {
    const fetchFabricProducts = async () => {
      try {
        console.log("🔄 Début de la récupération des produits tissus...");
        const response = await fetch("/api/fabric");
  
        if (!response.ok) {
          console.error("❌ Erreur HTTP lors de la récupération des produits tissus :", response.status);
          throw new Error("Erreur lors de la récupération des produits.");
        }
  
        const data = await response.json();
        console.log("✅ Produits tissus récupérés :", data);
        setFabrics(data);
      } catch (error) {
        console.error("❌ Erreur produits :", error.message);
        setError("Impossible de charger les produits.");
      }
    };
  
    fetchFabricProducts();
    fetchCartItems();
  }, []);
  
  // Fonction pour ouvrir le modal
  const handleShowModal = (fabric) => {
    console.log("🛠️ Ouverture du modal pour :", fabric);
    setSelectedFabric(fabric);
    setShowModal(true);
  };
  
  // Fonction pour fermer le modal
  const handleCloseModal = () => {
    console.log("🛠️ Fermeture du modal");
    setShowModal(false);
    setSelectedFabric(null);
  };
  
  // Fonction pour ajouter un produit au panier
  const addProductToServerCart = async (Fabric) => {
    console.log("🛒 Clic sur le bouton Acheter !");
    if (!Fabric) {
      console.error("❌ Aucun tissu sélectionné !");
      return;
    }
  
    const data = {
      fabricId: Fabric.id, // 🛠️ Utiliser `fabricId` au lieu de `productId`
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

       setSuccessMessage("🎉 Produit ajouté au panier !");
    
    setTimeout(() => {
      setSuccessMessage(""); // Efface le message après 3 secondes
    }, 3000);
  
      fetchCartItems(); // Mise à jour du panier
    } catch (error) {
      console.error("❌ Erreur ajout panier :", error.message);
      setError("Erreur lors de l'ajout au panier.");
    }
  };
  
  // Fonction pour supprimer un produit spécifique du panier
  const removeProductFromServerCart = async (itemId) => {
    console.log(`🗑️ Tentative de suppression du produit ID : ${itemId}`);
  
    try {
      const res = await fetch(`/api/cart/${itemId}`, { method: "DELETE" });
  
      if (!res.ok) {
        console.error("❌ Erreur HTTP lors de la suppression :", res.status);
        throw new Error("Erreur serveur lors de la suppression.");
      }
  
      console.log(`✅ Produit supprimé du panier, ID : ${itemId}`);
      setCartItems(cartItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("❌ Erreur suppression panier :", error.message);
      setError("Erreur lors de la suppression du produit.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="container mx-auto py-12 bg-gradient-to-b from-yellow-100 via-orange-50 to-yellow-200 flex-grow">
        <h2 className="text-4xl font-extrabold text-center text-yellow-900 mb-12">
          Produits de Tissus Africains
        </h2>
        {successMessage && (
  <div className="bg-green-500 text-white p-3 rounded-md text-center mb-4">
    {successMessage}
  </div>
)}
        {/* Gestion des erreurs */}
        {error && <div className="text-center text-red-500 mb-4">{error}</div>}

        {/* Liste des produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
          {fabrics.map((fabric) => (
            <div key={fabric.id} className="p-6 bg-white rounded-2xl shadow-lg">
              {fabric.image && (
                <div className="relative w-full h-56 mb-6 rounded overflow-hidden shadow-lg">
                  <Image
                    src={fabric.image}
                    alt={fabric.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg border-4 border-yellow-500"
                  />
                </div>
              )}
              <h3 className="text-2xl font-semibold text-yellow-900 mb-2">{fabric.name}</h3>
              <p className="text-gray-800 mb-2">{fabric.description || "Non spécifié"}</p>
              <p className="text-lg font-bold text-green-800 mb-4">Prix: {fabric.price}€</p>

              <div className="flex justify-between mt-4">
                <button
                  className="bg-yellow-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-yellow-800 transition-all"
                  onClick={() => handleShowModal(fabric)}
                >
                  Voir plus
                </button>
                <button
                  className="bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-green-700 transition-all"
                  onClick={() => addProductToServerCart(fabric)}
                >
                  Acheter
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Voir Plus */}
        {showModal && selectedFabric && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={handleCloseModal}
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold text-yellow-900 mb-4">{selectedFabric.name}</h3>
              {selectedFabric.image && (
                <div className="w-full h-48 relative mb-4">
                  <Image
                    src={selectedFabric.image}
                    alt={selectedFabric.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              )}
              <p className="text-gray-800 mb-2">{selectedFabric.description}</p>
              <p className="text-lg font-bold text-green-800">Prix: {selectedFabric.price}€</p>
              <button
                className="bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg mt-4 hover:bg-green-700 transition-all"
                onClick={() => addProductToServerCart(selectedFabric)}
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

export default FabricProductPage;
