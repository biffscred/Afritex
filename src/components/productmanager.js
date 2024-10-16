import { useState, useEffect } from 'react';

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', image: '' });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  // Récupération des produits
  useEffect(() => {
    fetchProducts();
    fetchImages();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  }

  async function fetchImages() {
    try {
      const res = await fetch('/api/images'); // Endpoint pour récupérer les images du dossier public
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des images :", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/products/${editId}` : '/api/products';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        fetchProducts();
        setForm({ name: '', description: '', price: '', category: '', image: '' });
        setEditId(null);
      } else {
        const { message } = await res.json();
        setError(message || 'Une erreur est survenue.');
      }
    } catch (error) {
      setError("Erreur de réseau, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(product) {
    setForm(product);
    setEditId(product.id);
  }

  async function handleDelete(id) {
    setLoading(true);
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-b from-yellow-100 to-orange-200 p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-900">Gestion des Produits</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit} className="mb-6 grid gap-4 bg-white p-6 rounded-lg shadow-lg border border-orange-300">
        <input 
          type="text" 
          placeholder="Nom (max 50 caractères)" 
          value={form.name} 
          onChange={(e) => setForm({ ...form, name: e.target.value })} 
          maxLength={50} 
          className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-orange-300" 
          required 
        />
        <textarea 
          placeholder="Description (max 200 caractères)" 
          value={form.description} 
          onChange={(e) => setForm({ ...form, description: e.target.value })} 
          maxLength={500} 
          className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-orange-300" 
          required
        ></textarea>
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
          <option value="Fabrics">Tissus</option>
          <option value="Models">Modèles</option>
          <option value="Accessories">Accessoires</option>
        </select>

        <select 
          value={form.image} 
          onChange={(e) => setForm({ ...form, image: e.target.value })} 
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
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Chargement...' : editId ? "Modifier" : "Ajouter"} Produit
        </button>
      </form>
    
      <ul className="space-y-6">
        {products.map((product) => (
          <li 
            key={product.id} 
            className="bg-white p-6 rounded-lg shadow-md border border-yellow-300 flex justify-between items-start space-x-4 transition-transform duration-300 transform hover:scale-105"
          >
            <div>
              <h3 className="text-xl font-semibold text-orange-800">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-green-700 font-bold mt-2">{product.price} €</p>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => handleEdit(product)} 
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300"
              >
                Modifier
              </button>
              <button 
                onClick={() => handleDelete(product.id)} 
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-300"
                disabled={loading}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
