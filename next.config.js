const { i18n } = require("./next-i18next.config"); // Importer la config i18n

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Active le mode strict pour Next.js
  images: {
    domains: ["localhost", "images.unsplash.com", "cdn.example.com"], // Ajoute ici les domaines autorisés
  },
  i18n, // Intègre la configuration i18n
 
};

module.exports = nextConfig; // Export unique et correct
