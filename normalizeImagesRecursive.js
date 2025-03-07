// normalizeImagesLandscape.js
import fs from "fs";
import path from "path";
import sharp from "sharp";

// Dossier source et dossier de sortie
const ROOT_INPUT_DIR = path.join(process.cwd(), "public", "images");
const ROOT_OUTPUT_DIR = path.join(process.cwd(), "public", "normalized-webp");

// Paramètres pour un format paysage 5:4
const TARGET_RATIO = 5 / 4;   // = 1.25
const TARGET_WIDTH = 1500;    // Largeur finale
const TARGET_HEIGHT = 1200;   // Hauteur finale
const WEBP_QUALITY = 80;

/**
 * Normalise une image pour un ratio 5:4 (paysage),
 * en pivotant l'image si elle est plus haute que large.
 */
async function normalizeImagesRecursive(inputPath, outputPath) {
  try {
    // 1. Lecture du fichier source
    const buffer = fs.readFileSync(inputPath);

    // 2. Métadonnées
    const metadata = await sharp(buffer).metadata();
    let { width, height } = metadata;

    // 3. Forcer l'orientation paysage si height > width
    //    (on tourne de 90° et on échange width et height)
    let rotateAngle = 0;
    if (height > width) {
      rotateAngle = 90;
      [width, height] = [height, width];
    }

    // 4. Calcul pour "couvrir" le ratio 5:4
    const currentRatio = width / height;
    let resizeWidth = TARGET_WIDTH;
    let resizeHeight = TARGET_HEIGHT;

    if (currentRatio > TARGET_RATIO) {
      // L'image est trop large => on ajuste la largeur
      resizeWidth = Math.round(TARGET_HEIGHT * currentRatio);
    } else if (currentRatio < TARGET_RATIO) {
      // L'image est trop haute => on ajuste la hauteur
      resizeHeight = Math.round(TARGET_WIDTH / currentRatio);
    }

    // 5. Rotation + redimensionnement
    const resizedBuffer = await sharp(buffer)
      .rotate(rotateAngle)
      .resize(resizeWidth, resizeHeight, { fit: "cover" })
      .toBuffer();

    // 6. Recadrage exact en 1500×1200
    const left = Math.max(0, Math.round((resizeWidth - TARGET_WIDTH) / 2));
    const top = Math.max(0, Math.round((resizeHeight - TARGET_HEIGHT) / 2));

    const finalBuffer = await sharp(resizedBuffer)
      .extract({ left, top, width: TARGET_WIDTH, height: TARGET_HEIGHT })
      .webp({ quality: WEBP_QUALITY })
      .toBuffer();

    // 7. Écriture du fichier final
    fs.writeFileSync(outputPath, finalBuffer);
    console.log(`✅ Image normalisée (paysage) : ${outputPath}`);
  } catch (error) {
    console.error(`❌ Erreur lors du traitement de ${inputPath} :`, error);
  }
}

/**
 * Parcours récursif du dossier, normalise les images et recrée la même structure.
 */
function traverseAndNormalize(inputDir, outputDir) {
  // Crée le dossier de sortie si besoin
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Parcourt les fichiers et sous-dossiers
  const items = fs.readdirSync(inputDir, { withFileTypes: true });

  for (const item of items) {
    // Évite la boucle infinie en ignorant "normalized-webp"
    if (item.isDirectory() && item.name === "normalized-webp") {
      continue;
    }

    const itemInputPath = path.join(inputDir, item.name);
    const itemOutputPath = path.join(outputDir, item.name);

    if (item.isDirectory()) {
      traverseAndNormalize(itemInputPath, itemOutputPath);
    } else {
      // Vérifie si c'est un format image
      const ext = path.extname(item.name).toLowerCase();
      if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        const baseName = path.parse(item.name).name;
        const outputFile = `${baseName}.webp`;
        const finalOutputPath = path.join(outputDir, outputFile);

        // Normalisation en paysage
        normalizeImagesRecursive(itemInputPath, finalOutputPath);
      } else {
        // On peut éventuellement copier les autres fichiers si besoin
        // fs.copyFileSync(itemInputPath, itemOutputPath);
      }
    }
  }
}

async function main() {
  try {
    traverseAndNormalize(ROOT_INPUT_DIR, ROOT_OUTPUT_DIR);
    console.log("✨ Parcours et normalisation (orientation paysage) terminés !");
  } catch (error) {
    console.error("❌ Erreur globale :", error);
  }
}

main();
