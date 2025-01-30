import { getToken } from "next-auth/jwt";
import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

// Gestion de la requête GET pour récupérer le panier
export async function GET(req) {
  console.log("🚀 Début de la requête GET pour récupérer le panier.");

  const token = await getToken({ req, secret });
  if (!token || !token.id) {
    console.log("❌ Utilisateur non connecté.");
    return NextResponse.json([], { status: 200 }); // Retourne un panier vide pour les non-connectés
  }

  const userId = token.id;

  try {
    console.log(`🔍 Recherche de la commande active pour l'utilisateur ID : ${userId}`);

    // Recherche d'une commande active
    const order = await prisma.order.findFirst({
      where: { userId }, // Ajout d'un statut "ACTIVE" si applicable
      include: {
        orderitem: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      console.log("⚠️ Aucun panier actif trouvé pour cet utilisateur.");
      return NextResponse.json([], { status: 200 });
    }

    console.log("✅ Panier trouvé :", order);

    // Formatage des articles du panier
    const items = order.orderitem.map((item) => ({
      id: item.id,
      name: item.product.name,
      price: item.product.price,
      image: item.product.image,
      quantity: item.quantity,
    }));

    console.log("✅ Articles du panier formatés :", items);

    return NextResponse.json({
      orderId: order.id,
      total: order.total, // Si le champ total existe
      items,
    }, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur lors de la récupération du panier :", error);
    return NextResponse.json({ 
      message: "Erreur serveur lors de la récupération du panier.",
      error: error.message,
    }, { status: 500 });
  }
}


export async function POST(req) {
  console.log("🚀 Début de la requête POST pour ajouter un article au panier.");

  try {
    const token = await getToken({ req, secret });

    if (!token || !token.id) {
      console.log("❌ Utilisateur non connecté.");
      return NextResponse.json(
        { message: "Vous devez être connecté pour ajouter des articles." },
        { status: 401 }
      );
    }

    const userId = token.id;
    console.log("👤 Utilisateur identifié :", userId);

    // Vérifier si l'utilisateur existe en base
    const userExists = await prisma.user.findUnique({ where: { id: userId } });

    if (!userExists) {
      console.log("❌ Erreur : L'utilisateur n'existe pas.");
      return NextResponse.json(
        { message: "Utilisateur introuvable." },
        { status: 404 }
      );
    }

    const { productId, quantity } = await req.json();
    console.log("📦 Données reçues:", { productId, quantity });

    // Vérifications des données entrantes
    if (!productId || !quantity || quantity <= 0) {
      console.log("❌ Données invalides ou incomplètes.");
      return NextResponse.json(
        { message: "Données invalides ou incomplètes." },
        { status: 400 }
      );
    }

    // Vérifier si le produit existe
    
    console.log("🔍 Recherche du produit avec ID :", productId);
    const product = await prisma.product.findUnique({ where: { id: productId } });
    console.log("🛒 Produit trouvé :", product);
    if (!product) {
      console.log("❌ Produit introuvable pour l'ID:", productId);
      return NextResponse.json(
        { message: `Produit introuvable pour l'ID ${productId}` },
        { status: 404 }
      );
    }

    // Vérifier si une commande en cours existe pour cet utilisateur
    let userOrder = await prisma.order.findFirst({
      where: { userId, status: "PENDING" },
    });

    if (!userOrder) {
      console.log("🛒 Aucune commande en cours, création d'une nouvelle...");
      userOrder = await prisma.order.create({
        data: {
          userId,
          status: "PENDING",
          total: 0, // Initialisation du total à 0
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      console.log("🛒 Nouvelle commande créée :", userOrder.id);
    }

    // Vérifier si le produit est déjà dans la commande
    const existingOrderItem = await prisma.orderItem.findFirst({
      where: { orderId: userOrder.id, productId },
    });

    if (existingOrderItem) {
      const updatedOrderItem = await prisma.orderItem.update({
        where: { id: existingOrderItem.id },
        data: { quantity: existingOrderItem.quantity + quantity },
      });
      console.log("✅ Quantité mise à jour pour l'article existant:", updatedOrderItem);
      return NextResponse.json(updatedOrderItem, { status: 200 });
    }

    // Si le produit n'est pas encore dans la commande, l'ajouter
    const newOrderItem = await prisma.orderItem.create({
      data: {
        quantity,
        price: product.price,
        order: { connect: { id: userOrder.id } },
        product: { connect: { id: productId } },
      },
    });

    console.log("✅ Nouvel article ajouté au panier:", newOrderItem);
    return NextResponse.json(newOrderItem, { status: 200 });

  } catch (error) {
    console.error("❌ Erreur POST ajout panier:", error);
    return NextResponse.json(
      {
        message: "Erreur serveur lors de l'ajout au panier.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

