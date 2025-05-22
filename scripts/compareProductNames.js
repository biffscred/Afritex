import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const prisma = new PrismaClient();

const uploadsDir = path.join(__dirname, '..', 'public', 'uploads', 'products');

async function main() {
  // 1️⃣ Lire tous les produits depuis la base
  const products = await prisma.product.findMany({ select: { id: true, name: true } });
  const productNamesInDb = products.map(p => p.name);

  // 2️⃣ Lire tous les dossiers dans public/uploads/products
  const foldersInUploads = fs.readdirSync(uploadsDir).filter(file =>
    fs.statSync(path.join(uploadsDir, file)).isDirectory()
  );

  console.log(`🟩 Produits en base : ${productNamesInDb.length}`);
  console.log(`🟨 Dossiers uploadés : ${foldersInUploads.length}`);

  // 3️⃣ Trouver les dossiers sans produit
  const unmatchedFolders = foldersInUploads.filter(folder => !productNamesInDb.includes(folder));
  const matched = foldersInUploads.filter(folder => productNamesInDb.includes(folder));
  const missingFolders = productNamesInDb.filter(name => !foldersInUploads.includes(name));

  console.log("\n✅ Correspondances trouvées :", matched.length);
  matched.forEach(name => console.log("  ✔", name));

  console.log("\n❌ Dossiers sans produit dans la base :", unmatchedFolders.length);
  unmatchedFolders.forEach(name => console.log("  ❌", name));

  console.log("\n🔎 Produits sans dossier d'image :", missingFolders.length);
  missingFolders.forEach(name => console.log("  ⛔", name));

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error("Erreur :", e);
  prisma.$disconnect();
  process.exit(1);
});

