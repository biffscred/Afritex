import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// ✅ POST : Ajouter un produit
export async function POST(req) {
  try {
    const requestBody = await req.json();
    const { name, description, price, category, image, artisanId, fabricId, color, material } = requestBody;

    if (!name || !description || !price || !category || !image) {
      return NextResponse.json({ message: "Champs obligatoires manquants" }, { status: 400 });
    }

    const parsedPrice = parseFloat(price);
    const parsedArtisanId = artisanId ? parseInt(artisanId, 10) : null;
    const parsedFabricId = fabricId ? parseInt(fabricId, 10) : null;

    if (artisanId) {
      const artisanExists = await prisma.artisan.findUnique({ where: { id: parsedArtisanId } });
      if (!artisanExists) return NextResponse.json({ message: "Artisan non trouvé." }, { status: 404 });
    }

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

    if (category === "FABRIC") {
      let existingFabric = await prisma.fabric.findFirst({ where: { name } });

      if (existingFabric) {
        await prisma.product.update({
          where: { id: product.id },
          data: {
            fabric: { connect: { id: existingFabric.id } },
          },
        });
      } else {
        await prisma.fabric.create({
          data: {
            name,
            image,
            price: parsedPrice,
            productId: product.id,
            material,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      }
    } else if (category === "MODEL") {
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
    } else if (category === "ACCESSORY") {
      let existingFabric = null;

      if (parsedFabricId) {
        existingFabric = await prisma.fabric.findUnique({ where: { id: parsedFabricId } });
        if (!existingFabric) {
          return NextResponse.json({ message: "Le tissu associé est introuvable." }, { status: 400 });
        }
      }

      await prisma.accessory.create({
        data: {
          name,
          description,
          price: parsedPrice,
          productId: product.id,
          fabricId: existingFabric?.id || null,
          artisanId: parsedArtisanId,
          color,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("❌ POST Erreur :", error);
    return NextResponse.json({ message: "Erreur serveur POST" }, { status: 500 });
  }
}

// ✅ GET : Récupérer les produits avec filtres
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const categoryFilter = searchParams.get("category");
    const countryFilter = searchParams.get("country");
    const colorFilter = searchParams.get("color");
    const materialFilter = searchParams.get("material");
    const priceMin = parseFloat(searchParams.get("priceMin")) || 0;
    const priceMax = parseFloat(searchParams.get("priceMax")) || 9999;
    const page = parseInt(searchParams.get("page")) || 1;
    const pageSize = parseInt(searchParams.get("pageSize")) || 20;
    const sortBy = searchParams.get("sortBy") || "price";
    const sortOrder = searchParams.get("sortOrder") === "desc" ? "desc" : "asc";

    const whereClause = {
      price: { gte: priceMin, lte: priceMax },
      ...(categoryFilter && { category: categoryFilter }),
      ...(countryFilter && {
        countries: { some: { name: countryFilter } },
      }),
      ...(colorFilter && {
        color: { contains: colorFilter, mode: "insensitive" },
      }),
      ...(materialFilter && {
        material: { contains: materialFilter, mode: "insensitive" },
      }),
    };

    const skip = (page - 1) * pageSize;

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        include: {
          productImages: true,
          artisan: true,
          countries: true,
          fabric: { include: { fabricImages: true } },
          models: { include: { modelImages: true } },
          accessories: { include: { accessoryImages: true } },
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: pageSize,
      }),
      prisma.product.count({ where: whereClause }),
    ]);

    return NextResponse.json({ products, totalCount, page, pageSize }, { status: 200 });
  } catch (error) {
    console.error("❌ GET Erreur :", error);
    return NextResponse.json({ message: "Erreur serveur GET" }, { status: 500 });
  }
}
