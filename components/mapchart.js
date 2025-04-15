"use client";

import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoCentroid, geoEqualEarth } from "d3-geo";
import Image from "next/image";

const geoUrl = "/data/africa.geojson"; // Assure-toi que ce fichier est bien dans le dossier `public/data/`

export default function MapChart({ onCountrySelect }) {
  console.log("📌 MapChart component loaded");

  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    console.log("🔍 Vérification de la taille de la fenêtre");
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ajuste la taille de la carte selon la taille d'écran
  const mapWidth = windowSize.width < 768 ? 400 : 800;
  const mapHeight = windowSize.width < 768 ? 300 : 600;
  const scale = windowSize.width < 768 ? 250 : 500;
  const center = windowSize.width < 768 ? [20, 5] : [20, 0];

  return (
    <div className="relative w-full flex justify-center overflow-hidden">
      <ComposableMap
        width={mapWidth}
        height={mapHeight}
        projection="geoEqualEarth"
        projectionConfig={{ scale, center }}
        className="w-full h-auto max-h-[500px] sm:max-h-[600px] lg:max-h-[700px]"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <>
              {/* 1) Affichage des pays */}
              {geographies.map((geo) => {
                console.log("🌍 Pays détecté :", geo.properties);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      console.log("🖱️ Pays cliqué :", geo.properties);

                      if (onCountrySelect) {
                        console.log("✅ Appel de onCountrySelect avec :", geo.properties);
                        onCountrySelect(geo.properties);
                      } else {
                        console.error("❌ ERREUR : onCountrySelect n'est pas défini !");
                      }
                    }}
                    onMouseEnter={(event) => {
                      const rect = event.target.getBoundingClientRect();
                      setHoveredCountry(geo.properties);
                      setCursorPos({
                        x: rect.left + window.scrollX + rect.width / 2,
                        y: rect.top + window.scrollY - 50,
                      });
                    }}
                    onMouseLeave={() => setHoveredCountry(null)}
                    style={{
                      default: { fill: "#D6D6DA", stroke: "#000", strokeWidth: 0.5 },
                      hover: { fill: "#e74c3c", cursor: "pointer" },
                      pressed: { fill: "#c0392b" },
                    }}
                  />
                );
              })}
            </>
          )}
        </Geographies>
      </ComposableMap>

      {/* 3) Tooltip au survol */}
      {hoveredCountry && (
        <div
          className="fixed bg-white p-2 shadow-lg rounded-md border border-gray-200"
          style={{
            top: cursorPos.y,
            left: cursorPos.x,
            transform: "translate(-50%, -100%)",
            whiteSpace: "nowrap",
          }}
        >
          <span className="text-sm font-semibold text-gray-800">
            {hoveredCountry.name}
          </span>
        </div>
      )}
    </div>
  );
}
