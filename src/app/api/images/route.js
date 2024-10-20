import fs from 'fs';
import path from 'path';
import prisma from '../../../lib/prisma'; // Assure-toi que Prisma est configuré et fonctionne

// Fonction pour récupérer tous les fichiers dans un répertoire (récursivement)
const getFilesRecursively = (directory) => {
  let files = [];
  const items = fs.readdirSync(directory);
  
  for (const item of items) {
    const fullPath = path.join(directory, item);
    if (fs.statSync(fullPath).isDirectory()) {
      // Appel récursif pour les sous-dossiers
      files = files.concat(getFilesRecursively(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
};

export default async function handler(req, res) {
  try {
    const imagesDirectory = path.join(process.cwd(), 'public', 'images');
    
    // Récupération de tous les fichiers dans le dossier images
    const files = getFilesRecursively(imagesDirectory);

    // Filtrer les fichiers images seulement (jpg, png, webp, etc.)
    const imageFiles = files
      .filter((file) => /\.(png|jpe?g|webp)$/i.test(file))  // Garder uniquement les fichiers images
      .map((file) => file.replace(`${process.cwd()}/public`, ''));  // Pour avoir un chemin relatif

    // Récupérer les images déjà utilisées dans les produits
    const usedImages = await prisma.product.findMany({
      select: { image: true }
    }).then(products => products.map(product => product.image));

    // Filtrer les images non utilisées
    const availableImages = imageFiles.filter((file) => !usedImages.includes(file));

    // Retourner la liste des images disponibles
    res.status(200).json(availableImages);
    
  } catch (error) {
    console.error("Erreur lors de la récupération des images:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des images" });
  }
}
