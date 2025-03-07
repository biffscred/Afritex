const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

const db = mysql.createConnection({
  user: "root",
  password: "root", // Mets ton mot de passe MySQL (laisse vide si tu n'en as pas)
  database: "Afritex",
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock" 
});

// 📌 Requête SQL pour récupérer les images
const sqlQuery = `
  SELECT image FROM Product WHERE image IS NOT NULL
  UNION
  SELECT image FROM Fabric WHERE image IS NOT NULL
  UNION
  SELECT image FROM Accessory WHERE image IS NOT NULL
  UNION
  SELECT image FROM Model WHERE image IS NOT NULL
`;

const destinationFolder = "exported_images";

// 📌 Vérifier la connexion MySQL avant d'exécuter la requête
db.connect((err) => {
  if (err) {
    console.error("❌ Erreur de connexion à MySQL :", err);
    return;
  }
  console.log("✅ Connexion MySQL réussie !");

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("❌ Erreur lors de la récupération des images :", err);
      db.end();
      return;
    }

    // 📂 Créer le dossier s'il n'existe pas
    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder);
    }

    let copiedImages = 0;

    results.forEach((row) => {
      const imagePath = row.image.trim();
      const sourcePath = path.join(__dirname, "public", imagePath);
      const destPath = path.join(__dirname, destinationFolder, path.basename(imagePath));

      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        copiedImages++;
      } else {
        console.warn(`⚠️ Image introuvable : ${sourcePath}`);
      }
    });

    console.log(`✅ ${copiedImages} images copiées dans '${destinationFolder}'`);

    // 📦 Création du fichier ZIP
    createZip();
    db.end();
  });
});

// 🔹 Fonction pour compresser le dossier en ZIP
function createZip() {
  const output = fs.createWriteStream("exported_images.zip");
  const archive = archiver("zip", { zlib: { level: 9 } });

  output.on("close", () => {
    console.log(`✅ Archive ZIP créée : exported_images.zip (${archive.pointer()} bytes)`);
  });

  archive.on("error", (err) => {
    console.error("❌ Erreur lors de la création du ZIP :", err);
  });

  archive.pipe(output);
  archive.directory(destinationFolder, false);
  archive.finalize();
}
