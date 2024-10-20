// src/pages/auth/logout.js
"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from 'next/router';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    signOut({ redirect: false });
    router.push("/");
  }, [router]);

  return <p>Déconnexion...</p>;
}
