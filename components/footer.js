// components/Footer.js
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter , FaTiktok} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-red-900 text-gray-200 py-12 border-t-4 border-green-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Section Informations sur la marque */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-yellow-300">Afritex</h3>
            <p className="text-yellow-100">
              Explorez une  selection d'authentiques  tissus africains ,de vêtements  et d'accesoires  faits avec des matières de qualité.
            </p>
          </div>
          
          {/* Section Navigation */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-yellow-300">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/fabrics"><span className="hover:text-green-200 cursor-pointer">Tissus</span></Link></li>
              <li><Link href="/models"><span className="hover:text-green-200 cursor-pointer">Modèles</span></Link></li>
              <li><Link href="/accessories"><span className="hover:text-green-200 cursor-pointer">Accessoires</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-green-200 cursor-pointer">Contactez Nous </span></Link></li>
            </ul>
          </div>

          {/* Section Contact et Réseaux Sociaux */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-yellow-300">Contact & Social</h3>
            <ul className="space-y-2">
              <li><a href="mailto:contactafritex@gmail.com" className="hover:text-green-200">contactafritex@gmail.com</a></li>
              <li><a href="tel:+33612607431" className="hover:text-green-200">(+33) 612 607 431</a></li>
            </ul>
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <a href="https://www.facebook.com/people/Afritex/100076970153369/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF className="w-6 h-6 text-yellow-300 hover:text-green-300 transition-transform transform hover:scale-110" />
              </a>
              <a href="https://www.instagram.com/afritex.fr?utm_source=qr&igsh=cnF3dWFvZmJoemo3" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="w-6 h-6 text-yellow-300 hover:text-green-300 transition-transform transform hover:scale-110" />
              </a>
              <a href="https://x.com/contactafritex?t=f85NKn3_XhCMyAZlm3f5PQ&s=09" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter className="w-6 h-6 text-yellow-300 hover:text-green-300 transition-transform transform hover:scale-110" />
              </a>
              <a
  href="https://www.tiktok.com/@afritex"  // remplace avec ton vrai pseudo si différent
  target="_blank"
  rel="noopener noreferrer"
  aria-label="TikTok"
>
  <FaTiktok className="w-6 h-6 text-yellow-300 hover:text-green-300 transition-transform transform hover:scale-110" />
</a>
            </div>
          </div>
        </div>

        {/* Section Newsletter */}
        <div className="mt-12 border-t border-red-800 pt-8">
          <h3 className="text-2xl font-semibold mb-4 text-center text-yellow-300">Souscrivez a notre Newsletter </h3>
          <form className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full md:w-auto rounded bg-red-800 text-gray-100 placeholder-yellow-500 focus:outline-none focus:ring focus:ring-green-500"
            />
            <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-transform transform hover:scale-105">
              Souscrire
            </button>
          </form>
        </div>

        {/* Section Liens Légaux et Copyright */}
        <div className="mt-12 border-t border-red-800 pt-8 flex flex-col md:flex-row justify-between items-center text-yellow-100 text-sm">
          <p>&copy; {new Date().getFullYear()} Afritex. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="/privacy-policy"><span className="hover:text-green-200 cursor-pointer">Politique de confidentialité</span></Link>
            <Link href="/terms-of-service"><span className="hover:text-green-200 cursor-pointer">Conditions d'utilisation </span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
