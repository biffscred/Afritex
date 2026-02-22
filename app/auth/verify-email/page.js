"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// 1. On crée un composant interne qui contient toute ta logique actuelle
function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('Vérification en cours...');
  const [error, setError] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (token && email) {
      const verifyEmail = async () => {
        try {
          const res = await fetch(`/api/auth/verify-email?token=${token}&email=${email}`);
          const contentType = res.headers.get("content-type");
      
          if (contentType && contentType.includes("application/json")) {
            const data = await res.json();
            if (res.ok) {
              setMessage(data.message);
              setError(false);
            } else {
              setMessage(data.message);
              setError(true);
            }
          } else {
            setMessage('Une erreur est survenue. Réponse inattendue du serveur.');
            setError(true);
          }
        } catch (error) {
          setMessage('Erreur réseau, veuillez réessayer.');
          setError(true);
        }
      };
      verifyEmail();
    } else {
      setMessage('Token ou email de vérification manquant.');
      setError(true);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-400 via-red-500 to-green-700 text-white">
      <div className="bg-white text-black p-8 rounded-3xl shadow-lg max-w-md w-full border-l-8 border-yellow-500">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-900">Vérification d'e-mail</h1>
        <p className={`text-center ${error ? 'text-red-600' : 'text-green-600'}`}>{message}</p>
        {error && (
          <button
            onClick={() => router.push('/auth/register')}
            className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-transform duration-300 transform hover:scale-105 shadow-lg"
          >
            Retour à l'inscription
          </button>
        )}
        {!error && (
          <button
            onClick={() => router.push('/auth/login')}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-transform duration-300 transform hover:scale-105 shadow-lg"
          >
            Aller à la page de connexion
          </button>
        )}
      </div>
    </div>
  );
}

// 2. Le composant principal exporté enveloppe le contenu dans Suspense
export default function VerifyEmail() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold">Chargement de la vérification...</div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}