"use client";
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductsSection from '@/components/productssection';
import { useState, useEffect } from 'react';

export default function Shop() {
  const [price, setPrice] = useState(500);
  const [color, setColor] = useState('');
  const [material, setMaterial] = useState('');
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('');
  const [artisan, setArtisan] = useState('');

  // UseEffect pour suivre les changements d'état
  useEffect(() => {
    console.log("Prix :", price);
    console.log("Couleur :", color);
    console.log("Matériau :", material);
    console.log("Pays :", country);
    console.log("Catégorie :", category);
    console.log("Artisan :", artisan);
  }, [price, color, material, country, category, artisan]);

  return (
    <div>
      <Header />
      
      <main className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-yellow-800 my-8">Boutique</h1>

        <div className="bg-white p-6 mb-12 shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-yellow-600 mb-4">Filtrer les Produits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Prix Maximum</label>
              <input
                type="range"
                min="0"
                max="500"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value,10);
                  console.log("Changement du prix :", e.target.value);
                }}
                className="w-full"
              />
              <p className="text-sm text-gray-500">Jusqu'à {price}€</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Couleur</label>
              <select
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                  console.log("Changement de couleur :", e.target.value);
                }}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Toutes les couleurs</option>
                <option value="Rouge">Rouge</option>
                <option value="Bleu">Bleu</option>
                <option value="Vert">Vert</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Matériau</label>
              <select
                value={material}
                onChange={(e) => {
                  setMaterial(e.target.value);
                  console.log("Changement du matériau :", e.target.value);
                }}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Tous les matériaux</option>
                <option value="Coton">Coton</option>
                <option value="Lin">Lin</option>
                <option value="Soie">Soie</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pays d'Origine</label>
              <select
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  console.log("Changement de pays :", e.target.value);
                }}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Tous les pays</option>
                <option value="Sénégal">Sénégal</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Kenya">Kenya</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Catégorie</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  console.log("Changement de catégorie :", e.target.value);
                }}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Toutes les catégories</option>
                <option value="FABRIC">Tissus</option>
                <option value="MODEL">Modèles</option>
                <option value="ACCESSORY">Accessoires</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Artisan</label>
              <input
                type="text"
                value={artisan}
                onChange={(e) => {
                  setArtisan(e.target.value);
                  console.log("Changement de l'artisan :", e.target.value);
                }}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Nom de l'artisan"
              />
            </div>
          </div>
        </div>

        <ProductsSection
          price={price}
          color={color}
          material={material}
          country={country}
          category={category}
          artisan={artisan}
        />
        {/* Ajout d'un console.log ici pour voir les props passées à ProductsSection */}
        {console.log("Props passés à ProductsSection:", { price, color, material, country, category, artisan })}
      </main>
      
      <Footer />
    </div>
  );
}
