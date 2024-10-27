import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// Récupérer tous les tissus
export async function GET() {
  try {
    const fabrics = await prisma.fabric.findMany();
    return NextResponse.json(fabrics, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des tissus :", error);
    return NextResponse.json({ message: "Erreur lors de la récupération des tissus" }, { status: 500 });
  }
}

// Ajouter un nouveau tissu
export async function POST(req) {
  const data = await req.json();
  try {
    const fabric = await prisma.fabric.create({
      data: {
        material: data.material || null,
        pattern: data.pattern || null,
        origin: data.origin || null,
        color: data.color || null,
        size: data.size || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(fabric, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du tissu :", error);
    return NextResponse.json({ message: "Erreur lors de la création du tissu" }, { status: 500 });
  }
}

// Mettre à jour un tissu existant
export async function PUT(req) {
  const data = await req.json();
  const { id, ...updateData } = data;
  try {
    const fabric = await prisma.fabric.update({
      where: { id: parseInt(id) },
      data: { ...updateData, updatedAt: new Date() },
    });
    return NextResponse.json(fabric, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du tissu :", error);
    return NextResponse.json({ message: "Erreur lors de la mise à jour du tissu" }, { status: 500 });
  }
}

// Supprimer un tissu
export async function DELETE(req) {
  const { id } = await req.json();
  try {
    await prisma.fabric.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: "Tissu supprimé avec succès" }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression du tissu :", error);
    return NextResponse.json({ message: "Erreur lors de la suppression du tissu" }, { status: 500 });
  }
}
