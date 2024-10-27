import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// Récupérer tous les modèles
export async function GET() {
  try {
    const models = await prisma.model.findMany();
    return NextResponse.json(models, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des modèles :", error);
    return NextResponse.json({ message: "Erreur lors de la récupération des modèles" }, { status: 500 });
  }
}

// Ajouter un nouveau modèle
export async function POST(req) {
  const data = await req.json();
  try {
    const model = await prisma.model.create({
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
    return NextResponse.json(model, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du modèle :", error);
    return NextResponse.json({ message: "Erreur lors de la création du modèle" }, { status: 500 });
  }
}

// Mettre à jour un modèle existant
export async function PUT(req) {
  const data = await req.json();
  const { id, ...updateData } = data;
  try {
    const model = await prisma.model.update({
      where: { id: parseInt(id) },
      data: { ...updateData, updatedAt: new Date() },
    });
    return NextResponse.json(model, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du modèle :", error);
    return NextResponse.json({ message: "Erreur lors de la mise à jour du modèle" }, { status: 500 });
  }
}

// Supprimer un modèle
export async function DELETE(req) {
  const { id } = await req.json();
  try {
    await prisma.model.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: "Modèle supprimé avec succès" }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression du modèle :", error);
    return NextResponse.json({ message: "Erreur lors de la suppression du modèle" }, { status: 500 });
  }
}
