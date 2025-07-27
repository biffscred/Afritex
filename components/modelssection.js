"use client";
import Link from 'next/link';

const ModelsSection = () => {
  const models = [
   
    {
      img: "/images/vintage-accueil.webp",
      title: "Tenue Vintage",
      desc: " Tenues luxueuses fabriquées à partir d'un tissu en coton tissé teint en indigo de style vintage"
    },
    {
      img: "/images/modele-bogolan.webp",
      title: "Création Bogolan",
      desc: "Tenue contemporaine mettant en valeur les motifs ancestraux du bogolan."
    },
    {
      img: "/images/accueil-fasodanfani.webp",
      title: "Ensemble Fasodanfani",
      desc: "Création moderne inspirée du tissu traditionnel du burkinafaso."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-yellow-50 via-orange-100 to-green-100">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-extrabold text-yellow-900 mb-8">Nos Modèles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <div
              key={index}
              className="p-6 bg-white bg-opacity-80 shadow-xl rounded-lg hover:shadow-2xl transition-transform transform hover:scale-105 backdrop-blur-md"
            >
              <img
                src={model.img}
                alt={model.title}
                className="w-full h-64 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-2xl font-bold text-indigo-900 mb-2">{model.title}</h3>
              <p className="text-gray-700 mb-4">{model.desc}</p>
              <Link href="/model" className="text-yellow-800 font-semibold hover:underline">
                Voir plus de modèles
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModelsSection;