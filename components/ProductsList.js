"use client";

import React, { useCallback, Suspense, useState, useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import dynamic from "next/dynamic";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";

const ProductModal = dynamic(() => import("./ProductModal"), {
  ssr: false,
  loading: () => <div>Chargement de la modale...</div>,
});

const fetcher = (url) =>
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Erreur lors de la récupération des produits");
      return res.json();
    })
    .catch((err) => console.error("❌ Erreur API :", err));

const PAGE_SIZE = 16;

const ProductsList = () => {
  const [filters, setFilters] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.products.length) return null;

    let url = `/api/products?page=${pageIndex + 1}&pageSize=${PAGE_SIZE}`;
    if (filters.category) url += `&category=${filters.category}`;
    if (filters.country) url += `&country=${filters.country}`;
    if (filters.priceMin) url += `&priceMin=${filters.priceMin}`;
    if (filters.priceMax) url += `&priceMax=${filters.priceMax}`;
    if (filters.color) url += `&color=${filters.color}`;
    if (filters.material) url += `&material=${filters.material}`;

    return url;
  };

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetcher,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    setSize(1); // reset pagination on filter change
  }, [filters]);

  const products = Array.isArray(data)
    ? data.flatMap((page) => page?.products || [])
    : [];

  const handleProductClick = useCallback((product) => {
    const images =
      product.images?.length > 0
        ? product.images
        : product.fabric?.fabricImages ||
          product.models?.[0]?.modelImages ||
          product.accessories?.[0]?.accessoryImages || [];

    setSelectedProduct({ ...product, images });
  }, []);

  const renderSkeletons = () => {
    return Array.from({ length: PAGE_SIZE }).map((_, index) => (
      <div key={index} className="animate-pulse bg-gray-200 h-64 rounded"></div>
    ));
  };

  return (
    <div>
      <ProductFilters onFilter={(f) => setFilters(f)} />

      {error && (
        <p className="text-center text-red-500 font-semibold py-4">
          {error.message || "Impossible de charger les produits."}
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
};

export default React.memo(ProductsList);
