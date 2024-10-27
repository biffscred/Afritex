import { getToken } from "next-auth/jwt";
import prisma from '../../../../lib/prisma';
import { NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

// Gestion de la mise à jour de la quantité (méthode PUT)
export async function PUT(req) {
  console.log("Requête PUT reçue pour la mise à jour de la quantité.");

  const token = await getToken({ req, secret });
  if (!token || !token.id) {
    console.log("Utilisateur non authentifié");
    return NextResponse.json({ message: 'Vous devez être connecté pour interagir avec le panier.' }, { status: 401 });
  }

  // Extraction de l'ID de l'article à partir de l'URL
  const urlParts = req.url.split('/');
  const itemId = urlParts[urlParts.length - 1]; // Dernier segment de l'URL

  if (!itemId || isNaN(itemId)) {
    console.log("ID de l'article manquant ou non valide.");
    return NextResponse.json({ message: 'ID de l\'article requis pour la mise à jour.' }, { status: 400 });
  }

  const { quantity } = await req.json();
  if (!quantity || quantity <= 0) {
    console.log("Quantité non valide.");
    return NextResponse.json({ message: 'Quantité non valide.' }, { status: 400 });
  }

  try {
    const updatedItem = await prisma.orderitem.update({
      where: { id: Number(itemId) },
      data: { quantity },
    });
    console.log("Article mis à jour avec succès:", updatedItem);
    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'article:", error);
    return NextResponse.json({ message: 'Erreur lors de la mise à jour de l\'article.' }, { status: 500 });
  }
}

// Gestion de la suppression d'un article (méthode DELETE)
export async function DELETE(req) {
  console.log("Requête DELETE reçue pour la suppression d'un article.");

  const token = await getToken({ req, secret });
  if (!token || !token.id) {
    console.log("Utilisateur non authentifié");
    return NextResponse.json({ message: 'Vous devez être connecté pour interagir avec le panier.' }, { status: 401 });
  }

  const urlParts = req.url.split('/');
  const itemId = parseInt(urlParts[urlParts.length - 1]);

  console.log("ID de l'article extrait de l'URL :", itemId);

  if (isNaN(itemId)) {
    console.log("ID de l'article manquant ou non valide.");
    return NextResponse.json({ message: "ID de l'article requis pour la suppression." }, { status: 400 });
  }

  try {
    // Vérification de l'existence de l'article dans la base de données
    const item = await prisma.orderItem.findUnique({
      where: { id: itemId },
      include: { fabric: true, model: true, accessory: true },
    });

    if (!item) {
      console.log("L'article à supprimer est introuvable dans la base de données.");
      return NextResponse.json({ message: 'Article introuvable.' }, { status: 404 });
    }

    // Vérification si l'article est bien associé à un produit spécifique
    if (!item.fabric && !item.model && !item.accessory) {
      console.log("L'article n'est associé à aucun produit spécifique.");
      return NextResponse.json({ message: "L'article n'est associé à aucun produit spécifique." }, { status: 400 });
    }

    // Suppression de l'article
    await prisma.orderItem.delete({
      where: { id: itemId },
    });

    console.log("Article supprimé avec succès.");

    // Recalculer le total du panier
    const remainingItems = await prisma.orderItem.findMany({
      where: { userId: token.id },
    });
    const updatedTotal = remainingItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Mise à jour du total dans le panier de l'utilisateur
    await prisma.cart.update({
      where: { userId: token.id },
      data: { total: updatedTotal },
    });

    return NextResponse.json({ message: 'Article supprimé du panier.' }, { status: 200 });

  } catch (error) {
    if (error.code === 'P2025') {
      console.error("Erreur Prisma : L'article à supprimer est introuvable.");
      return NextResponse.json({ message: 'Article introuvable.' }, { status: 404 });
    } else {
      console.error("Erreur lors de la suppression de l'article :", error);
      return NextResponse.json({ message: "Erreur lors de la suppression de l'article." }, { status: 500 });
    }
  }
}