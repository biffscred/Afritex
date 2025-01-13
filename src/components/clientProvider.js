// components/ClientProvider.js
"use client";

import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Créez une instance de QueryClient pour gérer les requêtes
const queryClient = new QueryClient();

export default function ClientProvider({ children }) {
  return (
    <SessionProvider>
      {/* Ajoutez QueryClientProvider pour gérer les requêtes API */}
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}
