// app/faq/page.js
import Link from 'next/link';

export default function FAQ() {
    return (
        <section className="bg-white py-12">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <h1 className="text-4xl font-bold text-yellow-800 mb-8">Foire Aux Questions (FAQ)</h1>
                
                <div className="space-y-6">
                    {/* Question 1 */}
                    <div>
                        <h3 className="text-2xl font-semibold text-yellow-700 mb-2">
                            Quels types de produits proposez-vous ?
                        </h3>
                        <p className="text-lg text-gray-700">
                            Nous proposons une sélection de tissus africains authentiques, de vêtements conçus avec ces tissus, et d'accessoires uniques fabriqués par des artisans locaux.
                        </p>
                    </div>

                    {/* Question 2 */}
                    <div>
                        <h3 className="text-2xl font-semibold text-yellow-700 mb-2">
                            Comment puis-je passer une commande ?
                        </h3>
                        <p className="text-lg text-gray-700">
                            Vous pouvez passer commande en ajoutant des articles dans votre panier et en suivant les étapes de paiement sécurisé.
                        </p>
                    </div>

                    {/* Ajoute d'autres questions ici */}

                    {/* Exemple de dernière question */}
                    <div>
                        <h3 className="text-2xl font-semibold text-yellow-700 mb-2">
                            Proposez-vous des offres spéciales ou des réductions ?
                        </h3>
                        <p className="text-lg text-gray-700">
                            Oui, nous proposons régulièrement des offres spéciales. Inscrivez-vous à notre newsletter pour rester informé.
                        </p>
                    </div>
                </div>

                {/* Bouton pour revenir à l'accueil */}
                <div className="mt-8 text-center">
                    <Link href="/"
                        className="inline-block px-6 py-3 bg-yellow-800 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700">
                            Retour à l'accueil
                        
                    </Link>
                </div>
            </div>
        </section>
    );
}
