import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// Récupérer tous les accessoires
export async function GET() {
  try {
    const accessories = await prisma.accessory.findMany();
    return NextResponse.json(accessories, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des accessoires :", error);
    return NextResponse.json({ message: "Erreur lors de la récupération des accessoires" }, { status: 500 });
  }
}

// Ajouter un nouvel accessoire
export async function POST(req) {
  const data = await req.json();
  try {
    const accessory = await prisma.accessory.create({
      data: {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        fabricId: data.fabricId || null,
        color: data.color || null,
        artisanId: data.artisanId ? parseInt(data.artisanId) : null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(accessory, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de l'accessoire :", error);
    return NextResponse.json({ message: "Erreur lors de la création de l'accessoire" }, { status: 500 });
  }
}

// Mettre à jour un accessoire existant
export async function PUT(req) {
  const data = await req.json();
  const { id, ...updateData } = data;
  try {
    const accessory = await prisma.accessory.update({
      where: { id: parseInt(id) },
      data: { ...updateData, updatedAt: new Date() },
    });
    return NextResponse.json(accessory, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'accessoire :", error);
    return NextResponse.json({ message: "Erreur lors de la mise à jour de l'accessoire" }, { status: 500 });
  }
}

// Supprimer un accessoire
export async function DELETE(req) {
  const { id } = await req.json();
  try {
    await prisma.accessory.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: "Accessoire supprimé avec succès" }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'accessoire :", error);
    return NextResponse.json({ message: "Erreur lors de la suppression de l'accessoire" }, { status: 500 });
  }
}
