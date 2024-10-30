import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react'; // Pour vérifier si l'utilisateur est connecté
import { useRouter } from 'next/navigation'; // Pour rediriger si nécessaire

export default function ProductsSection({ price = 0, color = "", material = "", country = "", category = "", artisan = "" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState(''); // Pour afficher un message après ajout au panier
  const { data: session, status } = useSession(); // Vérifier si l'utilisateur est connecté
  const router = useRouter(); // Utiliser router pour rediriger
   


  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        console.log("Fetching products with filters:", { price, color, material, country, category, artisan });

        const queryParams = new URLSearchParams({
          priceMax: price.toString(),
          color,
          material,
          country,
          category,
          artisan,
        }).toString();

        console.log("Constructed query params:", queryParams);

        const res = await fetch(`/api/products?${queryParams}`);
        console.log("Fetch response:", res);

        if (!res.ok) {  
          throw new Error("Erreur lors de la récupération des produits");
        }
        const data = await res.json();
        console.log("Fetched product data:", data);

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
  }, [price, color, material, country, category, artisan]); // Dépendances stables

  // Fonction pour ajouter un produit au panier (localStorage si non connecté)
  const handleAddToCart = async (product) => {
    console.log("Add to cart clicked for product:", product);

    if (!session) {
      console.log("User not logged in, saving to localStorage.");
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProduct = cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
        console.log("Incremented quantity for existing product in localStorage:", existingProduct);
      } else {
        cart.push({ ...product, quantity: 1 });
        console.log("Added new product to localStorage:", product);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      setCartMessage(`Le produit ${product.name} a été ajouté au panier.`);
      setTimeout(() => setCartMessage(''), 3000);
    } else {
      console.log("User logged in, saving to server.");
      await addProductToServerCart(product);
    }
  };

  // Fonction pour ajouter un produit au panier serveur

  
    const addProductToServerCart = async (product) => {
    console.log("Adding product to server cart:", product);

    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
          price: product.price,
          category: product.category,
        }),
      });

      console.log("Server response for add to cart:", res);

      if (res.ok) {
        setCartMessage(`Le produit ${product.name} a été ajouté au panier.`);
        setTimeout(() => setCartMessage(''), 3000);
      } else {
        const errorData = await res.json();
        console.error("Erreur lors de l'ajout au panier:", errorData);
        setError(`Erreur lors de l'ajout au panier : ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
      setError("Erreur lors de l'ajout au panier.");
    }
  };

  if (loading) return <p className="text-center text-yellow-800 font-semibold py-4">Chargement des produits...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold py-4">Erreur: {error}</p>;

  return (
    <section className=" bg-gradient-to-b from-yellow-100 via-orange-200 to-green-200">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-green-900 mb-8">Nos Produits</h2>

        {cartMessage && <p className="text-center text-green-800 font-semibold py-4">{cartMessage}</p>}

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
                <button 
                  className="mt-4 w-full bg-yellow-700 text-white py-3 rounded-lg font-semibold hover:bg-yellow-800 transition-colors duration-300 transform hover:scale-105 shadow-md"
                  onClick={() => handleAddToCart(product)}
                >
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
