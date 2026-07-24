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
  prixMin,
  prixMax,
  onChangerPrixMin,
  onChangerPrixMax,
}: {
  typeSelectionne: TypeLogement | null;
  onChangerType: (type: TypeLogement | null) => void;
  prixMin: string;
  prixMax: string;
  onChangerPrixMin: (valeur: string) => void;
  onChangerPrixMax: (valeur: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-ligne bg-fond p-4">
      <span className="flex items-center gap-2 text-sm text-encre/50">
        <SlidersHorizontal className="h-4 w-4" /> Filtrer
      </span>

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

      <div className="ml-auto flex items-center gap-2 text-sm">
        <input
          type="number"
          placeholder="Prix min"
          value={prixMin}
          onChange={(e) => onChangerPrixMin(e.target.value)}
          className="w-28 rounded-lg border border-ligne px-3 py-2 text-sm outline-none focus:border-argile"
        />
        <span className="text-encre/40">—</span>
        <input
          type="number"
          placeholder="Prix max"
          value={prixMax}
          onChange={(e) => onChangerPrixMax(e.target.value)}
          className="w-28 rounded-lg border border-ligne px-3 py-2 text-sm outline-none focus:border-argile"
        />
        <span className="text-xs text-encre/40">FCFA</span>
      </div>
    </div>
  );
}