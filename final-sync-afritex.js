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

const TISSUS_DIR = path.join(process.cwd(), "public/images/tissus");

async function syncAll() {
    const connection = await mysql.createConnection(dbConfig);
    console.log("🚀 Lancement de la synchronisation finale...");

    try {
        // 1. Récupérer tous les produits pour avoir les noms exacts de la base
        const [products] = await connection.execute("SELECT id, name FROM Product");
        
        // 2. Fonction pour scanner récursivement les dossiers de tissus
        async function getFiles(dir) {
            const dirents = await fs.readdir(dir, { withFileTypes: true });
            const files = await Promise.all(dirents.map((dirent) => {
                const res = path.resolve(dir, dirent.name);
                return dirent.isDirectory() ? getFiles(res) : res;
            }));
            return files.flat();
        }

        const allImagePaths = await getFiles(TISSUS_DIR);
        let updatedCount = 0;

        for (const fullPath of allImagePaths) {
            const ext = path.extname(fullPath);
            if (!['.webp', '.jpg', '.jpeg', '.png'].includes(ext.toLowerCase())) continue;

            const fileName = path.basename(fullPath);
            const fileNameNoExt = path.parse(fileName).name; // ex: tissu-baoule-11
            
            // 3. Logique de matching intelligente
            // On cherche un produit qui s'appelle exactement comme le fichier
            // OU qui commence par le nom du fichier suivi d'un tiret (ex: tissu-baoule-11-bleu)
            const match = products.find(p => 
                p.name === fileNameNoExt || p.name.startsWith(fileNameNoExt + "-")
            );

            if (match) {
                // On transforme le chemin absolu en chemin relatif pour le site
                const relativePath = fullPath.split('public')[1];
                
                await connection.execute(
                    "UPDATE Product SET image = ? WHERE id = ?",
                    [relativePath, match.id]
                );
                console.log(`✅ ${fileName} linked to ➡️ ${match.name}`);
                updatedCount++;
            }
        }

        console.log(`\n✨ Terminé ! ${updatedCount} produits ont maintenant une image principale.`);
        
    } catch (error) {
        console.error("❌ Erreur critique :", error);
    } finally {
        await connection.end();
    }
}

syncAll();