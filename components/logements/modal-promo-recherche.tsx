"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { X, PartyPopper } from "lucide-react";
import Link from "next/link";

export default function ModalPromoRecherche() {
  const [ouvert, setOuvert] = useState(false);
  const { locale } = useParams();

  useEffect(() => {
    const dejaVu = sessionStorage.getItem("opendoors_modal_recherche");
    if (!dejaVu) {
      const minuteur = setTimeout(() => setOuvert(true), 600);
      return () => clearTimeout(minuteur);
    }
  }, []);

  function fermer() {
    sessionStorage.setItem("opendoors_modal_recherche", "1");
    setOuvert(false);
  }

  if (!ouvert) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-encre/50 px-4">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-fond shadow-xl md:flex">
        <button
          onClick={fermer}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-ligne bg-fond hover:bg-sable"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex w-full flex-col items-center justify-center bg-argile/10 p-8 text-center md:w-2/5">
          <PartyPopper className="h-12 w-12 text-argile" strokeWidth={1.5} />
        </div>

        <div className="w-full p-8 md:w-3/5">
          <p className="text-xs font-medium uppercase tracking-wide text-argile">Bon plan</p>
          <h3 className="mt-2 font-display text-xl">
            Une sélection de logements en visite gratuite
          </h3>
          <p className="mt-2 text-sm text-encre/60">
            Repérez les badges « Visite gratuite » sur nos annonces à
            Douala, Kribi et Edéa pour visiter sans frais.
          </p>

          <Link
            href={"/" + locale + "/recherche"}
            onClick={fermer}
            className="mt-6 block rounded-full bg-argile px-6 py-3 text-center text-sm font-medium text-fond hover:bg-argile-fonce"
          >
            Voir les logements
          </Link>

          <Link
            href={"/" + locale + "/connexion"}
            onClick={fermer}
            className="mt-3 block text-center text-sm text-encre/60 hover:text-argile"
          >
            Se connecter pour plus d&apos;options
          </Link>
        </div>
      </div>
    </div>
  );
}