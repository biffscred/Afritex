import getRawBody from "raw-body";
import Stripe from "stripe";
import prisma from '../../../../lib/prisma';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    console.log("🚀 Webhook Stripe reçu");
  
    const sig = req.headers.get("stripe-signature");
  
    if (!sig) {
      console.error("❌ Signature Stripe manquante !");
      return new NextResponse("Signature Stripe manquante", { status: 400 });
    }
  
    let event;
    try {
      // Lire la requête brute avec raw-body
      const rawBody = await getRawBody(req.body, {
        length: req.headers.get("content-length"),
        limit: "1mb",
        encoding: req.headers.get("content-type"),
      });
  
      event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
      console.log("✅ Webhook Stripe validé :", event.type);
    } catch (err) {
      console.error("⚠️ Erreur Webhook Stripe :", err.message);
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }
  
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("✅ Paiement réussi pour la session :", session.id);
  
      const orderId = session.metadata?.orderId;
      if (!orderId) {
        console.error("❌ Aucun orderId trouvé dans les metadata !");
        return new NextResponse("Erreur: orderId manquant", { status: 400 });
      }
  
      try {
        await prisma.order.update({
          where: { id: orderId },
          data: { status: "paid" },
        });
  
        console.log(`🎉 Commande ${orderId} mise à jour avec 'paid'`);
        return new NextResponse("OK", { status: 200 });
      } catch (error) {
        console.error("❌ Erreur mise à jour commande :", error.message);
        return new NextResponse("Erreur mise à jour commande", { status: 500 });
      }
    }
  
    return new NextResponse("Event non traité", { status: 400 });
  }