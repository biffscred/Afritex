"use client";
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductsSection from '@/components/productssection';
import { useState, useEffect } from 'react';
import { useMemo } from "react";

export default function Shop() {
  const [filters, setFilters] = useState({
    price: '',
    color: '',
    material: '',
    country: '',
    category: '',
    artisan: '',
  });

  const resetFilters = () => {
    setFilters({
      price: '',
      color: '',
      material: '',
      country: '',
      category: '',
      artisan: '',
    });
  };
  const updateFilter = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };
  const [countries, setCountries] = useState([]); 
  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch("/api/countries"); // Appel API Next.js
        const data = await response.json();
        if (Array.isArray(data)) {
          setCountries(data); // Stocker les pays dans l’état
        }
      } catch (error) {
        console.error("❌ Erreur lors du chargement des pays :", error);
      }
    }

    fetchCountries(); // Exécuter la fonction au chargement de la page
  }, []);
  // UseEffect pour suivre les changements d'état
  useEffect(() => {
    console.log("Filtres appliqués :", filters);
  }, [filters]);

  return (
    <div>
      <Header />
      
      <main className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-yellow-800 my-8">Boutique</h1>

        {/* Bloc des filtres */}
        <div className="bg-white p-6 mb-12 shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-yellow-600 mb-4">Filtrer les Produits</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Prix Maximum */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Prix maximum (€)</label>
              <input
                type="range"
                min="0"
                max="500"
                value={filters.price}
                onChange={(e) => updateFilter('price', parseInt(e.target.value, 10))}
                className="w-full"
              />
              <p className="text-sm text-gray-500">Jusqu'à {filters.price}€</p>
            </div>

            {/* Couleur */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Couleur</label>
              <select
                value={filters.color}
                onChange={(e) => updateFilter('color', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Toutes les couleurs</option>
                <option value="Rouge">Rouge</option>
                <option value="Bleu">Bleu</option>
                <option value="Vert">Vert</option>
              </select>
            </div>

            {/* Matériau */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Matériau</label>
              <select
                value={filters.material}
                onChange={(e) => updateFilter('material', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Tous les matériaux</option>
                <option value="Coton">Coton</option>
                <option value="Lin">Lin</option>
                <option value="Soie">Soie</option>
              </select>
            </div>

            {/* Pays d'Origine */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Pays d'Origine</label>
              <select
                value={filters.country}
                onChange={(e) => updateFilter('country', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Tous les pays</option>
                {countries.length === 0 ? (
                  <option disabled>Chargement...</option>
                ) : (
                  countries.map((country) => (
                    <option key={country.id} value={country.name}>
                      {country.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Catégorie */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Catégorie</label>
              <select
                value={filters.category}
                onChange={(e) => updateFilter('category', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Toutes les catégories</option>
                <option value="FABRIC">Tissus</option>
                <option value="MODEL">Modèles</option>
                <option value="ACCESSORY">Accessoires</option>
              </select>
            </div>

            {/* Artisan */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Artisan</label>
              <input
                type="text"
                value={filters.artisan}
                onChange={(e) => updateFilter('artisan', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Nom de l'artisan"
              />
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="mt-4 flex flex-wrap gap-4">
            <button
              onClick={resetFilters}
              className="p-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Réinitialiser les filtres
            </button>
          </div>
        </div>

        {/* Affichage des produits filtrés */}
        <ProductsSection filters={filters} />
      </main>

      
      <Footer />
    </div>
  );
}