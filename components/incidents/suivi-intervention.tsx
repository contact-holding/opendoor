import { Check } from "lucide-react";
import type { StatutIncident } from "@/types";

const etapes: { cle: StatutIncident; label: string }[] = [
  { cle: "signale", label: "Signalé" },
  { cle: "pris_en_charge", label: "Pris en charge" },
  { cle: "resolu", label: "Résolu" },
];

export default function SuiviIntervention({ statutActuel }: { statutActuel: StatutIncident }) {
  const indexActuel = etapes.findIndex((etape) => etape.cle === statutActuel);

  return (
    <div className="flex items-center">
      {etapes.map((etape, index) => {
        const atteinte = index <= indexActuel;
        return (
          <div key={etape.cle} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  atteinte ? "bg-argile text-fond" : "bg-sable text-encre/40"
                }`}
              >
                {atteinte ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <p className="text-xs text-encre/60">{etape.label}</p>
            </div>
            {index < etapes.length - 1 && (
              <div
                className={`mx-2 h-0.5 flex-1 ${
                  index < indexActuel ? "bg-argile" : "bg-ligne"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}