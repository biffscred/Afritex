// src/pages/auth/register.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (res.ok) {
      router.push('/auth/login');
    } else {
      const { message } = await res.json();
      setError(message || 'Erreur lors de l’inscription.');
    }
  };

  return (
    <>
      
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-200 to-red-400 py-12 px-4">
  <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-2xl max-w-lg w-full border-t-8 border-yellow-600">
    <h1 className="text-4xl font-extrabold text-center text-yellow-900 mb-8">
      Bienvenue chez Afritex
    </h1>
    {error && <p className="text-red-600 font-medium mb-4 text-center">{error}</p>}

    <input
      type="text"
      placeholder="Nom complet"
      className="block w-full p-4 mb-4 border border-yellow-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-600"
      required
    />
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="block w-full p-4 mb-4 border border-yellow-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-600"
      required
    />
    <input
      type="password"
      placeholder="Mot de passe"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="block w-full p-4 mb-4 border border-yellow-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-600"
      required
    />
    <input
      type="password"
      placeholder="Confirmez le mot de passe"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      className="block w-full p-4 mb-6 border border-yellow-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-600"
      required
    />
    <button
      type="submit"
      className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition-colors duration-300 transform hover:scale-105"
    >
      S'inscrire
    </button>

    {/* Boutons d'inscription via Google et Facebook */}
    <div className="mt-6 flex justify-center space-x-4">
      <button
        type="button"
        className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
      >
        Inscription avec Google
      </button>
      <button
        type="button"
        className="flex items-center justify-center bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-900 transition-colors duration-300 transform hover:scale-105"
      >
        Inscription avec Facebook
      </button>
    </div>

    <p className="mt-8 text-center text-yellow-800 font-medium">
      Déjà un compte ?{' '}
      <a href="/auth/login" className="text-orange-700 hover:text-orange-800 font-semibold underline">
        Connectez-vous ici
      </a>
    </p>
  </form>
</div>

    </>
  );
}
