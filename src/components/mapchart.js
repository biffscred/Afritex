"use client";
import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Image from "next/image";

const geoUrl = "/data/africa.geojson"; // Assure-toi que le fichier est dans public/data/

export default function MapChart() {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    // Mémoriser la taille de la fenêtre pour adapter la carte
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Adapter la taille/projection de la carte
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
          {({ geographies }) =>
            geographies.map((geo) => {
              const { name, flag } = geo.properties;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={(event) => {
                    if (!name) return;
                    // Calcule la position pour le tooltip
                    const rect = event.target.getBoundingClientRect();
                    let posX = rect.left + window.scrollX + rect.width / 2;
                    let posY = rect.top + window.scrollY - 50;

                    // Empêche le tooltip de dépasser la fenêtre
                    if (posX + 120 > windowSize.width) {
                      posX = windowSize.width - 140;
                    }
                    if (posY < 0) {
                      posY = 10;
                    }

                    // On stocke le pays survolé et la position
                    setHoveredCountry(geo.properties);
                    setCursorPos({ x: posX, y: posY });
                  }}
                  onMouseLeave={() => setHoveredCountry(null)}
                  onClick={() => setSelectedCountry(geo.properties)}
                  style={{
                    default: {
                      fill: "#D6D6DA", // Couleur de base des pays
                      stroke: "#000",
                      strokeWidth: 0.5
                    },
                    hover: {
                      fill: "#e74c3c", // Couleur au survol
                      cursor: "pointer"
                    },
                    pressed: {
                      fill: "#c0392b" // Couleur au clic (optionnel)
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Tooltip au survol */}
      {hoveredCountry && (
        <div
          className="fixed bg-white p-2 shadow-lg rounded-md border border-gray-200 transition-opacity duration-200 ease-in-out"
          style={{
            top: cursorPos.y,
            left: cursorPos.x,
            transform: "translate(-50%, -100%)",
            whiteSpace: "nowrap",
          }}
        >
          {hoveredCountry.flag && (
            <Image
              src={hoveredCountry.flag}
              alt={`Drapeau de ${hoveredCountry.name}`}
              width={40}
              height={25}
              className="inline-block rounded-md mr-2"
            />
          )}
          <span className="text-sm font-semibold text-gray-800">
            {hoveredCountry.name}
          </span>
        </div>
      )}

      {/* Modale au clic */}
      {selectedCountry && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full text-center relative">
            <h2 className="text-3xl font-bold text-green-900">
              {selectedCountry.name}
            </h2>

            {selectedCountry.flag && (
              <Image
                src={selectedCountry.flag}
                alt={selectedCountry.name}
                width={80}
                height={50}
                className="mt-2 mx-auto shadow-md"
              />
            )}

            {/* Si tu as des infos de tissu, etc. */}
            <h3 className="text-xl font-semibold text-green-700 mt-4">
              {selectedCountry.fabric?.name}
            </h3>
            <p className="text-gray-800 mt-2 leading-relaxed">
              {selectedCountry.fabric?.description}
            </p>

            {selectedCountry.fabric?.image && (
              <Image
                src={selectedCountry.fabric.image}
                alt={selectedCountry.fabric.name}
                width={300}
                height={200}
                className="mt-4 rounded-lg shadow-lg"
              />
            )}

            <button
              onClick={() => setSelectedCountry(null)}
              className="mt-6 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition shadow-md hover:shadow-lg"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
