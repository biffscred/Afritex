import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sizes = await prisma.size.findMany();
    return NextResponse.json(sizes);
  } catch (error) {
    return NextResponse.json({ message: "Erreur Tailles" }, { status: 500 });
  }
}