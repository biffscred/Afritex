// src/app/auth/error.js
"use client"; // Ajoute cette directive en haut du fichier

import { useRouter } from 'next/navigation'; // Remplace 'next/router' par 'next/navigation'

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Erreur</h1>
        <p className="text-lg mb-8">Une erreur est survenue. Veuillez réessayer plus tard.</p>
        <button 
          className="bg-red-500 text-white py-2 px-4 rounded-lg"
          onClick={() => router.push('/')}
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}
