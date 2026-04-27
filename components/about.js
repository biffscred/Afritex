import Image from 'next/image';

const steps = [
  {
    title: "1. La Récolte",
    desc: "Tout commence dans les champs de coton bio. Chaque capsule est cueillie à la main sous le soleil d'Afrique de l'Ouest pour préserver la pureté de la fibre.",
    video: "/videos/recolte.mp4", // kling_..._4571_0.mp4
  },
  {
    title: "2. Le Filage",
    desc: "Le coton brut est transformé en fil solide grâce au savoir-faire des fileuses traditionnelles. Un travail de patience qui donne une âme au textile.",
    video: "/videos/filage.mp4", // kling_..._4682_0.mp4
  },
  {
    title: "3. La Teinture ",
    desc: "Nos fils blancs plongent dans des bains d'indigo naturel. Sans aucun produit chimique, nous obtenons ce bleu profond et vibrant qui caractérise Afritex.",
    video: "/videos/teinture.mp4", // kling_..._4699_0.mp4
  },
  {
    title: "4. Le Tissage",
    desc: "L'artisan entre en scène. Sur son métier en bois, il entrecroise les fils bleus et blancs pour créer les motifs géométriques ancestraux.",
    video: "/videos/fabrication.mp4", // Ta vidéo de base (tisserand)
  },
  {
    title: "5. L'Écharpe Finie",
    desc: "Le résultat : un tissu lourd, texturé et chargé d'histoire. Plus qu'un accessoire, c'est une pièce d'artisanat durable que vous porterez avec fierté.",
    video: "/videos/final.mp4", // kling_..._4997_0.mp4
  }
];

export default function About() {
  return (
    <section className="bg-yellow-50 py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        
        {/* --- SECTION 1 : L'IDENTITÉ --- */}
        <div className="flex flex-col md:flex-row items-center mb-32">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <div className="relative w-64 h-64 mx-auto md:mx-0">
              <Image src="/logo.png" alt="Afritex Logo" layout="fill" objectFit="contain" className="drop-shadow-md" />
            </div>
          </div>
          <div className="w-full md:w-1/2 md:pl-10 text-center md:text-left">
            <h2 className="text-5xl font-black text-yellow-900 mb-6 italic">L'Art du Temps.</h2>
            <p className="text-xl text-gray-700 leading-relaxed italic">
              "Chez Afritex, nous ne fabriquons pas de la mode rapide. Nous cultivons l'excellence."
            </p>
          </div>
        </div>

        {/* --- SECTION 2 : LE PARCOURS DE FABRICATION (Timeline) --- */}
        <div className="mb-32">
          <h3 className="text-4xl font-bold text-center text-yellow-900 mb-16 underline decoration-yellow-500 underline-offset-8">
            Du Champ à votre Épaule : Le Voyage Afritex
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="relative rounded-2xl overflow-hidden bg-black aspect-[9/16] mb-6 border-4 border-yellow-100">
                  <video 
                    src={step.video} 
                    autoPlay loop muted playsInline 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-yellow-800 text-lg mb-2">{step.title}</h4>
                <p className="text-gray-600 text-sm leading-snug">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- SECTION 3 : NOS VALEURS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-yellow-200 pt-16">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🌍</div>
            <h4 className="font-bold text-yellow-900 text-xl mb-2">Authenticité</h4>
            <p className="text-gray-600">Zéro contrefaçon. Uniquement des tissus sourcés auprès des maîtres artisans.</p>
          </div>
          <div className="text-center p-6 bg-yellow-100/30 rounded-3xl">
            <div className="text-4xl mb-4">🤝</div>
            <h4 className="font-bold text-yellow-900 text-xl mb-2">Équité</h4>
            <p className="text-gray-600">Une juste rémunération pour pérenniser l'héritage de nos artisans.</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">✨</div>
            <h4 className="font-bold text-yellow-900 text-xl mb-2">Qualité</h4>
            <p className="text-gray-600">Des standards rigoureux pour des vêtements qui durent toute une vie.</p>
          </div>
        </div>

      </div>
    </section>
  );
}