// src/components/RequireAdmin.js
"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RequireAdmin({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== 'ADMIN') {
      router.push('pages/auth/login');
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Chargement...</p>;
  }

  if (!session || session.user.role !== 'ADMIN') {
    return <p>Accès refusé</p>;
  }

  return children;
}
