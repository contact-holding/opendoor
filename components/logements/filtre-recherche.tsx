"use client";

import { SlidersHorizontal } from "lucide-react";
import type { TypeLogement } from "@/types";

const typesLogement: { valeur: TypeLogement; label: string }[] = [
  { valeur: "appartement", label: "Appartement" },
  { valeur: "studio", label: "Studio" },
  { valeur: "maison", label: "Maison" },
  { valeur: "chambre", label: "Chambre" },
];

export default function FiltreRecherche({
  typeSelectionne,
  onChangerType,
  prixMax,
  onChangerPrixMax,
  horizontal = false,
}: {
  typeSelectionne: TypeLogement | null;
  onChangerType: (type: TypeLogement | null) => void;
  prixMax: number;
  onChangerPrixMax: (valeur: number) => void;
  horizontal?: boolean;
}) {
  if (horizontal) {
    return (
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-ligne bg-fond p-4">
        <SlidersHorizontal className="h-4 w-4 text-encre/40" />
        {typesLogement.map((type) => (
          <button
            key={type.valeur}
            onClick={() => onChangerType(typeSelectionne === type.valeur ? null : type.valeur)}
            className={
              "rounded-full border px-3 py-1.5 text-xs transition-colors " +
              (typeSelectionne === type.valeur
                ? "border-argile bg-argile text-fond"
                : "border-ligne text-encre/70 hover:border-argile")
            }
          >
            {type.label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 text-xs text-encre/60">
          Budget max :
          <input
            type="range"
            min={20000}
            max={500000}
            step={5000}
            value={prixMax}
            onChange={(e) => onChangerPrixMax(Number(e.target.value))}
            className="w-32 accent-argile"
          />
          <span className="font-donnees text-argile">{prixMax.toLocaleString("fr-FR")} FCFA</span>
        </div>
      </div>
    );
  }

  return (
    <aside className="w-full shrink-0 rounded-2xl border border-ligne bg-fond p-5 md:w-64">
      <div className="mb-4 flex items-center gap-2 font-display text-lg">
        <SlidersHorizontal className="h-4 w-4" />
        Filtres
      </div>
      <div className="mb-6">
        <p className="mb-2 text-sm font-medium">Type de bien</p>
        <div className="flex flex-wrap gap-2">
          {typesLogement.map((type) => (
            <button
              key={type.valeur}
              onClick={() => onChangerType(typeSelectionne === type.valeur ? null : type.valeur)}
              className={
                "rounded-full border px-3 py-1.5 text-xs transition-colors " +
                (typeSelectionne === type.valeur
                  ? "border-argile bg-argile text-fond"
                  : "border-ligne text-encre/70 hover:border-argile")
              }
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">
          Prix maximum : <span className="font-donnees text-argile">{prixMax.toLocaleString("fr-FR")} FCFA</span>
        </p>
        <input
          type="range"
          min={20000}
          max={500000}
          step={5000}
          value={prixMax}
          onChange={(e) => onChangerPrixMax(Number(e.target.value))}
          className="w-full accent-argile"
        />
      </div>
    </aside>
  );
}