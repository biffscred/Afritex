// app/product.js
"use client";

import Footer from '@/components/footer';
import Header from '@/components/header';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Import des composants supplémentaires
import ModelsSection from '@/components/modelssection';
import Fabrics from '@/components/fabrics';
import Accessories from '@/components/accessories';

export default function Product() {
  const router = useRouter();
  const { id } = router.query; // Assume une route dynamique
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      // Remplace cette ligne par un appel à une API pour récupérer les données du produit
      // Exemple : fetch(`/api/products/${id}`).then(res => res.json()).then(data => setProduct(data));
      setProduct({
        name: "Tissu Africain Échantillon",
        description: "Description du produit avec des détails intéressants.",
        // Ajoute d'autres propriétés nécessaires
      });
    }
  }, [id]);

  return (
    <div>
      <Header />
      <main className="container mx-auto py-12">
        {/* Section des Détails du Produit */}
        {product ? (
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            {/* Ajouter d'autres informations sur le produit ici */}
          </div>
        ) : (
          <p>Chargement du produit...</p>
        )}

        {/* Section des Modèles Recommandés */}
        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-4">Modèles Associés</h2>
          <ModelsSection />
        </section>

        {/* Section des Tissus Similaires */}
        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-4">Tissus Recommandés</h2>
          <Fabrics />
        </section>

        {/* Section des Accessoires Associés */}
        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-4">Accessoires Recommandés</h2>
          <Accessories />
        </section>
      </main>
      <Footer />
    </div>
  );
}
