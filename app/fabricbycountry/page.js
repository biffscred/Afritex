"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import MapChart from "../../components/mapchart.js";

import Header from "../../components/header";
import Footer from "../../components/footer";

export default function AfricanFabricsPage() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <div className="flex flex-col min-h-screen">
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
            <MapChart 
              onCountrySelect={(country) => {
                console.log("🎯 Pays sélectionné depuis MapChart :", country);
                setSelectedCountry(country);
              }} 
            />
          </div>
        </div>

        {/* Modale d'affichage des tissus */}
        {selectedCountry && (
          <>
            {console.log("📌 Données du pays sélectionné :", selectedCountry)}
            {console.log("👕 Données du tissu :", selectedCountry.fabric)}

            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 p-4 z-50 backdrop-blur-md">
              <div className="bg-white p-6 rounded-lg shadow-xl max-w-md sm:max-w-lg w-full text-center relative transform transition duration-300 scale-100 hover:scale-105">
                <h2 className="text-2xl sm:text-3xl font-bold text-green-900">
                  {selectedCountry.name}
                </h2>

                {/* Affichage du drapeau si disponible */}
                {selectedCountry.flag && (
                  <Image
                    src={selectedCountry.flag}
                    alt={`Drapeau de ${selectedCountry.name}`}
                    width={80}
                    height={50}
                    className="mt-2 mx-auto shadow-md"
                  />
                )}

                {/* Vérification si des tissus existent */}
                {selectedCountry.fabric ? (
                  <div className="mt-4">
                    {/* Si fabric est un tableau, on affiche tous les tissus */}
                    {Array.isArray(selectedCountry.fabric) ? (
                      selectedCountry.fabric.map((f, idx) => (
                        <div key={idx} className="mb-6">
                          <h3 className="text-lg sm:text-xl font-semibold text-green-700">
                            {f.name}
                          </h3>
                          <p className="text-gray-800 mt-2 leading-relaxed">
                            {f.description}
                          </p>
                          {f.image && (
                            <Image
                              src={f.image}
                              alt={f.name}
                              width={300}
                              height={200}
                              className="mt-4 rounded-lg shadow-lg mx-auto"
                            />
                          )}
                        </div>
                      ))
                    ) : (
                      // Si fabric est un seul objet, on l'affiche directement
                      <>
                        <h3 className="text-lg sm:text-xl font-semibold text-green-700">
                          {selectedCountry.fabric.name}
                        </h3>
                        <p className="text-gray-800 mt-2 leading-relaxed">
                          {selectedCountry.fabric.description}
                        </p>
                        {selectedCountry.fabric.image && (
                          <Image
                            src={selectedCountry.fabric.image}
                            alt={selectedCountry.fabric.name}
                            width={300}
                            height={200}
                            className="mt-4 rounded-lg shadow-lg mx-auto"
                          />
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 italic mt-4">
                    Aucun tissu renseigné pour ce pays.
                  </p>
                )}

                <button
                  onClick={() => {
                    console.log("❌ Fermeture de la modale");
                    setSelectedCountry(null);
                  }}
                  className="mt-6 bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800 transition shadow-md hover:shadow-lg"
                >
                  Fermer
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
