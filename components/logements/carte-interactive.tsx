import { MapPin } from "lucide-react";
import type { Logement } from "@/types";

export default function CarteInteractive({ logements }: { logements: Logement[] }) {
  return (
    <div className="flex h-full min-h-[400px] w-full items-center justify-center rounded-2xl border border-ligne bg-sable/40">
      <div className="text-center text-encre/50">
        <MapPin className="mx-auto mb-2 h-6 w-6" />
        <p className="text-sm">
          Carte interactive — {logements.length} logement(s) à afficher
        </p>
        <p className="mt-1 text-xs">
          (intégration Leaflet/Mapbox à connecter dans un prochain bloc)
        </p>
      </div>
    </div>
  );
}