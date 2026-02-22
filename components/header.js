"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCart } from "../app/context/CartContext";

// Style commun pour tous les titres du menu
const navItemStyle = "text-white text-lg font-bold transition-colors duration-300 cursor-pointer";

function Logo() {
  return (
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
  );
}

function CartBadge({ itemCount }) {
  return (
    <Link href="/cart">
      <span className={`${navItemStyle} hover:text-yellow-400 flex items-center`}>
        Panier
        {itemCount > 0 && (
          <span className="ml-2 px-2 py-0.5 bg-red-600 text-white rounded-full text-xs font-black">
            {itemCount}
          </span>
        )}
      </span>
    </Link>
  );
}

function NavigationMenu({ isOpen, isEspaceOpen, toggleEspace, itemCount, session, isAdmin }) {
  return (
    <nav
      className={`
        fixed top-0 right-0 h-full w-64 bg-yellow-600 p-10 shadow-2xl transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        lg:static lg:translate-x-0 lg:flex lg:flex-row lg:h-auto lg:w-auto lg:bg-transparent lg:p-0 lg:shadow-none
      `}
    >
      <ul className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8 mt-12 lg:mt-0 items-start lg:items-center">
        <li><Link href="/"><span className={`${navItemStyle} hover:text-red-400`}>Accueil</span></Link></li>
        <li><Link href="/shop"><span className={`${navItemStyle} hover:text-green-400`}>Boutique</span></Link></li>
        
        <li className="relative group">
          <div className={`${navItemStyle} hover:text-orange-400`}>À propos</div>
          <div className="absolute top-full left-0 z-50 mt-2 w-48 bg-white rounded-lg shadow-md opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300">
            <Link href="/about" className="block px-4 py-2 text-gray-800 font-semibold hover:bg-orange-100 transition">Notre histoire</Link>
            <Link href="/fabricbycountry" className="block px-4 py-2 text-gray-800 font-semibold hover:bg-orange-100 transition">Tissus par pays</Link>
          </div>
        </li>

        <li><Link href="/contact"><span className={`${navItemStyle} hover:text-blue-400`}>Contact</span></Link></li>
        
        <li><CartBadge itemCount={itemCount} /></li>

        <li className="relative">
          <button
            onClick={toggleEspace}
            className={`${navItemStyle} hover:text-cyan-300`}
          >
            Espace {isEspaceOpen ? "▲" : "▼"}
          </button>
          
          {isEspaceOpen && (
            <ul className="lg:absolute relative bg-yellow-700 lg:bg-white lg:shadow-xl rounded-md mt-2 w-40 p-3 space-y-2 z-[60]">
              {!session ? (
                <>
                  <li><button onClick={() => signIn()} className="w-full text-left font-bold lg:text-gray-800 text-white hover:text-green-600">Connexion</button></li>
                  <li><Link href="/auth/register" className="font-bold lg:text-gray-800 text-white hover:text-blue-600">Inscription</Link></li>
                </>
              ) : (
                <li><button onClick={() => signOut()} className="w-full text-left font-bold text-red-500">Déconnexion</button></li>
              )}
            </ul>
          )}
        </li>

        {session && isAdmin && (
          <li><Link href="/admin"><span className="text-pink-400 text-lg font-bold hover:text-pink-200">Admin</span></Link></li>
        )}
      </ul>
    </nav>
  );
}

export default function Header() {
  const { data: session } = useSession();
  const { itemCount } = useCart();
  const [menuState, setMenuState] = useState({ mobileMenu: false, espaceMenu: false });
  const isAdmin = session?.user?.role?.toLowerCase() === "admin";

  const toggleMobileMenu = () => setMenuState(p => ({ ...p, mobileMenu: !p.mobileMenu }));
  const toggleEspaceMenu = () => setMenuState(p => ({ ...p, espaceMenu: !p.espaceMenu }));

  return (
    <header className="bg-red-900 text-gray-200 border-t-4 border-green-800 sticky top-0 z-[100]">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Logo />
        <div className="flex items-center">
          <button
            className="lg:hidden text-white text-3xl focus:outline-none z-[110] relative mr-2"
            onClick={toggleMobileMenu}
          >
            {menuState.mobileMenu ? "✕" : "☰"}
          </button>
          <NavigationMenu
            isOpen={menuState.mobileMenu}
            isEspaceOpen={menuState.espaceMenu}
            toggleEspace={toggleEspaceMenu}
            itemCount={itemCount}
            session={session}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </header>
  );
}