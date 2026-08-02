import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export const dynamic = 'force-dynamic';

// ✅ POST : Ajouter un produit avec ses relations (Tissu, Modèle, Accessoire)
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Accès refusé" }, { status: 401 });
    }

    const body = await req.json();
    const { 
      name, description, price, category, image, stock, 
      artisanId, material, specialties, colors, sizes,
      width, length, pattern, dimensions,
      imagesGallery // <--- Récupère le tableau des 4 images annexes
    } = body;

    if (!name || !description || !price || !category) {
      return NextResponse.json({ message: "Champs obligatoires manquants" }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      
      // FILTRAGE : On ne garde que les images qui ne sont pas vides
      // Pratique pour les bandes où tu ne mettras rien
      const validGalleryImages = imagesGallery?.filter(url => url && url.trim() !== "") || [];

      // 1. Création du produit principal
      const product = await tx.product.create({
        data: {
          name,
          description,
          price: parseFloat(price),
          category,
          image, // Image principale (ex: bog-afritex-11-bis.jpg)
          stock: parseInt(stock) || 0,
          material,
          artisanId: artisanId ? parseInt(artisanId) : null,
          
          // AJOUT DE LA GALERIE : Uniquement si des images ont été choisies
          productImages: {
            create: validGalleryImages.map(url => ({ url }))
          },

          specialties: {
            connect: specialties?.map(id => ({ id: parseInt(id) })) || []
          },
          colors: {
            connect: colors?.map(id => ({ id: parseInt(id) })) || []
          }
        }
      });

      // 2. Création automatique dans la table spécifique (Fabric, Model, Accessory)
      if (category === "FABRIC") {
        await tx.fabric.create({
          data: {
            productId: product.id,
            name,
            price: parseFloat(price),
            image,
            width: width ? parseFloat(width) : null,
            material,
            pattern
          }
        });
      } else if (category === "MODEL") {
        await tx.model.create({
          data: {
            productId: product.id,
            name,
            description,
            price: parseFloat(price),
            image,
            artisanId: artisanId ? parseInt(artisanId) : null,
            sizes: {
              connect: sizes?.map(id => ({ id: parseInt(id) })) || []
            }
          }
        });
      } else if (category === "ACCESSORY") {
        await tx.accessory.create({
          data: {
            productId: product.id,
            name,
            description,
            price: parseFloat(price),
            image,
            dimensions,
            artisanId: artisanId ? parseInt(artisanId) : null
          }
        });
      }

      return product;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("❌ POST Erreur :", error);
    return NextResponse.json({ message: "Erreur lors de la création du produit" }, { status: 500 });
  }
}

// ✅ GET : Lister les produits avec filtres avancés et recherche insensible à la casse
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search")?.trim();
    const category = searchParams.get("category");
    const country = searchParams.get("country");
    const color = searchParams.get("color");
    const specialty = searchParams.get("specialty");
    const priceMin = parseFloat(searchParams.get("priceMin")) || 0;
    const priceMax = parseFloat(searchParams.get("priceMax")) || 99999;
    
    const page = parseInt(searchParams.get("page")) || 1;
    const pageSize = parseInt(searchParams.get("pageSize")) || 20;

    const whereClause = {
      price: { gte: priceMin, lte: priceMax },
      ...(category && { category }),
      // Filtre par pays
      ...(country && { countries: { some: { name: { contains: country } } } }),
      // Filtre par couleur
      ...(color && { colors: { some: { name: { contains: color } } } }),
      // Filtre par spécialité (Bogolan, etc.)
      ...(specialty && { specialties: { some: { name: { contains: specialty } } } }),
      // Recherche textuelle globale (Sans 'mode: insensitive' pour SQLite)
      ...(search && {
        OR: [
          { name: { contains: search } },
          { description: { contains: search } }
        ]
      }),
    };

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        include: {
          productImages: true,
          countries: true,
          colors: true,
          specialties: true,
          fabric: true,
          models: { include: { sizes: true } },
          accessories: true,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count({ where: whereClause })
    ]);

    return NextResponse.json({ products, totalCount, page, pageSize }, { status: 200 });
  } catch (error) {
    console.error("❌ GET Erreur :", error);
    return NextResponse.json({ message: "Erreur lors de la récupération" }, { status: 500 });
  }
}