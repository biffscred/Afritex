"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminDashboardProduct() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // État pour gérer les produits, le formulaire et les opérations d'administration
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [success, setSuccess] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Vérification si l'utilisateur est admin
  useEffect(() => {
    console.log("Status de la session:", status);
    if (status === "loading") return;
    if (!session || session.user.role !== "ADMIN") {
      console.log("Redirection vers la page de login car l'utilisateur n'est pas admin.");
      router.push("/auth/login");
    }
  }, [session, status, router]);

  // Récupération des produits et images
  useEffect(() => {
    if (session?.user.role === "ADMIN") {
      console.log("Session admin détectée. Récupération des produits et des images...");
      fetchProducts();
      fetchImages();
    }
  }, [session]);

  async function fetchProducts() {
    console.log("Début de la récupération des produits...");
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      console.log("Produits récupérés :", data);
      setProducts(data);
      setFilteredProducts(data); // Initialise les produits filtrés
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  }

  async function fetchImages() {
    console.log("Début de la récupération des images...");
    try {
      const res = await fetch('/api/images');
      if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
      const data = await res.json();
      console.log("Images récupérées :", data);
      setImages(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des images :', error);
    }
  }

  function handleBackToMainScreen() {
    console.log("Retour à l'écran principal.");
    router.push("/"); // Retourne à la page d'accueil ou la page principale
  }

  function handleFilterProducts() {
    console.log("Filtrage des produits...");
    let filtered = products;
    console.log("Catégorie sélectionnée :", selectedCategory);
    console.log("Prix minimum :", minPrice);
    console.log("Prix maximum :", maxPrice);

    // Filtrer par catégorie
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    // Filtrer par prix
    if (minPrice) {
      filtered = filtered.filter(product => parseFloat(product.price) >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(product => parseFloat(product.price) <= parseFloat(maxPrice));
    }
    console.log("Produits après filtrage :", filtered);
    setFilteredProducts(filtered);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Soumission du formulaire : ", form);
    
    const formData = {
      name: form.name,
      description: form.description,
      price: form.price,
      category: form.category,
      image: form.image,
    };
  
    setLoading(true);
    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/products/${editId}` : "/api/products";
  
    try {
      console.log(`Envoi d'une requête ${method} à l'URL : ${url}`);
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (res.ok) {
        console.log("Requête réussie. Actualisation des produits...");
        fetchProducts();
        resetForm();
        setSuccess(editId ? "Produit modifié avec succès !" : "Produit ajouté avec succès !");
        setTimeout(() => setSuccess(null), 3000);
      } else {
        const responseMessage = await res.json();
        console.error("Erreur API : ", responseMessage);
        setError(responseMessage.message || "Une erreur est survenue.");
        setTimeout(() => setError(null), 3000);
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du produit : ", error);
      setError("Erreur de réseau, veuillez réessayer.");
      setTimeout(() => setError(null), 3000);
    } finally {
      console.log("Fin de la soumission du formulaire.");
      setLoading(false);
    }
  }

  function resetForm() {
    console.log("Réinitialisation du formulaire.");
    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
    });
    setEditId(null);
  }

  function handleEdit(product) {
    console.log("Mise à jour du produit pour édition :", product);
    setForm(product);
    setEditId(product.id);
  }

  async function handleDelete(id) {
    console.log("Suppression du produit avec ID :", id);
    setLoading(true);
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    } finally {
      setLoading(false);
    }
  }

  if (status === "loading") return <p>Chargement...</p>;
  if (!session || session.user.role !== "ADMIN") return <p>Accès refusé</p>;

  return (
    <div className="container mx-auto py-12 px-6 min-h-screen bg-gradient-to-b from-yellow-200 to-red-300 rounded-lg shadow-md">
      <h1 className="text-5xl font-extrabold mb-10 text-center text-orange-800 tracking-wide">
        Gestion d'Administration
      </h1>

      {/* Bouton de retour à l'écran principal */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleBackToMainScreen}
          className="bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-900 transition-all duration-300"
        >
          Retour à l'écran principal
        </button>
      </div>

      <div className="bg-white p-10 rounded-xl shadow-lg border border-yellow-400">
        {/* Section des filtres */}
        <div className="mb-6 flex justify-between items-center space-x-4">
          <select
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              console.log("Catégorie sélectionnée :", e.target.value);
            }}
            className="w-1/4 p-3 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
          >
            <option value="">Toutes les catégories</option>
            <option value="FABRIC">Tissus</option>
            <option value="MODEL">Modèles</option>
            <option value="ACCESSORY">Accessoires</option>
          </select>

          <input
            type="number"
            placeholder="Prix minimum"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              console.log("Prix minimum :", e.target.value);
            }}
            className="w-1/4 p-3 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
          />

          <input
            type="number"
            placeholder="Prix maximum"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              console.log("Prix maximum :", e.target.value);
            }}
            className="w-1/4 p-3 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
          />

          <button
            onClick={handleFilterProducts}
            className="w-1/4 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Filtrer
          </button>
        </div>

        {/* Gestion des produits */}
        <div className="bg-gradient-to-b from-yellow-100 to-orange-200 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center text-yellow-900">Gestion des Produits</h1>
          {error && !loading && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && !loading && <p className="text-green-500 text-center mb-4">{success}</p>}

          {/* Formulaire d'ajout et modification */}
          <form onSubmit={handleSubmit} className="mb-6 grid gap-4 bg-white p-6 rounded-lg shadow-lg border border-orange-300">
            <input
              type="text"
              placeholder="Nom (max 50 caractères)"
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
                console.log("Nom du produit :", e.target.value);
              }}
              maxLength={50}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              required
            />
            <textarea
              placeholder="Description (max 1000 caractères)"
              value={form.description}
              onChange={(e) => {
                setForm({ ...form, description: e.target.value });
                console.log("Description du produit :", e.target.value);
              }}
              maxLength={1000}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              required
            ></textarea>
            <input
              type="number"
              placeholder="Prix"
              value={form.price}
              onChange={(e) => {
                setForm({ ...form, price: e.target.value });
                console.log("Prix du produit :", e.target.value);
              }}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              required
            />
            <select
              value={form.category}
              onChange={(e) => {
                setForm({ ...form, category: e.target.value });
                console.log("Catégorie du produit :", e.target.value);
              }}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              required
            >
              <option value="">Sélectionnez une catégorie</option>
              <option value="FABRIC">Tissus</option>
              <option value="MODEL">Modèles</option>
              <option value="ACCESSORY">Accessoires</option>
            </select>
            <select
              value={form.image}
              onChange={(e) => {
                setForm({ ...form, image: e.target.value });
                console.log("Image du produit :", e.target.value);
              }}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              required
            >
              <option value="">Sélectionnez une image</option>
              {images.map((img, index) => (
                <option key={index} value={img}>{img}</option>
              ))}
            </select>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Chargement..." : editId ? "Modifier" : "Ajouter"} Produit
            </button>
          </form>

          {/* Liste des produits filtrés */}
          <ul className="space-y-6">
            {filteredProducts.map((product) => (
              <li
                key={product.id}
                className="bg-white p-6 rounded-lg shadow-md border border-yellow-300 flex justify-between items-start space-x-4 transition-transform duration-300 transform hover:scale-105 cursor-pointer"
              >
                <div>
                  <h3 className="text-xl font-semibold text-orange-800">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-green-700 font-bold mt-2">{product.price} €</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
