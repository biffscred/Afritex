"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useCart } from '../context/CartContext';

const FabricProductPage = () => {
  const [fabrics, setFabrics] = useState([]);
  const [cartItems, setCartItems] = useState([]); // État pour les articles du panier
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFabric, setSelectedFabric] = useState(null);
  const { itemCount } = useCart();

  // Fonction pour récupérer les articles du panier
  const fetchCartItems = async () => {
    try {
      const response = await fetch('/api/cart');
      const data = await response.json();
      setCartItems(data); // Remplir cartItems avec les articles du panier
    } catch (error) {
      console.error("Erreur lors de la récupération des articles du panier :", error);
    }
  };

  useEffect(() => {
    const fetchFabricProducts = async () => {
      try {
        const response = await fetch('/api/fabric');
        if (!response.ok) throw new Error("Erreur lors de la récupération des produits");
        const data = await response.json();
        setFabrics(data);
      } catch (error) {
        console.error("Erreur:", error.message);
        setError(error.message);
      }
    };

    fetchFabricProducts();
    fetchCartItems(); // Récupération initiale des articles du panier
  }, []);

  const handleShowModal = (fabric) => {
    setSelectedFabric(fabric);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFabric(null);
  };

  // Fonction pour ajouter un produit au panier côté serveur
  const addProductToServerCart = async (product) => {
    try {
      const response = await fetch('/api/cart');
      const currentCart = await response.json();
  
      const existingCartItem = currentCart.find(item => item.productId === product.id);
  
      if (existingCartItem) {
        const updatedQuantity = existingCartItem.quantity + 1;
        const res = await fetch(`/api/cart/${existingCartItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: updatedQuantity }),
        });
  
        if (!res.ok) throw new Error("Erreur lors de la mise à jour de la quantité du produit dans le panier.");
        console.log(`La quantité du produit ${product.name} a été mise à jour dans le panier.`);
      } else {
        const res = await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: product.id,
            quantity: 1,
            price: product.price,
            category: product.category,
          }),
        });
  
        if (!res.ok) throw new Error("Erreur lors de l'ajout du produit au panier.");
        console.log(`Le produit ${product.name} a été ajouté au panier.`);
      }

      // Mise à jour du panier après ajout
      fetchCartItems();
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la mise à jour du produit dans le panier:", error.message);
    }
  };

  // Fonction pour supprimer un produit spécifique du panier côté serveur
  const removeProductFromServerCart = async (itemId) => {
    try {
      const res = await fetch(`/api/cart/${itemId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Erreur lors de la suppression du produit");

      console.log(`Le produit avec l'ID ${itemId} a été supprimé du panier`);

      // Mise à jour de l'état du panier après suppression
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Erreur lors de la suppression du produit du panier:", error.message);
    }
  };

  
  

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="container mx-auto py-12 bg-gradient-to-b from-yellow-100 via-orange-50 to-yellow-200 flex-grow">
        <h2 className="text-4xl font-extrabold text-center text-yellow-900 mb-12">Produits de Tissus Africains</h2>
        

        

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
              {cartItems.map(item => (
                <button 
                  key={item.id}
                  className="bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg mt-4 hover:bg-red-700 transition-all"
                  onClick={() => removeProductFromServerCart(item.id)}
                >
                  Supprimer du panier
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default FabricProductPage;
