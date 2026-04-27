"use client";

import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import React from "react";

// Assure-toi que ce fichier contient bien les frontières de l'Afrique
const geoUrl = "/data/africa.geojson";

export default function MapChart() {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 });

  // Gestion du responsive
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

// On rend la boîte plus haute (800x900 au lieu de 800x600)
const mapWidth = windowSize.width < 768 ? 400 : 800;
const mapHeight = windowSize.width < 768 ? 500 : 900; // Plus de place en bas !

// On dézoome un peu pour que les bords respirent
const scale = windowSize.width < 768 ? 220 : 400; 

// On centre sur un point qui équilibre le Maroc et l'Afrique du Sud
const center = [18, 5];

  return (
    <div className="relative w-full flex flex-col items-center lg:flex-row lg:items-start p-2">
      
      {/* 🗺️ SECTION CARTE */}
      <div className="w-full lg:w-2/3 flex justify-center bg-gray-50 rounded-3xl shadow-inner border border-gray-100 overflow-hidden">
        <ComposableMap
          width={mapWidth}
          height={mapHeight}
          projection="geoEqualEarth"
          projectionConfig={{ scale, center }}
          className="w-full h-auto max-h-[650px]"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) => {
              // Optionnel : Script de debug pour voir les pays chargés
              // console.log("Pays chargés :", geographies.length);
              console.log("Liste des pays présents dans le fichier :", geographies.map(g => g.properties.name || g.properties.country));
              return geographies.map((geo) => {
                const p = geo.properties;
                // SÉCURITÉ : On cherche le nom sous plusieurs clés possibles
                const countryName = p.country || p.name || p.NAME_FR || p.admin;
                const countryCode = p.code || p.iso_a2;
                const fabrics = Array.isArray(p.fabric) ? p.fabric : [];

                // Liste étendue des "petits" pays pour faciliter le clic
                const isTiny = [
                  "Cape Verde", "Comoros", "Seychelles", "Djibouti", 
                  "Gambia", "Mauritius", "Sao Tome and Principe", "Lesotho", "Eswatini"
                ].includes(countryName);

                const handlers = {
                  onClick: () => setSelectedCountry({ name: countryName, code: countryCode, fabric: fabrics }),
                  onMouseEnter: (e) => {
                    setHoveredCountry({ name: countryName, code: countryCode, fabric: fabrics });
                    setCursorPos({ x: e.clientX, y: e.clientY });
                  },
                  onMouseMove: (e) => setCursorPos({ x: e.clientX, y: e.clientY }),
                  onMouseLeave: () => setHoveredCountry(null),
                };

                return (
                  <React.Fragment key={geo.rsmKey}>
                    <Geography
                      geography={geo}
                      {...handlers}
                      style={{
                        default: { fill: "#F3F4F6", stroke: "#D1D5DB", strokeWidth: 0.5, outline: "none" },
                        hover: { fill: "#F59E0B", cursor: "pointer", outline: "none" }, // Jaune ambre Afritex
                        pressed: { fill: "#B45309", outline: "none" },
                      }}
                    />
                    {/* Zone de clic invisible pour les petits pays */}
                    {isTiny && (
                      <Geography
                        geography={geo}
                        {...handlers}
                        style={{
                          default: { fill: "transparent", stroke: "transparent", strokeWidth: 30, pointerEvents: "all" },
                          hover: { cursor: "pointer" },
                        }}
                      />
                    )}
                  </React.Fragment>
                );
              });
            }}
          </Geographies>
        </ComposableMap>

        {/* 🏷️ TOOLTIP (Survol) */}
        {hoveredCountry && hoveredCountry.fabric.length > 0 && (
          <div
            className="fixed z-50 bg-white/90 backdrop-blur-md text-sm p-3 rounded-2xl shadow-2xl border border-yellow-100 pointer-events-none"
            style={{ left: cursorPos.x + 20, top: cursorPos.y + 20 }}
          >
            <div className="font-bold text-yellow-900 flex items-center gap-2 mb-1">
              <img 
                src={`https://flagcdn.com/w40/${hoveredCountry.code?.toLowerCase()}.png`} 
                alt="" className="w-5 h-auto rounded-sm"
                onError={(e) => (e.target.style.display = "none")}
              />
              {hoveredCountry.name}
            </div>
            <p className="text-xs text-gray-500 italic">Cliquez pour voir les tissus</p>
          </div>
        )}
      </div>

      {/* 📘 FICHE LATÉRALE (Sélection) */}
      <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8">
        {selectedCountry ? (
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-yellow-50 animate-in fade-in slide-in-from-right-4 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img
                  src={`https://flagcdn.com/w80/${selectedCountry.code?.toLowerCase()}.png`}
                  alt="" className="w-10 h-auto rounded shadow-sm"
                />
                <h2 className="text-2xl font-black text-yellow-900 uppercase tracking-tighter">
                  {selectedCountry.name}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedCountry(null)} 
                className="p-2 hover:bg-gray-100 rounded-full transition text-gray-400"
              >
                ✕
              </button>
            </div>

            {selectedCountry.fabric.length > 0 ? (
              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {selectedCountry.fabric.map((tissu, idx) => (
                  <div key={idx} className="group border-b border-gray-100 pb-6 last:border-0">
                    <div className="relative h-48 w-full mb-4 rounded-2xl overflow-hidden shadow-sm">
                      <img
                        src={tissu.image || "/images/placeholder.jpg"}
                        alt={tissu.name}
                        className="w-full h-full object-cover transition transform group-hover:scale-105"
                        onError={(e) => (e.target.src = "/images/placeholder.jpg")}
                      />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{tissu.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{tissu.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-gray-400 italic">Données en cours de collecte pour ce pays...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center text-gray-400">
            <div className="text-5xl mb-4">🌍</div>
            <p>Sélectionnez un pays sur la carte pour découvrir son patrimoine textile.</p>
          </div>
        )}
      </div>
    </div>
  );
}