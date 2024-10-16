// src/components/About.js

export default function About() {
    return (
      <section className="bg-yellow-50 py-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center">
          
          {/* Image de Présentation */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <img
              src="/images/about-us.jpg"
              alt="Présentation de l'entreprise"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          
          {/* Texte de Présentation */}
          <div className="w-full md:w-1/2 md:pl-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-yellow-800 mb-4">À Propos de Nous</h2>
            <p className="text-lg text-gray-700 mb-4">
              Chez Afritex, nous nous engageons à vous offrir une collection unique de tissus africains authentiques et de vêtements fabriqués à partir des meilleurs matériaux. 
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Notre mission est de préserver et de promouvoir la richesse de la culture africaine à travers des produits de qualité. Nous collaborons directement avec des artisans locaux pour vous offrir des tissus et des accessoires qui célèbrent la diversité et la créativité.
            </p>
            <p className="text-lg text-gray-700">
              Explorez notre collection et rejoignez-nous dans notre voyage pour honorer le patrimoine africain avec style et sophistication.
            </p>
          </div>
          
        </div>
      </section>
    );
  }
  