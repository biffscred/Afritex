"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminDashboardUsers() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "USER" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Vérifier si l'utilisateur est admin
  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "ADMIN") {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  // Récupérer les utilisateurs
  useEffect(() => {
    if (session?.user.role === "ADMIN") {
      fetchUsers();
    }
  }, [session]);

  async function fetchUsers() {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      setError("Erreur lors de la récupération des utilisateurs.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/users/${editId}` : "/api/users";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        fetchUsers();
        resetForm();
        setSuccess(editId ? "Utilisateur modifié avec succès !" : "Utilisateur ajouté avec succès !");
        setError(null); // Réinitialise l'erreur en cas de succès
      } else {
        const message = await res.json();
        setError(message.message || "Une erreur est survenue.");
      }
    } catch (error) {
      setError("Erreur de réseau, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm({ name: "", email: "", role: "USER" });
    setEditId(null);
  }

  function handleEdit(user) {
    setForm(user);
    setEditId(user.id);
  }

  async function handleDelete(id) {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchUsers();
        setSuccess("Utilisateur supprimé avec succès !");
        setError(null);
      } else {
        const message = await res.json();
        setError(message.message || "Erreur lors de la suppression.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      setError("Erreur lors de la suppression.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8">Gestion des Utilisateurs</h1>

      {/* Bouton de retour à l'accueil Admin */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/admin")}
          className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition-all duration-300"
        >
          Retour à l'accueil Admin
        </button>
      </div>

      {/* Formulaire d'ajout/modification */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Nom"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="p-2 border border-gray-400 rounded mb-4"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="p-2 border border-gray-400 rounded mb-4"
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          required
          className="p-2 border border-gray-400 rounded mb-4"
        >
          <option value="USER">Utilisateur</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 text-white py-2 px-4 rounded ${loading ? 'opacity-50' : ''}`}
        >
          {loading ? "Chargement..." : editId ? "Modifier" : "Ajouter"} Utilisateur
        </button>
      </form>

      {/* Liste des utilisateurs */}
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id} className="mb-4">
              <p>{user.name} ({user.email}) - {user.role}</p>
              <button
                onClick={() => handleEdit(user)}
                className="bg-yellow-500 text-white py-1 px-3 rounded mr-2"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white py-1 px-3 rounded"
                disabled={loading}
              >
                Supprimer
              </button>
            </li>
          ))
        ) : (
          <p>Aucun utilisateur trouvé.</p>
        )}
      </ul>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
}
