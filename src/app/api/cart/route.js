import { getToken } from "next-auth/jwt";
import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

// 🚀 Fonction GET : Récupération des articles du panier
export async function GET(req) {
  console.log("🚀 Début de la requête GET pour récupérer le panier.");

  // Vérifiez si Prisma est bien initialisé
  console.log("🔧 Vérification de Prisma instance :", prisma);

  if (!prisma) {
    console.error("❌ Prisma est undefined. Vérifiez l'importation.");
    return NextResponse.json({ message: "Erreur serveur. Prisma non initialisé." }, { status: 500 });
  }

  const token = await getToken({ req, secret });
  console.log("🔑 Token récupéré :", token);

  if (!token || !token.id) {
    console.log("❌ Token ou ID utilisateur manquant.");
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
            model: { select: { id: true, name: true, price: true, modelimage: { select: { url: true } } } },
            accessory: { select: { id: true, name: true, price: true, accessoryimage: { select: { url: true } } } },
            fabric: { select: { id: true, name: true, price: true, fabricimage: { select: { url: true } } } },
          },
        },
      },
    });

    console.log("✅ Résultat de la commande :", order);

    if (!order) {
      console.log("⚠️ Aucune commande trouvée pour cet utilisateur.");
      return NextResponse.json([], { status: 200 });
    }

    const items = order.orderitem.map((item) => {
      const product = item.model || item.accessory || item.fabric;
      const imageUrl =
        product?.modelImages?.[0]?.url ||
        product?.accessoryimage?.[0]?.url ||
        product?.fabricImages?.[0]?.url ||
        "/images/default.png";

      return {
        id: item.id,
        name: product.name,
        price: product.price,
        image: imageUrl,
        quantity: item.quantity,
      };
    });

    console.log("✅ Articles du panier formatés :", items);
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur GET panier :", error);
    return NextResponse.json({ message: "Erreur serveur lors de la récupération du panier." }, { status: 500 });
  }
}

// 🚀 Fonction POST : Ajout d'article au panier
export async function POST(req) {
  console.log("🚀 Début de la requête POST pour ajouter un article au panier.");

  // Vérifiez si Prisma est bien initialisé
  console.log("🔧 Vérification de Prisma instance :", prisma);

  if (!prisma) {
    console.error("❌ Prisma est undefined. Vérifiez l'importation.");
    return NextResponse.json({ message: "Erreur serveur. Prisma non initialisé." }, { status: 500 });
  }

  const token = await getToken({ req, secret });
  console.log("🔑 Token récupéré :", token);

  if (!token || !token.id) {
    console.log("❌ Token ou ID utilisateur manquant.");
    return NextResponse.json({ message: "Vous devez être connecté pour ajouter des articles." }, { status: 401 });
  }

  const userId = token.id;
  console.log("✅ ID utilisateur récupéré :", userId);

  try {
    const { productId, quantity, category } = await req.json();
    console.log("🔍 Paramètres reçus :", { productId, quantity, category });

    if (!productId || !quantity || !category) {
      console.log("❌ Paramètres manquants.");
      return NextResponse.json({ message: "Données invalides." }, { status: 400 });
    }

    // 📦 Récupération ou création de la commande
    console.log("🔧 Recherche de la commande utilisateur dans Prisma...");
    let userOrder = await prisma.order.findFirst({ where: { userId } });
    console.log("🔍 Résultat de la recherche :", userOrder);

    if (!userOrder) {
      console.log("⚠️ Aucune commande trouvée. Création d'une nouvelle commande...");
      userOrder = await prisma.order.create({ data: { userId, total: 0 } });
      console.log("✅ Nouvelle commande créée :", userOrder);
    }

    // 🔍 Recherche du produit et de l'article existant
    console.log(`🔍 Recherche du produit (Catégorie : ${category}, ID : ${productId})...`);
    let product = null;
    let existingOrderItem = null;

    switch (category) {
      case "FABRIC":
        product = await prisma.fabric.findUnique({ where: { id: productId } });
        existingOrderItem = await prisma.orderitem.findFirst({
          where: { orderId: userOrder.id, fabricId: productId },
        });
        break;
      case "MODEL":
        product = await prisma.model.findUnique({ where: { id: productId } });
        existingOrderItem = await prisma.orderitem.findFirst({
          where: { orderId: userOrder.id, modelId: productId },
        });
        break;
      case "ACCESSORY":
        product = await prisma.accessory.findUnique({ where: { id: productId } });
        existingOrderItem = await prisma.orderitem.findFirst({
          where: { orderId: userOrder.id, accessoryId: productId },
        });
        break;
      default:
        console.log("❌ Catégorie invalide :", category);
        return NextResponse.json({ message: "Catégorie invalide." }, { status: 400 });
    }

    console.log("✅ Produit récupéré :", product);

    if (!product) {
      console.log("❌ Produit introuvable.");
      return NextResponse.json({ message: "Produit introuvable." }, { status: 404 });
    }

    // 🔄 Mise à jour de la quantité si l'article existe
    if (existingOrderItem) {
      console.log("🔄 Mise à jour de la quantité de l'article existant...");
      const updatedOrderItem = await prisma.orderitem.update({
        where: { id: existingOrderItem.id },
        data: { quantity: existingOrderItem.quantity + quantity },
      });
      console.log("✅ Quantité mise à jour :", updatedOrderItem);
      return NextResponse.json(updatedOrderItem, { status: 200 });
    }

    // ➕ Ajout d'un nouvel article
    const connectData = {};
    if (category === "FABRIC") connectData.fabric = { connect: { id: productId } };
    else if (category === "MODEL") connectData.model = { connect: { id: productId } };
    else if (category === "ACCESSORY") connectData.accessory = { connect: { id: productId } };

    const newOrderItem = await prisma.orderitem.create({
      data: {
        quantity,
        price: product.price,
        order: { connect: { id: userOrder.id } },
        ...connectData,
      },
    });

    console.log("✅ Nouvel article ajouté :", newOrderItem);
    return NextResponse.json(newOrderItem, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur POST ajout panier :", error);
    return NextResponse.json({ message: "Erreur serveur lors de l'ajout au panier." }, { status: 500 });
  }
}
