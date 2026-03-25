"use client";
import { useEffect, useState } from "react";
import { Search, Sparkles, ChevronDown } from "lucide-react";

export default function ProductFilters({ onFilter }) {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const [colors, setColors] = useState([]);
  const [countries, setCountries] = useState([]);

  // Ces termes correspondent exactement à tes dossiers et noms SQL
  const stockHighlights = [
    { label: "Bogolan", term: "bogolan" },
    { label: "Faso Dan Fani", term: "fdf" },
    { label: "Tissu Baoulé", term: "baoule" },
    { label: "Tissus Vintage", term: "vint" },
    { label: "Indigo & Ndomo", term: "ndomo" }
  ];

  useEffect(() => {
    fetch("/api/colors").then(res => res.json()).then(setColors);
    fetch("/api/countries").then(res => res.json()).then(setCountries);
  }, []);

  useEffect(() => {
    onFilter({ searchText, category, country, color, material, priceMin, priceMax });
  }, [searchText, category, country, color, material, priceMin, priceMax]);

  return (
    <div className="w-full bg-white border-b border-gray-100 sticky top-0 z-30 pt-4 pb-6 px-4 md:px-12 flex flex-col gap-8 shadow-sm">
      
      {/* 1. BARRE DE RECHERCHE PRINCIPALE */}
      <div className="w-full max-w-6xl mx-auto flex items-center gap-4">
        <div className="relative flex-1 group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors">
            <Search size={20} />
          </div>
          <input
            type="search"
            placeholder="Rechercher par tissu (Bogolan, Baoulé...), par vêtement ou par pays..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full bg-[#f5f5f5] py-4 pl-12 pr-4 rounded-full outline-none text-base placeholder-gray-400 font-medium focus:bg-white focus:ring-2 focus:ring-gray-100 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* 2. DÉCOUVERTE DU STOCK (Les Pills Éducatives) */}
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-4">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">
          <Sparkles size={12} className="text-amber-500" />
          <span>Nos Spécialités en stock</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {stockHighlights.map((item) => (
            <button
              key={item.term}
              onClick={() => setSearchText(item.term)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${
                searchText.toLowerCase().includes(item.term) 
                ? "bg-black text-white border-black" 
                : "bg-gray-50 text-gray-800 border-transparent hover:border-gray-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. FILTRES DÉTAILLÉS (Dropdowns invisibles style Nike) */}
      <div className="w-full max-w-6xl mx-auto flex flex-wrap gap-x-12 gap-y-4 pt-4 border-t border-gray-50">
        
        {/* Catégories - Traduction des termes techniques */}
        <div className="flex items-center gap-1 group cursor-pointer relative">
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="appearance-none bg-transparent font-bold text-[11px] uppercase tracking-tighter outline-none cursor-pointer pr-4"
          >
            <option value="">Toutes les Catégories</option>
            <option value="FABRIC">Tissus (Matières brutes)</option>
            <option value="MODEL">Modèles (Vêtements finis)</option>
            <option value="ACCESSORY">Accessoires & Déco</option>
          </select>
          <ChevronDown size={14} className="text-gray-400 absolute right-0 pointer-events-none" />
        </div>

        {/* Origine */}
        <div className="flex items-center gap-1 group cursor-pointer relative">
          <select 
            value={country} 
            onChange={(e) => setCountry(e.target.value)}
            className="appearance-none bg-transparent font-bold text-[11px] uppercase tracking-tighter outline-none cursor-pointer pr-4"
          >
            <option value="">Origine</option>
            {countries.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <ChevronDown size={14} className="text-gray-400 absolute right-0 pointer-events-none" />
        </div>

        {/* Budget */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold uppercase tracking-tighter text-gray-400">Prix :</span>
          <input 
            type="number" 
            placeholder="Min" 
            value={priceMin} 
            onChange={(e) => setPriceMin(e.target.value)}
            className="w-16 bg-gray-50 p-1 rounded text-xs outline-none focus:ring-1 focus:ring-black"
          />
          <input 
            type="number" 
            placeholder="Max" 
            value={priceMax} 
            onChange={(e) => setPriceMax(e.target.value)}
            className="w-16 bg-gray-50 p-1 rounded text-xs outline-none focus:ring-1 focus:ring-black"
          />
        </div>
      </div>
    </div>
  );
}