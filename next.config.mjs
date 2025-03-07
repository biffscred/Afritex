import { i18n } from "./next-i18next.config.js"; // Importer la config i18n

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Active le mode strict pour Next.js
  images: {
    domains: ["localhost", "images.unsplash.com", "cdn.example.com"], // Ajoute ici les domaines autorisés
  },
  
  i18n, // Intègre la configuration i18n
 
};

export default nextConfig; // Export unique et correct
