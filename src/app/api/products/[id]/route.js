import prisma from '../../../../lib/prisma';

// Gestion de la méthode PUT pour mettre à jour un produit spécifique
export async function PUT(req, { params }) {
  const { id } = params;  // Récupère l'ID à partir de l'URL
  console.log('PUT request received with ID:', id);

  try {
    const { name, description, price, category, image } = await req.json();
    console.log('Request payload:', { name, description, price, category, image });

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

    console.log('Product updated successfully:', product);

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
  const { id } = params;
  console.log("DELETE request received for product ID:", id);

  try {
    const productId = parseInt(id);

    // Vérifie si le produit existe
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      console.log("Produit introuvable.");
      return new Response(JSON.stringify({ message: "Produit introuvable." }), { status: 404 });
    }

    // Si le produit est de type FABRIC, vérifie et supprime les relations
    if (product.category === "FABRIC") {
      console.log("Suppression des données liées au tissu...");

      const fabric = await prisma.fabric.findUnique({
        where: { productId: productId },
      });

      if (fabric) {
        console.log("Tissu trouvé :", fabric);

        // Supprime les accessoires liés
        const deletedAccessories = await prisma.accessory.deleteMany({
          where: { fabricId: fabric.id },
        });
        console.log("Accessoires supprimés :", deletedAccessories);

        // Supprime les modèles liés
        const deletedModels = await prisma.model.deleteMany({
          where: { fabricId: fabric.id },
        });
        console.log("Modèles supprimés :", deletedModels);

        // Supprime le tissu
        await prisma.fabric.delete({
          where: { id: fabric.id },
        });
        console.log("Tissu supprimé.");
      } else {
        console.log("Aucun tissu lié trouvé pour ce produit.");
      }
    }

    // Supprime le produit
    const deletedProduct = await prisma.product.delete({
      where: { id: productId },
    });
    console.log("Produit supprimé :", deletedProduct);

    return new Response(JSON.stringify({ message: "Produit supprimé avec succès." }), {
      status: 200,
    });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    return new Response(JSON.stringify({ message: "Erreur lors de la suppression." }), {
      status: 500,
    });
  }
}
