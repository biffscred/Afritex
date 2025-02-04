import Stripe from 'stripe';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  console.log("🚀 Début de la requête POST pour créer une session de paiement.");

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("🔑 Token récupéré :", token);

  if (!token) {
    console.log("❌ Aucun token trouvé - l'utilisateur n'est pas authentifié.");
    return NextResponse.json({ message: 'Vous devez être connecté pour faire un paiement.' }, { status: 401 });
  }

  try {
    const { cartItems } = await req.json();
    console.log("📦 Articles du panier reçus :", cartItems);

    if (!cartItems || cartItems.length === 0) {
      console.error("❌ Erreur : Le panier est vide !");
      return NextResponse.json({ message: 'Le panier est vide.' }, { status: 400 });
    }

    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100), // Stripe attend des centimes
      },
      quantity: item.quantity,
    }));

    console.log("📝 lineItems préparés pour la session Stripe :", lineItems);

    const origin = req.headers.get("origin") || 'http://localhost:3000';
    console.log("🌍 URL d'origine utilisée :", origin);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: [ 'card', // Carte bancaire
     
    'link',          // Stripe Link
    'paypal',        // PayPal
    'ideal',         // iDEAL (Pays-Bas)
    'bancontact',    // Bancontact (Belgique)
    'giropay',       // Giropay (Allemagne)
    'sofort',        // Sofort (Allemagne, Autriche, Suisse)
    'klarna',        // Klarna (paiement en plusieurs fois)
    'revolut_pay',   // Revolut Pay
    'mobilepay'   // MobilePay
    
],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/checkout/success`,
      cancel_url: `${origin}/checkout/cancel`,
    });

    console.log("✅ Session de paiement créée avec succès :", session);
    console.log("🧐 Vérification du session.id :", session?.id);

    if (!session || !session.id) {
      console.error("❌ Erreur : Session Stripe non créée !");
      return NextResponse.json({ message: 'Erreur Stripe : Impossible de créer la session.' }, { status: 500 });
    }

    return NextResponse.json({ sessionId: session.id }, { status: 200 });

  } catch (error) {
    console.error("❌ Erreur lors de la création de la session de paiement :", error);
    return NextResponse.json({ message: 'Erreur lors de la création de la session de paiement.' }, { status: 500 });
  }
}
