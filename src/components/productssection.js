import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function ProductsSection({ price = 0, color = "", material = "", country = "", category = "", artisan = "" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        // Créer une chaîne de requête avec les valeurs des filtres
        const queryParams = new URLSearchParams({
          price: price.toString(),
          color,
          material,
          country,
          category,
          minPrice: price,
          artisan,
        }).toString();

        const res = await fetch(`/api/products?${queryParams}`);
        if (!res.ok) {  
          throw new Error("Erreur lors de la récupération des produits");
        }
        const data = await res.json();
        
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
  }, [price, color, material, country, category, artisan]); // Tableau de dépendances stable

  if (loading) return <p className="text-center text-yellow-800 font-semibold py-4">Chargement des produits...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold py-4">Erreur: {error}</p>;

  return (
    <section className=" bg-gradient-to-b from-yellow-100 via-orange-200 to-green-200">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-green-900 mb-8">Nos Produits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gradient-to-b from-yellow-200 to-orange-300 rounded-3xl shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative w-full h-64 overflow-hidden rounded-t-3xl">
                <Image
                  src={product.image || "/images/placeholder.jpg"}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-3xl"
                  onError={() => setError(`L'image du produit ${product.name} n'a pas pu être chargée`)}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-green-900 text-center">{product.name}</h3>
                <p className="text-green-800 text-lg font-bold text-center mt-2">{product.price} €</p>
                <button className="mt-4 w-full bg-yellow-700 text-white py-3 rounded-lg font-semibold hover:bg-yellow-800 transition-colors duration-300 transform hover:scale-105 shadow-md">
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
