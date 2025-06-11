import json
import os

# Chemins vers les fichiers
geojson_path = "public/data/africa_with_tissus.geojson"
output_path = "public/data/africa_with_tissus_fusionne.geojson"
tissus_path = "public/data/tissusparpays.json"

# Traductions des noms de pays
traductions = {
    "Ethiopia": "Éthiopie", "S. Sudan": "Soudan du Sud", "Somalia": "Somalie",
    "Kenya": "Kenya", "Malawi": "Malawi", "Tanzania": "Tanzanie",
    "Somaliland": "Somaliland", "Morocco": "Maroc", "W. Sahara": "Sahara occidental",
    "Congo": "République du Congo", "Dem. Rep. Congo": "République démocratique du Congo",
    "Namibia": "Namibie", "South Africa": "Afrique du Sud", "Libya": "Libye",
    "Tunisia": "Tunisie", "Zambia": "Zambie", "Sierra Leone": "Sierra Leone",
    "Guinea": "Guinée", "Liberia": "Libéria", "Central African Rep.": "République centrafricaine",
    "Sudan": "Soudan", "Djibouti": "Djibouti", "Eritrea": "Érythrée",
    "Côte d'Ivoire": "Côte d'Ivoire", "Mali": "Mali", "Senegal": "Sénégal",
    "Nigeria": "Nigeria", "Benin": "Bénin", "Angola": "Angola", "Botswana": "Botswana",
    "Zimbabwe": "Zimbabwe", "Chad": "Tchad", "Algeria": "Algérie", "Mozambique": "Mozambique",
    "eSwatini": "Eswatini", "Burundi": "Burundi", "Rwanda": "Rwanda",
    "Uganda": "Ouganda", "Lesotho": "Lesotho", "Cameroon": "Cameroun",
    "Gabon": "Gabon", "Niger": "Niger", "Burkina Faso": "Burkina Faso",
    "Togo": "Togo", "Ghana": "Ghana", "Guinea-Bissau": "Guinée-Bissau",
    "Egypt": "Égypte", "Mauritania": "Mauritanie", "Eq. Guinea": "Guinée équatoriale",
    "Gambia": "Gambie", "Bir Tawil": "Bir Tawil", "Comoros": "Comores",
    "São Tomé and Principe": "Sao Tomé-et-Principe", "Cabo Verde": "Cap-Vert"
}

# Chargement des fichiers
with open(geojson_path, "r", encoding="utf-8") as f:
    geojson_data = json.load(f)

with open(tissus_path, "r", encoding="utf-8") as f:
    tissus_data = json.load(f)

# Nettoyage et fusion
for feature in geojson_data["features"]:
    country_name = feature["properties"].get("name")
    if not country_name:
        continue

    # Traduire en français si nécessaire
    country_name_fr = traductions.get(country_name, country_name)

    # Nettoyer ancienne clé
    for key in ["fabric", "fabrics"]:
        if key in feature["properties"]:
            del feature["properties"][key]
            print(
                f"🧹 Suppression de la clé obsolète '{key}' dans {country_name_fr}")

    # Injecter les tissus du fichier JSON
    if country_name_fr in tissus_data:
        fabrics = tissus_data[country_name_fr].get("fabric", [])
        feature["properties"]["fabrics"] = fabrics
        print(
            f"✅ Tissus ajoutés à {country_name_fr} : {len(fabrics)} tissu(s)")
    else:
        print(f"❌ Aucun tissu trouvé pour {country_name}")

# Sauvegarde du résultat
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(geojson_data, f, ensure_ascii=False, indent=2)

print("\n✅ Fusion terminée. Fichier sauvegardé :", output_path)
