

// 🔹 Met à jour un produit spécifique
import prisma from "../../../../lib/prisma";

export async function PUT(req, { params }) {
  const id = params.id; // Récupère l'ID du produit depuis l'URL

  console.log("🔄 PUT request received for Product ID:", id);

  if (!id || isNaN(id)) {
    return new Response(JSON.stringify({ message: "ID invalide ou manquant" }), { status: 400 });
  }

 
  try {
    const data = await req.json();
    console.log("📩 Request payload:", data);

    delete data.id;
    delete data.createdAt;

    // 🔥 Suppression des valeurs undefined (évite les erreurs Prisma)
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined || data[key] === "") {
        delete data[key];
      }
    });

    // 🔄 **Correction : Convertir `price` en nombre si nécessaire**
    if (data.price) {
      data.price = parseFloat(data.price);
    }

    // ✅ Gestion spécifique de `artisanId` (connexion ou suppression)
    
    delete data.id;
    delete data.createdAt;
    delete data.artisan; 
 

    console.log("✅ Data after filtering:", data);


    // 🔥 Vérifie que le produit existe avant la mise à jour
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) }
    });
    if (!existingProduct) {
      console.error("❌ Produit non trouvé");
      return new Response(JSON.stringify({ message: "Produit non trouvé" }), { status: 404 });
    }

    // ✅ Mise à jour du produit
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { ...data, updatedAt: new Date() },
    });

    console.log("✅ Produit mis à jour :", updatedProduct);
    return new Response(JSON.stringify(updatedProduct), { status: 200 });
  } catch (error) {
    console.error("❌ Erreur serveur :", error);
    return new Response(JSON.stringify({ message: "Erreur serveur" }), { status: 500 });
  }
}

// 🔹 Supprime un produit spécifique
export async function DELETE(req, { params }) {
  const { id } = params;
  console.log("🗑 DELETE request for Product ID:", id);

  try {
    const productId = parseInt(id);

    // Vérifie si le produit existe
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      console.log("⚠️ Produit introuvable.");
      return new Response(JSON.stringify({ message: "Produit introuvable." }), { status: 404 });
    }

    // 🧵 Supprimer les relations si c'est un tissu
    if (product.category === "FABRIC") {
      console.log("🔄 Suppression des données liées au tissu...");

      const fabric = await prisma.fabric.findUnique({ where: { productId: productId } });

      if (fabric) {
        console.log("📌 Tissu trouvé, suppression en cours...");

        await prisma.accessory.deleteMany({ where: { fabricId: fabric.id } });
        await prisma.model.deleteMany({ where: { fabricId: fabric.id } });
        await prisma.fabric.delete({ where: { id: fabric.id } });

        console.log("✅ Tissu et ses relations supprimés.");
      }
    }

    // 🔥 Supprime le produit
    await prisma.product.delete({ where: { id: productId } });
    console.log("✅ Produit supprimé avec succès.");

    return new Response(JSON.stringify({ message: "Produit supprimé avec succès." }), { status: 200 });

  } catch (error) {
    console.error("❌ Erreur lors de la suppression :", error);
    return new Response(JSON.stringify({ message: "Erreur serveur." }), { status: 500 });
  }
}
