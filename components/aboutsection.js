// components/AboutSection.js
import Image from 'next/image';

const AboutSection = () => {
  return (
    <section id="about" className="py-12 bg-gradient-to-b from-yellow-100 via-orange-200 to-green-200">
      <div className="container mx-auto px-4">
        {/* Première rangée */}
        <div className="flex flex-wrap items-stretch">
          {/* Colonne 1 */}
          <div className="w-full md:w-1/3 p-2 flex">
            <div className="about-img w-full h-full">
              <Image
                src="/images/service4.jpg"
                alt="about"
                width={400}
                height={300}
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Colonne 2 */}
          <div className="w-full md:w-1/3 p-2 flex">
            <div className="service-box bg-white text-black hover:bg-black hover:text-white transition duration-300 p-6 rounded-lg flex flex-col justify-center items-center h-full">
              <h3 className="text-xl font-bold text-center">Une sélection des plus beaux Tissus & Accessoires Africains Issus de l'artisanat d'art</h3>
            </div>
          </div>
          {/* Colonne 3 */}
          <div className="w-full md:w-1/3 p-2 flex">
            <div className="about-img w-full h-full">
              <Image
                src="/images/service2.jpg"
                alt="about"
                width={400}
                height={300}
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Deuxième rangée */}
        <div className="flex flex-wrap mt-6 items-stretch">
          {/* Colonne 1 */}
          <div className="w-full md:w-1/3 p-2 flex">
            <div className="service-box bg-white text-black hover:bg-black hover:text-white transition duration-300 p-6 rounded-lg flex flex-col justify-center items-center h-full">
              <h3 className="text-xl font-bold text-center">Des produits de qualité exclusivement à base de coton africain pour soutenir la chaîne de valeur de la filière coton</h3>
            </div>
          </div>
          {/* Colonne 2 */}
          <div className="w-full md:w-1/3 p-2 flex">
            <div className="about-img w-full h-full">
              <Image
                src="/images/service1.jpg"
                alt="about"
                width={400}
                height={300}
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Colonne 3 */}
          <div className="w-full md:w-1/3 p-2 flex">
            <div className="service-box bg-white text-black hover:bg-black hover:text-white transition duration-300 p-6 rounded-lg flex flex-col justify-center items-center h-full">
              <h3 className="text-xl font-bold text-center">Nous travaillons avec des tisserands au sommet de leur art et des centres de tissage agréés et compétents</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
