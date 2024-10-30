"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function ModelsSection() {
  const models = [
    { id: 1, imgSrc: "/images/modèle-dashiki.png", description: "Robe en dashiki" },
    { id: 2, imgSrc: "/images/modèle-mauricien.webp", description: "Tenue issue du tissu mauricien" },
    { id: 3, imgSrc: "/images/modèle-bogolan.png", description: "Modèle bogolan" },
    { id: 4, imgSrc: "/images/modèle-kente.webp", description: "Modèle kente" },
    // Ajoutez plus de modèles ici si nécessaire
  ];

  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev === models.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? models.length - 1 : prev - 1));
  };

  return (
    <section className="py-12 bg-gradient-to-b from-yellow-100 via-orange-200 to-green-200
">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-yellow-800 mb-8">Nos Modèles</h2>
        <div className="relative w-full max-w-md mx-auto">
          <img
            src={models[current].imgSrc}
            alt={`Model ${current}`}
            className="w-full h-full object-cover rounded-lg shadow-lg"
            style={{ width: "1792px", height: "1024px" }}
          />
          <p className="mt-4 text-lg text-gray-800">{models[current].description}</p>
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition-colors"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition-colors"
          >
            →
          </button>
        </div>

        {/* Bouton pour voir plus de modèles */}
        <Link href="/model" className="inline-block mt-8 bg-yellow-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-700 transition-colors duration-300">
          Voir plus de modèles
        </Link>
      </div>
    </section>
  );
}
