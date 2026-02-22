import mysql from "mysql2/promise";
import fs from "fs/promises";
import path from "path";

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "Afritex",
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
};

// On cible directement le dossier que tu m'as montré
const ECHARPE_DIR = "public/images/accessoires/bogolan";

async function syncEcharpes() {
    const connection = await mysql.createConnection(dbConfig);
    console.log("🧣 Synchronisation des écharpes Bogolan...");

    try {
        const [products] = await connection.execute("SELECT id, name FROM Product");
        const fullDirPath = path.join(process.cwd(), ECHARPE_DIR);
        
        const files = await fs.readdir(fullDirPath);

        for (const file of files) {
            if (/\.(jpg|jpeg|webp|png)$/i.test(file)) {
                const fileNameNoExt = path.parse(file).name;
                
                // On cherche le produit qui contient ce nom
                const match = products.find(p => p.name.includes(fileNameNoExt));

                if (match) {
                    const dbPath = `/${ECHARPE_DIR.replace('public/', '')}/${file}`;
                    await connection.execute(
                        "UPDATE Product SET image = ? WHERE id = ?",
                        [dbPath, match.id]
                    );
                    console.log(`✅ Lié : ${file} ➡️  ${match.name}`);
                } else {
                    console.log(`⚠️  Aucun produit trouvé pour l'image : ${file}`);
                }
            }
        }

        console.log("\n🚀 Opération terminée ! Vérifie tes écharpes sur le site.");
    } catch (error) {
        console.error("❌ Erreur :", error.message);
    } finally {
        await connection.end();
    }
}

syncEcharpes();