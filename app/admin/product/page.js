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
  
  const [searchTerm, setSearchTerm] = useState("");

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
  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchTerm.length >= 2) {
        fetch(`/api/products?search=${searchTerm}`)
          .then((res) => res.json())
          .then((data) => setProducts(Array.isArray(data.products) ? data.products : []))
          .catch(() => toast.error("Erreur de recherche"));
      } else {
        fetchProducts(selectedCategory, page);
      }
    }, 300);
  
    return () => clearTimeout(delay);
  }, [searchTerm]);
  
  

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
<div>
    <label className="mr-2 font-semibold text-gray-700">🔍 Rechercher :</label>
    <input
      type="text"
      placeholder="Nom du produit..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="p-2 border rounded w-full md:w-72"
    />
  </div>


  {showAddForm && (
  <div className="bg-orange-50 p-6 rounded-xl mb-8 shadow-md border border-orange-200">
    <h2 className="text-xl font-bold mb-4 text-orange-800">✨ Ajouter un nouveau trésor Afritex</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      
      {/* Informations de base */}
      <input 
        placeholder="Nom du produit" 
        value={newProduct.name} 
        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} 
        className="p-2 border rounded bg-white" 
      />
      <input 
        placeholder="Prix (ex: 45)" 
        type="number" 
        value={newProduct.price} 
        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} 
        className="p-2 border rounded bg-white" 
      />
      <input 
        placeholder="URL de l'image" 
        value={newProduct.image} 
        onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} 
        className="p-2 border rounded bg-white" 
      />

      {/* Sélection de la Catégorie (Fini les fautes de frappe !) */}
      <select 
        value={newProduct.category} 
        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
        className="p-2 border rounded bg-white"
      >
        <option value="">-- Choisir une catégorie --</option>
        <option value="FABRIC">Tissu (FABRIC)</option>
        <option value="MODEL">Modèle (MODEL)</option>
        <option value="ACCESSORY">Accessoire (ACCESSORY)</option>
      </select>

      {/* Sélection de l'Artisan (Chargé dynamiquement depuis ta base) */}
      <select 
        value={newProduct.artisanId} 
        onChange={(e) => setNewProduct({...newProduct, artisanId: e.target.value})}
        className="p-2 border rounded bg-white"
      >
        <option value="">-- Choisir l'artisan --</option>
        {artisans.map(art => (
          <option key={art.id} value={art.id}>{art.name}</option>
        ))}
      </select>

      <input 
        placeholder="Matière (Coton, Soie...)" 
        value={newProduct.material} 
        onChange={(e) => setNewProduct({...newProduct, material: e.target.value})} 
        className="p-2 border rounded bg-white" 
      />

      <textarea 
        placeholder="Description" 
        value={newProduct.description} 
        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} 
        className="p-2 border rounded bg-white col-span-full"
      />

      <button
        onClick={handleAddProduct}
        className="col-span-full bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700 transition-all shadow-lg"
      >
        🚀 Enregistrer dans le catalogue
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
    <tr key={p.id} className="border-b hover:bg-gray-50">
      <td className="p-2">{p.id}</td>
      
      {/* 📝 Case Nom : enregistre quand on clique ailleurs */}
      <td className="p-2">
        <input
          type="text"
          defaultValue={p.name}
          onBlur={(e) => {
            if (e.target.value !== p.name) {
              handleUpdateProduct(p.id, "name", e.target.value);
            }
          }}
          className="p-1 border rounded w-full"
        />
      </td>

      {/* 💰 Case Prix : enregistre quand on clique ailleurs */}
      <td className="p-2">
        <input
          type="number"
          defaultValue={p.price}
          onBlur={(e) => {
            const newVal = parseFloat(e.target.value);
            if (newVal !== p.price) {
              handleUpdateProduct(p.id, "price", newVal);
            }
          }}
          className="p-1 border rounded w-32"
        />
      </td>

      {/* 🖼 Case Image */}
      <td className="p-2">
        <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded mb-1" />
        <input
          type="text"
          defaultValue={p.image}
          onBlur={(e) => {
            if (e.target.value !== p.image) {
              handleUpdateProduct(p.id, "image", e.target.value);
            }
          }}
          className="text-xs border rounded p-1 w-full"
        />
      </td>

      {/* 📁 Case Catégorie */}
      <td className="p-2">
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

      {/* ✅ Case Disponibilité */}
      <td className="p-2 text-center">
        <input
          type="checkbox"
          defaultChecked={p.available}
          onChange={(e) => handleUpdateProduct(p.id, "available", e.target.checked)}
        />
      </td>

      {/* 🗑 Bouton Supprimer */}
      <td className="p-2">
        <button
          onClick={() => deleteProduct(p.id)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
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
