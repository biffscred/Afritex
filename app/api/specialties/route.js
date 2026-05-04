import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const specialties = await prisma.specialty.findMany({
      orderBy: { name: 'asc' }
    });
    return NextResponse.json(specialties);
  } catch (error) {
    return NextResponse.json({ message: "Erreur Spécialités" }, { status: 500 });
  }
}