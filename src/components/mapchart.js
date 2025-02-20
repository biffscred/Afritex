"use client";
import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Image from "next/image";

const geoUrl = "/data/africa.geojson"; // Assure-toi que le fichier est bien dans public/data/

export default function MapChart() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Adapter la projection en fonction de la taille de l'écran
  const scale = windowSize.width < 768 ? 250 : 500;
  const center = windowSize.width < 768 ? [20, 5] : [20, 0];

  return (
    <div className="relative w-full flex justify-center overflow-hidden">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale, center }}
        className="w-full h-auto max-h-[500px] sm:max-h-[600px] lg:max-h-[700px]"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryProps = geo.properties;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => setSelectedCountry(countryProps)}
                  onMouseEnter={(event) => {
                    if (!countryProps.flag) return; // Vérifie si le pays a un drapeau

                    const rect = event.target.getBoundingClientRect();
                    let posX = rect.left + window.scrollX + rect.width / 2; // Centre horizontalement
                    let posY = rect.top + window.scrollY - 50; // Décale légèrement vers le haut

                    // Empêche le drapeau de dépasser à droite ou en bas
                    if (posX + 100 > windowSize.width) {
                      posX = windowSize.width - 120;
                    }
                    if (posY < 0) {
                      posY = 10;
                    }

                    setHoveredCountry(countryProps);
                    setCursorPos({ x: posX, y: posY });
                  }}
                  onMouseLeave={() => setHoveredCountry(null)}
                  style={{
                    default: { fill: "#D6D6DA", stroke: "#000", strokeWidth: 0.5 },
                    hover: { fill: "#e74c3c", cursor: "pointer" },
                    pressed: { fill: "#c0392b" }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Affichage du drapeau au survol, bien positionné */}
      {hoveredCountry && hoveredCountry.flag && (
        <div
          className="fixed bg-white p-2 shadow-lg rounded-md border border-gray-200 transition-opacity duration-200 ease-in-out opacity-100"
          style={{
            top: cursorPos.y,
            left: cursorPos.x,
            transform: "translate(-50%, -100%)", // Centre le drapeau
          }}
        >
          <Image
            src={hoveredCountry.flag}
            alt={`Drapeau de ${hoveredCountry.name}`}
            width={80}
            height={50}
            className="rounded-md"
          />
        </div>
      )}

      {/* Modale d'affichage des tissus */}
      {selectedCountry && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full text-center relative animate-fadeIn">
            <h2 className="text-3xl font-bold text-green-900">{selectedCountry.country}</h2>
            <Image src={selectedCountry.flag} alt={selectedCountry.country} width={80} height={50} className="mt-2 mx-auto shadow-md" />
            <h3 className="text-xl font-semibold text-green-700 mt-4">{selectedCountry.fabric?.name}</h3>
            <p className="text-gray-800 mt-2 leading-relaxed">{selectedCountry.fabric?.description}</p>
            <Image
              src={selectedCountry.fabric?.image}
              alt={selectedCountry.fabric?.name}
              width={300}
              height={200}
              className="mt-4 rounded-lg shadow-lg"
            />
            <button onClick={() => setSelectedCountry(null)} className="mt-6 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition shadow-md hover:shadow-lg">
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
