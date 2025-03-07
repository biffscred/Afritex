import prisma from '../../lib/prisma'; // Assurez-vous que le chemin vers Prisma est correct

export default async function handler(req, res) {
  try {
    // Récupère les images des produits existants dans la base de données
    const products = await prisma.product.findMany({
      select: {
        image: true,
      },
    });

    const usedImages = products.map((product) => product.image);
    res.status(200).json(usedImages);
  } catch (error) {
    console.error('Erreur lors de la récupération des images utilisées:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des images utilisées' });
  }
}
