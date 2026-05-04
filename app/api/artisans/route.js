import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const artisans = await prisma.artisan.findMany({
      orderBy: { name: 'asc' }
    });
    return NextResponse.json(artisans);
  } catch (error) {
    return NextResponse.json({ message: "Erreur Artisans" }, { status: 500 });
  }
}