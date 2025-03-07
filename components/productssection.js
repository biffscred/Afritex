"use client"; // Next.js 14 App Router nécessite "use client" pour les composants interactifs

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Head from "next/head";

const ProductModal = ({ product, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative"
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-700 hover:text-black">
          <X size={24} />
        </button>
        <motion.div 
          className="w-full aspect-[4/3] overflow-hidden rounded-lg relative"
          whileHover={{ scale: 1.05 }}
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
              Image non disponible
            </div>
          )}
        </motion.div>
        <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-lg font-bold text-gray-900 mt-2">{product.price}€</p>
          <button 
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition"
          >
            Ajouter au panier 🛒
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Erreur lors de la récupération des produits");

        const data = await res.json();
        console.log("📦 Produits récupérés sur le front :", data);

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("❌ Erreur de récupération des produits :", error);
        setError("Impossible de charger les produits.");
        setProducts([]); // Empêche l'erreur .map()
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {/* SEO */}
      <Head>
        <title>Nos Produits</title>
        <meta name="description" content="Découvrez nos magnifiques tissus africains." />
      </Head>

      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
            Nos Produits
          </h2>

          {error && <p className="text-center text-red-500 font-semibold py-4">{error}</p>}
          {loading ? (
            <p className="text-center text-gray-700 font-semibold py-4">Chargement des produits...</p>
          ) : (
            <>
              <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.isArray(products) && products.length > 0 ? (
                  products.map((product) => (
                    <motion.div 
                      key={product.id} 
                      className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <div className="w-full aspect-[4/5] overflow-hidden rounded-t-lg relative">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover rounded-t-lg transition-transform duration-500 hover:scale-110"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
                            Image non disponible
                          </div>
                        )}
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
                        <p className="text-md font-bold text-gray-700 mt-2">{product.price} €</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">Aucun produit trouvé.</p>
                )}
              </article>
            </>
          )}
        </div>

        {/* Modal Produit */}
        {selectedProduct && <ProductModal product={selectedProduct} isOpen={true} onClose={() => setSelectedProduct(null)} />}
      </section>
    </>
  );
}
