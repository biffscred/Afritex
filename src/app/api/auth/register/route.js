// src/app/api/auth/register/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(request) {
  try {
    // Récupérer les données du corps de la requête
    const body = await request.json();
    const { name, email, password } = body;

    // 1. Vérification de l'existence de l'utilisateur
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Retourne un statut 409 si l'utilisateur existe déjà
      return NextResponse.json(
        { message: 'Utilisateur déjà existant' },
        { status: 409 }
      );
    }

    // 2. Hashage du mot de passe
    const hashedPassword = await hash(password, 12);

    // 3. Création du nouvel utilisateur avec le mot de passe haché
    const user = await prisma.user.create({
      data: {
        
        email,
        password: hashedPassword,
      },
    });

    // Retourne une réponse de succès avec un statut 201 et les informations de l'utilisateur
    return NextResponse.json(
      { message: 'Utilisateur créé avec succès', user },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur lors de la création de l’utilisateur :', error);
    // Retourne une erreur de serveur en cas d'échec
    return NextResponse.json(
      { message: 'Erreur interne du serveur', error: error.message },
      { status: 500 }
    );
  }
}

export function GET() {
  // Gère les méthodes non autorisées
  return NextResponse.json(
    { message: 'Méthode GET non autorisée' },
    { status: 405, headers: { Allow: 'POST' } }
  );
}
