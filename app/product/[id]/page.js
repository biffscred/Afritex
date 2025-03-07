"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Head from "next/head";
import ModelsSection from "../../../components/modelssection";
import Fabrics from "../../../components/fabrics";
import Accessories from "../../../components/accessories";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Erreur lors du chargement du produit");

        const data = await res.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error("❌ Erreur :", err);
        setError("Impossible de charger le produit");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="container mx-auto py-12">
      <Head>
        <title>{product ? product.name : "Chargement..."}</title>
        <meta name="description" content={product?.description || "Détails du produit"} />
      </Head>

      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="bg-gray-300 h-6 w-48 rounded"></div>
          <div className="bg-gray-200 h-4 w-64 rounded"></div>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : product ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>

          {/* Carrousel d'images */}
          {Array.isArray(product?.images) && product.images.length > 0 && (
            <div className="flex gap-4 overflow-x-auto py-4">
              {product.images.map((image, index) => (
                <div key={index} className="relative w-48 h-48">
                  <Image
                    src={image}
                    alt={`Illustration de ${product.name} - ${index + 1}`}
                    fill
                    className="rounded-lg shadow-md object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {/* Sections des produits associés */}
      {Array.isArray(product?.models) && product.models.length > 0 && (
        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-4">Modèles Associés</h2>
          <ModelsSection models={product.models} />
        </section>
      )}

      {Array.isArray(product?.fabrics) && product.fabrics.length > 0 && (
        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-4">Tissus Recommandés</h2>
          <Fabrics fabrics={product.fabrics} />
        </section>
      )}

      {Array.isArray(product?.accessories) && product.accessories.length > 0 && (
        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-4">Accessoires Recommandés</h2>
          <Accessories accessories={product.accessories} />
        </section>
      )}
    </div>
  );
}
