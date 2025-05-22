// scripts/insertImages.js

import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const uploadsPath = path.join(process.cwd(), "public/uploads");

async function getAllProducts() {
  const [fabrics, models, accessories] = await Promise.all([
    prisma.fabric.findMany({
      include: { product: true },
    }),
    prisma.model.findMany({
      include: { product: true },
    }),
    prisma.accessory.findMany({
      include: { product: true },
    }),
  ]);
  return { fabrics, models, accessories };
}

function normalize(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/_/g, "-")
    .replace(/\.[^/.]+$/, "") // remove file extension
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // remove accents
}

async function main() {
  const { fabrics, models, accessories } = await getAllProducts();

  const folders = fs.readdirSync(uploadsPath, { withFileTypes: true });

  for (const folder of folders) {
    if (!folder.isDirectory()) continue;

    const folderPath = path.join(uploadsPath, folder.name);
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue;

      const fileName = normalize(file);
      const imagePath = `/uploads/${folder.name}/${file}`;

      // Recherche la meilleure correspondance
      const matchFabric = fabrics.find(f =>
        normalize(f.image || "").includes(fileName) || normalize(f.name).includes(fileName)
      );
      const matchModel = models.find(m =>
        normalize(m.image || "").includes(fileName) || normalize(m.name).includes(fileName)
      );
      const matchAccessory = accessories.find(a =>
        normalize(a.image || "").includes(fileName) || normalize(a.name).includes(fileName)
      );

      try {
        if (matchFabric) {
          await prisma.fabricImage.create({
            data: {
              url: imagePath,
              fabricId: matchFabric.id,
            },
          });
          console.log(`✅ Ajouté à Fabric (${matchFabric.name}) : ${file}`);
        } else if (matchModel) {
          await prisma.modelImage.create({
            data: {
              url: imagePath,
              modelId: matchModel.id,
            },
          });
          console.log(`✅ Ajouté à Model (${matchModel.name}) : ${file}`);
        } else if (matchAccessory) {
          await prisma.accessoryImage.create({
            data: {
              url: imagePath,
              accessoryId: matchAccessory.id,
            },
          });
          console.log(`✅ Ajouté à Accessory (${matchAccessory.name}) : ${file}`);
        } else {
          console.warn(`❌ Aucun match pour ${file}`);
        }
      } catch (err) {
        console.error(`❌ Erreur avec ${file} :`, err.message);
      }
    }
  }

  console.log("🎉 Traitement terminé.");
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
