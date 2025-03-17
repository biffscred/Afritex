"use client";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Erreur lors de la récupération des produits");

        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("❌ Erreur de récupération des produits :", error);
        setError("Impossible de charger les produits.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {error && <p className="text-center text-red-500 font-semibold py-4">{error}</p>}
      {loading ? (
        <p className="text-center text-gray-700 font-semibold py-4">Chargement des produits...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
           <ProductCard 
           key={product.id} 
           product={product} 
           onClick={() => {
             console.log("🟢 Produit cliqué :", product);
             setSelectedProduct(product);
           }} 
         />
         
          ))}
        </div>
      )}

{selectedProduct ? (
  <>
    <p className="text-center text-green-600">✅ Modale active pour {selectedProduct.name}</p>
    <ProductModal 
      product={selectedProduct} 
      isOpen={!!selectedProduct} 
      onClose={() => {
        console.log("🔴 Fermeture de la modale !");
        setSelectedProduct(null);
      }} 
    />
  </>
) : (
  <p className="text-center text-red-500">❌ Pas de produit sélectionné</p>
)}

    </div>
  );
};

export default ProductsList;
