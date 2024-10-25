import fs from 'fs';
import path from 'path';

const getFilesRecursively = (directory) => {
  let files = [];
  const items = fs.readdirSync(directory);

  for (const item of items) {
    const fullPath = path.join(directory, item);
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(getFilesRecursively(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
};

// Export de la méthode GET
export async function GET(req, res) {
  try {
    const imagesDirectory = path.join(process.cwd(), 'public', 'images');
    const files = getFilesRecursively(imagesDirectory);

    const imageFiles = files
  .filter((file) => /\.(png|jpe?g|webp)$/i.test(file))
  .map((file) => file.replace(`${path.join(process.cwd(), 'public')}`, '').replace(/\\/g, '/'))
  .map((file) => file.startsWith('/') ? file : '/' + file); // S'assure que chaque chemin commence par une barre oblique

    console.log('Images trouvées :', imageFiles);
    return new Response(JSON.stringify(imageFiles), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des images :', error);
    return new Response(JSON.stringify({ message: 'Erreur lors de la récupération des images' }), { status: 500 });
  }
}
