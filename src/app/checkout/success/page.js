"use client";
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-green-900 p-6">
      <h1 className="text-4xl font-bold mb-4">Merci pour votre achat !</h1>
      <p className="text-lg mb-8">Votre paiement a été traité avec succès.</p>
      <Link href="/"
         className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-200">
          Retour à la boutique
        
      </Link>
    </div>
  );
}
