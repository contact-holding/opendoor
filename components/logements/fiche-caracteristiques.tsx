import { BedDouble, Ruler, Home, Check } from "lucide-react";
import type { Logement } from "@/types";

export default function FicheCaracteristiques({ logement }: { logement: Logement }) {
  const caracteristiques = [
    { icone: Home, label: "Type", valeur: logement.type },
    { icone: BedDouble, label: "Pièces", valeur: logement.nombrePieces },
    { icone: Ruler, label: "Surface", valeur: `${logement.surface} m²` },
  ];

  return (
    <div className="rounded-2xl border border-ligne p-5">
      <h2 className="mb-4 font-display text-lg">Caractéristiques</h2>

      <div className="grid grid-cols-3 gap-4">
        {caracteristiques.map(({ icone: Icone, label, valeur }) => (
          <div key={label} className="text-center">
            <Icone className="mx-auto h-5 w-5 text-argile" strokeWidth={1.5} />
            <p className="mt-2 text-xs text-encre/50">{label}</p>
            <p className="font-donnees text-sm">{valeur}</p>
          </div>
        ))}
      </div>

      {logement.equipements.length > 0 && (
        <div className="mt-6">
          <p className="mb-3 text-sm font-medium">Équipements</p>
          <ul className="grid grid-cols-2 gap-2">
            {logement.equipements.map((equipement) => (
              <li key={equipement} className="flex items-center gap-2 text-sm text-encre/70">
                <Check className="h-4 w-4 text-mousse" /> {equipement}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}