import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // Assurez-vous que prisma est correctement importé

// Gestion de la requête POST
export async function POST(req) {
  try {
    console.log("📩 Réception de la requête POST pour ajouter un produit...");

    const requestBody = await req.json();
    console.log("✅ Contenu de la requête reçue :", requestBody);

    const { name, description, price, category, image, artisanId } = requestBody;

    // Vérification des champs obligatoires
    if (!name || !description || !price || !category || !image) {
      console.log("❌ Champs obligatoires manquants :", { name, description, price, category, image });
      return NextResponse.json({ message: "Champs obligatoires manquants" }, { status: 400 });
    }

    // Conversion des valeurs
    const parsedPrice = parseFloat(price);
    const parsedArtisanId = artisanId ? parseInt(artisanId) : null;

    console.log("🔧 Champs après conversion :", {
      parsedPrice,
      parsedArtisanId,
    });

    // Vérification de l'artisan
    if (artisanId) {
      console.log("🔍 Vérification de l'existence de l'artisan ID :", parsedArtisanId);
      const artisanExists = await prisma.artisan.findUnique({
        where: { id: parsedArtisanId },
      });
      if (!artisanExists) {
        console.log("❌ Artisan introuvable :", parsedArtisanId);
        return NextResponse.json({ message: "Artisan non trouvé." }, { status: 404 });
      }
    }

    console.log("📂 Catégorie sélectionnée :", category);

    // Création du produit générique
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parsedPrice,
        category,
        image,
        artisanId: parsedArtisanId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log("✅ Produit générique créé :", product);

    // En fonction de la catégorie, créer dans les tables spécifiques
    if (category === "FABRIC") {
      console.log("🧵 Création d'un tissu...");
      await prisma.fabric.create({
        data: {
          name,
          image,
          price: parsedPrice,
          productId: product.id, // Associe le produit au tissu
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } else if (category === "MODEL") {
      console.log("👗 Création d'un modèle...");
      await prisma.model.create({
        data: {
          name,
          description,
          price: parsedPrice,
          productId: product.id, // Associe le produit au modèle
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } else if (category === "ACCESSORY") {
      console.log("👜 Création d'un accessoire...");
      await prisma.accessory.create({
        data: {
          name,
          description,
          price: parsedPrice,
          productId: product.id, // Associe le produit à l'accessoire
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }

    console.log("✅ Produit ajouté avec succès :", product);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("❌ Erreur lors de l'ajout du produit :", error);
    return NextResponse.json({ message: "Erreur lors de l'ajout du produit" }, { status: 500 });
  }
}

// Gestion de la requête GET
export async function GET(req) {
  try {
    console.log("📥 Réception de la requête GET pour récupérer les produits...");
    const { searchParams } = new URL(req.url);

    const categoryFilter = searchParams.get("category");
    const countryFilter = searchParams.get("country");
    const priceMin = parseFloat(searchParams.get("priceMin")) || 0;
    const priceMax = parseFloat(searchParams.get("priceMax")) || 500;

    console.log("🔍 Filtres de la requête :", {
      categoryFilter,
      countryFilter,
      priceMin,
      priceMax,
    });

    // Filtrer les produits sans utiliser fabricId, modelId, ou accessoryId
    const products = await prisma.product.findMany({
      where: {
        category: categoryFilter || undefined,
        price: {
          gte: priceMin,
          lte: priceMax,
        },
      },
      include: {
        artisan: true, // Inclure les relations nécessaires
        country: true, // Par exemple
      },
    });

    console.log("✅ Produits récupérés :", products);
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des produits :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
