import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // Assurez-vous que prisma est correctement importé

// Gestion de la requête POST
export async function POST(req) { 
  try {
    console.log("Réception de la requête POST pour ajouter un produit...");

    const requestBody = await req.json();
    console.log("Contenu de la requête:", requestBody);

    const { name, description, price, category, image, artisanId ,fabricId} = requestBody;

    // Vérification des champs obligatoires
    if (!name || !description || !price || !category || !image) {
      console.log("Un ou plusieurs champs obligatoires sont manquants.");
      return NextResponse.json({ message: "Champs obligatoires manquants" }, { status: 400 });
    }

    // Conversion des valeurs
    const parsedPrice = parseFloat(price);
    const parsedArtisanId = artisanId ? parseInt(artisanId) : null;
    const parsedFabricId = fabricId ? parseInt(fabricId, 10) : null;

    if ((category === "MODEL" || category === "ACCESSORY") && !parsedFabricId) {
      return new Response(
        JSON.stringify({ message: "fabricId est obligatoire pour cette catégorie." }),
        { status: 400 }
      );
    }
    let categoryId;

    console.log("Catégorie sélectionnée:", category);

    // Création des entrées selon la catégorie
    if (category === 'FABRIC') {
      console.log("Création d'un tissu...");
      const fabric = await prisma.fabric.create({
        data: {
          name,
          price: parsedPrice,
          material: requestBody.material || null,
          pattern: requestBody.pattern || null,
          origin: requestBody.origin || null,
          color: requestBody.color || null,
          size: requestBody.size || null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      console.log("Tissu créé:", fabric);
      categoryId = fabric.id;

    } else if (category === 'MODEL') {
      console.log("Création d'un modèle...");
      const model = await prisma.model.create({
        data: {
          name,
          description,
          price: parsedPrice,
          fabricId: parsedFabricId,
          color: requestBody.color || null,
          // artisanId: parsedArtisanId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      console.log("Modèle créé:", model);
      categoryId = model.id;

    } else if (category === 'ACCESSORY') {
      console.log("Création d'un accessoire...");
      const accessory = await prisma.accessory.create({
        data: {
          name,
          description,
          price: parsedPrice,
          fabricId: requestBody.fabricId || null,
          color: requestBody.color || null,
          // artisanId: parsedArtisanId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      console.log("Accessoire créé:", accessory);
      categoryId = accessory.id;
    }

    // Création du produit principal
    console.log("Création du produit principal...");
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parsedPrice,
        category,
        image,
        fabricId: category === 'FABRIC' ? categoryId : null,
        modelId: category === 'MODEL' ? categoryId : null,
        accessoryId: category === 'ACCESSORY' ? categoryId : null,
        // artisanId: parsedArtisanId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log("Produit ajouté avec succès:", product);
    return NextResponse.json(product, { status: 201 });

  } catch (error) {
    console.error("Erreur lors de l'ajout du produit:", error);
    return NextResponse.json({ message: "Erreur lors de l'ajout du produit" }, { status: 500 });
  }
}
// Gestion de la requête GET
export async function GET(req) {
  try {
    console.log("🔄 Début de la récupération des produits...");
    console.log("URL de la requête :", req.url);

    // Extraction des paramètres de la requête
    const { searchParams } = new URL(req.url);
    const categoryFilter = searchParams.get("category");
    const countryFilter = searchParams.get("country");
    const priceMin = parseFloat(searchParams.get("priceMin")) || 0;
    const priceMax = parseFloat(searchParams.get("priceMax")) || 500;
    const colorFilter = searchParams.get("color");
    const materialFilter = searchParams.get("material");
    const artisanFilter = searchParams.get("artisan");

    console.log("🔍 Paramètres reçus :");
    console.log("Category :", categoryFilter);
    console.log("Country :", countryFilter);
    console.log("PriceMin :", priceMin, "| PriceMax :", priceMax);
    console.log("Color :", colorFilter);
    console.log("Material :", materialFilter);
    console.log("Artisan :", artisanFilter);

    // Configuration des filtres pour Prisma
    const filters = {};

    if (categoryFilter) {
      filters.category = categoryFilter;
      console.log("✅ Filtre catégorie appliqué :", filters.category);
    }

    if (countryFilter) {
      filters.countries = {
        some: {
          name: countryFilter,
        },
      };
      console.log("✅ Filtre pays appliqué :", filters.countries);
    }

    if (!isNaN(priceMin) || !isNaN(priceMax)) {
      filters.price = {};
      if (!isNaN(priceMin)) {
        filters.price.gte = priceMin;
      }
      if (!isNaN(priceMax)) {
        filters.price.lte = priceMax;
      }
      console.log("✅ Filtre prix appliqué :", filters.price);
    }

    if (artisanFilter) {
      filters.artisan = {
        contains: artisanFilter,
      };
      console.log("✅ Filtre artisan appliqué :", filters.artisan);
    }

    if (materialFilter || colorFilter) {
      filters.fabric = {
        some: {
          AND: [
            materialFilter ? { material: { equals: materialFilter } } : {},
            colorFilter ? { color: { equals: colorFilter } } : {},
          ],
        },
      };
      console.log("✅ Filtre material/color appliqué :", filters.fabric);
    }

    console.log("🔧 Filtres finaux appliqués :", filters);

    // Requête Prisma
    const products = await prisma.product.findMany({
      where: filters,
      include: {
        fabric: true,
        model: true,
        accessory: true,
        country: true,
      },
    });

    console.log("✅ Produits récupérés :", products);

    return NextResponse.json(products, { status: 200 });

  } catch (error) {
    console.error("❌ Erreur lors de la récupération des produits :", error.message);
    return NextResponse.json(
      { message: "Erreur lors de la récupération des produits", error: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
    console.log("🔌 Prisma déconnecté.");
  }
}