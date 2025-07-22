"use client"; // Ajoute cette ligne pour indiquer que c'est un composant client
import Link from 'next/link';

const FabricsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-yellow-50 via-orange-100 to-green-100">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-extrabold text-yellow-900 mb-8">Nos Tissus Africains</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              img: '/images/Shweshwe-accueil.webp',
              title: 'Shweshwe',
              desc: "Tissu imprimé traditionnel d’Afrique du Sud, utilisé pour des tenues culturelles.",
            },
            {
              img: '/images/kent-accueil.jpg',
              title: 'Kente',
              desc: "Tissu royal du Ghana, tissé à la main.",
            },
            {
              img: '/images/bogolan-accueil.jpg',
              title: 'Bogolan',
              desc: "Tissu traditionnel malien teint à la main.",
            },
          ].map((fabric, index) => (
            <div
              key={index}
              className="p-6 bg-white bg-opacity-80 shadow-xl rounded-lg hover:shadow-2xl transition-transform transform hover:scale-105 backdrop-blur-md"
            >
              <img
                src={fabric.img}
                alt={fabric.title}
                className="w-full h-64 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-2xl font-bold text-indigo-900 mb-2">{fabric.title}</h3>
              <p className="text-gray-700 mb-4">{fabric.desc}</p>
              <Link href="/fabric" className="text-yellow-800 font-semibold hover:underline">
                Voir plus de tissus
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FabricsSection;

