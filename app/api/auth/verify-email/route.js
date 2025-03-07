import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  if (!token || !email) {
    console.error('Token ou email manquant:', { token, email });
    return NextResponse.json(
      { message: 'Token ou email manquant.' },
      { status: 400 }
    );
  }

  try {
    // Chercher l'utilisateur avec cet email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.error('Utilisateur non trouvé avec cet email:', email);
      return NextResponse.json(
        { message: 'Utilisateur non trouvé.' },
        { status: 404 }
      );
    }

    console.log('Utilisateur trouvé:', user);

    // Mettre à jour le statut de l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        emailVerified: new Date(),
      },
    });

    console.log('Utilisateur mis à jour:', updatedUser);

    // Renvoyer une réponse JSON avec un message de succès
    return NextResponse.json(
      { message: 'Votre email a été vérifié avec succès.' },
      { status: 200 }
    );
  } catch (error) {
    // Log l'erreur entière pour plus de détails
    console.error('Erreur lors de la confirmation de l\'email :', error);
  
    return NextResponse.json(
      { message: 'Erreur lors de la confirmation de l\'e-mail.', error: error.message },
      { status: 500 }
    );
  }
}
