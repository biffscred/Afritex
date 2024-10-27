import { getToken } from "next-auth/jwt";
import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

// Gestion de la méthode GET pour récupérer les articles du panier
export async function GET(req) {
  console.log("Début de la requête GET pour le panier");

  const token = await getToken({ req, secret });
  if (!token || !token.id) {
    console.log("Token non trouvé ou ID utilisateur manquant dans le token.");
    return NextResponse.json({ message: 'Vous devez être connecté pour accéder au panier.' }, { status: 401 });
  }

  const userId = token.id;
  try {
    const order = await prisma.order.findFirst({
      where: { userId },
      include: {
        orderitem: {
          include: {
            model: {
              select: {
                id: true,
                name: true,
                price: true,
                modelimage: { select: { url: true } },
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
                fabricimage: { select: { url: true } },
              },
            },
          },
        },
      },
    });

    const items = order ? order.orderitem.map(item => {
      const product = item.model || item.accessory || item.fabric;
      const imageUrl = product.modelimage?.[0]?.url || product.accessoryimage?.[0]?.url || product.fabricimage?.[0]?.url || '/images/default.png';

      return {
        id: product.id,
        name: product.name,
        price: product.price,
        image: imageUrl,
        quantity: item.quantity,
      };
    }) : [];

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
  console.log("Token utilisateur récupéré :", token);

  if (!token || !token.id) {
    console.log("Token non trouvé ou ID utilisateur manquant.");
    return NextResponse.json({ message: 'Vous devez être connecté pour ajouter des articles au panier.' }, { status: 401 });
  }

  const userId = token.id;
  console.log("ID utilisateur récupéré à partir du token :", userId);

  try {
    const { productId, quantity, category } = await req.json();
    console.log("Données reçues dans le corps de la requête :", { productId, quantity, category });

    if (!productId || !quantity || !category) {
      console.log("Paramètres de la requête manquants ou incorrects.");
      return NextResponse.json({ message: 'Données de la requête invalides.' }, { status: 400 });
    }

    // Recherche de la commande de l'utilisateur
    let userOrder = await prisma.order.findFirst({ where: { userId } });
    console.log("Commande existante trouvée pour l'utilisateur :", userOrder);

    // Si aucune commande n'existe, en créer une nouvelle
    if (!userOrder) {
      userOrder = await prisma.order.create({
        data: { user: { connect: { id: userId } }, total: 0 },
      });
      console.log("Nouvelle commande créée pour l'utilisateur :", userOrder);
    }

    let product;
    let connectData;

    // Vérification de la catégorie du produit et recherche du produit associé
    if (category === 'FABRIC') {
      product = await prisma.fabric.findUnique({ where: { id: productId } });
      console.log("Produit trouvé dans la catégorie FABRIC :", product);
      connectData = { fabric: { connect: { id: productId } } };
    } else if (category === 'MODEL') {
      product = await prisma.model.findUnique({ where: { id: productId } });
      console.log("Produit trouvé dans la catégorie MODEL :", product);
      connectData = { model: { connect: { id: productId } } };
    } else if (category === 'ACCESSORY') {
      product = await prisma.accessory.findUnique({ where: { id: productId } });
      console.log("Produit trouvé dans la catégorie ACCESSORY :", product);
      connectData = { accessory: { connect: { id: productId } } };
    }

    if (!product) {
      console.log(`${category} spécifié avec ID ${productId} n'existe pas.`);
      return NextResponse.json({ message: `${category} spécifié n'existe pas.` }, { status: 404 });
    }

    // Création d'un nouvel article de commande
    console.log("Création d'un nouvel article de commande...");
    const newOrderItem = await prisma.orderitem.create({
      data: {
        quantity,
        price: product.price,
        order: { connect: { id: userOrder.id } },
        ...connectData,
      },
    });

    console.log("Nouvel article de commande créé avec succès :", newOrderItem);
    return NextResponse.json(newOrderItem, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'article au panier :", error);
    return NextResponse.json({ message: 'Erreur lors de l\'ajout de l\'article au panier.' }, { status: 500 });
  }
}