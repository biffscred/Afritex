import mysql from "mysql2/promise";

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "Afritex",
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
};

async function fixBaoule11() {
    const connection = await mysql.createConnection(dbConfig);
    console.log("🛠️ Réparation du sillage pour le Baoulé 11...");

    try {
        // Le chemin pour Next.js commence après le dossier /public
        const mainImagePath = "/images/tissus/baoule/tissu-baoule-11.webp";
        
        // On cible le produit par son nom exact dans la base
        const [result] = await connection.execute(
            "UPDATE Product SET image = ? WHERE name = 'tissu-baoule-11-bleu-blanc'",
            [mainImagePath]
        );

        if (result.affectedRows > 0) {
            console.log("✅ L'image principale pointe maintenant sur le .webp dans /images/tissus/baoule/");
        } else {
            console.warn("⚠️ Produit non trouvé. Vérifie le nom 'tissu-baoule-11-bleu-blanc' dans ta base.");
        }

    } catch (error) {
        console.error("❌ Erreur MySQL :", error);
    } finally {
        await connection.end();
    }
}

fixBaoule11();