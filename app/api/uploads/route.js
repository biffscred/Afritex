// app/api/uploads/route.js

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const uploadsRoot = path.join(process.cwd(), 'public', 'uploads', 'products');

export async function GET() {
  const filesList = [];

  function readDirRecursive(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(path.join(process.cwd(), 'public'), fullPath);

      if (entry.isDirectory()) {
        readDirRecursive(fullPath);
      } else if (/\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
        filesList.push({
          name: entry.name,
          image: '/' + relativePath.replace(/\\/g, '/'), // pour compat Windows
        });
      }
    }
  }

  readDirRecursive(uploadsRoot);

  return NextResponse.json(filesList);
}
