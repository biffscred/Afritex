const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();
const imagesDir = path.join(__dirname, 'public/images');

// Fonction pour renommer un dossier en minuscule et sans espaces
function renameFolder(folder) {
  const parentDir = path.dirname(folder);
  const newFolderName = path.basename(folder)
    .toLowerCase()
    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
    .replace(/[^a-z0-9.\-_]/g, '')// Supprime les caractères spéciaux sauf ., -, _
    .replace(/--+/g, '-'); // Remplace les double tirets par un seul
  const newFolderPath = path.join(parentDir, newFolderName);

  if (folder !== newFolderPath) {
    try {
      fs.renameSync(folder, newFolderPath);
      console.log(`📁 Dossier renommé : ${folder} -> ${newFolderPath}`);
      return newFolderPath;
    } catch (error) {
      console.error(`❌ Erreur lors du renommage du dossier ${folder} :`, error);
      return folder;
    }
  }
  return folder;
}

// Fonction pour scanner et renommer fichiers + dossiers
function getRenamedPaths() {
  let renamedPaths = {};

  function scanDirectory(dir, relativePath = '') {
    let newDir = renameFolder(dir); // Renomme le dossier en premier
    const files = fs.readdirSync(newDir);

    files.forEach(file => {
      const oldPath = path.join(newDir, file);
      const relativeOldPath = path.join(relativePath, file).replace(/\\/g, '/');

      if (fs.statSync(oldPath).isDirectory()) {
        const renamedSubFolder = renameFolder(oldPath);
        scanDirectory(renamedSubFolder, path.join(relativePath, path.basename(renamedSubFolder))); // Scanner le sous-dossier renommé
      } else {
        const newFileName = file
          .toLowerCase()
          .replace(/\s+/g, '-') // Remplace les espaces par des tirets
          .replace(/[^a-z0-9.\-_]/g, '') // Supprime les caractères spéciaux sauf ., -, _
          .replace(/--+/g, '-'); // Remplace les double tirets par un seul

        const relativeNewPath = path.join(relativePath, newFileName).replace(/\\/g, '/');
        const newPath = path.join(newDir, newFileName);

        if (oldPath !== newPath) {
          try {
            fs.renameSync(oldPath, newPath);
            console.log(`✅ Fichier renommé : ${oldPath} -> ${newPath}`);
          } catch (error) {
            console.error(`❌ Erreur lors du renommage de ${file} :`, error);
          }
        }

        if (relativeOldPath !== relativeNewPath) {
          renamedPaths[`/images/${relativeOldPath}`] = `/images/${relativeNewPath}`;
        }
      }
    });
  }

  scanDirectory(imagesDir);
  return renamedPaths;
}

// Fonction pour mettre à jour la base de données
async function updateDatabaseImages() {
  const renamedPaths = getRenamedPaths();
  let updatedCount = 0;

  console.log(`🔍 Début de la mise à jour des images en BDD...`);
  if (Object.keys(renamedPaths).length === 0) {
    console.log(`✅ Aucune image renommée, la BDD est à jour.`);
    return;
  }

  for (const [oldPath, newPath] of Object.entries(renamedPaths)) {
    console.log(`🔄 Vérification : ${oldPath} → ${newPath}`);

    // Mise à jour de toutes les tables contenant des images
    const updateQueries = [
      prisma.product.updateMany({
        where: { image: oldPath },
        data: { image: newPath },
      }),
      prisma.fabric.updateMany({
        where: { image: oldPath },
        data: { image: newPath },
      }),
      prisma.fabricImage.updateMany({
        where: { url: oldPath },
        data: { url: newPath },
      }),
      prisma.model.updateMany({
        where: { image: oldPath },
        data: { image: newPath },
      }),
      prisma.modelImage.updateMany({
        where: { url: oldPath },
        data: { url: newPath },
      }),
      prisma.accessory.updateMany({
        where: { image: oldPath },
        data: { image: newPath },
      }),
      prisma.accessoryImage.updateMany({
        where: { url: oldPath },
        data: { url: newPath },
      }),
    ];

    const results = await Promise.all(updateQueries);

    if (results.some(res => res.count > 0)) {
      console.log(`✅ Image mise à jour dans la BDD : ${oldPath} → ${newPath}`);
      updatedCount++;
    }
  }

  console.log(`🚀 Mise à jour terminée : ${updatedCount} images modifiées dans la BDD.`);
  await prisma.$disconnect();
}

// Exécuter le script
updateDatabaseImages().catch((error) => {
  console.error("❌ Erreur lors de la mise à jour des images :", error);
  prisma.$disconnect();
});
