import prisma from '../../../lib/prisma';



export async function GET(req) {
  console.log("🔍 API /api/fabric appelée pour récupérer les vrais tissus...");

  try {
    const fabrics = await prisma.fabric.findMany({
      select: {
        id: true, // ✅ Récupère le bon `id` des tissus
        name: true,
        image: true,
        price: true,
        productId: true, // Ajoute ceci pour voir s'il est bien lié à un produit
      },
    });

    console.log("📌 Vrais tissus récupérés :", fabrics);
    return new Response(JSON.stringify(fabrics), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des tissus :", error);
    return new Response(JSON.stringify({ message: "Erreur lors de la récupération des tissus", error }), {
      status: 500,
    });
  }
}