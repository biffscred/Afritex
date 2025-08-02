"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminDashboardProduct() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [artisans, setArtisans] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);

  const pageSize = 20;

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    artisanId: "",
    color: "",
    material: "",
  });

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "ADMIN") {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (session?.user.role === "ADMIN") {
      fetchProducts(selectedCategory, page);
      fetchCountries();
      fetchArtisans();
    }
  }, [session]);

  useEffect(() => {
    if (session?.user.role === "ADMIN") {
      fetchProducts(selectedCategory, page);
    }
  }, [selectedCategory, page]);

  async function fetchProducts(category = "", currentPage = 1) {
    try {
      let url = `/api/products?page=${currentPage}&pageSize=${pageSize}`;
      if (category) url += `&category=${category}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
      const data = await res.json();

      setProducts(Array.isArray(data.products) ? data.products : []);
      setTotalCount(data.totalCount || 0);
    } catch (error) {
      toast.error("Erreur lors de la récupération des produits.");
    }
  }

  async function fetchArtisans() {
    try {
      const res = await fetch("/api/artisans");
      const data = await res.json();
      setArtisans(data);
    } catch {
      toast.error("Erreur lors de la récupération des artisans.");
    }
  }

  async function fetchCountries() {
    try {
      const res = await fetch("/api/countries");
      const data = await res.json();
      setCountries(data);
    } catch {
      toast.error("Erreur lors de la récupération des pays.");
    }
  }

  async function handleUpdateProduct(productId, field, value) {
    try {
      const updatedValue =
        field === "countries"
          ? Array.isArray(value)
            ? value.map((id) => ({ id: parseInt(id) }))
            : []
          : value;

      const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: updatedValue }),
      });

      if (!res.ok) throw new Error("Erreur update");

      toast.success("✅ Produit mis à jour");
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, [field]: updatedValue } : p))
      );
    } catch {
      toast.error("❌ Erreur update !");
    }
  }

  async function deleteProduct(id) {
    if (!confirm("Supprimer ce produit ?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        toast.success("Produit supprimé !");
      } else {
        toast.error("Erreur suppression.");
      }
    } catch {
      toast.error("Erreur réseau !");
    }
  }

  async function handleAddProduct() {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) throw new Error();

      toast.success("Produit ajouté !");
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        artisanId: "",
        color: "",
        material: "",
      });
      fetchProducts();
      setShowAddForm(false);
    } catch {
      toast.error("Erreur ajout produit.");
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />

      <div className="flex justify-between items-center mb-6">
      <div className="flex justify-between mb-4">
  <button
    onClick={() => router.push("/admin")}
    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
  >
    🔙 Retour admin
  </button>
  <button
    onClick={() => router.push("/")}
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    🏠 Accueil
  </button>
</div>

        <h1 className="text-3xl font-bold text-orange-700">Gestion Produits</h1>
        <button
          onClick={() => setShowAddForm((prev) => !prev)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showAddForm ? "Annuler" : "Ajouter un produit"}
        </button>
      </div>

      <div className="mb-4">
  <label className="mr-2 font-semibold text-gray-700">Filtrer par catégorie :</label>
  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="p-2 border rounded"
  >
    <option value="">Toutes</option>
    <option value="FABRIC">Tissus</option>
    <option value="MODEL">Modèles</option>
    <option value="ACCESSORY">Accessoires</option>
  </select>
</div>


      {showAddForm && (
        <div className="bg-yellow-100 p-4 rounded mb-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Nouveau produit</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.keys(newProduct).map((key) => (
              <input
                key={key}
                placeholder={key}
                value={newProduct[key]}
                onChange={(e) => setNewProduct({ ...newProduct, [key]: e.target.value })}
                className="p-2 border rounded"
              />
            ))}
            <button
              onClick={handleAddProduct}
              className="col-span-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Enregistrer
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prix</th>
              <th>Image</th>

              <th>Catégorie</th>
              <th>Dispo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  <input
                    type="text"
                    value={p.name}
                    onChange={(e) => handleUpdateProduct(p.id, "name", e.target.value)}
                    className="p-1 border rounded"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={p.price}
                    onChange={(e) => handleUpdateProduct(p.id, "price", e.target.value)}
                    className="p-1 border rounded"
                  />
                </td>
                <td>
  <img
    src={p.image}
    alt={p.name}
    className="w-20 h-20 object-contain rounded shadow mb-2"
  />
  <input
    type="text"
    value={p.image}
    onChange={(e) => handleUpdateProduct(p.id, "image", e.target.value)}
    className="w-full text-xs border rounded p-1 bg-gray-50"
  />
</td>


                <td>
                  <select
                    value={p.category}
                    onChange={(e) => handleUpdateProduct(p.id, "category", e.target.value)}
                    className="p-1 border rounded"
                  >
                    <option value="FABRIC">Tissu</option>
                    <option value="MODEL">Modèle</option>
                    <option value="ACCESSORY">Accessoire</option>
                  </select>
                </td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={p.available}
                    onChange={(e) => handleUpdateProduct(p.id, "available", e.target.checked)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-600 text-white rounded"
          >
            ◀ Précédent
          </button>
          <span className="font-bold">Page {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={products.length < pageSize}
            className="px-3 py-1 bg-gray-600 text-white rounded"
          >
            Suivant ▶
          </button>
        </div>
      </div>
    </div>
  );
}
