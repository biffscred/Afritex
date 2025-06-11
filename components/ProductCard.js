"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const ProductCard = ({ product, onClick }) => {
  return (
    <motion.div
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200 hover:border-gray-300 overflow-hidden cursor-pointer"
      onClick={() => onClick(product)}
      aria-label={`Voir le produit ${product.name}`}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative w-full h-60 overflow-hidden">
        {product.image ? (
          <>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute bottom-0 w-full bg-black/40 text-white text-xs text-center py-1 opacity-0 group-hover:opacity-100 transition">
              Voir plus
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 text-sm">
            Image non disponible
          </div>
        )}
      </div>

      <div className="p-4 text-center space-y-1">
        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <p className="text-md font-semibold text-gray-900">{product.price} €</p>
      </div>
    </motion.div>
  );
};

export default React.memo(ProductCard);
