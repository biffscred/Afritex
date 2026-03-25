
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
export const dynamic = 'force-dynamic';
// ✅ POST : Ajouter un produit (SÉCURISÉ)
export async function POST(req) {
  try {
    // 🔒 Vérification Admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Accès refusé" }, { status: 401 });
    }

    const requestBody = await req.json();
    const { name, description, price, category, image, artisanId, fabricId, color, material } = requestBody;

    if (!name || !description || !price || !category || !image) {
      return NextResponse.json({ message: "Champs obligatoires manquants" }, { status: 400 });
    }

    const parsedPrice = parseFloat(price);
    const parsedArtisanId = artisanId ? parseInt(artisanId, 10) : null;

    // Création du produit de base
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parsedPrice,
        category,
        image,
        artisanId: parsedArtisanId,
        color,
        material,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Logique spécifique par catégorie (Fabric, Model, Accessory)
    if (category === "FABRIC") {
      let existingFabric = await prisma.fabric.findFirst({ where: { name } });
      if (existingFabric) {
        await prisma.product.update({
          where: { id: product.id },
          data: { fabric: { connect: { id: existingFabric.id } } },
        });
      } else {
        await prisma.fabric.create({
          data: { name, image, price: parsedPrice, productId: product.id, material },
        });
      }
    } else if (category === "MODEL") {
      await prisma.model.create({
        data: { name, description, price: parsedPrice, productId: product.id },
      });
    } else if (category === "ACCESSORY") {
      const parsedFabricId = fabricId ? parseInt(fabricId, 10) : null;
      await prisma.accessory.create({
        data: {
          name,
          description,
          price: parsedPrice,
          productId: product.id,
          fabricId: parsedFabricId,
          artisanId: parsedArtisanId,
          color,
        },
      });
    }

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("❌ POST Erreur :", error);
    return NextResponse.json({ message: "Erreur serveur POST" }, { status: 500 });
  }
}

// ✅ GET : Lister les produits (RECHERCHE AMÉLIORÉE)
export async function GET(req) {
  try {
    const searchParams = new URL(req.url, "http://localhost:3000").searchParams;

    const search = searchParams.get("search")?.trim();
    const categoryFilter = searchParams.get("category");
    const countryFilter = searchParams.get("country");
    const colorFilter = searchParams.get("color");
    const materialFilter = searchParams.get("material");
    const priceMin = parseFloat(searchParams.get("priceMin")) || 0;
    const priceMax = parseFloat(searchParams.get("priceMax")) || 99999;
    const page = parseInt(searchParams.get("page")) || 1;
    const pageSize = parseInt(searchParams.get("pageSize")) || 20;

    const whereClause = {
      price: { gte: priceMin, lte: priceMax },
      ...(categoryFilter && { category: categoryFilter }),
      ...(countryFilter && { countries: { some: { name: countryFilter } } }),
      // On retire mode: "insensitive" de ces 3 lignes :
      ...(colorFilter && { color: { contains: colorFilter } }),
      ...(materialFilter && { material: { contains: materialFilter } }),
      ...(search && {
        OR: [
          { name: { contains: search } },
          { description: { contains: search } }
        ]
      }),
    };
    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        productImages: true,
        countries: true,
        fabric: { include: { fabricImages: true } },
        models: { include: { modelImages: true } },
        accessories: { include: { accessoryImages: true } },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });

    const totalCount = await prisma.product.count({ where: whereClause });

    return NextResponse.json({ products, totalCount, page, pageSize }, { status: 200 });
  } catch (error) {
    console.error("❌ ERREUR API GET :", error);
    return NextResponse.json({ message: "Erreur serveur GET" }, { status: 500 });
  }
}