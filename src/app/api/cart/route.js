import { getToken } from "next-auth/jwt";
import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

// Gestion de la méthode GET pour récupérer les articles du panier
export async function GET(req) {
  console.log("Début de la requête GET pour le panier");

  const token = await getToken({ req, secret });
  console.log("Token récupéré :", token);

  if (!token || !token.id) {
    console.log("Token non trouvé ou ID utilisateur manquant dans le token.");
    return NextResponse.json({ message: 'Vous devez être connecté pour accéder au panier.' }, { status: 401 });
  }

  const userId = token.id;
  console.log("ID utilisateur extrait du token :", userId);

  try {
    console.log("Recherche de la commande de l'utilisateur avec userId :", userId);

    const order = await prisma.order.findFirst({
      where: { userId },
      include: {
        orderItems: { 
          include: {
            model: {
              select: {
                id: true,
                name: true,
                price: true,
                modelImages: { select: { url: true } },
              },
            },
            accessory: {
              select: {
                id: true,
                name: true,
                price: true,
                accessoryimage: { select: { url: true } },
              },
            },
            fabric: {
              select: {
                id: true,
                name: true,
                price: true,
                fabricImages: { select: { url: true } },
              },
            },
          },
        },
      },
    });

    console.log("Commande récupérée :", order);

    // Regrouper les articles identiques en fonction de leur `orderItem.id`
    const items = order ? order.orderItems.map(item => {
      const product = item.model || item.accessory || item.fabric;
      const imageUrl = product.modelImages?.[0]?.url || product.accessoryimage?.[0]?.url || product.fabricImages?.[0]?.url || '/images/default.png';

      return {
        id: item.id,  // Utilise l'ID de l'orderItem ici pour la suppression
        name: product.name,
        price: product.price,
        image: imageUrl,
        quantity: item.quantity,
      };
    }) : [];

    console.log("Articles formatés pour le panier :", items);

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des articles du panier :", error);
    return NextResponse.json({ message: 'Erreur lors de la récupération des articles du panier.' }, { status: 500 });
  }
}

// Gestion de la méthode POST pour ajouter un article au panier
export async function POST(req) {
  console.log("Début de la requête POST pour ajouter un article au panier.");

  const token = await getToken({ req, secret });
  if (!token || !token.id) {
    console.log("Token non trouvé ou ID utilisateur manquant.");
    return NextResponse.json({ message: 'Vous devez être connecté pour ajouter des articles au panier.' }, { status: 401 });
  }

  const userId = token.id;
  console.log("ID utilisateur récupéré à partir du token :", userId);

  try {
    const { productId, quantity, category } = await req.json();
    if (!productId || !quantity || !category) {
      console.log("Paramètres de la requête manquants ou incorrects.");
      return NextResponse.json({ message: 'Données de la requête invalides.' }, { status: 400 });
    }

    // Recherche ou création de la commande pour l'utilisateur
    let userOrder = await prisma.order.findFirst({ where: { userId } });
    if (!userOrder) {
      userOrder = await prisma.order.create({
        data: { user: { connect: { id: userId } }, total: 0 },
      });
    }

    // Définir `product` et `existingOrderItem` en fonction de la catégorie
    let product;
    let existingOrderItem;

    if (category === 'FABRIC') {
      product = await prisma.fabric.findUnique({ where: { id: productId } });
      existingOrderItem = await prisma.orderItem.findFirst({
        where: { orderId: userOrder.id, fabricId: productId },
      });
    } else if (category === 'MODEL') {
      product = await prisma.model.findUnique({ where: { id: productId } });
      existingOrderItem = await prisma.orderItem.findFirst({
        where: { orderId: userOrder.id, modelId: productId },
      });
    } else if (category === 'ACCESSORY') {
      product = await prisma.accessory.findUnique({ where: { id: productId } });
      existingOrderItem = await prisma.orderItem.findFirst({
        where: { orderId: userOrder.id, accessoryId: productId },
      });
    } else {
      console.log("Catégorie inconnue :", category);
      return NextResponse.json({ message: 'Catégorie de produit invalide.' }, { status: 400 });
    }

    // Vérification si le produit a été trouvé
    if (!product) {
      console.log(`Produit ${category} avec ID ${productId} n'existe pas.`);
      return NextResponse.json({ message: `Produit ${category} spécifié n'existe pas.` }, { status: 404 });
    }

    // Si l'article existe déjà, mettre à jour la quantité
    if (existingOrderItem) {
      const updatedOrderItem = await prisma.orderItem.update({
        where: { id: existingOrderItem.id },
        data: { quantity: existingOrderItem.quantity + quantity },
      });
      console.log("Quantité mise à jour pour l'article existant :", updatedOrderItem);
      return NextResponse.json(updatedOrderItem, { status: 200 });
    }

    // Définir `connectData` en fonction de la catégorie
    const connectData = {};
    if (category === 'FABRIC') connectData.fabric = { connect: { id: productId } };
    else if (category === 'MODEL') connectData.model = { connect: { id: productId } };
    else if (category === 'ACCESSORY') connectData.accessory = { connect: { id: productId } };

    // Créer un nouvel article de commande
    const newOrderItem = await prisma.orderItem.create({
      data: {
        quantity,
        price: product.price,
        order: { connect: { id: userOrder.id } },
        ...connectData,
      },
    });

    console.log("Nouvel article ajouté au panier :", newOrderItem);
    return NextResponse.json(newOrderItem, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'article au panier :", error);
    return NextResponse.json({ message: 'Erreur lors de l\'ajout de l\'article au panier.' }, { status: 500 });
  }
}