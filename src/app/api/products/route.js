import prisma from '../../../lib/prisma';

export async function handler(req) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const products = await prisma.product.findMany();
        return new Response(JSON.stringify(products), { status: 200, headers: { 'Content-Type': 'application/json' } });
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        return new Response(JSON.stringify({ message: "Erreur lors de la récupération des produits" }), { status: 500 });
      }

      case "POST":
      console.log(req.body);
      try {
        const { name, description, price, category, image } = await req.json();
        // Crée le produit dans la base de données
        const product = await prisma.product.create({
          data: {
            name,
            description,
            price: parseFloat(price), // S'assurer que le prix est un nombre
            category,
            image,
          },
        });
        console.log(product);
        return new Response(JSON.stringify(product), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error("Erreur lors de l'ajout du produit:", error);
        return new Response(
          JSON.stringify({ message: "Erreur lors de l'ajout du produit" }),
          { status: 500 },
          console.error("Erreur lors de l'ajout du produit:", error.message)
        );
      }


    case 'PUT':
      try {
        const id = req.url.split('/').pop();
        const { name, description, price, category, image } = await req.json();
        
        const product = await prisma.product.update({
          where: { id: parseInt(id) },
          data: {
            name,
            description,
            price: parseFloat(price),
            category,
            image,
          },
        });
        return new Response(JSON.stringify(product), { status: 200, headers: { 'Content-Type': 'application/json' } });
      } catch (error) {
        console.error("Erreur lors de la mise à jour du produit:", error);
        return new Response(JSON.stringify({ message: "Erreur lors de la mise à jour du produit" }), { status: 500 });
      }

    case 'DELETE':
      try {
        const id = req.url.split('/').pop();
        await prisma.product.delete({ where: { id: parseInt(id) } });
        return new Response(JSON.stringify({ message: "Produit supprimé" }), { status: 204 });
      } catch (error) {
        console.error("Erreur lors de la suppression du produit:", error);
        return new Response(JSON.stringify({ message: "Erreur lors de la suppression du produit" }), { status: 500 });
      }

    default:
      return new Response(JSON.stringify({ message: "Méthode non autorisée" }), { status: 405 });
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
