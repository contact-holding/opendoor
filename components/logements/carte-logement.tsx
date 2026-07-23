import Image from "next/image";
import Link from "next/link";
import { BedDouble, Ruler } from "lucide-react";
import Carte from "@/components/ui/carte";
import { formaterPrix } from "@/lib/utils";
import type { Logement } from "@/types";

export default function CarteLogement({ logement }: { logement: Logement }) {
  return (
    <Link href={`/logements/${logement.id}`}>
      <Carte className="group overflow-hidden transition-shadow hover:shadow-md">
        <div className="relative h-48 w-full overflow-hidden bg-sable">
          <Image
            src={logement.photos?.[0]?.url ?? "/images/placeholders/logement-defaut.jpg"}
            alt={logement.titre}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {logement.disponible && (
            <span className="absolute left-3 top-3 rounded-full bg-mousse px-3 py-1 text-xs font-medium text-fond">
              Disponible
            </span>
          )}
        </div>

        <div className="p-4">
          <p className="text-xs uppercase tracking-wide text-encre/50">
            {logement.quartier}, {logement.ville}
          </p>
          <h3 className="mt-1 font-display text-lg">{logement.titre}</h3>

          <div className="mt-3 flex items-center gap-4 text-sm text-encre/60">
            <span className="flex items-center gap-1">
              <BedDouble className="h-4 w-4" /> {logement.nombrePieces} pièces
            </span>
            <span className="flex items-center gap-1">
              <Ruler className="h-4 w-4" /> {logement.surface} m²
            </span>
          </div>

          <p className="mt-4 font-donnees text-base text-argile">
            {formaterPrix(logement.prixMensuel)} <span className="text-xs text-encre/50">/ mois</span>
          </p>
        </div>
      </Carte>
    </Link>
  );
}