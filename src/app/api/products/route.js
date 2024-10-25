import prisma from '../../../lib/prisma';

// Gestion de la méthode GET (Récupération des produits avec filtres)
export async function GET(req) {
  try {
    console.log("Démarrage de la récupération des produits...");

    const url = new URL(req.url);
    const minPrice = url.searchParams.get("minPrice");
    const maxPrice = url.searchParams.get("maxPrice");
    const category = url.searchParams.get("category");

    // Filtrage basé sur les paramètres de requête
    const filters = {};
    if (minPrice) filters.price = { gte: parseFloat(minPrice) };
    if (maxPrice) filters.price = { ...filters.price, lte: parseFloat(maxPrice) };
    if (category) filters.category = category;

    console.log("Filtres appliqués :", filters);

    const products = await prisma.product.findMany({
      where: filters,
    });
    
    console.log("Produits récupérés avec succès:", products);

    return new Response(JSON.stringify(products), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    return new Response(JSON.stringify({ message: "Erreur lors de la récupération des produits" }), { 
      status: 500 
    });
  }
}

// Gestion de la méthode POST (Ajout d'un produit)
export async function POST(req) {
  try {
    console.log("Réception de la requête POST pour ajouter un produit...");
    
    const requestBody = await req.json();
    console.log("Corps de la requête reçu:", requestBody);

    const { name, description, price, category, image, fabricId, modelId, accessoryId, artisanId } = requestBody;

    // Validation des champs obligatoires
    if (!name || !description || !price || !category || !image) {
      console.log("Un ou plusieurs champs obligatoires sont manquants.");
      return new Response(JSON.stringify({ message: "Champs obligatoires manquants" }), { status: 400 });
    }

    const parsedPrice = parseFloat(price);
    const parsedFabricId = fabricId ? parseInt(fabricId) : null;
    const parsedModelId = modelId ? parseInt(modelId) : null;
    const parsedAccessoryId = accessoryId ? parseInt(accessoryId) : null;
    const parsedArtisanId = artisanId ? parseInt(artisanId) : null;

    console.log("Données transformées avant l'ajout au Prisma:", {
      name,
      description,
      parsedPrice,
      category,
      image,
      parsedFabricId,
      parsedModelId,
      parsedAccessoryId,
      parsedArtisanId
    });

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parsedPrice,
        category,
        image,
        fabricId: parsedFabricId,
        modelId: parsedModelId,
        accessoryId: parsedAccessoryId,
        artisanId: parsedArtisanId,
      },
    });

    console.log("Produit ajouté avec succès:", product);
    
    return new Response(JSON.stringify(product), { 
      status: 201, 
      headers: { 'Content-Type': 'application/json' } 
    });

  } catch (error) {
    console.error("Erreur lors de l'ajout du produit:", error);
    return new Response(JSON.stringify({ message: "Erreur lors de l'ajout du produit" }), { 
      status: 500 
    });
  }
}
