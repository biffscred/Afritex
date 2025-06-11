export async function PUT(req, { params }) {
  try {
    const productId = parseInt(params.id);
    console.log("🔄 PUT request received for Product ID:", productId);

    if (!productId || isNaN(productId)) {
      return new Response(JSON.stringify({ message: "ID invalide ou manquant" }), { status: 400 });
    }

    let data = await req.json();
    console.log("📩 Request payload:", data);

    // Nettoyer les champs vides ou indéfinis
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined || data[key] === "") {
        delete data[key];
      }
    });

    // ✅ Corriger le type de `price`
    if (data.price !== undefined) {
      data.price = parseFloat(data.price);
    }

    // Gérer les pays à part
    let countryIds = [];
    if (Array.isArray(data.countries)) {
      countryIds = data.countries.map((c) => ({ id: parseInt(c.id) }));
      delete data.countries;
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        ...data,
        countries: {
          connect: countryIds,
        },
        updatedAt: new Date(),
      },
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
