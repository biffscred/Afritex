const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'public/images');

function renameImagesInFolder(folder) {
  const files = fs.readdirSync(folder);

  files.forEach((file) => {
    const oldPath = path.join(folder, file);
    
    // Vérifier si c'est un dossier
    if (fs.statSync(oldPath).isDirectory()) {
      renameImagesInFolder(oldPath); // Appel récursif pour renommer dans le sous-dossier
    } else {
      const newFileName = file
        .toLowerCase()
        .replace(/\s+/g, '-') // Remplace les espaces par des tirets
        .replace(/[^a-z0-9.\-_]/g, ''); // Supprime les caractères spéciaux sauf ., -, _

      const newPath = path.join(folder, newFileName);

      if (oldPath !== newPath) {
        try {
          fs.renameSync(oldPath, newPath);
          console.log(`✅ Renommé : ${oldPath} -> ${newPath}`);
        } catch (error) {
          console.error(`❌ Erreur lors du renommage de ${file} :`, error);
        }
      }
    }
  });
}

// Exécuter le script sur le dossier principal et ses sous-dossiers
renameImagesInFolder(directory);
