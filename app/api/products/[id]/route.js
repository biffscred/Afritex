
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";// Vérifie que ce chemin est correct
export const dynamic = "force-dynamic";
// ✅ MODIFIER un produit (Sécurisé)
export async function PUT(req, { params }) {
  try {
    // 1. Vérification de l'identité
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Accès refusé : Administrateur requis" }, { status: 401 });
    }

    const productId = parseInt(params.id);
    if (!productId || isNaN(productId)) {
      return NextResponse.json({ message: "ID invalide ou manquant" }, { status: 400 });
    }

    let data = await req.json();

    // Nettoyer les champs vides ou indéfinis
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined || data[key] === "") {
        delete data[key];
      }
    });

    // Corriger le type de prix
    if (data.price !== undefined) {
      data.price = parseFloat(data.price);
    }

    // Gérer les pays
    let countryIds = [];
    if (Array.isArray(data.countries)) {
      countryIds = data.countries.map((c) => ({ id: parseInt(c.id) }));
      delete data.countries;
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        ...data,
        countries: {
          connect: countryIds,
        },
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });

  } catch (error) {
    console.error("❌ Erreur PUT :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

// 🗑 SUPPRIMER un produit (Sécurisé)
export async function DELETE(req, { params }) {
  try {
    // 1. Vérification de l'identité
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Accès refusé : Administrateur requis" }, { status: 401 });
    }

    const productId = parseInt(params.id);

    // Vérifie si le produit existe
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json({ message: "Produit introuvable." }, { status: 404 });
    }

    // Supprimer les relations liées au tissu
    if (product.category === "FABRIC") {
      const fabric = await prisma.fabric.findUnique({ where: { productId: productId } });

      if (fabric) {
        await prisma.accessory.deleteMany({ where: { fabricId: fabric.id } });
        await prisma.model.deleteMany({ where: { fabricId: fabric.id } });
        await prisma.fabric.delete({ where: { id: fabric.id } });
      }
    }

    // Suppression finale du produit
    await prisma.product.delete({ where: { id: productId } });

    return NextResponse.json({ message: "Produit supprimé avec succès." }, { status: 200 });

  } catch (error) {
    console.error("❌ Erreur DELETE :", error);
    return NextResponse.json({ message: "Erreur serveur." }, { status: 500 });
  }
}