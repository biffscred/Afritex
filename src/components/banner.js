

const Banner = () => {
  return (
    <section
      className="w-full h-[700px] bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/bannerFinale.png')" }}
    >
      <div className="flex justify-center items-center h-full bg-black bg-opacity-60">
        <div className="text-center">
          <h1 className="text-white text-5xl font-bold mb-4 animate-fadeIn">
            Bienvenue sur Afritex
          </h1>
          <p className="text-white text-lg font-light">
            Découvrez nos tissus africains authentiques et sublimez vos créations.
          </p>
          <a href="/produits" className="mt-6 inline-block bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition duration-300">
            Voir nos produits
          </a>
        </div>
      </div>
    </section>
  );
};

export default Banner;
