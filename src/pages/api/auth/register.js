import { hash } from 'bcryptjs';
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  // Vérifie si la méthode de la requête est POST
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    try {
      // 1. Vérification de l'existence de l'utilisateur
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        // Retourne un statut 409 si l'utilisateur existe déjà
        return res.status(409).json({ message: 'Utilisateur déjà existant' });
      }

      // 2. Hashage du mot de passe
      const hashedPassword = await hash(password, 12);

      // 3. Création du nouvel utilisateur avec le mot de passe haché
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      // Retourne une réponse de succès avec un statut 201 et les informations de l'utilisateur
      return res.status(201).json({ message: 'Utilisateur créé avec succès', user });
    } catch (error) {
      console.error('Erreur lors de la création de l’utilisateur :', error);
      // Retourne une erreur de serveur en cas d'échec
      return res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
    }
  } else {
    // Gère les méthodes non autorisées
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}
