// components/Header.js
"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession(); // Vérifie l'état de connexion de l'utilisateur
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-yellow-600 shadow-lg w-full border-b-4 border-green-700">
      <div className="container mx-auto flex justify-between items-center p-4">
        
        {/* Logo */}
        <Link href="/">
          <Image 
            src="/logo.png" 
            alt="AfriTex Logo" 
            width={50} 
            height={50} 
            priority={true}
            className="rounded-full border-4 border-red-500 shadow-md cursor-pointer" 
          />
        </Link>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button
            className="text-white text-2xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className={`fixed md:relative top-0 left-0 w-full md:w-auto bg-yellow-600 md:bg-transparent p-6 md:p-0 transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-y-0" : "-translate-y-full"} md:transform-none md:flex`}>
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            {/* Liens de navigation */}
            <li>
              <Link href="/">
                <span className="text-white text-lg font-bold hover:text-red-400 transition-colors duration-300 cursor-pointer">Accueil</span>
              </Link>
            </li>
            <li>
              <Link href="/shop">
                <span className="text-white text-lg font-bold hover:text-green-400 transition-colors duration-300 cursor-pointer">Boutique</span>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <span className="text-white text-lg font-bold hover:text-orange-400 transition-colors duration-300 cursor-pointer">À propos</span>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <span className="text-white text-lg font-bold hover:text-blue-400 transition-colors duration-300 cursor-pointer">Contact</span>
              </Link>
            </li>
            <li>
              <Link href="/faq">
                <span className="text-white text-lg font-bold hover:text-purple-400 transition-colors duration-300 cursor-pointer">FAQ</span>
              </Link>
            </li>
            <li>
              <Link href="/cart">
                <span className="text-white text-lg font-bold hover:text-yellow-400 transition-colors duration-300 cursor-pointer">Panier</span>
              </Link>
            </li>
            
            {/* Affichage conditionnel en fonction de la session */}
            {session ? (
              <>
                {/* Utilisateur connecté */}
                <li>
                  <Link href="/account">
                    <span className="text-white text-lg font-bold hover:text-pink-400 transition-colors duration-300 cursor-pointer">Compte</span>
                  </Link>
                </li>
                <li>
                  <button onClick={() => signOut()} className="text-white text-lg font-bold hover:text-red-500 transition-colors duration-300 cursor-pointer">Déconnexion</button>
                </li>
                {/* Affiche le nom de l'utilisateur et son avatar si disponible */}
                {session.user && (
                  <li className="flex items-center space-x-2">
                    {session.user.image && (
                      <Image
                        src={session.user.image}
                        alt="Avatar"
                        width={30}
                        height={30}
                        className="rounded-full border-2 border-white"
                      />
                    )}
                    <span className="text-white text-sm font-medium">{session.user.name}</span>
                  </li>
                )}
              </>
            ) : (
              <>
                {/* Utilisateur non connecté */}
                <li>
                  <Link href="/auth/register">
                    <span className="text-white text-lg font-bold hover:text-blue-400 transition-colors duration-300 cursor-pointer">Inscription</span>
                  </Link>
                </li>
                <li>
                  <button onClick={() => signIn()} className="text-white text-lg font-bold hover:text-green-500 transition-colors duration-300 cursor-pointer">Connexion</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}