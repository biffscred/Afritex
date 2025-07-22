"use client";
import React, { useCallback, Suspense } from "react";
import useSWRInfinite from "swr/infinite";
import dynamic from "next/dynamic";
import ProductCard from "./ProductCard";

// Lazy loading de la modale
const ProductModal = dynamic(() => import("./ProductModal"), {
  ssr: false,
  loading: () => <div>Chargement de la modale...</div>,
});

const fetcher = (url) =>
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Erreur lors de la récupération des modèles");
      return res.json();
    })
    .catch((err) => console.error("❌ Erreur API :", err));

const PAGE_SIZE = 16;

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.products.length) return null;
  return `/api/products?page=${pageIndex + 1}&pageSize=${PAGE_SIZE}&category=MODEL`; // 👈 filtre modèles
};

function ModelsList() {
  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetcher,
    { revalidateOnFocus: false }
  );

  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const products = Array.isArray(data)
    ? data.flatMap((page) => page?.products || [])
    : [];

  const handleProductClick = useCallback((product) => {
    const images =
      product.images?.length > 0
        ? product.images
        : product.models?.[0]?.modelImages || [];
    setSelectedProduct({ ...product, images });
  }, []);

  const renderSkeletons = () =>
    Array.from({ length: PAGE_SIZE }).map((_, i) => (
      <div key={i} className="animate-pulse bg-gray-200 h-64 rounded"></div>
    ));

  return (
    <div>
      {error && (
        <p className="text-center text-red-500 font-semibold py-4">
          {error.message || "Impossible de charger les modèles."}
        </p>
      )}

      {!data && isValidating ? (
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

      {data && products.length < data[0]?.totalCount && (
        <div className="flex justify-center py-4">
          <button
            onClick={() => setSize(size + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Charger plus
          </button>
        </div>
      )}

      {selectedProduct && (
        <Suspense fallback={<div>Chargement de la modale...</div>}>
          <ProductModal
            product={selectedProduct}
            isOpen={true}
            onClose={() => setSelectedProduct(null)}
          />
        </Suspense>
      )}
    </div>
  );
}

export default React.memo(ModelsList);
