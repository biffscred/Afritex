import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// Récupérer tous les modèles
export async function GET() {
  try {
    console.log("🔄 Début de la récupération des modèles...");

    // Récupération des modèles avec leurs relations
    const models = await prisma.model.findMany({
      include: {
        fabric: true, // Inclut le tissu associé
        artisan: true, // Inclut l'artisan associé
        modelImages: true,  // Inclut les images associées
        countries: true, //Inclut les pays associés (si pertinent)
      
        product: {
          select: {
            image: true, // ✅ Récupère l'image du produit associé
          },
        },
      },
    })

    console.log("✅ Modèles récupérés :", models);

    // Vérification des chemins d'images
    models.forEach((model) => {
      console.log(`🔍 Modèle ID: ${model.id}, Image: ${model.image}`);
      if (model.modelimage && model.modelimage.length > 0) {
        console.log(`🔍 Images associées pour le modèle ${model.id}:`, model.modelimage);
      }
    });

    return NextResponse.json(models, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des modèles :", error);
    return NextResponse.json(
      { message: "Erreur lors de la récupération des modèles", error: error.message },
      { status: 500 }
    );
  }
}
