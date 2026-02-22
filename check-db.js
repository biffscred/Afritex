import mysql from "mysql2";

const db = mysql.createConnection({
  user: "root",
  password: "root", 
  database: "Afritex",
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock" 
});

db.connect((err) => {
  if (err) return console.error(err);
  
  // On cherche tout ce qui ressemble au Baoulé 12 dans les produits
  const sql = "SELECT id, name, image FROM Product WHERE name LIKE '%baoule-12%' OR image LIKE '%baoule-12%'";
  
  db.query(sql, (err, results) => {
    console.log("🔍 Résultats pour le Baoulé 12 :");
    console.table(results);
    db.end();
  });
});