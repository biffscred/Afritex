import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ API GET : Liste des couleurs uniques présentes dans les produits
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: { color: true },
    });

    // Extraire toutes les couleurs, même si stockées en CSV (ex : "Noir, Blanc")
    const allColors = products
      .flatMap((p) =>
        p.color?.split(",").map((c) => c.trim()).filter(Boolean) || []
      )
      .filter(Boolean);

    // Supprimer doublons + trier
    const uniqueColors = [...new Set(allColors)].sort((a, b) =>
      a.localeCompare(b)
    );

    return NextResponse.json(uniqueColors);
  } catch (error) {
    console.error("❌ Erreur API /api/colors :", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des couleurs" },
      { status: 500 }
    );
  }
}
