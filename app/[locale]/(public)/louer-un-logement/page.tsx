"use client";

import { useState } from "react";
import CarteLogement from "@/components/logements/carte-logement";
import FiltreRecherche from "@/components/logements/filtre-recherche";
import { logementsDemo } from "@/lib/donnees-demo";
import { ShieldCheck, Wallet, Handshake } from "lucide-react";
import type { TypeLogement } from "@/types";

export default function PageLouerLogement() {
  const [typeSelectionne, setTypeSelectionne] = useState<TypeLogement | null>(null);
  const [prixMin, setPrixMin] = useState("");
  const [prixMax, setPrixMax] = useState("");

  const resultats = logementsDemo
    .filter((l) => l.type === "studio" || l.type === "chambre" || l.type === "appartement")
    .filter((l) => (typeSelectionne ? l.type === typeSelectionne : true))
    .filter((l) => (prixMin ? l.prix_mensuel >= Number(prixMin) : true))
    .filter((l) => (prixMax ? l.prix_mensuel <= Number(prixMax) : true));

  return (
    <div>
      <section className="border-b border-ligne bg-sable/40">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="font-donnees text-xs uppercase tracking-[0.2em] text-argile">
            Location
          </p>
          <h1 className="mt-2 font-display text-4xl">Louer un logement au Cameroun</h1>
          <p className="mt-3 max-w-xl text-sm text-encre/70">
            Studios, chambres et appartements vérifiés à Douala, Kribi et Edéa.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl bg-fond p-4">
              <ShieldCheck className="h-5 w-5 text-argile" />
              <span className="text-sm">Propriétaires vérifiés</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-fond p-4">
              <Wallet className="h-5 w-5 text-argile" />
              <span className="text-sm">MTN MoMo / Orange Money</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-fond p-4">
              <Handshake className="h-5 w-5 text-argile" />
              <span className="text-sm">Accompagnement humain</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <FiltreRecherche
          typeSelectionne={typeSelectionne}
          onChangerType={setTypeSelectionne}
          prixMin={prixMin}
          prixMax={prixMax}
          onChangerPrixMin={setPrixMin}
          onChangerPrixMax={setPrixMax}
        />

        <p className="mb-4 mt-4 text-sm text-encre/60">
          {resultats.length} bien(s) disponible(s) à la location
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resultats.map((logement) => (
            <CarteLogement key={logement.id} logement={logement} />
          ))}
        </div>
      </div>
    </div>
  );
}