"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { 
  X, Image as ImageIcon, FolderOpen, Search, 
  ChevronRight, Check, Edit2, Trash2, User, Maximize 
} from "lucide-react"; 
import "react-toastify/dist/ReactToastify.css";

export default function AdminDashboardProduct() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // --- ÉTATS RÉFÉRENTIELS ---
  const [products, setProducts] = useState([]);
  const [artisans, setArtisans] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]); // Pour usage futur

  // --- ÉTATS MÉDIATHÈQUE ---
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [availableImages, setAvailableImages] = useState([]); 
  const [mediaFolders, setMediaFolders] = useState([]);
  const [currentPath, setCurrentPath] = useState("");
  const [mediaSearch, setMediaSearch] = useState("");
  const [targetGalleryIndex, setTargetGalleryIndex] = useState(null); 
  const [selectedTemp, setSelectedTemp] = useState([]); 

  // --- ÉTATS CATALOGUE & ÉDITION ---
  const [showAddForm, setShowAddForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const initialProductState = {
    name: "", description: "", price: "", category: "",
    image: "", imagesGallery: ["", "", "", ""],
    stock: 0, artisanId: "", material: "",
    sizes: [], colors: [], specialties: [],
    width: "", pattern: ""
  };

  const [newProduct, setNewProduct] = useState(initialProductState);

  // --- NAVIGATION MÉDIATHÈQUE ---

  const navigateToFolder = async (folderPath) => {
    try {
      setCurrentPath(folderPath);
      setMediaSearch("");
      const res = await fetch(`/api/media?folder=${encodeURIComponent(folderPath)}`);
      const data = await res.json();
      setMediaFolders(data.folders || []);
      setAvailableImages(data.images || []);
      setSelectedTemp([]); 
    } catch (err) {
      toast.error("Erreur de navigation");
    }
  };
// Fonction pour sauvegarder instantanément quand tu finis de taper dans le tableau
const handleQuickUpdate = async (productId, data) => {
  try {
    const res = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.details || "Erreur lors de la mise à jour");
    }

    toast.success("Enregistré !");
    fetchProducts(); // On rafraîchit le tableau pour voir le nom s'afficher
  } catch (err) {
    console.error("❌ Erreur QuickUpdate :", err);
    toast.error("Erreur de sauvegarde rapide");
  }
};
  const handleMediaSearch = async (val) => {
    setMediaSearch(val);
    if (!val) return navigateToFolder(currentPath);
    try {
      const res = await fetch(`/api/media?search=${encodeURIComponent(val)}`);
      const data = await res.json();
      setAvailableImages(data.images || []);
      setMediaFolders([]);
    } catch (err) { console.error(err); }
  };

  const openMediaLibrary = (index = null) => {
    setTargetGalleryIndex(index);
    setSelectedTemp([]); 
    navigateToFolder(""); 
    setShowMediaModal(true);
  };

  const toggleImageSelection = (url) => {
    if (targetGalleryIndex === null) {
      setNewProduct({ ...newProduct, image: url });
      setShowMediaModal(false);
    } else {
      setSelectedTemp(prev => 
        prev.includes(url) ? prev.filter(item => item !== url) : [...prev, url]
      );
    }
  };

  const confirmGallerySelection = () => {
    const updatedGallery = [...newProduct.imagesGallery];
    let selectionIdx = 0;
    for (let i = targetGalleryIndex; i < updatedGallery.length; i++) {
      if (selectionIdx < selectedTemp.length) {
        updatedGallery[i] = selectedTemp[selectionIdx];
        selectionIdx++;
      }
    }
    setNewProduct({ ...newProduct, imagesGallery: updatedGallery });
    setSelectedTemp([]);
    setShowMediaModal(false);
  };

  // --- LOGIQUE CRUD ---

  const handleEditClick = (product) => {
    setIsEditing(true);
    setShowAddForm(true);
  
    // On prépare un tableau de 4 cases vides
    let gallery = ["", "", "", ""];
  
    // Si le produit a des images en base de données, on remplit nos cases
    if (product.productImages && product.productImages.length > 0) {
      product.productImages.forEach((img, index) => {
        if (index < 4) gallery[index] = img.url;
      });
    }
  
    // On remplit le formulaire avec les données du produit
    setNewProduct({
      ...product,
      id: product.id,
      price: product.price.toString(),
      // TRÈS IMPORTANT : On transforme les objets Prisma en tableau d'URLs
      imagesGallery: gallery,
      // On récupère aussi les IDs des tailles pour les boutons
      sizes: product.sizes?.map(s => s.id) || [],
      artisanId: product.artisanId || ""
    });
  };
  const handleDelete = async (id) => {
    if (!confirm("Voulez-vous vraiment supprimer ce produit ?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Produit supprimé");
        fetchProducts();
      }
    } catch (err) { toast.error("Erreur suppression"); }
  };

  async function handleSubmit() {
    const method = isEditing ? "PUT" : "POST";
    
    // 💡 Changement ici : on utilise newProduct.id au lieu de editId
    const url = isEditing ? `/api/products/${newProduct.id}` : "/api/products";

    // Sécurité : si on édite mais qu'on n'a pas d'ID, on arrête tout
    if (isEditing && !newProduct.id) {
        toast.error("❌ Erreur : ID du produit introuvable");
        return;
    }

    try {
      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price) || 0,
        stock: parseInt(newProduct.stock) || 0,
        artisanId: newProduct.artisanId ? parseInt(newProduct.artisanId) : null,
        // On nettoie la galerie pour n'envoyer que les vraies URLs
        imagesGallery: newProduct.imagesGallery.filter(imgUrl => imgUrl && imgUrl.trim() !== ""),
        sizes: newProduct.sizes 
      };

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.details || "Erreur serveur");
      }

      toast.success(isEditing ? "✅ Mis à jour !" : "✨ Ajouté !");
      setShowAddForm(false);
      setIsEditing(false);
      setNewProduct(initialProductState);
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "❌ Erreur d'enregistrement");
    }
}

  // --- CHARGEMENTS ---

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "ADMIN") {
      router.push("/auth/login");
    } else {
      fetchInitialData();
      fetchProducts();
    }
  }, [session, status]);

  async function fetchInitialData() {
    const fetchJson = (url) => fetch(url).then(res => res.json());
    try {
      const [art, siz] = await Promise.all([
        fetchJson("/api/artisans"), fetchJson("/api/sizes")
      ]);
      setArtisans(art); setSizes(siz);
    } catch (err) { console.error("Erreur chargement référentiels"); }
  }

  async function fetchProducts() {
    const res = await fetch(`/api/products?search=${searchTerm}`);
    const data = await res.json();
    setProducts(data.products || []);
  }

  useEffect(() => { fetchProducts(); }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <ToastContainer position="bottom-right" />

      {/* MODALE MÉDIATHÈQUE */}
      {showMediaModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[1000] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 border-b bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col">
                <h3 className="font-black text-red-900 uppercase text-sm flex items-center gap-2"><FolderOpen size={18} /> Explorateur</h3>
                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase mt-1">
                  <span className="cursor-pointer hover:text-red-900" onClick={() => navigateToFolder("")}>Racine</span>
                  {currentPath.split("/").map((p, i, arr) => p && (
                    <span key={i} className="flex items-center gap-1">
                      <ChevronRight size={10} /> 
                      <span className="cursor-pointer hover:text-red-900" onClick={() => navigateToFolder(arr.slice(0, i + 1).join("/"))}>{p}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input type="text" placeholder="Rechercher..." className="w-full pl-10 pr-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-red-900" value={mediaSearch} onChange={(e) => handleMediaSearch(e.target.value)} />
              </div>
              <button onClick={() => setShowMediaModal(false)} className="p-2 hover:bg-gray-200 rounded-full"><X /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6">
                {mediaFolders.map((f) => (
                  <div key={f.path} onClick={() => navigateToFolder(f.path)} className="flex flex-col items-center p-4 rounded-2xl hover:bg-yellow-50 cursor-pointer border border-transparent hover:border-yellow-200 transition-all">
                    <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600 shadow-sm"><FolderOpen size={32} fill="currentColor" /></div>
                    <span className="text-[10px] font-black mt-3 text-center uppercase text-gray-600 line-clamp-2">{f.name}</span>
                  </div>
                ))}
                {availableImages.map((img) => (
                  <div key={img.url} onClick={() => toggleImageSelection(img.url)} className={`flex flex-col items-center p-2 rounded-2xl cursor-pointer border-2 transition-all ${selectedTemp.includes(img.url) ? 'border-red-900 bg-red-50' : 'border-transparent hover:bg-red-50'}`}>
                    <div className="w-full aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm relative">
                      <img src={img.url} className="w-full h-full object-cover" />
                      {selectedTemp.includes(img.url) && <div className="absolute top-1 right-1 bg-red-900 text-white rounded-full p-1"><Check size={12} /></div>}
                    </div>
                    <span className="text-[9px] font-bold mt-2 text-center truncate w-full text-gray-400">{img.name}</span>
                  </div>
                ))}
              </div>
            </div>
            {targetGalleryIndex !== null && selectedTemp.length > 0 && (
              <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-500"><span className="text-red-900">{selectedTemp.length}</span> sélectionnées</span>
                <button onClick={confirmGallerySelection} className="bg-red-900 text-white px-8 py-2 rounded-full font-black uppercase text-xs">Valider la sélection</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-black text-red-900 uppercase tracking-tighter">Afritex Admin</h1>
        <button 
          onClick={() => { setShowAddForm(!showAddForm); if(isEditing) {setIsEditing(false); setNewProduct(initialProductState);} }} 
          className="px-8 py-3 bg-red-900 text-white font-bold rounded-xl shadow-lg hover:bg-black transition-all"
        >
          {showAddForm ? "✖ Fermer" : "➕ Nouveau Produit"}
        </button>
      </div>

      {/* FORMULAIRE */}
      {showAddForm && (
        <div className="bg-white p-8 rounded-3xl shadow-xl mb-12 border-t-8 border-yellow-600">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Colonne Images */}
            <div className="space-y-6">
              <div>
                <label className="text-xs font-black uppercase text-gray-400 block mb-2">Image Principale</label>
                <div onClick={() => openMediaLibrary(null)} className="aspect-video bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer hover:border-yellow-600 transition-colors">
                  {newProduct.image ? <img src={newProduct.image} className="w-full h-full object-cover" /> : <ImageIcon className="text-gray-300" size={40} />}
                </div>
              </div>
              <div>
                <label className="text-xs font-black uppercase text-gray-400 block mb-2">Galerie Photos</label>
                <div className="grid grid-cols-4 gap-2">
                  {newProduct.imagesGallery.map((url, idx) => (
                    <div key={idx} className="relative aspect-square bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden group">
                      {url ? (
                        <><img src={url} className="w-full h-full object-cover" /><button onClick={() => { const g = [...newProduct.imagesGallery]; g[idx] = ""; setNewProduct({...newProduct, imagesGallery: g}); }} className="absolute top-1 right-1 bg-red-500 text-white p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition"><X size={10}/></button></>
                      ) : (
                        <button onClick={() => openMediaLibrary(idx)} className="w-full h-full flex items-center justify-center text-gray-300">+</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Colonne Données */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="Nom" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="p-4 bg-gray-50 border-none rounded-2xl font-bold outline-none" />
              <input type="number" placeholder="Prix" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="p-4 bg-gray-50 border-none rounded-2xl font-bold outline-none" />
              
              <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="p-4 bg-gray-50 border-none rounded-2xl font-bold outline-none">
                <option value="">Catégorie...</option>
                <option value="FABRIC">Tissu</option><option value="MODEL">Modèle</option><option value="ACCESSORY">Accessoire</option>
              </select>

              <select value={newProduct.artisanId} onChange={e => setNewProduct({...newProduct, artisanId: e.target.value})} className="p-4 bg-gray-50 border-none rounded-2xl font-bold outline-none">
                <option value="">Artisan...</option>
                {artisans.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>

              <div className="col-span-full">
                <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block">Tailles Disponibles</label>
                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-2xl">
                  {sizes.map(s => {
                    const isSelected = newProduct.sizes.includes(s.id);
                    return (
                      <button key={s.id} onClick={() => {
                        const current = [...newProduct.sizes];
                        setNewProduct({...newProduct, sizes: isSelected ? current.filter(id => id !== s.id) : [...current, s.id]});
                      }} className={`px-4 py-1.5 rounded-xl text-[10px] font-black transition-all ${isSelected ? 'bg-red-900 text-white shadow-md' : 'bg-white text-gray-400 border border-gray-200'}`}>
                        {s.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <textarea placeholder="Description..." value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="col-span-full p-4 bg-gray-50 border-none rounded-2xl h-32 outline-none" />
              
              <button onClick={handleSubmit} className="col-span-full py-5 bg-red-900 text-white font-black text-xl rounded-2xl shadow-xl uppercase transition-transform active:scale-95">
                {isEditing ? "Mettre à jour" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TABLEAU */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-widest">
            <tr>
              <th className="p-6">Produit</th>
              <th className="p-6">Artisan</th>
              <th className="p-6">Tailles</th>
              <th className="p-6">Stock</th>
              <th className="p-6">Prix</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                <td className="p-6 flex items-center gap-4">
                  <img src={p.image} className="w-14 h-14 object-cover rounded-xl shadow-sm" />
                  <div>
                    <div className="font-black text-gray-900">{p.name}</div>
                    <div className="text-[10px] text-yellow-700 font-bold uppercase">{p.category}</div>
                  </div>
                </td>
                <td className="p-6">
  <div className="flex items-center gap-2">
    <User size={12} className="text-gray-400" />
    <input 
      type="text"
      placeholder="Nom de l'artisan..."
      // Ici, on imagine une fonction qui sauvegarde dès que tu changes le texte
      defaultValue={p.artisan?.name || ""}
      onBlur={(e) => handleQuickUpdate(p.id, { artisanName: e.target.value })}
      className="bg-transparent border-b border-transparent hover:border-gray-300 focus:border-red-900 outline-none text-xs font-bold text-gray-600 w-full"
    />
  </div>
</td>
<td className="p-6">
  <div className="flex flex-wrap gap-1 max-w-[150px]">
    {/* Affichage des tailles actuelles */}
    {p.sizes?.map(s => (
      <span key={s.id} className="px-2 py-0.5 bg-gray-200 text-[9px] font-black rounded-md uppercase">
        {s.name}
      </span>
    ))}
    
    {/* Petit bouton pour ouvrir la sélection si c'est vide */}
    {p.sizes?.length === 0 && (
      <button 
        onClick={() => handleEditClick(p)} // Ouvre le formulaire pour choisir
        className="text-[9px] text-blue-500 font-bold hover:underline"
      >
        + Ajouter tailles
      </button>
    )}
  </div>
</td>
<td className="p-6">
  <div className="flex items-center gap-2">
    <input 
      type="number"
      defaultValue={p.stock}
      // On appelle la fonction de sauvegarde dès que tu changes de case
      onBlur={(e) => handleQuickUpdate(p.id, { stock: parseInt(e.target.value) })}
      className="w-20 bg-gray-50 border border-transparent hover:border-gray-300 focus:border-red-900 rounded px-2 py-1 text-xs font-bold text-gray-700 outline-none transition-all"
    />
    <span className="text-[10px] text-gray-400">unités</span>
  </div>
</td>
                <td className="p-6 font-black text-red-900">{p.price} €</td>
                <td className="p-6 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleEditClick(p)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={16}/></button>
                    <button onClick={() => handleDelete(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16}/></button>
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