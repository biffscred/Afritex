"use client";

import Footer from '@/components/footer';
import Header from '@/components/header';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Head from 'next/head';

// Import des composants supplémentaires
import ModelsSection from '@/components/modelssection';
import Fabrics from '@/components/fabrics';
import Accessories from '@/components/accessories';

export default function Product() {
  const { id } = useParams(); // Nouvelle méthode recommandée
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          throw new Error("Erreur lors du chargement du produit");
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Erreur :", err);
        setError("Impossible de charger le produit");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
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
              
              {/* Carrousel d'images */}
              {product?.images?.length > 0 && (
                <div className="flex gap-4 overflow-x-auto py-4">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Illustration de ${product.name} - ${index + 1}`}
                      className="w-48 h-48 object-cover rounded-lg shadow-md"
                    />
                  ))}
                </div>
              )}
            </div>
          )
        )}

        {/* Section des Produits Recommandés */}
        {product?.models?.length > 0 && (
          <section className="my-8">
            <h2 className="text-2xl font-semibold mb-4">Modèles Associés</h2>
            <ModelsSection models={product.models} />
          </section>
        )}

        {product?.fabrics?.length > 0 && (
          <section className="my-8">
            <h2 className="text-2xl font-semibold mb-4">Tissus Recommandés</h2>
            <Fabrics fabrics={product.fabrics} />
          </section>
        )}

        {product?.accessories?.length > 0 && (
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
