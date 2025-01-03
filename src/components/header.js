"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCart } from "../app/context/CartContext";

export default function Header() {
  const { data: session, status } = useSession(); // Récupère les données de session
  const { itemCount, cartItems } = useCart(); // Accès au contexte du panier
  const [isOpen, setIsOpen] = useState(false); // Gère le menu mobile
  const [isEspaceOpen, setIsEspaceOpen] = useState(false); // Gère le menu "Espace"
  const isAdmin =
    status === "authenticated" &&
    session?.user?.role?.toLowerCase() === "admin"; // Vérifie si l'utilisateur est admin

  // Log des données du panier pour debugging
  useEffect(() => {
    console.log("Nombre total d'articles dans le panier :", itemCount);
    console.log("Articles du panier :", cartItems);
  }, [itemCount, cartItems]);

  return (
    <header className="bg-red-900 text-gray-200 border-t-4 border-green-800">
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

        {/* Hamburger menu pour mobile */}
        <div className="md:hidden">
          <button
            className="text-white text-2xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {/* Navigation Menu */}
        <nav
          className={`fixed md:relative top-0 left-0 w-full md:w-auto bg-yellow-600 md:bg-transparent p-6 md:p-0 transform transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          } md:transform-none md:flex`}
        >
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            {/* Liens de navigation */}
            <li>
              <Link href="/">
                <span className="text-white text-lg font-bold hover:text-red-400 transition-colors duration-300 cursor-pointer">
                  Accueil
                </span>
              </Link>
            </li>
            <li>
              <Link href="/shop">
                <span className="text-white text-lg font-bold hover:text-green-400 transition-colors duration-300 cursor-pointer">
                  Boutique
                </span>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <span className="text-white text-lg font-bold hover:text-orange-400 transition-colors duration-300 cursor-pointer">
                  À propos
                </span>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <span className="text-white text-lg font-bold hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  Contact
                </span>
              </Link>
            </li>
            <li>
              <Link href="/faq">
                <span className="text-white text-lg font-bold hover:text-purple-400 transition-colors duration-300 cursor-pointer">
                  FAQ
                </span>
              </Link>
            </li>
            {/* Panier */}
            <li>
              <Link href="/cart">
                <span className="relative text-white text-lg font-bold hover:text-yellow-400 transition-colors duration-300 cursor-pointer">
                  Panier
                  {itemCount > 0 && (
                    <span className="absolute top-0 right-0 mt-[-10px] mr-[-10px] bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">
                      {itemCount}
                    </span>
                  )}
                </span>
              </Link>
            </li>
            {/* Utilisateur connecté */}
            {session ? (
              <>
                {isAdmin && (
                  <li>
                    <Link href="/admin">
                      <span className="text-white text-lg font-bold hover:text-pink-400 transition-colors duration-300 cursor-pointer">
                        Admin
                      </span>
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={() => signOut()}
                    className="text-white text-lg font-bold hover:text-red-500 transition-colors duration-300 cursor-pointer"
                  >
                    Déconnexion
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => setIsEspaceOpen(!isEspaceOpen)}
                  className="text-white text-lg font-bold hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                >
                  Espace
                </button>
                {isEspaceOpen && (
                  <ul className="absolute bg-yellow-600 shadow-lg rounded-md mt-2 w-32 p-2 space-y-2 z-50">
                    <li>
                      <button
                        onClick={() => signIn()}
                        className="w-full text-left text-white text-lg font-bold hover:text-green-500 transition-colors duration-300"
                      >
                        Connexion
                      </button>
                    </li>
                    <li>
                      <Link href="/auth/register">
                        <span className="text-white text-lg font-bold hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                          Inscription
                        </span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
