import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // Assurez-vous que prisma est correctement importé

// Gestion de la requête POST

export async function POST(req) {
  try {
    console.log("📩 Réception de la requête POST pour ajouter un produit...");

    // 1️⃣ Récupération et affichage des données reçues
    const requestBody = await req.json();
    console.log("✅ Contenu de la requête reçue :", requestBody);

    const { name, description, price, category, image, artisanId, fabricId, color } = requestBody;

    // 2️⃣ Vérification des champs obligatoires
    if (!name || !description || !price || !category || !image) {
      console.log("❌ Champs obligatoires manquants :", { name, description, price, category, image });
      return NextResponse.json({ message: "Champs obligatoires manquants" }, { status: 400 });
    }
    console.log("📌 `fabricId` reçu AVANT conversion :", fabricId);

    const parsedPrice = parseFloat(price);
    const parsedArtisanId = artisanId ? parseInt(artisanId, 10) : null;
    const parsedFabricId = fabricId ? parseInt(fabricId, 10) : null; // ✅ Convertit en entier
    console.log("📌 `fabricId` APRÈS conversion :", parsedFabricId);
    // 3️⃣ Vérifier si l'artisan existe
    if (artisanId) {
      const artisanExists = await prisma.artisan.findUnique({ where: { id: parsedArtisanId } });
      if (!artisanExists) {
        return NextResponse.json({ message: "Artisan non trouvé." }, { status: 404 });
      }
    }

    // 4️⃣ Création du produit
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

    console.log("✅ Produit créé avec succès :", product);

    // 5️⃣ Gestion des différentes catégories
    if (category === "FABRIC") {
      console.log("🧵 Vérification du tissu...");
      let existingFabric = await prisma.fabric.findFirst({ where: { name } });

      if (existingFabric) {
        console.log("✅ Tissu existant trouvé :", existingFabric);
        await prisma.product.update({
          where: { id: product.id },
          data: {
            fabric: { connect: { id: existingFabric.id } }, // ✅ Associe le tissu existant au produit
          },
        });
      } else {
        console.log("🧵 Création d'un nouveau tissu...");
        await prisma.fabric.create({
          data: {
            name,
            image,
            price: parsedPrice,
            productId: product.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      }
    } 
    
    else if (category === "MODEL") {
      console.log("👕 Création d'un modèle...");
      await prisma.model.create({
        data: {
          name,
          description,
          price: parsedPrice,
          productId: product.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } 
    
    else if (category === "ACCESSORY") {
      console.log("👜 Création d'un accessoire...");

      // 6️⃣ Vérifier si le tissu associé à l'accessoire existe
      let existingFabric = null;

      if (parsedFabricId) {
        existingFabric = await prisma.fabric.findUnique({
          where: { id: parsedFabricId },
        });

        if (!existingFabric) {
          console.error("❌ Erreur : Le tissu associé à l'accessoire est introuvable.");
          return NextResponse.json({ message: "Le tissu associé à l'accessoire est introuvable." }, { status: 400 });
        }
      }

      // 7️⃣ Création de l'accessoire
      await prisma.accessory.create({
        data: {
          name,
          description,
          price: parsedPrice,
          fabricId: existingFabric ? existingFabric.id : null,  // Associe au tissu si disponible
          productId: product.id, // Associe le produit à l'accessoire
          color,
          artisanId: parsedArtisanId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      console.log("✅ Accessoire créé avec succès !");
    }

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
        
      },
    });

    console.log("✅ Produits récupérés :", products);
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des produits :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}