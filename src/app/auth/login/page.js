"use client"; // Indique que ce composant est un composant client

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Utilisation de useRouter

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState(''); // Message de confirmation
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Marquer le composant comme monté côté client
    setIsMounted(true);

    // Vérification si window est défini et extraction des paramètres d'URL uniquement côté client
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const confirmed = params.get('confirmed');
      
      if (confirmed) {
        setConfirmationMessage("Votre compte a été confirmé avec succès ! Vous pouvez maintenant vous connecter.");
      }
    }
  }, []);

  // Rendre uniquement une fois monté côté client
  if (!isMounted) {
    return null; // Ne pas afficher tant que le composant n'est pas monté côté client
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/',
    });

    if (result.error) {
      setError('Email ou mot de passe incorrect.');
    } else {
      router.push('/'); // Rediriger vers la page d'accueil après connexion
    }
  };

  const handleProviderLogin = async (provider) => {
    try {
      await signIn(provider, { callbackUrl: '/' });
    } catch (err) {
      console.error('Erreur lors de la connexion avec le fournisseur :', err);
      setError('Erreur lors de la connexion avec le fournisseur.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-300 via-red-500 to-green-700 py-12 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border-4 border-yellow-700">
        <h1 className="text-4xl font-bold text-center text-green-900 mb-6">Bienvenue chez Afritex</h1>

        {/* Message de confirmation d'inscription */}
        {confirmationMessage && (
          <p className="text-green-600 font-semibold mb-4 text-center">{confirmationMessage}</p>
        )}

        {/* Formulaire de Connexion */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-600 font-semibold mb-4 text-center">{error}</p>}

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-green-900 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-green-900 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-transform duration-300 transform hover:scale-105 shadow-md"
          >
            Se connecter
          </button>
        </form>

        {/* Alternative Login Options */}
        <div className="flex justify-center mt-6 space-x-4">
          <button onClick={() => handleProviderLogin('google')} className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300">
            Connexion avec Google
          </button>
        </div>

        {/* Lien d'inscription */}
        <p className="mt-8 text-center text-green-800">
          Pas encore de compte ?{' '}
          <a href="/auth/register" className="text-yellow-700 hover:text-yellow-800 font-semibold">
            Inscrivez-vous ici
          </a>
        </p>
      </div>
    </div>
  );
}
