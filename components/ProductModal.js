"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useCart } from "../app/context/CartContext";

const ProductModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [zoomedImage, setZoomedImage] = useState(null);

  if (!isOpen || !product) return null;
 const images = Array.isArray(product.productImages) ? product.productImages : [];

  console.log("Images associées à ce produit :", images); 
  images.forEach(img => console.log("Image URL test:", img.url));

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay principal */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Slide-in panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            {/* Close button */}
            <button
  onClick={onClose}
  className="absolute top-4 right-4 z-50 bg-white bg-opacity-90 hover:bg-opacity-100 text-black rounded-full p-2 shadow-lg border border-gray-200"
  aria-label="Fermer"
>
  <X size={32} strokeWidth={3} />
</button>

            {/* Images gallery */}
            <div className="p-6 pb-2">
              {/* Image principale (zoomable) */}
              <div
                className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border mb-3 cursor-zoom-in"
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
              
              {/* Galerie d'images secondaires (zoomables) */}
              
{/* Galerie d'images secondaires (zoomables) */}
<div className="flex gap-2 mb-2 overflow-x-auto">
  {images.map((img) => (
    <div
      key={img.url}
      className="relative w-24 h-16 rounded-lg overflow-hidden border flex-shrink-0 cursor-zoom-in"
      onClick={() => handleZoom(img.url)}
      title="Voir en grand"
    >
      <Image
        src={img.url}
        alt={img.altText || `Vue ${img.url}`}
        fill
        className="object-cover hover:scale-105 transition-transform"
        loading="lazy"
      />
    </div>
  ))}
</div>

              {/* Mockup image (optionnel, zoomable aussi) */}
              {product.mockupImage && (
                <div
                  className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border mb-2 cursor-zoom-in"
                  onClick={() => handleZoom(product.mockupImage)}
                  title="Voir en grand"
                >
                  <Image
                    src={product.mockupImage}
                    alt={`Mockup de ${product.name}`}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
            {/* Infos produit + bouton */}
            <div className="px-6 pb-8 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mt-2">{product.name}</h2>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="text-xl font-bold text-gray-900 mt-4">{product.price} €</p>
              </div>
              <button
                className="mt-6 w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 font-semibold text-lg transition"
                onClick={handleAddToCart}
              >
                Ajouter au panier 🛒
              </button>
            </div>
          </motion.div>

          {/* --- Lightbox zoom plein écran --- */}
          <AnimatePresence>
            {zoomedImage && (
              <>
                {/* Overlay lightbox */}
                <motion.div
                  className="fixed inset-0 bg-black/80 z-[100]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeZoom}
                />
                <motion.div
                  className="fixed inset-0 flex justify-center items-center z-[110]"
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
                   <button
  onClick={closeZoom}
  className="absolute top-4 right-4 z-[120] bg-white bg-opacity-90 hover:bg-opacity-100 text-black rounded-full p-2 shadow-lg border border-gray-300"
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
