"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useCart } from "../app/context/CartContext";

const ProductModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-200 max-w-lg w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-black"
          aria-label="Fermer la modale"
        >
          <X size={24} />
        </button>

        {/* 📷 Image principale du produit */}
        <div className="w-full aspect-[4/3] overflow-hidden rounded-lg relative mb-3">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            loading="lazy"
          />
        </div>

        {/* 🎨 Mockup affichée seulement si dispo */}
        {product.mockupImage && (
          <div className="w-full aspect-[4/3] overflow-hidden rounded-lg relative mb-3">
            <Image
              src={product.mockupImage}
              alt={`Mockup de ${product.name}`}
              fill
              className="object-cover rounded-lg border border-gray-300"
              loading="lazy"
            />
          </div>
        )}

        <div className="mt-2 text-center">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-lg font-bold text-gray-900 mt-2">{product.price} €</p>
          <button 
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition transform hover:scale-105"
            onClick={handleAddToCart}
          >
            Ajouter au panier 🛒
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(ProductModal);
