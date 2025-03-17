import { getToken } from "next-auth/jwt";
import prisma from '../../../../lib/prisma';
import { NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

// Gestion de la mise à jour de la quantité (méthode PUT)
export async function PATCH(req, context) {
  console.log("🚀 Requête PATCH reçue pour modifier la quantité d'un article.");

  const token = await getToken({ req, secret });
  if (!token || !token.id) {
    return NextResponse.json({ message: "Vous devez être connecté." }, { status: 401 });
  }

  const userId = token.id;
  const itemId = parseInt(context.params.itemId);
  const { action } = await req.json(); // "increment" ou "decrement"

  console.log(`🔍 Modification de l'article ${itemId}, action: ${action}`);

  if (isNaN(itemId) || !["increment", "decrement"].includes(action)) {
    return NextResponse.json({ message: "Requête invalide." }, { status: 400 });
  }

  try {
    const orderItem = await prisma.orderItem.findUnique({
      where: { id: itemId },
      include: { order: true },
    });

    if (!orderItem || orderItem.order.userId !== userId) {
      return NextResponse.json({ message: "Article introuvable ou non autorisé." }, { status: 404 });
    }

    let newQuantity = orderItem.quantity + (action === "increment" ? 1 : -1);
    let updatedOrder;

    if (newQuantity <= 0) {
      await prisma.orderItem.delete({ where: { id: itemId } });
      console.log("🗑️ Article supprimé du panier.");
    } else {
      await prisma.orderItem.update({
        where: { id: itemId },
        data: { quantity: newQuantity },
      });
      console.log("✅ Quantité mise à jour :", newQuantity);
    }

    // ✅ Mise à jour du total de la commande
    const updatedTotal = await prisma.orderItem.aggregate({
      where: { orderId: orderItem.orderId },
      _sum: { price: true },
    }).then(res => res._sum.price || 0);

    updatedOrder = await prisma.order.update({
      where: { id: orderItem.orderId },
      data: { total: updatedTotal },
    });

    console.log("📊 Nouveau total de la commande mis à jour :", updatedTotal);

    return NextResponse.json({ message: "Quantité mise à jour.", quantity: newQuantity, total: updatedTotal }, { status: 200 });

  } catch (error) {
    console.error("❌ Erreur serveur :", error);
    return NextResponse.json({ message: "Erreur serveur.", error: error.message }, { status: 500 });
  }
}
// Gestion de la suppression d'un article (méthode DELETE)
export async function DELETE(req, context) {
  console.log("🚀 Requête DELETE reçue pour la suppression d'un article du panier.");

  // Vérifier si l'utilisateur est connecté
  const token = await getToken({ req, secret });
  if (!token || !token.id) {
    console.log("❌ Utilisateur non authentifié.");
    return NextResponse.json({ message: "Vous devez être connecté pour interagir avec le panier." }, { status: 401 });
  }

  const userId = token.id;
  const itemId = parseInt(context.params.itemId); // Récupération de l'ID depuis l'URL

  console.log("🔍 ID de l'article reçu :", itemId);

  if (isNaN(itemId)) {
    console.log("❌ ID de l'article non valide.");
    return NextResponse.json({ message: "ID de l'article requis pour la suppression." }, { status: 400 });
  }

  try {
    // Vérifier si l'article appartient à l'utilisateur
    const orderItem = await prisma.orderItem.findUnique({
      where: { id: itemId },
      include: { order: true },
    });

    if (!orderItem || orderItem.order.userId !== userId) {
      console.log("❌ L'article à supprimer n'appartient pas à l'utilisateur ou est introuvable.");
      return NextResponse.json({ message: "Article introuvable ou non autorisé." }, { status: 404 });
    }

    // Supprimer l'article du panier
    await prisma.orderItem.delete({
      where: { id: itemId },
    });

    // ✅ Recalcul du total après suppression
const updatedTotal = await prisma.orderItem.aggregate({
  where: { orderId: orderItem.orderId },
  _sum: { price: true },
}).then(res => res._sum.price || 0);

// ✅ Mise à jour de `total` dans la commande
await prisma.order.update({
  where: { id: orderItem.orderId },
  data: { total: updatedTotal },
});

console.log("📊 Nouveau total de la commande après suppression :", updatedTotal);

    console.log("✅ Article supprimé avec succès.");
    return NextResponse.json({ message: "Article supprimé du panier." }, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression de l'article :", error);
    return NextResponse.json({ message: "Erreur serveur lors de la suppression de l'article." }, { status: 500 });
  }}