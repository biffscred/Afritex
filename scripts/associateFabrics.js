import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function getTargetFabricKeyword(productName) {
  const name = productName.toLowerCase();

  if (name.startsWith("bog-") || name.startsWith("mdf-bog-")) return "bogolan";
  if (name.startsWith("fdf-")) return "fasodanfani";
  if (name.startsWith("vint-")) return "vintage";
  if (name.startsWith("mdf-koba-")) return "koba";
  if (name.startsWith("mdf-niaga-")) return "niaga";

  return null;
}

async function main() {
  const products = await prisma.product.findMany({
    where: { category: "FABRIC" },
  });

  const fabrics = await prisma.fabric.findMany();

  let count = 0;

  for (const product of products) {
    const keyword = getTargetFabricKeyword(product.name);
    if (!keyword) {
      console.warn(`⚠️ Aucun mot-clé défini pour : ${product.name}`);
      continue;
    }

    const fabric = fabrics.find(f => {
      return f.name.toLowerCase().includes(keyword) && f.productId === null;
    });

    if (!fabric) {
      console.warn(`⚠️ Aucune entrée Fabric libre trouvée pour mot-clé : ${keyword}`);
      continue;
    }

    try {
      await prisma.fabric.update({
        where: { id: fabric.id },
        data: { productId: product.id },
      });

      console.log(`✅ ${fabric.name} → associé à ${product.name}`);
      count++;
    } catch (e) {
      console.warn(`❌ Problème : ${product.name} → ${fabric.name}`, e.message);
    }
  }

  console.log(`\n🔁 Total des nouvelles associations faites : ${count}`);
}

main()
  .catch((e) => {
    console.error("❌ Erreur globale :", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
