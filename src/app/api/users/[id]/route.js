// /app/api/users/[id]/route.js
import  prisma  from "../../../../lib/prisma";

export async function GET(req, { params }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!user) return new Response(JSON.stringify({ message: "Utilisateur non trouvé" }), { status: 404 });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Erreur lors de la récupération de l'utilisateur" }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const body = await req.json();
  const { name, email, role } = body;

  try {
    const user = await prisma.user.update({
      where: { id: parseInt(params.id) },
      data: { name, email, role },
    });
    return new Response(JSON.stringify(user), { status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Erreur lors de la modification de l'utilisateur" }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await prisma.user.delete({
      where: { id: parseInt(params.id) },
    });
    return new Response(JSON.stringify({ message: "Utilisateur supprimé avec succès" }), { status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Erreur lors de la suppression de l'utilisateur" }), { status: 500 });
  }
}
