"use client";

import { useEffect, useState } from "react";

export default function ProductFilters({ onFilter }) {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [color, setColor] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [weightMin, setWeightMin] = useState("");
  const [weightMax, setWeightMax] = useState("");
  const [material, setMaterial] = useState("");

  const [colors, setColors] = useState([]);
  const [countries, setCountries] = useState([]);
  const categories = ["FABRIC", "MODEL", "ACCESSORY"];

  useEffect(() => {
    fetch("/api/colors").then(res => res.json()).then(setColors);
    fetch("/api/countries").then(res => res.json()).then(setCountries);
  }, []);

  useEffect(() => {
    onFilter({
      searchText,
      category,
      country,
      color,
      priceMin,
      priceMax,
      weightMin,
      weightMax,
      material,
    });
  }, [searchText, category, country, color, priceMin, priceMax, weightMin, weightMax, material]);
  console.log("Contenu de colors:", colors);
  return (
    <div className="mb-6 p-4 bg-white rounded-xl shadow flex flex-wrap gap-4 items-end">
      {/* 🔍 Recherche */}
      <input
        type="text"
        placeholder="Rechercher…"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="border p-2 rounded w-64"
      />

      {/* 📁 Catégorie */}
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded w-40">
        <option value="">Catégorie</option>
        {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
      </select>

      {/* 🌍 Pays */}
      <select value={country} onChange={(e) => setCountry(e.target.value)} className="border p-2 rounded w-40">
        <option value="">Pays</option>
        {countries.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
      </select>

      {/* 🎨 Couleur */}
      <select value={color} onChange={(e) => setColor(e.target.value)} className="border p-2 rounded w-40">
        <option value="">Couleur</option>
        {colors.map((c, i) => <option key={i} value={c}>{c}</option>)}
      </select>

      {/* ⚖️ Matière */}
      <input
        type="text"
        placeholder="Matière"
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
        className="border p-2 rounded w-36"
      />

      {/* 💰 Prix */}
      <input
        type="number"
        placeholder="Prix min"
        value={priceMin}
        onChange={(e) => setPriceMin(e.target.value)}
        className="border p-2 rounded w-24"
      />
      <input
        type="number"
        placeholder="Prix max"
        value={priceMax}
        onChange={(e) => setPriceMax(e.target.value)}
        className="border p-2 rounded w-24"
      />

      {/* ⚖️ Poids */}
      <input
        type="number"
        placeholder="Poids min"
        value={weightMin}
        onChange={(e) => setWeightMin(e.target.value)}
        className="border p-2 rounded w-24"
      />
      <input
        type="number"
        placeholder="Poids max"
        value={weightMax}
        onChange={(e) => setWeightMax(e.target.value)}
        className="border p-2 rounded w-24"
      />
    </div>
  );
}
