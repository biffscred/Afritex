import Link from 'next/link';
import Image from 'next/image';

const Banner = () => {
  return (
    <section className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden">
      <Image
        src="/images/bannerFinale.png"
        alt="Bannière Afritex - Tissus et mode africaine"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight">
          Afritex
        </h1>
        
        <p className="text-yellow-400 text-xl md:text-3xl font-bold mb-2 tracking-wide uppercase">
          Tissus, Mode & Accessoires Africains
        </p>
        
        <p className="text-gray-100 text-lg md:text-2xl font-light mb-8 italic">
          Authentique. 100 % coton. Stylé.
        </p>

        <div className="flex flex-col items-center gap-6">
          <Link
            href="/shop"
            className="bg-white text-black text-lg md:text-xl font-bold py-4 px-10 rounded-md shadow-2xl hover:bg-yellow-500 hover:scale-105 transition-all duration-300 active:scale-95"
          >
            Voir la boutique
          </Link>

          <Link 
            href="/" 
            className="text-gray-300 text-sm md:text-base hover:text-white transition-colors border-b border-transparent hover:border-white"
          >
            www.afritex.fr
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;