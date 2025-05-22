import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(__dirname, "..", "public", "uploads", "products");


function listAllFiles(dirPath, files = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (let entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      listAllFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

const allFiles = listAllFiles(uploadsPath);
console.log("📂 Fichiers détectés physiquement dans public/uploads/products :\n");
allFiles.forEach(file => {
  console.log("→", file);
});
