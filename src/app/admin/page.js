"use client";
import RequireAdmin from '../../components/requireadmin';
import ProductManager from '../../components/productmanager';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ProductsAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') return <p>Chargement...</p>;
  
  if (status === 'unauthenticated' || session.user.role !== 'ADMIN') {
    router.push('/auth/login');
    return null;
  }
  return (
    <RequireAdmin>
    <div className="container mx-auto py-12 px-6 min-h-screen bg-gradient-to-b from-yellow-200 to-red-300 rounded-lg shadow-md">
      <h1 className="text-5xl font-extrabold mb-10 text-center text-orange-800 tracking-wide">Gestion d'Administration</h1>
      <div className="bg-white p-10 rounded-xl shadow-lg border border-yellow-400">
        <h2 className="text-3xl font-semibold text-green-800 mb-6 text-center">Liste des Produits</h2>
        <ProductManager />
      </div>
    </div>
  </RequireAdmin>
  

  );
}
