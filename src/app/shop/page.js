"use client";
import Header from '@/components/header';
import Footer from '@/components/footer';
import Banner from '@/components/banner';
import ProductsSection from '@/components/productssection';
import { useState } from 'react';

export default function Shop() {
    console.log("Page À propos chargée");
  const [price, setPrice] = useState(500);
  const [color, setColor] = useState('');
  const [material, setMaterial] = useState('');

  return (
    <div>
      <Header />
      
      <main className="container mx-auto ">
       

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
                onChange={(e) => setPrice(e.target.value)}
                className="w-full"
              />
              <p className="text-sm text-gray-500">Jusqu'à {price}€</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Couleur</label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
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
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Tous les matériaux</option>
                <option value="Coton">Coton</option>
                <option value="Lin">Lin</option>
                <option value="Soie">Soie</option>
              </select>
            </div>
          </div>
        </div>

        <ProductsSection price={price} color={color} material={material} />
      </main>
      
      <Footer />
    </div>
  );
}
