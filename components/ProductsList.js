"use client";
import React, { useCallback, Suspense } from "react";
import useSWRInfinite from "swr/infinite";
import dynamic from "next/dynamic";
import ProductCard from "./ProductCard";

// Import dynamique de la modale pour un code splitting (lazy loading)
const ProductModal = dynamic(() => import("./ProductModal"), {
  ssr: false,
  loading: () => <div>Chargement de la modale...</div>,
});

// Fonction fetcher avec gestion d'erreur
const fetcher = (url) =>
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Erreur lors de la récupération des produits");
      return res.json();
    })
    .catch((err) => console.error("❌ Erreur API :", err));

// Nombre d'éléments par page (pour la pagination)
const PAGE_SIZE = 16;

// Clé pour SWRInfinite
const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.products.length) return null;
  return `/api/products?page=${pageIndex + 1}&pageSize=${PAGE_SIZE}`;
};


const ProductsList = () => {
  // Utilisation de SWRInfinite pour gérer la récupération paginée
  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetcher,
    { revalidateOnFocus: false }
  );

  const [selectedProduct, setSelectedProduct] = React.useState(null);

  // Aplatir les pages récupérées pour obtenir un tableau de produits
  const products = data ? data.flatMap((page) => page.products) : [];

  // Logs pour voir ce qui se passe
  console.log("🟡 Données brutes reçues de l'API :", data);
  console.log("🟢 Produits extraits après flatten :", products);
  if (error) console.error("❌ Erreur SWR :", error);

  // Callback mémorisé pour éviter des re-rendus inutiles
  const handleProductClick = useCallback((product) => {
    console.log("🟠 Produit cliqué :", product);
    setSelectedProduct(product);
  }, []);

  // Affichage de skeleton loaders pendant le chargement
  const renderSkeletons = () => {
    return Array.from({ length: PAGE_SIZE }).map((_, index) => (
      <div key={index} className="animate-pulse bg-gray-200 h-64 rounded"></div>
    ));
  };

  return (
    <div>
      {error && (
        <p className="text-center text-red-500 font-semibold py-4">
          {error.message || "Impossible de charger les produits."}
        </p>
      )}

      {/* Affichage des skeletons pendant le chargement initial */}
      {(!data && isValidating) ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {renderSkeletons()}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={handleProductClick}
            />
          ))}
        </div>
      )}

      {/* Bouton pour charger plus de produits si la dernière page atteint PAGE_SIZE */}
      {data && products.length < data[0]?.totalCount &&  (
        <div className="flex justify-center py-4">
          <button
            onClick={() => {
              console.log("🔵 Chargement de plus de produits...");
              setSize(size + 1);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Charger plus
          </button>
        </div>
      )}

      {/* Affichage de la modale en lazy loading via Suspense */}
      {selectedProduct && (
        <Suspense fallback={<div>Chargement de la modale...</div>}>
          <ProductModal
            product={selectedProduct}
            isOpen={true}
            onClose={() => {
              console.log("🔴 Fermeture de la modale pour le produit :", selectedProduct);
              setSelectedProduct(null);
            }}
          />
        </Suspense>
      )}
    </div>
  );
};

export default React.memo(ProductsList);
