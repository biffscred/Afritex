import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { hash } from 'bcryptjs';
import sendEmail from '../../../../lib/email';
import crypto from 'crypto';

// Fonction pour générer un token de vérification
function generateVerificationToken() {
  return crypto.randomBytes(32).toString('hex');
}

export async function POST(request) {
  try {
    // Récupérer les données du corps de la requête
    const body = await request.json();
    const { email, password } = body;

    // Validation des données
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Adresse e-mail invalide' },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { message: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Utilisateur déjà existant' },
        { status: 409 }
      );
    }

    // Créer un nouvel utilisateur
    const hashedPassword = await hash(password, 12);
    let user;
    try {
      user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          emailVerified: null,
        },
      });
      console.log('Utilisateur créé avec succès:', user);
    } catch (error) {
      console.error('Erreur lors de la création de l’utilisateur :', error);
      return NextResponse.json(
        { message: 'Erreur lors de la création de l’utilisateur dans la base de données', error: error.message },
        { status: 500 }
      );
    }

    // Générer le token de vérification
    const verificationToken = generateVerificationToken();
    console.log('Jeton de vérification généré:', verificationToken);

    // Journaux supplémentaires pour le débogage de l'envoi de l'e-mail
    try {
      console.log('Préparation de l\'envoi de l\'e-mail de vérification à', user.email);
      
      // Ajout de plus de détails avant l'envoi
      console.log('Détails de l\'email:', {
        type: 'registration',
        to: user.email,
        token: verificationToken
      });
      
      await sendEmail('registration', user.email, verificationToken);

      console.log('E-mail de vérification envoyé à:', user.email);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail de vérification :', error);
      
      // Ajout d'un log de plus pour la pile d'erreur
      console.error('Détails de l\'erreur:', error.stack);
      
      return NextResponse.json(
        { message: 'Erreur lors de l\'envoi de l\'e-mail de vérification', error: error.message },
        { status: 500 }
      );
    }

    // Réponse finale
    return NextResponse.json(
      { message: 'Utilisateur créé avec succès, veuillez vérifier votre e-mail.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur générale lors de la requête :', error);
    return NextResponse.json(
      { message: 'Erreur interne du serveur', error: error.message },
      { status: 500 }
    );
  }
}
