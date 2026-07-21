"use client";

import Link from "next/link";
import { useState } from "react";
import { Key, Menu, X } from "lucide-react";
import Bouton from "@/components/ui/bouton";

const liens = [
  { label: "Rechercher", href: "/recherche" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ligne bg-fond/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-display text-xl">
          <Key className="h-5 w-5 text-argile" strokeWidth={1.75} />
          Clevia
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {liens.map((lien) => (
            <Link
              key={lien.href}
              href={lien.href}
              className="text-sm text-encre/80 transition-colors hover:text-argile"
            >
              {lien.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Bouton variante="fantome" href="/connexion">
            Connexion
          </Bouton>
          <Bouton variante="principal" href="/inscription">
            Publier un bien
          </Bouton>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMenuOuvert(!menuOuvert)}
          aria-label="Ouvrir le menu"
        >
          {menuOuvert ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOuvert && (
        <nav className="flex flex-col gap-4 border-t border-ligne px-6 py-4 md:hidden">
          {liens.map((lien) => (
            <Link key={lien.href} href={lien.href} className="text-sm">
              {lien.label}
            </Link>
          ))}
          <Bouton variante="principal" href="/inscription" className="mt-2 w-full">
            Publier un bien
          </Bouton>
        </nav>
      )}
    </header>
  );
}