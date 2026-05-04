import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const folderParam = searchParams.get("folder") || ""; 
    const search = searchParams.get("search")?.toLowerCase() || "";
    
    const rootDir = path.join(process.cwd(), "public");
    const targetDir = path.join(rootDir, folderParam);

    if (!fs.existsSync(targetDir)) {
      return NextResponse.json({ folders: [], images: [] });
    }

    // MODE RECHERCHE : Si tu tapes quelque chose, on cherche partout
    if (search) {
      const all = [];
      const walk = (dir) => {
        const files = fs.readdirSync(dir, { withFileTypes: true });
        for (const f of files) {
          const res = path.join(dir, f.name);
          if (f.isDirectory()) {
            if (!["node_modules", ".next"].includes(f.name)) walk(res);
          } else if (/\.(jpg|jpeg|png|webp|gif|svg)$/i.test(f.name) && f.name.toLowerCase().includes(search)) {
            all.push({
              name: f.name,
              url: res.split(rootDir)[1].replace(/\\/g, "/"),
              folder: path.basename(dir)
            });
          }
        }
      };
      walk(rootDir);
      return NextResponse.json({ folders: [], images: all.slice(0, 50) });
    }

    // MODE NAVIGATION : On ne liste que le dossier actuel
    const items = fs.readdirSync(targetDir, { withFileTypes: true });
    
    const folders = items
      .filter(item => item.isDirectory() && !item.name.startsWith("."))
      .map(item => ({
        name: item.name,
        path: path.join(folderParam, item.name).replace(/\\/g, "/"),
        isFolder: true
      }));

    const images = items
      .filter(item => !item.isDirectory() && /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(item.name))
      .map(item => ({
        name: item.name,
        url: path.join("/", folderParam, item.name).replace(/\\/g, "/"),
        isFolder: false
      }));

    return NextResponse.json({ folders, images });
  } catch (error) {
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}