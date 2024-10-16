// components/AccessoriesSection.js

const accessories = [
  { id: 1, name: "Kente Bag", price: 40, imgSrc: "/images/accessoireskanga-accueil.webp" },
  { id: 2, name: "Wax Scarf", price: 15, imgSrc: "/images/accessoiresbogolan-accueil.webp" },
  { id: 3, name: "Bogolan Hat", price: 20, imgSrc: "/images/accessoiressheswhe-accueil.webp" },
  // Ajoute plus d'accessoires ici si nécessaire
];

export default function AccessoriesSection() {
  return (
    <section className="py-12 bg-gradient-to-b from-yellow-50 to-yellow-200">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-yellow-800 mb-8">Nos Accessoires</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accessories.map((accessory) => (
            <div key={accessory.id} className="bg-white border rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow">
              <img 
                src={accessory.imgSrc} 
                alt={accessory.name} 
                className="w-full h-64 object-cover mb-4 rounded-lg" 
              />
              <h3 className="text-xl font-semibold text-indigo-900 text-center">{accessory.name}</h3>
              <p className="text-yellow-600 text-lg text-center font-bold">${accessory.price}</p>
            </div>
          ))}
        </div>

        {/* Bouton pour voir plus d'accessoires */}
        <div className="mt-8">
          <a 
            href="/accessories" 
            className="inline-block bg-yellow-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-700 transition-colors duration-300"
          >
            Voir plus d'accessoires
          </a>
        </div>
      </div>
    </section>
  );
}
