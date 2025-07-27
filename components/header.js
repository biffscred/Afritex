"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCart } from "../app/context/CartContext";

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
      <span className="relative text-white text-lg font-bold hover:text-yellow-400 transition-colors duration-300 cursor-pointer">
        Panier
        {itemCount > 0 && (
         <span className="ml-2 px-2 py-1 bg-red-600 text-white rounded-full text-xs font-bold">
         {itemCount || 0}
       </span>
        )}
      </span>
    </Link>
  );
}

function NavigationMenu({ isOpen, toggleMenu, itemCount, session, isAdmin }) {
  return (
    <nav
    className={`${
      isOpen ? "block" : "hidden"
    } flex flex-col space-y-4 bg-yellow-600 p-6 lg:flex lg:flex-row lg:space-y-0 lg:space-x-6 lg:bg-transparent lg:p-0`}
  >
    <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
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
  
      {/* ✅ Menu déroulant À propos */}
      <li className="relative group">
        <span className="text-white text-lg font-bold hover:text-orange-400 transition-colors duration-300 cursor-pointer">
          À propos
        </span>
        <ul className="absolute top-full left-0 z-50 hidden group-hover:block bg-white shadow-md rounded-lg mt-2 w-48 pt-2
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          <li>
            <Link href="/about" className="block px-4 py-2 text-gray-800 hover:bg-orange-100 transition">
              Notre histoire
            </Link>
          </li>
          <li>
            <Link href="/fabricbycountry" className="block px-4 py-2 text-gray-800 hover:bg-orange-100 transition">
              Tissus par pays
            </Link>
          </li>
        </ul>
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
  
      <li>
        <CartBadge itemCount={itemCount} />
      </li>
  
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
              onClick={signOut}
              className="text-white text-lg font-bold hover:text-red-500 transition-colors duration-300 cursor-pointer"
            >
              Déconnexion
            </button>
          </li>
        </>
      ) : (
        <li className="relative">
          <button
            onClick={toggleMenu}
            className="text-white text-lg font-bold hover:text-blue-400 transition-colors duration-300 cursor-pointer"
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            Espace
          </button>
          {isOpen && (
            <ul className="absolute bg-yellow-600 shadow-lg rounded-md mt-2 w-32 p-2 space-y-2 z-50">
              <li>
                <button
                  onClick={signIn}
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
  
  );
}

export default function Header() {
  const { data: session, status } = useSession();
  const { itemCount, cartItems } = useCart();
  const [menuState, setMenuState] = useState({ mobileMenu: false, espaceMenu: false });
  const isAdmin = session?.user?.role?.toLowerCase() === "admin";

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.log("Nombre total d'articles dans le panier :", itemCount);
      console.log("Articles du panier :", cartItems);
    }
  }, [itemCount, cartItems]);

  const toggleMobileMenu = () =>
    setMenuState((prev) => ({ ...prev, mobileMenu: !prev.mobileMenu }));

  const toggleEspaceMenu = () =>
    setMenuState((prev) => ({ ...prev, espaceMenu: !prev.espaceMenu }));

  return (
    <header className="bg-red-900 text-gray-200 border-t-4 border-green-800">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Logo />
        {/* Hamburger Menu */}
        <div className="lg:hidden">
          <button
            className="text-white text-2xl focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Ouvrir le menu mobile"
            aria-expanded={menuState.mobileMenu}
          >
            ☰
          </button>
        </div>
        {/* Navigation */}
        <NavigationMenu
          isOpen={menuState.mobileMenu}
          toggleMenu={toggleEspaceMenu}
          itemCount={itemCount}
          session={session}
          isAdmin={isAdmin}
        />
      </div>
    </header>
  );
}
