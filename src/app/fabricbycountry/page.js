"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import MapChart from "@/components/mapchart";
import Header from "@/components/header";
import Footer from "@/components/footer";



export default function AfricanFabricsPage() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch("/api/countries");
        if (!response.ok) {
          throw new Error("Impossible de charger la liste des pays.");
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
    <Header />

    <main className="flex-grow container mx-auto py-8 px-4">
      {/* Titre et sous-titre */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-green-900 mb-6">
        Les Tissus d'Afrique
      </h1>
      <p className="text-center text-base sm:text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
        Découvrez les tissus traditionnels de chaque pays africain et plongez dans leur histoire culturelle.
      </p>

      {/* Carte interactive */}
      <div className="w-full flex justify-center overflow-hidden mb-8">
        <div className="w-full max-w-4xl">
          <MapChart onCountrySelect={(country) => setSelectedCountry(country)} />
        </div>
      </div>

      {/* Messages de chargement ou erreur */}
      {loading && (
        <p className="text-center text-yellow-800 font-semibold py-4 animate-pulse">
          Chargement des pays...
        </p>
      )}
      {error && (
        <p className="text-center text-red-500 font-semibold py-4">
          Erreur: {error}
        </p>
      )}

      {/* Modale d'affichage des tissus */}
      {selectedCountry && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 p-4 z-50 backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md sm:max-w-lg w-full text-center relative transform transition duration-300 scale-100 hover:scale-105">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-900">
              {selectedCountry.name}
            </h2>
            <h3 className="text-lg sm:text-xl font-semibold text-green-700 mt-2">
              {selectedCountry.fabric.name}
            </h3>
            <p className="text-gray-800 mt-4 leading-relaxed text-sm sm:text-base">
              {selectedCountry.fabric.description}
            </p>
            <Image
              src={selectedCountry.fabric.image}
              alt={selectedCountry.fabric.name}
              width={500}
              height={300}
              className="mt-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
            />
            <button
              onClick={() => setSelectedCountry(null)}
              className="mt-6 bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800 transition shadow-md hover:shadow-lg"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </main>

    <Footer />
  </div>
);
}