import fs from 'fs';
import path from 'path';
import prisma from '../../lib/prisma';

const getFilesRecursively = (directory) => {
  let files = [];
  const items = fs.readdirSync(directory);
  for (const item of items) {
    const fullPath = path.join(directory, item);
    if (fs.statSync(fullPath).isDirectory()) {
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
    const files = getFilesRecursively(imagesDirectory);

    const imageFiles = files
      .filter((file) => /\.(png|jpe?g|webp)$/i.test(file))
      .map((file) => file.replace(`${process.cwd()}/public`, ''));

    const usedImages = await prisma.product.findMany({
      select: { image: true }
    }).then(products => products.map(product => product.image));

    const availableImages = imageFiles.filter((file) => !usedImages.includes(file));

    res.status(200).json(availableImages);
  } catch (error) {
    console.error("Erreur lors de la récupération des images:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des images" });
  }
}
