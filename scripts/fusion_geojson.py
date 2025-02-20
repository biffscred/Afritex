import json
import os

# Définition des chemins vers les fichiers
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "../public/data")

CUSTOM_GEOJSON_PATH = os.path.join(DATA_DIR, "custom.geo.json")
AFRICA_GEOJSON_PATH = os.path.join(DATA_DIR, "africa.geojson")
OUTPUT_GEOJSON_PATH = os.path.join(DATA_DIR, "africa_final.geojson")

# Charger les fichiers JSON
with open(CUSTOM_GEOJSON_PATH, "r", encoding="utf-8") as f:
    custom_data = json.load(f)

with open(AFRICA_GEOJSON_PATH, "r", encoding="utf-8") as f:
    africa_geo = json.load(f)

# Construire un dictionnaire des tissus en utilisant "code" (ex: "DZ", "AO", etc.)
custom_dict = {feature["properties"]["code"]: feature["properties"]
               for feature in africa_geo["features"]}

# Construire un dictionnaire des frontières en utilisant "iso_a2" (ex: "ET" pour Éthiopie)
boundary_dict = {feature["properties"]["iso_a2"]: feature["geometry"]
                 for feature in custom_data["features"]}

# Fusionner les données et remplacer "Point" par "Polygon"
for feature in custom_data["features"]:
    country_code = feature["properties"].get("iso_a2")  # Code ISO2 du pays

    if country_code in custom_dict:
        # Ajouter les infos du tissu
        feature["properties"].update(custom_dict[country_code])

        # Remplacer le type "Point" par "Polygon" si une frontière est trouvée
        if country_code in boundary_dict:
            # Remplacement des coordonnées
            feature["geometry"] = boundary_dict[country_code]

    else:
        print(
            f"⚠️ Pas d'infos de tissu pour {feature['properties'].get('name', 'Inconnu')} ({country_code})")

# Création du fichier fusionné avec les polygones
merged_data = {"type": "FeatureCollection",
               "features": custom_data["features"]}

with open(OUTPUT_GEOJSON_PATH, "w", encoding="utf-8") as f:
    json.dump(merged_data, f, indent=4, ensure_ascii=False)

print(f"✅ Fusion terminée ! Fichier enregistré sous {OUTPUT_GEOJSON_PATH}")
