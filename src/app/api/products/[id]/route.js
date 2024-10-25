import prisma from '../../../../lib/prisma';

// Gestion de la méthode PUT pour mettre à jour un produit spécifique
export async function PUT(req, { params }) {
  const { id } = params;  // Récupère l'ID à partir de l'URL

  try {
    const { name, description, price, category, image } = await req.json();

    // Mise à jour du produit dans la base de données
    const product = await prisma.product.update({
      where: { id: parseInt(id) },  // S'assure que l'ID est bien un entier
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        image,
      },
    });

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit:', error);
    return new Response(JSON.stringify({ message: 'Produit non trouvé ou erreur serveur' }), {
      status: 500,
    });
  }
}

// Gestion de la méthode DELETE pour supprimer un produit spécifique
export async function DELETE(req, { params }) {
  const { id } = params;  // Récupère l'ID à partir de l'URL

  try {
    await prisma.product.delete({ where: { id: parseInt(id) } });

    return new Response(JSON.stringify({ message: 'Produit supprimé' }), { status: 204 });
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    return new Response(JSON.stringify({ message: 'Erreur lors de la suppression du produit' }), { 
      status: 500 
    });
  }
}
