import { getToken } from "next-auth/jwt";
import prisma from "../../../../lib/prisma";

import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function DELETE(req) {
  const token = await getToken({ req, secret });
  if (!token?.id) {
    return NextResponse.json({ message: "Non autorisé." }, { status: 401 });
  }

  try {
    // Trouver le panier de l'utilisateur
    const order = await prisma.order.findFirst({
      where: { userId: token.id, status: "PENDING" }
    });

    if (!order) {
      return NextResponse.json({ message: "Aucun panier à vider." }, { status: 200 });
    }

    // Supprimer tous les items de ce panier
    await prisma.orderItem.deleteMany({
      where: { orderId: order.id }
    });

    return NextResponse.json({ message: "Panier vidé avec succès." }, { status: 200 });
  } catch (err) {
    console.error("❌ Erreur :", err);
    return NextResponse.json({ message: "Erreur serveur." }, { status: 500 });
  }
}
