"use client";
import CategoryCard from './CategoryCard';

const AccessoriesSection = () => {
  const accessories = [
    { img: "/images/accessoires-collier.webp", title: "Collier en Perles", desc: "Perles orange mouchetées et indigo authentiques." },
    { img: "/images/accesoiresbogolan-accueil.webp", title: "Écharpe en Bogolan", desc: "Coton tissé artisanal aux motifs traditionnels du Mali." },
    { img: "/images/accessoiresbandes.webp", title: "Bandes en Tissu", desc: "Écharpe de prestige en bandes de tissu indigo tissées main." }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-yellow-50 to-orange-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-extrabold text-yellow-900 mb-12">Nos Accessoires</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {accessories.map((item, i) => (
            <CategoryCard key={i} {...item} href="/accessory" linkText="Voir les accessoires" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccessoriesSection;