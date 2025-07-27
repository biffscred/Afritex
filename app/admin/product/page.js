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
  const pageSize = 20;

  // Redirection si pas admin
  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "ADMIN") {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  // Chargement initial
  useEffect(() => {
    if (session?.user.role === "ADMIN") {
      fetchProducts(selectedCategory, page);
      fetchCountries();
      fetchArtisans();
    }
  }, [session]);

  // Mise à jour produits si catégorie ou page change
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
      if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
      const data = await res.json();
      setArtisans(data);
    } catch {
      toast.error("Erreur lors de la récupération des artisans.");
    }
  }

  async function fetchCountries() {
    try {
      const res = await fetch("/api/countries");
      if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
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

      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: updatedValue }),
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      toast.success("✅ Produit mis à jour !");
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, [field]: updatedValue } : p))
      );
    } catch {
      toast.error("❌ Erreur lors de la mise à jour !");
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
        toast.error("Erreur lors de la suppression.");
      }
    } catch {
      toast.error("Erreur réseau !");
    }
  }

  return (
    <div className="container mx-auto py-12 px-6 min-h-screen bg-gradient-to-b from-yellow-200 to-red-300 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => router.push("/admin")} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">🔙 Admin</button>
        <button onClick={() => router.push("/")} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">🏠 Accueil</button>
      </div>

      <h1 className="text-5xl font-extrabold mb-10 text-center text-orange-800">Gestion des Produits</h1>
      <ToastContainer />

      {/* Filtre catégorie */}
      <div className="mb-6 flex items-center gap-4">
        <label className="text-lg font-semibold text-gray-700">Filtrer :</label>
        <select onChange={(e) => setSelectedCategory(e.target.value)} className="p-2 border rounded-md bg-white shadow" defaultValue="">
          <option value="">Toutes</option>
          <option value="FABRIC">Tissu</option>
          <option value="MODEL">Modèle</option>
          <option value="ACCESSORY">Accessoire</option>
        </select>
      </div>

      {/* ✅ Formulaire d'ajout de produit */}
<div className="bg-white shadow-md rounded-lg p-6 mb-8">
  <h2 className="text-xl font-bold mb-4 text-orange-800">➕ Ajouter un produit</h2>
  <form
    onSubmit={async (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = {
        name: form.name.value,
        description: form.description.value,
        price: parseFloat(form.price.value),
        category: form.category.value,
        image: form.image.value,
        artisanId: form.artisanId.value || null,
        color: form.color.value,
        material: form.material.value,
      };

      try {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!res.ok) throw new Error("Erreur lors de l'ajout du produit");
        toast.success("✅ Produit ajouté !");
        form.reset();
        fetchProducts(); // 🔄 Recharge les produits
      } catch (err) {
        toast.error("❌ Erreur à l'ajout");
        console.error(err);
      }
    }}
    className="grid grid-cols-1 md:grid-cols-2 gap-4"
  >
    <input type="text" name="name" placeholder="Nom" className="p-2 border rounded" required />
    <input type="text" name="image" placeholder="URL image" className="p-2 border rounded" required />
    <textarea name="description" placeholder="Description" className="p-2 border rounded md:col-span-2" required />
    <input type="number" step="0.01" name="price" placeholder="Prix (€)" className="p-2 border rounded" required />
    <select name="category" className="p-2 border rounded" required>
      <option value="FABRIC">Tissu</option>
      <option value="MODEL">Modèle</option>
      <option value="ACCESSORY">Accessoire</option>
    </select>
    <select name="artisanId" className="p-2 border rounded">
      <option value="">Aucun artisan</option>
      {artisans.map((a) => (
        <option key={a.id} value={a.id}>{a.name}</option>
      ))}
    </select>
    <input type="text" name="color" placeholder="Couleur" className="p-2 border rounded" />
    <input type="text" name="material" placeholder="Matériau" className="p-2 border rounded" />
    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 md:col-span-2">Ajouter</button>
  </form>
</div>


      {/* Tableau */}
      <div className="overflow-x-auto max-w-full">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Nom</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Prix</th>
              <th className="p-3 border">Catégorie</th>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Dispo</th>
              <th className="p-3 border">Artisan</th>
              <th className="p-3 border">Couleur</th>
              <th className="p-3 border">Matériau</th>
              <th className="p-3 border">Pays</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-3 border">{p.id}</td>
                <td className="p-3 border"><input type="text" value={p.name} onChange={(e) => handleUpdateProduct(p.id, "name", e.target.value)} className="w-full p-2 border rounded-md text-sm bg-gray-100" /></td>
                <td className="p-3 border"><textarea value={p.description} onChange={(e) => handleUpdateProduct(p.id, "description", e.target.value)} rows={3} className="w-full p-2 border rounded-md text-sm bg-gray-100 resize-none" /></td>
                <td className="p-3 border"><input type="number" value={p.price} onChange={(e) => handleUpdateProduct(p.id, "price", e.target.value)} className="w-full p-2 border rounded-md" /></td>
                <td className="p-3 border">
                  <select value={p.category} onChange={(e) => handleUpdateProduct(p.id, "category", e.target.value)} className="w-full p-2 border rounded-md">
                    <option value="FABRIC">Tissu</option>
                    <option value="MODEL">Modèle</option>
                    <option value="ACCESSORY">Accessoire</option>
                  </select>
                </td>
                <td className="p-3 border"><img src={p.image} alt={p.name} className="w-16 h-16 object-contain p-2 bg-white rounded shadow-md" /></td>
                <td className="p-3 border text-center"><input type="checkbox" checked={p.available} onChange={(e) => handleUpdateProduct(p.id, "available", e.target.checked)} /></td>
                <td className="p-3 border">
                  <select value={p.artisanId || ""} onChange={(e) => handleUpdateProduct(p.id, "artisanId", e.target.value)} className="w-full p-2 border rounded-md">
                    <option value="">Aucun</option>
                    {artisans.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>
                </td>
                <td className="p-3 border"><input type="text" value={p.color || ""} onChange={(e) => handleUpdateProduct(p.id, "color", e.target.value)} className="w-full p-2 border rounded-md bg-gray-100" /></td>
                <td className="p-3 border"><input type="text" value={p.material || ""} onChange={(e) => handleUpdateProduct(p.id, "material", e.target.value)} className="w-full p-2 border rounded-md bg-gray-100" /></td>
                <td className="p-3 border">
                  <select multiple value={p.countries?.map((c) => c.id.toString()) || []} onChange={(e) => {
                    const val = Array.from(e.target.selectedOptions, (o) => o.value);
                    handleUpdateProduct(p.id, "countries", val);
                  }} className="w-full p-2 border rounded-md bg-gray-100">
                    {countries.map((c) => (
                      <option key={c.id} value={c.id.toString()}>{c.name}</option>
                    ))}
                  </select>
                </td>
                <td className="p-3 border">
                  <button onClick={() => deleteProduct(p.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button onClick={() => setPage((prev) => Math.max(1, prev - 1))} disabled={page === 1} className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50">◀ Précédent</button>
        <span className="text-lg font-semibold text-orange-800">Page {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)} disabled={page * pageSize >= totalCount} className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50">Suivant ▶</button>
      </div>
    </div>
  );
}
