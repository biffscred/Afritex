/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],  // Autorise les images hébergées localement (localhost)
  },
};

module.exports = nextConfig; // Utiliser 'module.exports' pour CommonJS
