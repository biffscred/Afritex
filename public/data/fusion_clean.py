import json

# Chemins
geojson_path = "public/data/africa.geojson"
tissus_path = "public/data/tissusparpays.json"

# Chargement des fichiers
with open(geojson_path, "r", encoding="utf-8") as f:
    geojson = json.load(f)

with open(tissus_path, "r", encoding="utf-8") as f:
    tissus_data = json.load(f)

# Fusion propre
for feature in geojson["features"]:
    country_name = feature["properties"].get("name")

    if not country_name:
        print("❌ Pays sans nom détecté, ignoré.")
        continue

    # Nettoyage des anciennes clés
    for key in ["fabrics", "fabric"]:
        if key in feature["properties"]:
            print(
                f"🧹 Suppression de la clé obsolète '{key}' dans {country_name}")
            del feature["properties"][key]

    # Ajout des nouveaux tissus
    tissus = tissus_data.get(country_name)
    if tissus and "fabric" in tissus:
        feature["properties"]["fabric"] = tissus["fabric"]
        print(
            f"✅ Tissus ajoutés à {country_name} : {len(tissus['fabric'])} tissu(s)")
    else:
        print(f"⚠️ Aucun tissu trouvé pour {country_name}")

# Sauvegarde propre
with open(geojson_path, "w", encoding="utf-8") as f:
    json.dump(geojson, f, ensure_ascii=False, indent=2)

print("✅ Nettoyage + fusion terminés.")
