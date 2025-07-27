import { readdir } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// 🔁 Gestion des chemins en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dossier = join(__dirname, "public/images/fabrics/studio");

try {
  const fichiers = await readdir(dossier);
  const images = fichiers.filter(f =>
    f.endsWith(".png") || f.endsWith(".jpg") || f.endsWith(".jpeg")
  );

  console.log("📂 Liste des images trouvées :", images.length);
  console.table(images);
} catch (err) {
  console.error("❌ Erreur lors de la lecture :", err);
}
