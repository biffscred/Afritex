"use client";

import AccessoriesList from "../../components/AccessoriesList";

export default function AccessoryPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center text-yellow-800 mb-8">Nos Accessoires</h1>
      <AccessoriesList />
    </div>
  );
}
