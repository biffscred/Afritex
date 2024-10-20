// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      // Ce paramètre permet de gérer les images locales dans le dossier 'public'
      unoptimized: true, // Désactive l'optimisation des images pour éviter les erreurs locales.
    },
  };
  
  export default nextConfig;
  