// /app/api/users/route.js
import  prisma  from "../../../lib/prisma"; // Assurez-vous que Prisma est bien configuré

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    console.log("Utilisateurs trouvés :", users); // Ajoutez cela pour vérifier les données reçues de la base de données
    return new Response(JSON.stringify(users), { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Erreur lors de la récupération des utilisateurs" }), { status: 500 });
  }
}

export async function POST(req) {
  const body = await req.json();
  const { name, email, role } = body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
      },
    });
    return new Response(JSON.stringify(user), { status: 201, headers: { "Content-Type": "application/json" } 
});
  } catch (error) {
    return new Response(JSON.stringify({ message: "Erreur lors de l'ajout de l'utilisateur" }), { status: 500 });
  }
}
