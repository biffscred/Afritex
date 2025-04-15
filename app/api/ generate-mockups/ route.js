import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // ✅ Import corrigé

export async function GET() {
  console.log("🚀 Appel de /api/generate-mockups");
  console.log("🔐 Token Replicate :", process.env.REPLICATE_API_TOKEN);

  if (!process.env.REPLICATE_API_TOKEN) {
    return NextResponse.json(
      { message: "❌ Clé API Replicate manquante" },
      { status: 401 }
    );
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        mockupImage: null,
        image: { not: null },
      },
    });

    console.log(`📦 Produits sans maquette : ${products.length}`);

    for (const product of products) {
      console.log(`🎨 Génération pour ${product.name}`);

      const response = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          version: "db21e45f370bb8c6f9ec4f29ecf47a21c3c7904aa814b5c3d5b86294eeb6af45", // SDXL
          input: {
            prompt: `Create a modern African fashion mockup using the pattern from this image: ${product.image}. Make it realistic and high-quality.`,
          },
        }),
      });

      const result = await response.json();
      console.log("📷 Résultat IA :", result);

      if (!result?.output || !Array.isArray(result.output)) {
        console.warn(`⚠️ Pas d'image générée pour ${product.id}`);
        continue;
      }

      const mockupImageUrl = result.output[result.output.length - 1];

      await prisma.product.update({
        where: { id: product.id },
        data: {
          mockupImage: mockupImageUrl,
        },
      });

      console.log(`✅ Maquette enregistrée pour ${product.name}`);
    }

    return NextResponse.json({ message: "✅ Toutes les maquettes ont été générées avec succès !" });

  } catch (error) {
    console.error("❌ Erreur générale :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
