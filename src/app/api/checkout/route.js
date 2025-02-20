import Stripe from 'stripe';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  console.log("🚀 Début création session paiement.");

  try {
    // ✅ 1️⃣ Lire le body UNE SEULE FOIS
    const body = await req.json();
    console.log("📥 Données reçues du frontend :", body);

    const cartItems = body.cartItems || [];

    // Vérifier si le panier est vide
    if (cartItems.length === 0) {
      return NextResponse.json({ error: "Le panier est vide" }, { status: 400 });
    }

    // ✅ 2️⃣ Extraire les productId valides
    const productIds = cartItems
      .map(item => item.productId)
      .filter(id => id !== undefined && id !== null); // 🔥 Supprime les valeurs undefined et null

    console.log("📢 ID des produits envoyés :", productIds);

    // ✅ 3️⃣ Vérification des produits existants dans la BDD
    const existingProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true }, // Récupère uniquement les IDs existants
    });

    const existingProductIds = existingProducts.map(p => p.id);
    console.log("✅ Produits trouvés dans Product:", existingProductIds);

    // Vérifier les produits manquants
    const missingProducts = productIds.filter(id => !existingProductIds.includes(id));

    if (missingProducts.length > 0) {
      console.error("❌ Produits inexistants dans la base :", missingProducts);
      return NextResponse.json({ error: "Produits non trouvés", missingProducts }, { status: 400 });
    }

    // ✅ 4️⃣ Vérifier si l'utilisateur est authentifié
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ message: "Vous devez être connecté pour payer." }, { status: 401 });
    }

    // ✅ 5️⃣ Créer une commande avant Stripe
    const order = await prisma.order.create({
      data: {
        userId: parseInt(token.sub, 10), // ID de l'utilisateur
        status: "pending",
        total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        orderItems: {
          create: cartItems.map(item => ({
            productId: item.productId ?? null,
            fabricId: item.fabricId ?? null,
            accessoryId: item.accessoryId ?? null,
            modelId: item.modelId ?? null,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    console.log("🆕 Commande créée avec ID :", order.id);

    // ✅ 6️⃣ Création de la session Stripe
    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: "eur",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const origin = req.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/checkout/success`,
      cancel_url: `${origin}/checkout/cancel`,
      metadata: {
        orderId: String(order.id), //Associe la commande à Stripe
      },
    });

    console.log("✅ Session Stripe créée :", session.id);

    return NextResponse.json({ sessionId: session.id }, { status: 200 });

  } catch (error) {
    console.error("❌ Erreur lors de la création de la session de paiement :", error);
    return NextResponse.json({ message: "Erreur lors du traitement du paiement." }, { status: 500 });
  }
}
