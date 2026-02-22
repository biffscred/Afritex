import mysql from "mysql2";

const db = mysql.createConnection({
  user: "root",
  password: "root", 
  database: "Afritex",
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock" 
});

db.connect((err) => {
  if (err) return console.error("❌ Erreur MySQL :", err);
  console.log("✅ Connecté pour la réparation (Format ESM) !");

  const tables = ["Product", "Fabric", "Accessory", "Model"];
  
  tables.forEach((table) => {
    const sql = `UPDATE ${table} SET image = REPLACE(image, '.png', '.jpg') WHERE image LIKE '%.png'`;
    
    db.query(sql, (err, result) => {
      if (err) {
        console.error(`❌ Erreur sur ${table} :`, err);
      } else {
        console.log(`✅ ${table} : ${result.affectedRows} chemins mis à jour.`);
      }
    });
  });

  // On attend un peu que les requêtes finissent avant de couper la connexion
  setTimeout(() => { 
    db.end(); 
    console.log("🚀 Terminé ! Toutes les extensions sont synchronisées. Relance ton site."); 
  }, 2000);
});