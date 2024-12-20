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
  const itemId = parseInt(urlParts[urlParts.length - 1]); // Dernier segment de l'URL

  if (isNaN(itemId)) {
    console.log("ID de l'article manquant ou non valide.");
    return NextResponse.json({ message: "ID de l'article requis pour la mise à jour." }, { status: 400 });
  }

  const { quantity } = await req.json();
  if (!quantity || quantity <= 0) {
    console.log("Quantité non valide.");
    return NextResponse.json({ message: 'Quantité non valide.' }, { status: 400 });
  }

  try {
    // Vérifiez que l'item appartient à l'utilisateur
    const orderItem = await prisma.orderitem.findUnique({
      where: { id: itemId },
      include: { order: true },
    });

    if (!orderItem || orderItem.order.userId !== token.id) {
      console.log("L'article à mettre à jour n'appartient pas à l'utilisateur ou est introuvable.");
      return NextResponse.json({ message: 'Article introuvable ou non autorisé.' }, { status: 404 });
    }

    // Mettre à jour la quantité de l'article
    const updatedItem = await prisma.orderitem.update({
      where: { id: itemId },
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
  console.log("Requête DELETE reçue pour la suppression d'un article spécifique du panier.");

  const token = await getToken({ req, secret });
  if (!token || !token.id) {
    console.log("Utilisateur non authentifié");
    return NextResponse.json({ message: 'Vous devez être connecté pour interagir avec le panier.' }, { status: 401 });
  }

  const userId = token.id;

  // Extraction de l'ID de l'article (itemId) à partir de l'URL
  const urlParts = req.url.split('/');
  const itemId = parseInt(urlParts[urlParts.length - 1]); // Dernier segment de l'URL

  console.log("ID de l'article (itemId) extrait de l'URL :", itemId);

  if (isNaN(itemId)) {
    console.log("ID de l'article manquant ou non valide.");
    return NextResponse.json({ message: "ID de l'article requis pour la suppression." }, { status: 400 });
  }

  try {
    // Vérifier si l'item appartient à la commande de l'utilisateur
    const orderItem = await prisma.orderitem.findUnique({
      where: { id: itemId },
      include: { order: true },
    });

    if (!orderItem || orderItem.order.userId !== userId) {
      console.log("L'article à supprimer n'appartient pas à l'utilisateur ou est introuvable.");
      return NextResponse.json({ message: 'Article introuvable ou non autorisé.' }, { status: 404 });
    }

    // Supprimer l'article du panier
    const deletedItem = await prisma.orderitem.delete({
      where: { id: itemId },
    });

    console.log("Article supprimé avec succès :", deletedItem);
    return NextResponse.json({ message: 'Article supprimé du panier.' }, { status: 200 });
  } catch (error) {
    if (error.code === 'P2025') {
      console.log("L'article à supprimer est introuvable.");
      return NextResponse.json({ message: 'Article introuvable dans le panier.' }, { status: 404 });
    } else {
      console.error("Erreur lors de la suppression de l'article :", error);
      return NextResponse.json({ message: "Erreur lors de la suppression de l'article." }, { status: 500 });
    }
  }
}