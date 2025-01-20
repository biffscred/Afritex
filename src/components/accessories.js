"use client";
import Link from 'next/link';

const AccessoriesSection = () => {
  const accessories = [
    {
      img: "/images/accessoireskanga-accueil.webp",
      title: "Sac Kente",
      desc: "Sac élégant fait main avec du tissu Kente authentique."
    },
    {
      img: "/images/accessoiresbogolan-accueil.webp",
      title: "Écharpe Wax",
      desc: "Écharpe légère et colorée en tissu wax premium."
    },
    {
      img: "/images/accessoiressheswhe-accueil.webp",
      title: "Chapeau Bogolan",
      desc: "Chapeau moderne orné de motifs Bogolan traditionnels."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-yellow-50 via-orange-100 to-green-100">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-extrabold text-yellow-900 mb-8">Nos Accessoires</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {accessories.map((accessory, index) => (
            <div
              key={index}
              className="p-6 bg-white bg-opacity-80 shadow-xl rounded-lg hover:shadow-2xl transition-transform transform hover:scale-105 backdrop-blur-md"
            >
              <img
                src={accessory.img}
                alt={accessory.title}
                className="w-full h-64 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-2xl font-bold text-indigo-900 mb-2">{accessory.title}</h3>
              <p className="text-gray-700 mb-4">{accessory.desc}</p>
              <Link href="/accessory" className="text-yellow-800 font-semibold hover:underline">
                Voir plus d'accessoires
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccessoriesSection;