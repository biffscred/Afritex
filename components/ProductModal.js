"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useCart } from "../app/context/CartContext";

const ProductModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [zoomedImage, setZoomedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const images = Array.isArray(product.productImages) ? product.productImages : [];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1,
    });
    onClose();
  };

  const handleZoom = (imgUrl) => setZoomedImage(imgUrl);
  const closeZoom = () => setZoomedImage(null);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getImageLabel = (url) => {
    if (!url) return "";
    if (url.includes("studio")) return "Vue studio";
    if (url.includes("zoom")) return "Zoom matière";
    if (url.includes("deco")) return "Mise en scène déco";
    if (url.includes("mode")) return "Mise en scène mode";
    return "Autre vue";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay principal - Modifié à z-[9990] */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-[9990]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal mobile-first - Modifié à z-[9991] */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[9991] shadow-2xl flex flex-col overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            {/* Bouton fermer de la modale - Modifié à z-[9992] */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-[9992] bg-white bg-opacity-90 hover:bg-opacity-100 text-black rounded-full p-2 shadow-lg border border-gray-200"
              aria-label="Fermer"
            >
              <X size={32} strokeWidth={3} />
            </button>

            {/* Contenu principal */}
            <div className="p-6 pb-32">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h2>
                <div
                  className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border cursor-zoom-in"
                  onClick={() => handleZoom(product.image)}
                  title="Voir en grand"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-3">{product.description}</p>
              </div>

              {/* Galerie secondaire avec flèches */}
              {images.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-base font-semibold text-gray-800">Inspiration d'utilisation</h3>
                  <p className="text-sm font-medium text-center text-gray-600 mb-1">
                    {getImageLabel(images[currentImageIndex]?.url)}
                  </p>
                  <div className="relative w-full h-48">
                    <Image
                      src={images[currentImageIndex].url}
                      alt={images[currentImageIndex].altText || `Vue ${currentImageIndex + 1}`}
                      fill
                      className="object-cover rounded-xl border cursor-zoom-in"
                      onClick={() => handleZoom(images[currentImageIndex].url)}
                    />
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-90 p-3 rounded-full shadow border hover:bg-opacity-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-90 p-3 rounded-full shadow border hover:bg-opacity-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                  <p className="text-center text-xs text-gray-400 mt-1">
                    {currentImageIndex + 1} / {images.length}
                  </p>
                </div>
              )}
            </div>

            {/* Footer sticky */}
            <div className="px-6 pb-6 pt-4 border-t bg-white sticky bottom-0 z-[9992] shadow-inner">
              <p className="text-xl font-bold text-gray-900">{product.price} €</p>
              <button
                className="mt-4 w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 font-semibold text-lg transition"
                onClick={handleAddToCart}
              >
                Ajouter au panier 🛒
              </button>
            </div>
          </motion.div>

          {/* Zoom plein écran - Modifié à z-[9998] et z-[9999] */}
          <AnimatePresence>
            {zoomedImage && (
              <>
                <motion.div
                  className="fixed inset-0 bg-black/80 z-[9998]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeZoom}
                />
                <motion.div
                  className="fixed inset-0 flex justify-center items-center z-[9999]"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                >
                  <div className="relative w-full max-w-3xl aspect-[4/3] mx-auto rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={zoomedImage}
                      alt="Zoom produit"
                      fill
                      className="object-contain bg-white"
                      loading="eager"
                    />

                    {/* Boutons du zoom modifiés à z-[10000] */}
                    {images.length > 1 && (
                      <button
                        onClick={() => {
                          const prevIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
                          setCurrentImageIndex(prevIndex);
                          setZoomedImage(images[prevIndex].url);
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-[10000] bg-white bg-opacity-90 p-3 rounded-full shadow border hover:bg-opacity-100"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                      </button>
                    )}

                    {images.length > 1 && (
                      <button
                        onClick={() => {
                          const nextIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
                          setCurrentImageIndex(nextIndex);
                          setZoomedImage(images[nextIndex].url);
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-[10000] bg-white bg-opacity-90 p-3 rounded-full shadow border hover:bg-opacity-100"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                    )}

                    <button
                      onClick={closeZoom}
                      className="absolute top-4 right-4 z-[10000] bg-white bg-opacity-90 hover:bg-opacity-100 text-black rounded-full p-2 shadow-lg border border-gray-300"
                      aria-label="Fermer le zoom"
                    >
                      <X size={36} strokeWidth={3} className="drop-shadow-[0_1.5px_0_white]" />
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default React.memo(ProductModal);