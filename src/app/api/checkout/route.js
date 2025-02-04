import Stripe from 'stripe';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  console.log("Début de la requête POST pour créer une session de paiement.");

  // Récupérer le token de l'utilisateur
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("Token récupéré :", token);

  if (!token) {
    console.log("Aucun token trouvé - l'utilisateur n'est pas authentifié.");
    return NextResponse.json({ message: 'Vous devez être connecté pour faire un paiement.' }, { status: 401 });
  }

  try {
    const { cartItems } = await req.json();
    console.log("Articles du panier reçus :", cartItems);

    // Vérifier les items et préparer lineItems
    const lineItems = cartItems.map(item => {
      console.log("Article traité pour lineItems :", item);
      return {
        price_data: {
          currency: 'eur',
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    console.log("lineItems préparés pour la session Stripe :", lineItems);

    // Vérifier l'origine de la requête
    const origin = req.headers.get("origin") || 'http://localhost:3000';
    console.log("URL d'origine utilisée pour la session de paiement :", origin);

    // Créer la session de paiement Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/checkout/success`,
      cancel_url: `${origin}/cancel`,
    });

    console.log("✅ Session de paiement créée avec succès. Session ID :", session.id);

    // ✅ Renvoyer `sessionId` au lieu de `id`
    return NextResponse.json({ sessionId: session.id }, { status: 200 });

  } catch (error) {
    console.error("❌ Erreur lors de la création de la session de paiement :", error);
    return NextResponse.json({ message: 'Erreur lors de la création de la session de paiement.' }, { status: 500 });
  }
};
