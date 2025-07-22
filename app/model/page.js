"use client";

import ModelsList from "../../components/ModelsList";

export default function ModelPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center text-yellow-800 mb-8">Nos Modèles</h1>
      <ModelsList />
    </div>
  );
}
