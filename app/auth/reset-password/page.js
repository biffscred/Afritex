"use client";

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// 1. Le composant qui contient toute la logique du formulaire
function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (password !== confirmPassword) {
      setError(true);
      setMessage('Les mots de passe ne correspondent pas.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setError(false);
        setMessage('Votre mot de passe a été réinitialisé avec succès !');
        setTimeout(() => router.push('/auth/login'), 3000);
      } else {
        setError(true);
        setMessage(data.message || 'Une erreur est survenue.');
      }
    } catch (err) {
      setError(true);
      setMessage('Erreur réseau, veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-400 via-red-500 to-green-700 text-white p-4">
      <div className="bg-white text-black p-8 rounded-3xl shadow-lg max-w-md w-full border-l-8 border-yellow-500">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-900">Nouveau mot de passe</h1>
        
        {message && (
          <p className={`mb-4 text-center p-2 rounded ${error ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all shadow-md ${
              loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {loading ? 'Chargement...' : 'Réinitialiser le mot de passe'}
          </button>
        </form>
      </div>
    </div>
  );
}

// 2. Le composant principal exporté (Celui que Next.js appelle)
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold">Chargement de la page...</div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}