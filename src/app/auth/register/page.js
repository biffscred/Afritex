"use client"; // Ajoute cette directive en haut du fichier pour indiquer un composant client

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Utilise `next/navigation` au lieu de `next/router` dans l'App Router

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter(); // Utilise `useRouter` dans le contexte client

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push('/auth/login'); // Redirection vers la page de connexion après inscription
      } else {
        const { message } = await res.json();
        setError(message || 'Erreur lors de l’inscription.');
      }
    } catch (err) {
      setError('Erreur réseau, veuillez réessayer.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-400 via-red-500 to-green-700">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-lg max-w-md w-full border-l-8 border-yellow-500">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-900">Rejoins Afritex</h1>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-3 border border-green-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-500"
        />
        
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 p-3 border border-green-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-500"
        />
        
        <input
          type="password"
          placeholder="Confirmez le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full mb-6 p-3 border border-green-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-500"
        />
        
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-transform duration-300 transform hover:scale-105 shadow-lg"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
}
