import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        if (!res.ok) {  
          throw new Error("Erreur lors de la récupération des produits");
        }
        const data = await res.json();
        
        // Vérifiez si data est un tableau avant de le définir dans le state
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          throw new Error("Les données reçues ne sont pas valides");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center text-yellow-800 font-semibold py-4">Chargement des produits...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold py-4">Erreur: {error}</p>;

  return (
    <section className="py-12 bg-gradient-to-b from-yellow-100 to-yellow-200">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-yellow-800 mb-8 text-center">Nos Produits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="relative w-full h-64">
                <Image
                  src={product.image} 
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                  onError={() => setError("L'image du produit n'a pas pu être chargée")}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-yellow-600 text-xl font-bold mt-2">{product.price} €</p>
                <button className="mt-4 w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition-colors duration-300">
                  Ajouter au Panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
