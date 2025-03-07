import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ API pour récupérer tous les pays
export async function GET() {
  try {
    const countries = await prisma.country.findMany({
      orderBy: { name: "asc" }, // Trie les pays par ordre alphabétique
    });

    return NextResponse.json(countries);
  } catch (error) {
    console.error("❌ Erreur API /api/countries :", error);
    return NextResponse.json({ error: "Erreur lors de la récupération des pays" }, { status: 500 });
  }
}
