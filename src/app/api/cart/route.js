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
    return NextResponse.json({ message: "Vous devez être connecté pour accéder au panier." }, { status: 401 });
  }

  const userId = token.id;

  try {
    console.log(`🔍 Recherche de la commande pour l'utilisateur ID : ${userId}`);

    const order = await prisma.order.findFirst({
      where: { userId },
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
      console.log("⚠️ Aucune commande trouvée pour cet utilisateur.");
      return NextResponse.json([], { status: 200 });
    }

    console.log("✅ Commande trouvée:", order);

    const items = order.orderitem.map((item) => {
      const product = item.product;
      return {
        id: item.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: item.quantity,
      };
    });

    console.log("✅ Articles du panier formatés:", items);
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur GET panier:", error);
    return NextResponse.json({ 
      message: "Erreur serveur lors de la récupération du panier.",
      error: error.message,
    }, { status: 500 });
  }
}

// Gestion de la requête POST pour ajouter au panier
export async function POST(req) {
  console.log("🚀 Début de la requête POST pour ajouter un article au panier.");

  const token = await getToken({ req, secret });
  if (!token || !token.id) {
    console.log("❌ Utilisateur non connecté.");
    return NextResponse.json({ message: "Vous devez être connecté pour ajouter des articles." }, { status: 401 });
  }

  const userId = token.id;

  try {
    const { productId, quantity } = await req.json();
    console.log("📦 Données reçues:", { productId, quantity });

    if (!productId || !quantity || quantity <= 0) {
      console.log("❌ Données invalides ou incomplètes.");
      return NextResponse.json({ message: "Données invalides ou incomplètes." }, { status: 400 });
    }

    let userOrder = await prisma.order.findFirst({ where: { userId } });
    if (!userOrder) {
      userOrder = await prisma.order.create({ data: { userId, total: 0 } });
      console.log("🛒 Nouvelle commande créée pour l'utilisateur.", userOrder);
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });

    if (!product) {
      console.log("❌ Produit introuvable pour l'ID:", productId);
      return NextResponse.json({ message: `Produit introuvable pour l'ID ${productId}` }, { status: 404 });
    }

    const existingOrderItem = await prisma.orderitem.findFirst({
      where: { orderId: userOrder.id, productId },
    });

    if (existingOrderItem) {
      const updatedOrderItem = await prisma.orderitem.update({
        where: { id: existingOrderItem.id },
        data: { quantity: existingOrderItem.quantity + quantity },
      });
      console.log("✅ Quantité mise à jour pour l'article existant:", updatedOrderItem);
      return NextResponse.json(updatedOrderItem, { status: 200 });
    }

    const newOrderItem = await prisma.orderitem.create({
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
    return NextResponse.json({ 
      message: "Erreur serveur lors de l'ajout au panier.",
      error: error.message,
    }, { status: 500 });
  }
}
