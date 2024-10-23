// src/app/api/auth/verify-email/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  try {
    // Trouver le token de vérification dans la base de données
    const verificationRecord = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationRecord || verificationRecord.expires < new Date()) {
      return NextResponse.json(
        { message: 'Token invalide ou expiré.' },
        { status: 400 }
      );
    }

    // Mettre à jour le statut de l'utilisateur pour email vérifié
    await prisma.user.update({
      where: { email: verificationRecord.email },
      data: { emailVerified: new Date() },
    });

    // Supprimer le token après la vérification
    await prisma.verificationToken.delete({
      where: { token },
    });

    return NextResponse.json(
      { message: 'E-mail vérifié avec succès. Vous pouvez maintenant vous connecter.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de la vérification de l’e-mail :', error);
    return NextResponse.json(
      { message: 'Erreur interne du serveur', error: error.message },
      { status: 500 }
    );
  }
}
