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


export async function GET(req) {
  try {
    console.log("📥 Réception de la requête GET pour récupérer les produits...");
    const { searchParams } = new URL(req.url);

    // 🔍 Récupération des filtres
    const categoryFilter = searchParams.get("category");
    const countryFilter = searchParams.get("country");
    const priceMin = parseFloat(searchParams.get("priceMin")) || 0;
    const priceMax = parseFloat(searchParams.get("priceMax")) || 500;

    // 🔧 Paramètres de pagination et tri
    const page = parseInt(searchParams.get("page")) || 1;
    const pageSize = parseInt(searchParams.get("pageSize")) || 300;
    const sortBy = searchParams.get("sortBy") || "price";
    const sortOrder = searchParams.get("sortOrder") === "desc" ? "desc" : "asc";

    console.log("🔍 Filtres de la requête :", {
      categoryFilter,
      countryFilter,
      priceMin,
      priceMax,
      page,
      pageSize,
      sortBy,
      sortOrder,
    });

    // ✅ Construction dynamique de whereClause
    const whereClause = {
      price: {
        gte: priceMin,
        lte: priceMax,
      },
      ...(categoryFilter && { category: categoryFilter }),
      ...(countryFilter && {
        countries: {
          some: {
            name: countryFilter,
          },
        },
      }),
    };

    const skip = (page - 1) * pageSize;

    // ✅ Ajout des relations supplémentaires
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        include: {
          artisan: true,
          countries: true,
          fabric: true,
          accessories: true,
          models: true,
        },
        orderBy: {
          [sortBy]: sortOrder,
        },
        skip,
        take: pageSize,
      }),
      prisma.product.count({ where: whereClause }),
    ]);

    console.log("✅ Produits récupérés :", products);
    return NextResponse.json(
      { products, totalCount, page, pageSize },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des produits :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
