"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCart } from "../app/context/CartContext";

const navItemStyle = "text-white text-lg font-bold transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-sm";

function Logo() {
  return (
    <Link href="/" aria-label="Retour à l'accueil">
      <Image
        src="/logo.png"
        alt="AfriTex Logo"
        width={50}
        height={50}
        priority={true}
        className="rounded-full border-4 border-red-500 shadow-md cursor-pointer hover:scale-105 transition-transform"
      />
    </Link>
  );
}

function CartBadge({ itemCount }) {
  return (
    <Link href="/cart" aria-label={`Voir le panier, ${itemCount} articles`}>
      <span className={`${navItemStyle} hover:text-yellow-400 flex items-center`}>
        Panier
        {itemCount > 0 && (
          <span className="ml-2 px-2 py-0.5 bg-red-600 text-white rounded-full text-xs font-black animate-pulse">
            {itemCount}
          </span>
        )}
      </span>
    </Link>
  );
}

function NavigationMenu({ isOpen, isEspaceOpen, toggleEspace, itemCount, session, isAdmin, closeMenu }) {
  return (
    <nav
      aria-label="Navigation principale"
      className={`
        fixed top-0 right-0 h-full w-64 bg-red-950 p-10 shadow-2xl transition-transform duration-300 z-[120]
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        lg:static lg:translate-x-0 lg:flex lg:flex-row lg:h-auto lg:w-auto lg:bg-transparent lg:p-0 lg:shadow-none
      `}
    >
      <ul className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8 mt-12 lg:mt-0 items-start lg:items-center">
        <li><Link href="/" onClick={closeMenu}><span className={`${navItemStyle} hover:text-red-400`}>Accueil</span></Link></li>
        <li><Link href="/shop" onClick={closeMenu}><span className={`${navItemStyle} hover:text-green-400`}>Boutique</span></Link></li>
        
        {/* Dropdown À propos - Support Hover & Focus */}
        <li className="relative group">
          <button className={`${navItemStyle} hover:text-orange-400 flex items-center gap-1`}>
            À propos <span>▾</span>
          </button>
          <div className="lg:absolute top-full left-0 z-50 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-all duration-300">
            <Link href="/about" onClick={closeMenu} className="block px-4 py-3 text-gray-800 font-bold hover:bg-orange-100 border-b border-gray-100">Notre histoire</Link>
            <Link href="/fabricbycountry" onClick={closeMenu} className="block px-4 py-3 text-gray-800 font-bold hover:bg-orange-100">Tissus par pays</Link>
          </div>
        </li>

        <li><Link href="/contact" onClick={closeMenu}><span className={`${navItemStyle} hover:text-blue-400`}>Contact</span></Link></li>
        
        <li><CartBadge itemCount={itemCount} /></li>

        {/* Menu Espace */}
        <li className="relative">
          <button
            onClick={toggleEspace}
            aria-expanded={isEspaceOpen}
            className={`${navItemStyle} hover:text-cyan-300 flex items-center gap-1`}
          >
            Espace <span>{isEspaceOpen ? "▲" : "▼"}</span>
          </button>
          
          {isEspaceOpen && (
            <ul className="lg:absolute relative bg-white lg:shadow-2xl rounded-md mt-2 w-48 p-2 space-y-1 z-[130] border border-gray-200">
              {!session ? (
                <>
                  <li><button onClick={() => { signIn(); closeMenu(); }} className="w-full text-left p-2 font-bold text-gray-800 hover:bg-green-50 hover:text-green-600 rounded">Connexion</button></li>
                  <li><Link href="/auth/register" onClick={closeMenu} className="block p-2 font-bold text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded">Inscription</Link></li>
                </>
              ) : (
                <li><button onClick={() => { signOut(); closeMenu(); }} className="w-full text-left p-2 font-bold text-red-600 hover:bg-red-50 rounded">Déconnexion</button></li>
              )}
            </ul>
          )}
        </li>

        {/* Admin - Contraste renforcé (Yellow-400 sur Red-900) */}
        {session && isAdmin && (
          <li>
            <Link href="/admin" onClick={closeMenu}>
              <span className="bg-yellow-500 text-red-900 px-3 py-1 rounded-md text-sm font-black hover:bg-white transition-colors underline decoration-2">
                ADMIN
              </span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default function Header() {
  const { data: session } = useSession();
  const { itemCount } = useCart();
  const [menuState, setMenuState] = useState({ mobileMenu: false, espaceMenu: false });
  
  // Sécurisation stricte du rôle
  const isAdmin = session?.user?.role?.toLowerCase() === "admin";

  const toggleMobileMenu = () => setMenuState(p => ({ ...p, mobileMenu: !p.mobileMenu, espaceMenu: false }));
  const toggleEspaceMenu = () => setMenuState(p => ({ ...p, espaceMenu: !p.espaceMenu }));
  const closeAllMenus = () => setMenuState({ mobileMenu: false, espaceMenu: false });

  // Verrouillage du scroll sur mobile
  useEffect(() => {
    document.body.style.overflow = menuState.mobileMenu ? "hidden" : "unset";
  }, [menuState.mobileMenu]);

  return (
    <header className="bg-red-900 text-gray-200 border-t-4 border-green-800 shadow-lg sticky top-0 z-[100]">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Logo />

        <div className="flex items-center">
          {/* Bouton Hamburger */}
          <button
            className="lg:hidden text-white text-3xl focus:outline-none z-[130] p-2"
            onClick={toggleMobileMenu}
            aria-label={menuState.mobileMenu ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {menuState.mobileMenu ? "✕" : "☰"}
          </button>

          {/* Overlay Mobile */}
          {menuState.mobileMenu && (
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] lg:hidden transition-opacity"
              onClick={closeAllMenus}
            />
          )}

          <NavigationMenu
            isOpen={menuState.mobileMenu}
            isEspaceOpen={menuState.espaceMenu}
            toggleEspace={toggleEspaceMenu}
            itemCount={itemCount}
            session={session}
            isAdmin={isAdmin}
            closeMenu={closeAllMenus}
          />
        </div>
      </div>
    </header>
  );
}