"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

const ProductModal = ({ product, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-black"
          aria-label="Fermer la modale"
        >
          <X size={24} />
        </button>
        <div className="w-full aspect-[4/3] overflow-hidden rounded-lg relative">
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
        </div>
        <div className="mt-4 text-center">
          <h2 id="modal-title" className="text-xl font-semibold">
            {product.name}
          </h2>
          <p id="modal-description" className="text-gray-600 mt-2">
            {product.description}
          </p>
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

export default React.memo(ProductModal);
