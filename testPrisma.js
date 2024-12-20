import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("🔄 Vérification des données dans la table `product`...");
    const products = await prisma.product.findMany(); // Exemple pour récupérer tous les produits
    console.log("✅ Produits récupérés :", products);
  } catch (error) {
    console.error("❌ Erreur Prisma :", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
