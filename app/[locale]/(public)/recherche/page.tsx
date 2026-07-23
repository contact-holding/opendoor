"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import CarteLogement from "@/components/logements/carte-logement";
import CarteInteractiveWrapper from "@/components/logements/carte-interactive-wrapper";
import FiltreRecherche from "@/components/logements/filtre-recherche";
import { logementsDemo } from "@/lib/donnees-demo";
import { ShieldCheck, Smartphone, Lock, RotateCcw } from "lucide-react";
import type { TypeLogement } from "@/types";

export default function PageRecherche() {
  const searchParams = useSearchParams();
  const villeUrl = searchParams.get("ville")?.toLowerCase().trim();

  const [typeSelectionne, setTypeSelectionne] = useState<TypeLogement | null>(null);
  const [prixMax, setPrixMax] = useState(500000);

  const resultats = logementsDemo.filter((logement) => {
    const correspondVille = villeUrl
      ? logement.ville.toLowerCase().includes(villeUrl) ||
        logement.quartier.toLowerCase().includes(villeUrl)
      : true;
    const correspondType = typeSelectionne ? logement.type === typeSelectionne : true;
    const correspondPrix = logement.prix_mensuel <= prixMax;
    return correspondVille && correspondType && correspondPrix;
  });

  return (
    <div>
      {/* Barre sticky en haut, comme Booking */}
      <div className="sticky top-[64px] z-30 border-b border-ligne bg-fond">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-6 py-4">
          <input
            type="text"
            defaultValue={searchParams.get("ville") ?? ""}
            placeholder="Ville ou quartier"
            className="flex-1 rounded-full border border-ligne px-4 py-2.5 text-sm outline-none focus:border-argile"
          />
          <button className="rounded-full bg-encre px-6 py-2.5 text-sm font-medium text-fond">
            Rechercher
          </button>
        </div>

        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-6 px-6 pb-4 text-xs text-encre/60">
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Propriétaires vérifiés</span>
          <span className="flex items-center gap-1.5"><Smartphone className="h-3.5 w-3.5" /> Contact direct WhatsApp</span>
          <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> Aucune donnée bancaire requise</span>
          <span className="flex items-center gap-1.5"><RotateCcw className="h-3.5 w-3.5" /> Visite en présentiel</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-6">
        <h1 className="font-display text-2xl">
          {searchParams.get("ville")
            ? "Logements à " + searchParams.get("ville")
            : "Logements à Douala, Kribi et Edéa"}
        </h1>
        <p className="mt-1 text-sm text-encre/60">{resultats.length} bien(s) disponible(s)</p>
      </div>

      {/* Colonne liste (défile) + carte (fixe), comme Booking */}
      <div className="mx-auto flex max-w-[1600px] gap-0 px-6 pb-16">
        <div className="w-full lg:w-[55%]">
          <div className="mb-4">
            <FiltreRecherche
              typeSelectionne={typeSelectionne}
              onChangerType={setTypeSelectionne}
              prixMax={prixMax}
              onChangerPrixMax={setPrixMax}
              horizontal
            />
          </div>

          {resultats.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-ligne p-8 text-center text-sm text-encre/60">
              Aucun logement ne correspond à ces critères.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {resultats.map((logement) => (
                <CarteLogement key={logement.id} logement={logement} />
              ))}
            </div>
          )}
        </div>

        {/* Carte sticky, visible uniquement en grand écran, comme Booking */}
        <div className="hidden lg:block lg:w-[45%]">
          <div className="sticky top-[180px] h-[calc(100vh-200px)]">
            <CarteInteractiveWrapper logements={resultats} />
          </div>
        </div>
      </div>
    </div>
  );
}