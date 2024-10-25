// app/product.js
"use client";

import Footer from '@/components/footer';
import Header from '@/components/header';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';

// Import des composants supplémentaires
import ModelsSection from '@/components/modelssection';
import Fabrics from '@/components/fabrics';
import Accessories from '@/components/accessories';

export default function Product() {
  const router = useRouter();
  const { id } = router.query; // Assume une route dynamique
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      // Récupération des données du produit via l'API
      fetch(`/api/products/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Erreur lors du chargement du produit");
          }
          return res.json();
        })
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erreur :", error);
          setError("Impossible de charger le produit");
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <div>
      {/* SEO - Meta tags dynamiques */}
      <Head>
        <title>{product ? product.name : "Chargement..."}</title>
        <meta name="description" content={product?.description || "Détails du produit"} />
      </Head>

      <Header />
      <main className="container mx-auto py-12">
        {/* Section des Détails du Produit */}
        {loading ? (
          <p>Chargement du produit...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          product && (
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-gray-700 mb-4">{product.description}</p>
              
              {/* Carrousel d'images si plusieurs images */}
              {product?.images && product.images.length > 0 && (
                <div className="image-carousel mb-8">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Image ${index + 1} de ${product.name}`}
                      className="mb-4"
                    />
                  ))}
                </div>
              )}

              {/* Ajouter d'autres informations sur le produit ici */}
            </div>
          )
        )}

        {/* Section des Modèles Recommandés - Chargement conditionnel */}
        {product?.models && product.models.length > 0 && (
          <section className="my-8">
            <h2 className="text-2xl font-semibold mb-4">Modèles Associés</h2>
            <ModelsSection models={product.models} />
          </section>
        )}

        {/* Section des Tissus Similaires - Chargement conditionnel */}
        {product?.fabrics && product.fabrics.length > 0 && (
          <section className="my-8">
            <h2 className="text-2xl font-semibold mb-4">Tissus Recommandés</h2>
            <Fabrics fabrics={product.fabrics} />
          </section>
        )}

        {/* Section des Accessoires Associés - Chargement conditionnel */}
        {product?.accessories && product.accessories.length > 0 && (
          <section className="my-8">
            <h2 className="text-2xl font-semibold mb-4">Accessoires Recommandés</h2>
            <Accessories accessories={product.accessories} />
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
