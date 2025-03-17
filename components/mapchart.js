"use client";
import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoCentroid, geoEqualEarth } from "d3-geo";
import Image from "next/image";

const geoUrl = "/data/africa.geojson"; // Chemin vers ton fichier dans public/data/

export default function MapChart() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    // Mémorise la taille de la fenêtre pour adapter la carte
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ajuste la taille de la carte selon la taille d'écran
  const mapWidth = windowSize.width < 768 ? 400 : 800;
  const mapHeight = windowSize.width < 768 ? 300 : 600;
  const scale = windowSize.width < 768 ? 250 : 500;
  const center = windowSize.width < 768 ? [20, 5] : [20, 0];

  // Crée la projection identique à celle utilisée par ComposableMap
  const projection = geoEqualEarth()
    .scale(scale)
    .center(center)
    .translate([mapWidth / 2, mapHeight / 2]);

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
              {/* 1) Affichage des pays (paths) */}
              {geographies.map((geo) => {
                // Récupère les propriétés (country, flag, etc.)
                const { country, flag } = geo.properties;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => setSelectedCountry(geo.properties)}
                    onMouseEnter={(event) => {
                      if (!country) return; // Si la propriété "country" n'existe pas
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
                      setHoveredCountry(geo.properties);
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
              })}

              {/* 2) Affichage permanent des drapeaux (petites images au centroïde) */}
              {geographies.map((geo) => {
                const { flag } = geo.properties;
                if (!flag) return null;

                // Calcule le centroïde du pays pour positionner le drapeau
                const centroid = projection(geoCentroid(geo));
                
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
          {hoveredCountry.flag && (
            <Image
              src={hoveredCountry.flag}
              alt={`Drapeau de ${hoveredCountry.country}`}
              width={40}
              height={25}
              className="inline-block rounded-md mr-2"
            />
          )}
          <span className="text-sm font-semibold text-gray-800">
            {hoveredCountry.country}
          </span>
        </div>
      )}

      {/* 4) Modale d'affichage des tissus au clic */}
      {selectedCountry && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full text-center relative">
            <h2 className="text-3xl font-bold text-green-900">
              {selectedCountry.country}
            </h2>

            {selectedCountry.flag && (
              <Image
                src={selectedCountry.flag}
                alt={selectedCountry.country}
                width={80}
                height={50}
                className="mt-2 mx-auto shadow-md"
              />
            )}

            {/* Par exemple : "selectedCountry.fabric" si c'est un objet ou un tableau */}
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
