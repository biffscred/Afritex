"use client";

import { useState, useEffect } from "react";

export default function ProductFilters({ onFilter }) {
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");

  useEffect(() => {
    onFilter({ category, country, priceMin, priceMax, color, material });
  }, [category, country, priceMin, priceMax, color, material]);

  return (
    <div className="mb-6 p-4 bg-white rounded-xl shadow flex flex-wrap gap-4">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded w-48"
      >
        <option value="">Toutes les catégories</option>
        <option value="FABRIC">Tissus</option>
        <option value="MODEL">Modèles</option>
        <option value="ACCESSORY">Accessoires</option>
      </select>

      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="border p-2 rounded w-48"
      >
        <option value="">Tous les pays</option>
        <option value="Mali">Mali</option>
        <option value="Sénégal">Sénégal</option>
        <option value="Côte d'Ivoire">Côte d'Ivoire</option>
        <option value="Nigéria">Nigéria</option>
        <option value="Afrique du Sud">Afrique du Sud</option>
      </select>

      <input
        type="number"
        placeholder="Prix min"
        value={priceMin}
        onChange={(e) => setPriceMin(e.target.value)}
        className="border p-2 rounded w-32"
      />

      <input
        type="number"
        placeholder="Prix max"
        value={priceMax}
        onChange={(e) => setPriceMax(e.target.value)}
        className="border p-2 rounded w-32"
      />

      <input
        type="text"
        placeholder="Couleur"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="border p-2 rounded w-40"
      />

      <input
        type="text"
        placeholder="Matière"
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
        className="border p-2 rounded w-40"
      />
    </div>
  );
} 
