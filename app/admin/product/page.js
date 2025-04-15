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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

 // Redirection si pas admin
useEffect(() => {
  if (status === "loading") return;
  if (!session || session.user.role !== "ADMIN") {
    router.push("/auth/login");
  }
}, [session, status, router]);

// Récupération initiale des données
useEffect(() => {
  if (session?.user.role === "ADMIN") {
    fetchProducts(selectedCategory); // ← prend bien en compte la valeur actuelle
    fetchCountries();
  }
}, [session]);

// Mise à jour si on change le select
useEffect(() => {
  if (session?.user.role === "ADMIN") {
    fetchProducts(selectedCategory);
  }
}, [selectedCategory]);


  async function fetchProducts(category = "") {
    try {
      let url = "/api/products";
      if (category) {
        url += `?category=${category}`;
      }
  
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
      const data = await res.json();
      setProducts(Array.isArray(data.products) ? data.products : []);
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
    } catch (error) {
      toast.error("Erreur lors de la récupération des artisans.");
    }
  }

  async function fetchCountries() {
    try {
      const res = await fetch("/api/countries");
      if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      toast.error("Erreur lors de la récupération des pays.");
    }
  }

  async function handleUpdateProduct(productId, field, value) {
    try {
      setLoading(true);
  
      // 🔧 Si c’est le champ countries, on prépare le tableau d'objets { id: number }
      const updatedValue =
        field === "countries"
          ? Array.isArray(value)
            ? value.map((id) => ({ id: parseInt(id) }))
            : []
          : value; // ✅ Sinon, garde la valeur normale (string, number, boolean)
  
      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: updatedValue }),
      });
  
      if (!response.ok) throw new Error("Erreur lors de la mise à jour");
  
      toast.success("✅ Produit mis à jour !");
      const updated = await response.json();
  
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, [field]: updatedValue } : p))
      );
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour :", error);
      toast.error("❌ Erreur lors de la mise à jour !");
    } finally {
      setLoading(false);
    }
  }
  

  async function deleteProduct(id) {
    if (!confirm("Es-tu sûr de vouloir supprimer ce produit ?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
        toast.success("Produit supprimé !");
      } else {
        toast.error("Erreur lors de la suppression.");
      }
    } catch (error) {
      toast.error("Erreur réseau !");
    }
  }

  return (
    <div className="container mx-auto py-12 px-6 min-h-screen bg-gradient-to-b from-yellow-200 to-red-300 rounded-lg shadow-md">
       {/* ✅ BOUTONS DE NAVIGATION */}
  <div className="flex justify-between items-center mb-6">
    <button
      onClick={() => router.push("/admin")}
      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all shadow-md"
    >
      🔙 Retour à l'Admin
    </button>

    <button
      onClick={() => router.push("/")}
      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all shadow-md"
    >
      🏠 Accueil
    </button>
  </div>

      <h1 className="text-5xl font-extrabold mb-10 text-center text-orange-800">
        Gestion des Produits
      </h1>
      <ToastContainer />
      <div className="mb-6 flex items-center gap-4">
  <label className="text-lg font-semibold text-gray-700">Filtrer par catégorie :</label>
  <select
  defaultValue=""
  onChange={(e) => setSelectedCategory(e.target.value)}
  className="p-2 border rounded-md bg-white shadow"
>
  <option value="">Toutes</option>
  <option value="FABRIC">Tissu</option>
  <option value="MODEL">Modèle</option>
  <option value="ACCESSORY">Accessoire</option>
</select>

</div>


      {/* Tableau d'administration */}
      <div className="overflow-x-auto max-w-full">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-left">
            <tr >
            <th className="p-3 border min-w-[50px]">ID</th>
    <th className="p-3 border min-w-[150px]">Nom</th>
    <th className="p-3 border min-w-[250px]">Description</th>
    <th className="p-3 border min-w-[100px]">Prix (€)</th>
    <th className="p-3 border min-w-[120px]">Catégorie</th>
    <th className="p-3 border min-w-[100px]">Image</th>
    <th className="p-3 border min-w-[100px]">Disponible</th>
    <th className="p-3 border min-w-[150px]">Artisan</th>
    <th className="p-3 border min-w-[100px]">Couleur</th>  {/* ✅ Corrigé */}
    <th className="p-3 border min-w-[100px]">Matériau</th> {/* ✅ Corrigé */}
    <th className="p-3 border min-w-[150px]">Pays</th> {/* ✅ Corrigé */}
    <th className="p-3 border min-w-[150px]">Actions</th> {/* ✅ Corrigé */}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-3 border">{product.id}</td>

                <td className="p-3 border">
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) =>
                      handleUpdateProduct(product.id, "name", e.target.value)
                    }
                    className="p-2 border w-full rounded-md text-sm bg-gray-100"
                  />
                </td>

                <td className="p-3 border">
                  <textarea
                    value={product.description}
                    onChange={(e) =>
                      handleUpdateProduct(product.id, "description", e.target.value)
                    }
                    className="p-2 border w-full rounded-md text-sm bg-gray-100 resize-none"
    rows={3} 
                  />
                </td>

                <td className="p-3 border">
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) =>
                      handleUpdateProduct(product.id, "price", e.target.value)
                    }
                    className="p-2 border w-full rounded-md"
                  />
                </td>

                <td className="p-3 border">
                  <select
                    value={product.category}
                    onChange={(e) =>
                      handleUpdateProduct(product.id, "category", e.target.value)
                    }
                    className="p-2 border w-full rounded-md"
                  >
                    <option value="FABRIC">Tissu</option>
                    <option value="MODEL">Modèle</option>
                    <option value="ACCESSORY">Accessoire</option>
                  </select>
                </td>

                <td className="p-3 border">
                  <img
                    src={product.image}
                    alt={product.name}
                     className="w-16 h-16 object-contain bg-white p-2 rounded-lg shadow-md"
                  />
                </td>

                <td className="p-3 border text-center">
                  <input
                    type="checkbox"
                    checked={product.available}
                    onChange={(e) =>
                      handleUpdateProduct(product.id, "available", e.target.checked)
                    }
                  />
                </td>

                <td className="p-3 border">
                  <select
                    value={product.artisanId || ""}
                    onChange={(e) =>
                      handleUpdateProduct(product.id, "artisanId", e.target.value)
                    }
                    className="p-2 border w-full rounded-md"
                  >
                    <option value="">Aucun</option>
                    {artisans.map((artisan) => (
                      <option key={artisan.id} value={artisan.id}>
                        {artisan.name}
                      </option>
                    ))}
                  </select>
                </td>

               {/* ✅ Correction : Affichage de la couleur */}
      <td className="p-3 border">
        <input
          type="text"
          value={product.color || ""}
          onChange={(e) => handleUpdateProduct(product.id, "color", e.target.value)}
          className="p-2 border w-full rounded-md bg-gray-100"
        />
      </td>

      {/* ✅ Correction : Affichage du matériau */}
      <td className="p-3 border">
        <input
          type="text"
          value={product.material || ""}
          onChange={(e) => handleUpdateProduct(product.id, "material", e.target.value)}
          className="p-2 border w-full rounded-md bg-gray-100"
        />
      </td>

      {/* ✅ Correction : Sélection dynamique des pays */}
      <td className="p-3 border">
  <select
    multiple
    value={product.countries ? product.countries.map(c => c.id.toString()) : []} 
    onChange={(e) => {
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
      console.log("🌍 Pays sélectionnés :", selectedOptions);
      handleUpdateProduct(product.id, "countries", selectedOptions);
    }}
    className="p-2 border w-full rounded-md bg-gray-100"
  >
    {countries.map((country) => (
      <option key={country.id} value={country.id.toString()}>
        {country.name}
      </option>
    ))}
  </select>
</td>
      {/* ✅ Correction : Boutons Modifier & Supprimer dans la colonne Actions */}
      <td className="p-3 border">
  <div className="flex items-center space-x-2">
   
    <button
      onClick={() => deleteProduct(product.id)}
      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all"
    >
      Supprimer
    </button>
  </div>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
