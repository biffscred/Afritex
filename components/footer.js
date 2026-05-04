import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-red-900 text-gray-200 py-12 border-t-4 border-green-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Section Informations sur la marque */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-yellow-300">Afritex</h3>
            <p className="text-yellow-100 leading-relaxed">
              Explorez une sélection d'authentiques tissus africains, de vêtements et d'accessoires confectionnés avec des matières de haute qualité.
            </p>
          </div>
          
          {/* Section Navigation - Alignée sur tes composants Tissus/Modeles/Accessoires */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-yellow-300">Navigation</h3>
            <ul className="space-y-3">
              <li><Link href="/fabric" className="hover:text-green-300 transition-colors">Nos Tissus</Link></li>
              <li><Link href="/model" className="hover:text-green-300 transition-colors">Nos Modèles</Link></li>
              <li><Link href="/accessory" className="hover:text-green-300 transition-colors">Nos Accessoires</Link></li>
              <li><Link href="/contact" className="hover:text-green-300 transition-colors">Contactez-nous</Link></li>
            </ul>
          </div>

          {/* Section Contact et Réseaux Sociaux */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-yellow-300">Contact & Social</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:contactafritex@gmail.com" className="hover:text-green-300 transition-colors block">
                  contactafritex@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+33612607431" className="hover:text-green-300 transition-colors block">
                  (+33) 6 12 60 74 31
                </a>
              </li>
            </ul>
            <div className="flex justify-center md:justify-start space-x-5 mt-6">
              <a href="https://www.facebook.com/people/Afritex/100076970153369/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF className="w-6 h-6 text-yellow-300 hover:text-white transition-all transform hover:scale-125" />
              </a>
              <a href="https://www.instagram.com/afritex.fr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="w-6 h-6 text-yellow-300 hover:text-white transition-all transform hover:scale-125" />
              </a>
              <a href="https://x.com/contactafritex" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter className="w-6 h-6 text-yellow-300 hover:text-white transition-all transform hover:scale-125" />
              </a>
              <a href="https://www.tiktok.com/@afritex" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <FaTiktok className="w-6 h-6 text-yellow-300 hover:text-white transition-all transform hover:scale-125" />
              </a>
            </div>
          </div>
        </div>

        {/* Section Newsletter */}
        <div className="mt-12 border-t border-red-800 pt-10">
          <h3 className="text-2xl font-bold mb-6 text-center text-yellow-300 italic">Souscrivez à notre Newsletter</h3>
          <form className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 max-w-2xl mx-auto">
            <input
              type="email"
              required
              placeholder="Votre adresse email"
              className="p-3 w-full md:flex-1 rounded-md bg-red-950 text-white border border-red-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button 
              type="submit" 
              className="px-8 py-3 bg-yellow-500 text-red-900 font-black rounded-md hover:bg-white transition-all transform hover:scale-105 shadow-lg"
            >
              SOUSCRIRE
            </button>
          </form>
        </div>

        {/* Section Liens Légaux et Copyright */}
        <div className="mt-12 border-t border-red-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} AFRITEX. TOUS DROITS RÉSERVÉS.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Politique de confidentialité</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Conditions d'utilisation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}