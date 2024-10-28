import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // Assurez-vous que prisma est correctement importé

// Gestion de la requête POST
export async function POST(req) { 
  try {
    console.log("Réception de la requête POST pour ajouter un produit...");

    const requestBody = await req.json();
    console.log("Contenu de la requête:", requestBody);

    const { name, description, price, category, image, artisanId } = requestBody;

    // Vérification des champs obligatoires
    if (!name || !description || !price || !category || !image) {
      console.log("Un ou plusieurs champs obligatoires sont manquants.");
      return NextResponse.json({ message: "Champs obligatoires manquants" }, { status: 400 });
    }

    // Conversion des valeurs
    const parsedPrice = parseFloat(price);
    const parsedArtisanId = artisanId ? parseInt(artisanId) : null;
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
          fabricId: requestBody.fabricId || null,
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
    console.log("Récupération de la liste des produits avec tous les filtres...");

    // Extraction des paramètres de la requête
    const { searchParams } = new URL(req.url);
    const categoryFilter = searchParams.get('category');
    const countryFilter = searchParams.get('country');
    const priceMin = parseFloat(searchParams.get('priceMin')) || 0;
    const priceMax = parseFloat(searchParams.get('priceMax')) || 500;
    const colorFilter = searchParams.get('color');
    const materialFilter = searchParams.get('material');
    const artisanFilter = searchParams.get('artisan');

    // Configuration des filtres pour Prisma
    const filters = {};

    // Application du filtre de catégorie
    if (categoryFilter) {
      filters.category = categoryFilter;
    }

    // Application du filtre de pays
    if (countryFilter) {
      filters.countries = {
        some: {
          name: countryFilter,
        },
      };
    }

    // Application des filtres de prix
    if (!isNaN(priceMin) || !isNaN(priceMax)) {
      filters.price = {};
      if (!isNaN(priceMin)) {
        filters.price.gte = priceMin;
      }
      if (!isNaN(priceMax)) {
        filters.price.lte = priceMax;
      }
    }

    // Application du filtre d'artisan
    if (artisanFilter) {
      filters.artisan = {
        contains: artisanFilter, // Utilisation de contains pour permettre une recherche partielle
      };
    }

    // Filtrage basé sur les champs 'material' et 'color' dans la table 'fabric'
    if (materialFilter || colorFilter) {
      filters.fabric = {
        material: materialFilter ? { equals: materialFilter } : undefined,
        color: colorFilter ? { equals: colorFilter } : undefined,
      };
    }

    console.log("Filtres appliqués :", filters);

    // Exécution de la requête Prisma avec tous les filtres
    const products = await prisma.product.findMany({
      where: filters,
      include: {
        fabric: true,
        model: true,
        accessory: true,
        countries: true,
      },
    });

    console.log("Produits récupérés avec filtres:", products);
    return NextResponse.json(products, { status: 200 });

  } catch (error) {
    console.error("Erreur lors de la récupération des produits avec filtres:", error);
    return NextResponse.json({ message: "Erreur lors de la récupération des produits" }, { status: 500 });
  }
}