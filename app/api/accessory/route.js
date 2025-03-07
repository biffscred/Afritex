import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma"; // Assurez-vous que prisma est correctement importé

export async function GET() {
  try {
    console.log("🔄 Début de la récupération des accessoires...");

    // Récupération des accessoires avec leurs relations
    const accessories = await prisma.accessory.findMany({
      include: {
        fabric: true, // ✅ Inclut le tissu associé si pertinent
        artisan: true, // ✅ Inclut l'artisan associé
        accessoryImages: true,  // ✅ Inclut les images associées
        countries: true, // ✅ Inclut les pays associés si pertinent
      
        product: {
          select: {
            image: true, // ✅ Récupère l'image du produit associé
          },
        },
      },
    });

    console.log("✅ Accessoires récupérés :", accessories);

    // Vérification des chemins d'images
    accessories.forEach((accessory) => {
      console.log(`🔍 Accessoire ID: ${accessory.id}, Image: ${accessory.product?.image || "Aucune image"}`);
      if (accessory.accessoryImages && accessory.accessoryImages.length > 0) {
        console.log(`🔍 Images associées pour l'accessoire ${accessory.id}:`, accessory.accessoryImages);
      }
    });

    return NextResponse.json(accessories, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des accessoires :", error);
    return NextResponse.json(
      { message: "Erreur lors de la récupération des accessoires", error: error.message },
      { status: 500 }
    );
  }
}