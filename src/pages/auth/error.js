// src/pages/auth/error.js
import { useRouter } from 'next/router';

export default function ErrorPage() {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
        <p className="text-gray-700">{error || "Une erreur s'est produite."}</p>
        <button
          onClick={() => router.push('/auth/login')}
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Retour à la connexion
        </button>
      </div>
    </div>
  );
}
