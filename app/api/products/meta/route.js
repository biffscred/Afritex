import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: {
        category: true,
        color: true,
        countries: { select: { name: true } },
      },
    });

    const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

    const colors = [...new Set(
      products.flatMap(p =>
        p.color ? p.color.split(',').map(c => c.trim().toLowerCase()) : []
      )
    )];

    const countries = [...new Set(
      products.flatMap(p =>
        p.countries?.map(c => c.name) || []
      )
    )];

    return NextResponse.json({ categories, colors, countries });
  } catch (error) {
    console.error("❌ ERREUR /api/products/meta :", error);
    return NextResponse.json({ message: "Erreur serveur meta" }, { status: 500 });
  }
}
