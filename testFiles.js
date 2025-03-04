const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'public');

fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error("❌ Erreur lors de la lecture du dossier :", err);
        return;
    }
    console.log("📂 Fichiers trouvés dans public/ :", files);
});
