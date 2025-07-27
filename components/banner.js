const Banner = () => {
  return (
    <section
      className="w-full h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/bannerFinale.png')" }}
    >
     <div className="flex justify-center items-center h-full bg-black bg-opacity-30">

        <div className="text-center px-6">
          <h1 className="text-white text-6xl md:text-7xl font-extrabold mb-4">
            Afritex
          </h1>
          <p className="text-white text-2xl md:text-3xl font-semibold mb-2">
            TISSUS, MODE & ACCESSOIRES AFRICAINS
          </p>
          <p className="text-white text-xl md:text-2xl font-light mb-4">
            Authentique. 100 % coton. Stylé.
          </p>
          <p className="text-white text-lg md:text-xl mb-6">
            ✨ Découvrez nos créations et accessoires uniques
          </p>
          <a
            href="/shop"
            className="bg-white text-black text-lg md:text-xl font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-300 transition"
          >
            Voir la boutique
          </a>
          <p className="text-white text-base md:text-lg mt-6">www.afritex.fr</p>
        </div>
      </div>
    </section>
  );
};

export default Banner;

