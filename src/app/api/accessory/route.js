import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma"; // Assurez-vous que prisma est correctement importé

export async function GET(req) {
  try {
    console.log("API GET /api/accessory appelée");

    // Récupération des accessoires avec leurs relations associées
    const accessories = await prisma.accessory.findMany({
      include: {
        accessoryimage: { // Inclure les images associées
          select: {
            url: true,
            altText: true,
          },
        },
        fabric: { // Inclure les informations sur le tissu associé
          select: {
            name: true,
            color: true,
          },
        },
        artisan: { // Inclure l'artisan associé (si disponible)
          select: {
            name: true,
          },
        },
        country: { // Inclure les pays associés
          select: {
            name: true,
          },
        },
      },
    });

    console.log("Accessoires récupérés avec succès:", accessories);

    return NextResponse.json(accessories, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des accessoires:", error);
    return NextResponse.json(
      { message: "Erreur lors de la récupération des accessoires", error: error.message },
      { status: 500 }
    );
  }
}
