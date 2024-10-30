import prisma from '../../../lib/prisma';

export async function GET(req) {
  console.log("API /api/fabric appelée"); // Log pour vérifier que l'API est bien appelée

  try {
    console.log("Tentative de récupération des produits de type FABRIC...");
    const fabrics = await prisma.product.findMany({
      where: {
        category: "FABRIC", // Filtre pour les produits de type "FABRIC"
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        category: true,
        image: true,
      },
    });
    
    console.log("Produits récupérés :", fabrics); // Log pour afficher les données récupérées
    return new Response(JSON.stringify(fabrics), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error("Erreur lors de la récupération des produits fabric :", error); // Log pour afficher l'erreur
    return new Response(JSON.stringify({ message: "Erreur lors de la récupération des produits fabric", error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
