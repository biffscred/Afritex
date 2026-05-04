import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    // On va directement chercher dans la table Color
    const colors = await prisma.color.findMany({
      orderBy: { name: "asc" }
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.error("❌ Erreur API /api/colors :", error);
    return NextResponse.json(
      { error: "Impossible de récupérer les couleurs" },
      { status: 500 }
    );
  }
}