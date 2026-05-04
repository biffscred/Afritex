"use client";
import CategoryCard from './CategoryCard';

const ModelsSection = () => {
  const models = [
    { img: "/images/vestevintage.png", title: "Veste Vintage", desc: "Veste luxueuse en coton tissé teint à l'indigo naturel." },
    { img: "/images/modele-bogolan.webp", title: "Création Bogolan", desc: "Tenue contemporaine mettant en valeur les motifs ancestraux." },
    { img: "/images/accueil-fasodanfani.webp", title: "Ensemble Faso Dan Fani", desc: "Création moderne inspirée par l'élégance du Burkina Faso." }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-orange-100 to-green-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-extrabold text-yellow-900 mb-12">Nos Modèles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {models.map((item, i) => (
            <CategoryCard key={i} {...item} href="/model" linkText="Voir la collection" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModelsSection;