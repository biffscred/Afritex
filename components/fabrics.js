"use client";
import CategoryCard from './CategoryCard';

const FabricsSection = () => {
  const fabrics = [
    { img: '/images/baoule-accueil.webp', title: 'Tissu Baoulé', desc: "Pagne traditionnel de Côte d'Ivoire fabriqué par le peuple Baoulé." },
    { img: '/images/faso-accueil.jpg', title: 'Faso Dan Fani', desc: "Le tissu emblématique du Burkina Faso, pagne de la patrie." },
    { img: '/images/bogolan-accueil.jpg', title: 'Bogolan du Mali', desc: "Art textile utilisant une teinture naturelle à base de boue." }
  ];

  return (
    <section className="py-20 bg-orange-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-extrabold text-yellow-900 mb-12">Nos Tissus Africains</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {fabrics.map((item, i) => (
            <CategoryCard key={i} {...item} href="/fabric" linkText="Découvrir les tissus" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FabricsSection;