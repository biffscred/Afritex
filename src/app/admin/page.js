"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Vérifier si l'utilisateur est admin
  useEffect(() => {
    if (status === "loading") return; // Attendre que la session soit chargée
    if (!session || session.user.role !== "ADMIN") {
      router.push("/auth/login"); // Rediriger vers la page de connexion si l'utilisateur n'est pas admin
    }
  }, [session, status, router]);

  if (status === "loading") return <p>Chargement...</p>;

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-8">Tableau de bord d'administration</h1>

      {/* Bouton retour à l'accueil */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/")}
          className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition-all duration-300"
        >
          Retour à l'accueil
        </button>
      </div>

      {/* Liens vers différentes sections de l'administration */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/users">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 cursor-pointer">
            <h2 className="text-2xl font-bold">Gestion des utilisateurs</h2>
            <p className="mt-2">Voir et gérer tous les utilisateurs du système.</p>
          </div>
        </Link>

        <Link href="/admin/product">
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 cursor-pointer">
            <h2 className="text-2xl font-bold">Gestion des produits</h2>
            <p className="mt-2">Voir et gérer les produits de la boutique.</p>
          </div>
        </Link>

        <Link href="/admin/orders">
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 cursor-pointer">
            <h2 className="text-2xl font-bold">Gestion des commandes</h2>
            <p className="mt-2">Gérer les commandes des clients.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
