// scripts/listFabricImages.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Obtenir __dirname même en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const studioPath = path.join(__dirname, "../public/images/fabrics/studio");

fs.readdir(studioPath, (err, files) => {
  if (err) {
    console.error("❌ Erreur lecture dossier :", err);
    return;
  }

  const images = files.filter((file) =>
    [".png", ".jpg", ".jpeg", ".webp"].includes(path.extname(file).toLowerCase())
  );

  const result = images.map((filename) => ({
    image: filename,
    path: `/images/fabrics/studio/${filename}`,
  }));

  const outputPath = path.join(__dirname, "fabric_images.json");
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), "utf-8");

  console.log("✅ Fichier JSON généré :", outputPath);
});
