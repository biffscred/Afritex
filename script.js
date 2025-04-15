import fs from "fs";

// Chemin du fichier GeoJSON (adapte selon ton projet)
const filePath = "./public/data/africa.geojson";

// Vérifie si le fichier existe
if (!fs.existsSync(filePath)) {
  console.error("❌ Le fichier africa.geojson est introuvable !");
  process.exit(1);
}

// Lit le fichier GeoJSON
const raw = fs.readFileSync(filePath, "utf8");
const data = JSON.parse(raw);

// Objet pour stocker les tissus uniques
const fabricsMap = new Map();

for (const feature of data.features) {
  const { country, fabric } = feature.properties;

  if (fabric) {
    if (Array.isArray(fabric)) {
      for (const item of fabric) {
        if (!fabricsMap.has(item.name)) {
          fabricsMap.set(item.name, {
            description: item.description || "Aucune description.",
            image: item.image || "❌ Aucune image disponible",
            countries: [country]
          });
        } else {
          fabricsMap.get(item.name).countries.push(country);
        }
      }
    } else {
      if (!fabricsMap.has(fabric.name)) {
        fabricsMap.set(fabric.name, {
          description: fabric.description || "Aucune description.",
          image: fabric.image || "❌ Aucune image disponible",
          countries: [country]
        });
      } else {
        fabricsMap.get(fabric.name).countries.push(country);
      }
    }
  }
}

// Convertir en tableau trié par nom de tissu
const fabricsList = Array.from(fabricsMap.entries()).map(([name, details]) => ({
  name,
  description: details.description,
  image: details.image,
  countries: details.countries.join(", ")
}));

// Afficher les résultats
console.log("📜 Liste des tissus africains :");
console.table(fabricsList);

// Enregistrer dans un fichier (facultatif)
fs.writeFileSync("./public/data/fabrics_list.json", JSON.stringify(fabricsList, null, 2), "utf8");

console.log("\n✅ Liste des tissus enregistrée dans 'public/data/fabrics_list.json'.");
