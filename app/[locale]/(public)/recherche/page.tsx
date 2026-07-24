"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import CarteLogement from "@/components/logements/carte-logement";
import CarteInteractiveWrapper from "@/components/logements/carte-interactive-wrapper";
import FiltreRecherche from "@/components/logements/filtre-recherche";
import BasculeVue from "@/components/logements/bascule-vue";
import { logementsDemo } from "@/lib/donnees-demo";
import type { TypeLogement } from "@/types";
import ModalPromoRecherche from "@/components/logements/modal-promo-recherche";

export default function PageRecherche() {
  const searchParams = useSearchParams();
  const villeUrl = searchParams.get("ville")?.toLowerCase().trim();
  const typeUrl = searchParams.get("type") as TypeLogement | null;

  const [vue, setVue] = useState<"liste" | "carte">("liste");
  const [typeSelectionne, setTypeSelectionne] =
    useState<TypeLogement | null>(typeUrl ?? null);
  const [prixMin, setPrixMin] = useState("");
  const [prixMax, setPrixMax] = useState("");

  const resultats = logementsDemo.filter((logement) => {
    const correspondVille = villeUrl
      ? logement.ville.toLowerCase().includes(villeUrl) ||
        logement.quartier.toLowerCase().includes(villeUrl)
      : true;

    const correspondType = typeSelectionne
      ? logement.type === typeSelectionne
      : true;

    const correspondPrixMin = prixMin
      ? logement.prix_mensuel >= Number(prixMin)
      : true;

    const correspondPrixMax = prixMax
      ? logement.prix_mensuel <= Number(prixMax)
      : true;

    return (
      correspondVille &&
      correspondType &&
      correspondPrixMin &&
      correspondPrixMax
    );
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">

      {/* ✅ AJOUTE LE MODAL ICI */}
      <ModalPromoRecherche />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl">
            {searchParams.get("ville")
              ? "Logements à " + searchParams.get("ville")
              : "Logements à Douala, Kribi et Edéa"}
          </h1>

          <p className="mt-1 text-sm text-encre/60">
            {resultats.length} bien(s) disponible(s)
          </p>
        </div>

        <BasculeVue vue={vue} onChangerVue={setVue} />
      </div>

      <div className="mt-6">
        <FiltreRecherche
          typeSelectionne={typeSelectionne}
          onChangerType={setTypeSelectionne}
          prixMin={prixMin}
          prixMax={prixMax}
          onChangerPrixMin={setPrixMin}
          onChangerPrixMax={setPrixMax}
        />
      </div>

      <div className="mt-6">
        {resultats.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-ligne p-8 text-center text-sm text-encre/60">
            Aucun logement ne correspond à ces critères.
          </p>
        ) : vue === "liste" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resultats.map((logement) => (
              <CarteLogement
                key={logement.id}
                logement={logement}
              />
            ))}
          </div>
        ) : (
          <div className="h-[600px]">
            <CarteInteractiveWrapper logements={resultats} />
          </div>
        )}
      </div>
    </div>
  );
}