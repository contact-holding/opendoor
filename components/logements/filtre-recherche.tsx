"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

const typesLogement = [
  { valeur: "appartement", label: "Appartement" },
  { valeur: "studio", label: "Studio" },
  { valeur: "maison", label: "Maison" },
  { valeur: "chambre", label: "Chambre" },
];

export default function FiltreRecherche() {
  const [typeSelectionne, setTypeSelectionne] = useState<string | null>(null);

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
              onClick={() =>
                setTypeSelectionne(typeSelectionne === type.valeur ? null : type.valeur)
              }
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                typeSelectionne === type.valeur
                  ? "border-argile bg-argile text-fond"
                  : "border-ligne text-encre/70 hover:border-argile"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-2">
        <p className="mb-2 text-sm font-medium">Prix maximum</p>
        <input type="range" min={20000} max={500000} step={5000} className="w-full accent-argile" />
      </div>
    </aside>
  );
}