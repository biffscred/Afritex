import json

# Chemins d'entrée et de sortie
input_path = "public/data/africa_with_tissus.geojson"
output_path = "public/data/africa_with_tissus_cleaned.geojson"


def nettoyer_geojson(path_in, path_out):
    with open(path_in, "r", encoding="utf-8") as f:
        geojson = json.load(f)

    for feature in geojson.get("features", []):
        props = feature.get("properties", {})
        # Supprimer la clé 'fabrics' si elle est vide
        if "fabrics" in props and not props["fabrics"]:
            del props["fabrics"]

    with open(path_out, "w", encoding="utf-8") as f:
        json.dump(geojson, f, ensure_ascii=False, indent=2)

    print("✅ GeoJSON nettoyé et sauvegardé dans :", path_out)


if __name__ == "__main__":
    nettoyer_geojson(input_path, output_path)
