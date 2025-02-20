

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const countries = [
    "Afrique du Sud", "Algérie", "Angola", "Bénin", "Botswana", "Burkina Faso", "Burundi", 
    "Cabo Verde", "Cameroun", "Comores", "Côte d'Ivoire", "Djibouti", "Égypte", "Érythrée", 
    "Eswatini", "Éthiopie", "Gabon", "Gambie", "Ghana", "Guinée", "Guinée-Bissau", 
    "Guinée équatoriale", "Kenya", "Lesotho", "Liberia", "Libye", "Madagascar", "Malawi", 
    "Mali", "Maroc", "Maurice", "Mauritanie", "Mozambique", "Namibie", "Niger", "Nigeria", 
    "Ouganda", "République centrafricaine", "République démocratique du Congo", 
    "République du Congo", "Rwanda", "Sao Tomé-et-Principe", "Sénégal", "Seychelles", 
    "Sierra Leone", "Somalie", "Soudan", "Soudan du Sud", "Tanzanie", "Tchad", "Togo", 
    "Tunisie", "Zambie", "Zimbabwe"
  ];

  for (const name of countries) {
    await prisma.country.create({
      data: { name }
    });
  }

  console.log("Insertion des pays africains terminée.");
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    
    await prisma.$disconnect();
  });
