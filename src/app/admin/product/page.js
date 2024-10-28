"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminDashboardProduct() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    material: "",
    pattern: "",
    origin: "",
    color: "",
    size: "",
    artisanId: "",
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "ADMIN") {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (session?.user.role === "ADMIN") {
      fetchProducts();
      fetchImages();
    }
  }, [session]);

  async function fetchProducts() {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      setError("Erreur lors de la récupération des produits.");
      setTimeout(() => setError(null), 3000);
    }
  }

  async function fetchImages() {
    try {
      const res = await fetch("/api/images");
      if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
      const data = await res.json();
      setImages(data);
    } catch (error) {
      setError("Erreur lors de la récupération des images.");
      setTimeout(() => setError(null), 3000);
    }
  }

  useEffect(() => {
    let filtered = products;
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }
    if (minPrice) {
      filtered = filtered.filter((product) => parseFloat(product.price) >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((product) => parseFloat(product.price) <= parseFloat(maxPrice));
    }
    setFilteredProducts(filtered);
  }, [selectedCategory, minPrice, maxPrice, products]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      ...form,
      price: parseFloat(form.price),
    };
    setLoading(true);
    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/products/${editId}` : "/api/products";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchProducts();
        resetForm();
        setSuccess(editId ? "Produit modifié avec succès !" : "Produit ajouté avec succès !");
        setTimeout(() => setSuccess(null), 3000);
      } else {
        const responseMessage = await res.json();
        setError(responseMessage.message || "Une erreur est survenue.");
        setTimeout(() => setError(null), 3000);
      }
    } catch (error) {
      setError("Erreur de réseau, veuillez réessayer.");
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      material: "",
      pattern: "",
      origin: "",
      color: "",
      size: "",
      artisanId: "",
    });
    setEditId(null);
  }

  function handleEdit(product) {
    setForm(product);
    setEditId(product.id);
  }

  function confirmDelete(id) {
    setShowDeleteConfirm(true);
    setDeleteId(id);
  }

  async function handleDelete() {
    setLoading(true);
    try {
      await fetch(`/api/products/${deleteId}`, { method: "DELETE" });
      fetchProducts();
      setShowDeleteConfirm(false);
      setDeleteId(null);
    } catch (error) {
      setError("Erreur lors de la suppression.");
      setTimeout(() => setError(null), 3000);
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

      <div className="flex justify-end mb-6">
        <button
          onClick={() => router.push("/")}
          className="bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-900 transition-all duration-300"
        >
          Retour à l'écran principal
        </button>
      </div>

      {/* Formulaire d'ajout / modification */}
      <div className="bg-white p-10 rounded-xl shadow-lg border border-yellow-400 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-orange-700">Ajouter  un Produit</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nom du produit"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
            required
          />
          <input
            type="number"
            placeholder="Prix"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
            required
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
            required
          >
            <option value="">Sélectionnez une catégorie</option>
            <option value="FABRIC">Tissus</option>
            <option value="MODEL">Modèles</option>
            <option value="ACCESSORY">Accessoires</option>
          </select>

          {/* Champs spécifiques en fonction de la catégorie */}
          {form.category === "FABRIC" && (
            <>
              <input
                type="text"
                placeholder="Matériau"
                value={form.material}
                onChange={(e) => setForm({ ...form, material: e.target.value })}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              />
              <input
                type="text"
                placeholder="Motif"
                value={form.pattern}
                onChange={(e) => setForm({ ...form, pattern: e.target.value })}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              />
              <input
                type="text"
                placeholder="Origine"
                value={form.origin}
                onChange={(e) => setForm({ ...form, origin: e.target.value })}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              />
              <input
                type="text"
                placeholder="Couleur"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              />
              <input
                type="text"
                placeholder="Taille"
                value={form.size}
                onChange={(e) => setForm({ ...form, size: e.target.value })}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              />
            </>
          )}

          {form.category === "MODEL" && (
            <>
              <input
                type="text"
                placeholder="Artisan ID"
                value={form.artisanId}
                onChange={(e) => setForm({ ...form, artisanId: e.target.value })}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              />
              <input
                type="text"
                placeholder="Couleur"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              />
            </>
          )}

          {form.category === "ACCESSORY" && (
            <>
              <input
                type="text"
                placeholder="Artisan ID"
                value={form.artisanId}
                onChange={(e) => setForm({ ...form, artisanId: e.target.value })}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              />
              <input
                type="text"
                placeholder="Couleur"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              />
            </>
          )}

          <select
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
            required
          >
            <option value="">Sélectionnez une image</option>
            {images.map((img, index) => (
              <option key={index} value={img}>
                {img}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Chargement..." : editId ? "Modifier Produit" : "Ajouter Produit"}
          </button>
        </form>
      </div>

      {/* Section d'affichage des produits filtrés */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-lg shadow-md border border-yellow-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-orange-800">{product.name}</h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="text-green-700 font-bold mt-4">{product.price} €</p>
              </div>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300"
                >
                  Modifier
                </button>
                <button
                  onClick={() => confirmDelete(product.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-300"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">Aucun produit trouvé</p>
        )}
      </div>

      {/* Modal de confirmation de suppression */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-center mb-4">Confirmer la suppression</h2>
            <p className="text-gray-600 mb-6 text-center">
              Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-300"
              >
                Oui, supprimer
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-all duration-300"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
