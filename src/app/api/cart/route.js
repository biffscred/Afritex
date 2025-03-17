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

    // Pause pour attendre que Prisma mette bien à jour les données (TEST)
    await new Promise(resolve => setTimeout(resolve, 300)); // 300ms de pause

    // Recherche d'une commande active
    const order = await prisma.order.findFirst({
      where: { userId, status: "PENDING" },
      include: {
        orderItems: {
          include: {
            product: { select: { id: true, name: true, price: true, image: true, description: true } },
            fabric: { select: { id: true, product: { select: { id: true, name: true, price: true, image: true, description: true } } } },
            accessory: { select: { id: true, product: { select: { id: true, name: true, price: true, image: true, description: true } } } },
            model: { select: { id: true, product: { select: { id: true, name: true, price: true, image: true, description: true } } } },
          },
        },
      },
    });

    if (!order) {
      console.log("⚠️ Aucun panier actif trouvé pour cet utilisateur.");
      return NextResponse.json([], { status: 200 });
    }

    console.log("✅ Panier trouvé :", order);
    console.log("🔍 Contenu réel de `orderItems` :", JSON.stringify(order.orderItems, null, 2));

    // Formatage des articles du panier
    const items = order.orderItems.map((item) => ({
      id: item.id,
      name: item.product?.name || item.fabric?.product?.name || item.accessory?.product?.name || item.model?.product?.name,
      price: item.product?.price || item.fabric?.product?.price || item.accessory?.product?.price || item.model?.product?.price,
      image: item.product?.image || item.fabric?.product?.image || item.accessory?.product?.image || item.model?.product?.image,
      description: item.product?.description || item.fabric?.product?.description || item.accessory?.product?.description || item.model?.product?.description,
      quantity: item.quantity,
    }));

    console.log("✅ Articles du panier formatés :", items);
    const recalculatedTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return NextResponse.json({
      orderId: order.id,
      total: recalculatedTotal, // Vérifie si `total` est défini
      items,  // 🔴 Ici, on utilise bien `items` et non `formattedItems`
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
    // 📌 Vérifier l'utilisateur connecté
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

    // 📌 Vérifier si l'utilisateur existe en base
    const userExists = await prisma.user.findUnique({ where: { id: userId } });

    if (!userExists) {
      console.log("❌ Erreur : L'utilisateur n'existe pas.");
      return NextResponse.json(
        { message: "Utilisateur introuvable." },
        { status: 404 }
      );
    }

    // 📌 Récupérer les données envoyées
    const { productId, fabricId, modelId, accessoryId, quantity } = await req.json();
    console.log("📦 Données reçues:", { productId, fabricId, modelId, accessoryId, quantity });

    // 📌 Vérification des entrées
    if ((!productId && !fabricId && !modelId && !accessoryId) || !quantity || quantity <= 0) {
      console.log("❌ Données invalides ou incomplètes.");
      return NextResponse.json(
        { message: "Données invalides ou incomplètes." },
        { status: 400 }
      );
    }

    let item = null;
    let itemType = "";

    // 📌 Vérifier quel type d'élément est ajouté
    if (productId) {
      console.log("🔍 Recherche du produit avec ID :", productId);
      item = await prisma.product.findUnique({ where: { id: productId } });
      itemType = "Product";
    } else if (fabricId) {
      console.log("🔍 Recherche du tissu avec ID :", fabricId);
      item = await prisma.fabric.findUnique({ where: { id: fabricId } });
      itemType = "Fabric";
    } else if (modelId) {
      console.log("🔍 Recherche du modèle avec ID :", modelId);
      item = await prisma.model.findUnique({ where: { id: modelId } });
      itemType = "Model";
    } else if (accessoryId) {
      console.log("🔍 Recherche de l'accessoire avec ID :", accessoryId);
      item = await prisma.accessory.findUnique({ where: { id: accessoryId } });
      itemType = "Accessory";
    }

    console.log("🛒 Élément trouvé :", item);

    if (!item) {
      console.log(`❌ ${itemType} introuvable pour l'ID:`, productId || fabricId || modelId || accessoryId);
      return NextResponse.json(
        { message: `${itemType} introuvable pour l'ID ${productId || fabricId || modelId || accessoryId}` },
        { status: 404 }
      );
    }

    // 📌 Vérifier si une commande en cours existe pour cet utilisateur
    let userOrder = await prisma.order.findFirst({
      where: {
        userId: userId,
        status: "PENDING",
      },
    });

    if (!userOrder) {
      console.log("🛒 Aucune commande en cours, création d'une nouvelle...");
      userOrder = await prisma.order.create({
        data: {
          userId,
          status: "PENDING",
          total: 0, // Initialisation du total
          createdAt: new Date(),
        },
      });
      console.log("🛒 Nouvelle commande créée :", userOrder.id);
    }

    // 📌 Vérifier si l'élément est déjà dans la commande
    const existingOrderItem = await prisma.orderItem.findFirst({
      where: {
        orderId: userOrder.id,
        productId: productId || null,
        fabricId: fabricId || null,
        modelId: modelId || null,
        accessoryId: accessoryId || null,
      },
    });

    let updatedOrderItem;
    if (existingOrderItem) {
      updatedOrderItem = await prisma.orderItem.update({
        where: { id: existingOrderItem.id },
        data: { quantity: existingOrderItem.quantity + quantity },
      });
      console.log("✅ Quantité mise à jour pour l'article existant:", updatedOrderItem);
    } else {
      updatedOrderItem = await prisma.orderItem.create({
        data: {
          quantity,
          price: item.price, // Prix du produit ou tissu
          order: { connect: { id: userOrder.id } },
          ...(productId ? { product: { connect: { id: productId } } } : {}),
          ...(fabricId ? { fabric: { connect: { id: fabricId } } } : {}),
          ...(modelId ? { model: { connect: { id: modelId } } } : {}),
          ...(accessoryId ? { accessory: { connect: { id: accessoryId } } } : {}),
        },
      });
      console.log("✅ Nouvel article ajouté au panier:", updatedOrderItem);
    }
// 🟢 Recalculer le total de la commande
const updatedTotal = await prisma.orderItem.aggregate({
  where: { orderId: userOrder.id },
  _sum: { price: true },
}).then(res => res._sum.price || 0);

// 🔵 Mettre à jour le total dans la table `Order`
await prisma.order.update({
  where: { id: userOrder.id },
  data: { total: updatedTotal },
});

console.log("📊 Total mis à jour :", updatedTotal);

    return NextResponse.json(updatedOrderItem, { status: 200 });

  } catch (error) {
    console.error("❌ Erreur POST ajout panier:", error);
    return NextResponse.json(
      { message: "Erreur serveur lors de l'ajout au panier.", error: error.message },
      { status: 500 }
    );
  }
}