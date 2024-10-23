"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('Vérification en cours...');
  const [error, setError] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    console.log(token, email); // Pour déboguer, vérifiez si les deux sont bien récupérés

    if (token && email) {
      // Appel à l'API de vérification d'e-mail
      const verifyEmail = async () => {
        try {
          const res = await fetch(`/api/auth/verify-email?token=${token}&email=${email}`);
          console.log("Réponse brute de l'API :", res);
      
          // Vérifier le type de contenu de la réponse avant de la parser
          const contentType = res.headers.get("content-type");
      
          if (contentType && contentType.includes("application/json")) {
            const data = await res.json();
            console.log("Données JSON reçues :", data);
      
            if (res.ok) {
              setMessage(data.message); // Message de succès
              setError(false);
            } else {
              setMessage(data.message); // Message d'erreur de l'API
              setError(true);
            }
          } else {
            // Si le contenu n'est pas du JSON, logguez la réponse textuelle (probablement HTML)
            const textData = await res.text();
            console.error("La réponse n'est pas en JSON. Réponse brute :", textData);
            setMessage('Une erreur est survenue. Réponse inattendue du serveur.');
            setError(true);
          }
        } catch (error) {
          console.error("Erreur capturée lors de la requête fetch :", error);
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
