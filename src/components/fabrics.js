"use client"; // Ajoute cette ligne pour indiquer que c'est un composant client
import Link from 'next/link';


const FabricsSection = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-yellow-100 via-orange-200 to-green-200
">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-yellow-900 mb-6">Nos Tissus Africains</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-transform transform hover:scale-105">
            <img src="/images/shweshwe-accueil.jpg" alt="Shweshwe" className="w-full h-64 object-cover mb-4 rounded-lg" />
            <h3 className="text-2xl font-bold text-indigo-900 mb-2">Shweshwe</h3>
            <p className="text-gray-700 mb-4">Tissu imprimé traditionnel d’Afrique du Sud, utilisé pour des tenues culturelles.</p>
            <Link href="fabric/" className="text-yellow-800 font-semibold hover:underline">
              Voir plus de tissus 
            </Link>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-transform transform hover:scale-105">
            <img src="/images/kenté-accueil.jpg" alt="Kente" className="w-full h-64 object-cover mb-4 rounded-lg" />
            <h3 className="text-2xl font-bold text-indigo-900 mb-2">Kente</h3>
            <p className="text-gray-700 mb-4">Tissu royal du Ghana, tissé à la main.</p>
            <Link href="fabric/" className="text-yellow-800 font-semibold hover:underline">
              Voir plus de tissus
            </Link>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-transform transform hover:scale-105">
            <img src="/images/bogolan-accueil.jpg" alt="Bogolan" className="w-full h-64 object-cover mb-4 rounded-lg" />
            <h3 className="text-2xl font-bold text-indigo-900 mb-2">Bogolan</h3>
            <p className="text-gray-700 mb-4">Tissu traditionnel malien teint à la main.</p>
            <Link href="fabric/" className="text-yellow-800 font-semibold hover:underline">
              Voir plus de tissus 
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FabricsSection;
