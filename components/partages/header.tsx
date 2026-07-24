"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Bouton from "@/components/ui/bouton";
import MenuUtilisateur from "@/components/partages/menu-utilisateur";

export default function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const { locale } = useParams();

  const liens = [
    { label: "Rechercher", href: "/" + locale + "/recherche" },
    { label: "Louer un logement", href: "/" + locale + "/louer-un-logement" },
    { label: "Acheter une maison", href: "/" + locale + "/acheter-une-maison" },
    { label: "À propos", href: "/" + locale + "/a-propos" },
    { label: "Contact", href: "/" + locale + "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-ligne bg-fond/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href={"/" + locale} className="flex items-center">
          <img src="/images/accueil/icone-opendoor.png" alt="Open Doors" className="h-12 w-auto" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {liens.map((lien) => (
            <Link key={lien.href} href={lien.href} className="text-sm text-encre/80 transition-colors hover:text-argile">
              {lien.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Bouton variante="fantome" href={"/" + locale + "/connexion"}>
            Connexion
          </Bouton>
          <Bouton variante="principal" href={"/" + locale + "/inscription"}>
            Publier un bien
          </Bouton>
          <MenuUtilisateur />
        </div>

        <button className="lg:hidden" onClick={() => setMenuOuvert(!menuOuvert)} aria-label="Ouvrir le menu">
          {menuOuvert ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOuvert && (
        <nav className="flex flex-col gap-4 border-t border-ligne px-6 py-4 lg:hidden">
          {liens.map((lien) => (
            <Link key={lien.href} href={lien.href} className="text-sm">
              {lien.label}
            </Link>
          ))}
          <Bouton variante="fantome" href={"/" + locale + "/connexion"} className="w-full">
            Connexion
          </Bouton>
          <Bouton variante="principal" href={"/" + locale + "/inscription"} className="w-full">
            Publier un bien
          </Bouton>
        </nav>
      )}
    </header>
  );
}