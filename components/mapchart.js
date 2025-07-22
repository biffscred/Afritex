"use client";

import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "/data/africa.geojson";

export default function MapChart() {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mapWidth = windowSize.width < 768 ? 400 : 800;
  const mapHeight = windowSize.width < 768 ? 300 : 600;
  const scale = windowSize.width < 768 ? 250 : 500;
  const center = windowSize.width < 768 ? [20, 5] : [20, 0];

  return (
    <div className="relative w-full flex flex-col items-center lg:flex-row lg:items-start">
      {/* 🗺️ Carte */}
      <div className="w-full lg:w-2/3 flex justify-center">

        <ComposableMap
          width={mapWidth}
          height={mapHeight}
          projection="geoEqualEarth"
          projectionConfig={{ scale, center }}
          className="w-full h-auto max-h-[700px]"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={(e) => {
                    setHoveredCountry({
                      name: geo.properties.country,
                      code: geo.properties.code,
                      fabric: Array.isArray(geo.properties.fabric)
                        ? geo.properties.fabric
                        : [],
                    });
                    setCursorPos({ x: e.clientX, y: e.clientY });
                  }}
                  onMouseMove={(e) =>
                    setCursorPos({ x: e.clientX, y: e.clientY })
                  }
                  onMouseLeave={() => setHoveredCountry(null)}
                  onClick={() => {
                    setSelectedCountry({
                      name: geo.properties.country,
                      code: geo.properties.code,
                      fabric: Array.isArray(geo.properties.fabric)
                        ? geo.properties.fabric
                        : [],
                    });
                  }}
                  style={{
                    default: {
                      fill: "#f4f4f4",
                      stroke: "#555",
                      strokeWidth: 0.3,
                    },
                    hover: { fill: "#1e90ff", cursor: "pointer" },
                    pressed: { fill: "#007acc" },
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>

        {/* Tooltip rapide */}
        {hoveredCountry && hoveredCountry.fabric.length > 0 && (
          <div
            className="fixed z-50 bg-white text-sm p-3 rounded-xl shadow-lg border max-w-xs"
            style={{
              left: cursorPos.x + 15,
              top: cursorPos.y + 15,
            }}
          >
            <div className="font-bold mb-1 flex items-center gap-2">
              <img
                src={`https://flagcdn.com/w40/${hoveredCountry.code?.toLowerCase()}.png`}
                alt=""
                className="w-5 h-4 rounded-sm"
              />
              {hoveredCountry.name}
            </div>
            {hoveredCountry.fabric.slice(0, 2).map((tissu, i) => (
              <div key={i} className="mb-1">
                <strong>{tissu.name}</strong>:{" "}
                {tissu.description?.slice(0, 80)}...
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 📘 Fiche latérale */}
      {selectedCountry && (
        <div className="w-full lg:w-1/3 mt-6 lg:mt-0 lg:ml-6 bg-white p-5 rounded-xl shadow-xl border max-h-[700px] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img
                src={`https://flagcdn.com/w80/${selectedCountry.code?.toLowerCase()}.png`}
                alt="Drapeau"
                className="w-8 h-6 rounded"
              />
              <h2 className="text-xl font-bold">{selectedCountry.name}</h2>
            </div>
            <button
              onClick={() => setSelectedCountry(null)}
              className="text-gray-500 hover:text-red-500 text-lg"
            >
              ✕
            </button>
          </div>

          {selectedCountry.fabric.length > 0 ? (
            <ul className="space-y-4">
              {selectedCountry.fabric.map((tissu, index) => (
                <li key={index} className="flex gap-4 items-start">
                 <img
        src={tissu.image || "/placeholder.jpg"}
        alt={tissu.name}
        className="w-20 h-20 object-cover rounded border"
        onError={() =>
          console.warn(`❌ Image non trouvée: ${tissu.image}`)
        }
        onLoad={() =>
          console.log(`✅ Image chargée: ${tissu.image}`)
        }
      />
                  <div>
                    <h3 className="text-base font-semibold">{tissu.name}</h3>
                    <p className="text-sm text-gray-700">{tissu.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic">Aucun tissu référencé.</p>
          )}
        </div>
      )}
    </div>
  );
}
