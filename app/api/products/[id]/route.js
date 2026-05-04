import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";

export const dynamic = "force-dynamic";

// ✅ 1. MODIFIER UN PRODUIT (PUT)
export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Accès refusé" }, { status: 401 });
    }

    const productId = parseInt(params.id);
    const body = await req.json();

    const { 
      artisanName, 
      imagesGallery, 
      sizes, 
      colors, 
      specialties, 
      ...simpleData 
    } = body;

    // --- LOGIQUE ARTISAN (Connect or Create) ---
    let finalArtisanId = null;
    if (artisanName && artisanName.trim() !== "") {
      // Note: Assure-toi que 'name' est @unique dans ton modèle Artisan
      const artisan = await prisma.artisan.upsert({
        where: { name: artisanName.trim() },
        update: {},
        create: { 
          name: artisanName.trim(),
          country: { connect: { id: 1 } } // On lie à un pays par défaut (ID 1)
        }
      });
      finalArtisanId = artisan.id;
    }

    const price = parseFloat(simpleData.price) || 0;

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name: simpleData.name,
        description: simpleData.description,
        price: price,
        stock: parseInt(simpleData.stock) || 0,
        category: simpleData.category,
        image: simpleData.image,
        material: simpleData.material,
        mockupImage: simpleData.mockupImage,

        // Relation Artisan (Correction via connect/disconnect)
        artisan: finalArtisanId 
          ? { connect: { id: finalArtisanId } } 
          : { disconnect: true },

        // Couleurs & Spécialités (Si prisma generate est fait)
        colors: colors ? {
          set: colors.map(id => ({ id: parseInt(id) }))
        } : undefined,

        specialties: specialties ? {
          set: specialties.map(id => ({ id: parseInt(id) }))
        } : undefined,

        // Galerie Photos
        productImages: imagesGallery ? {
          deleteMany: {}, 
          create: imagesGallery
            .filter(url => url && url.trim() !== "")
            .map(url => ({ url }))
        } : undefined,

        // Logique Tissu (Fabric)
        fabric: simpleData.category === "FABRIC" ? {
          upsert: {
            create: {
              name: simpleData.name,
              price: price,
              width: body.width ? parseFloat(body.width) : 0,
              pattern: body.pattern || "",
            },
            update: {
              name: simpleData.name,
              price: price,
              width: body.width ? parseFloat(body.width) : undefined,
              pattern: body.pattern,
            }
          }
        } : undefined,

        // Logique Modèle (Model) pour les Tailles
        models: simpleData.category === "MODEL" ? {
          upsert: {
            // On cherche le premier modèle s'il existe déjà
            where: { id: body.modelId || -1 }, 
            create: {
              name: simpleData.name,
              description: simpleData.description,
              price: price,
              sizes: sizes ? {
                connect: sizes.map(id => ({ id: parseInt(id) }))
              } : undefined
            },
            update: {
              name: simpleData.name,
              price: price,
              sizes: sizes ? {
                set: sizes.map(id => ({ id: parseInt(id) }))
              } : undefined
            }
          }
        } : undefined,
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });

  } catch (error) {
    console.error("❌ Erreur PUT :", error);
    return NextResponse.json({ message: "Erreur", details: error.message }, { status: 500 });
  }
}

// ✅ 2. SUPPRIMER UN PRODUIT (DELETE)
export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Accès refusé" }, { status: 401 });
    }

    const productId = parseInt(params.id);

    // Dans ton schéma, Fabric, Model, Accessory et ProductImage ont 'onDelete: Cascade'
    // Donc supprimer le produit suffit à tout nettoyer proprement en base de données.
    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({ message: "Produit supprimé avec succès" }, { status: 200 });

  } catch (error) {
    console.error("❌ Erreur DELETE :", error);
    return NextResponse.json({ 
      message: "Erreur lors de la suppression", 
      details: error.message 
    }, { status: 500 });
  }
}