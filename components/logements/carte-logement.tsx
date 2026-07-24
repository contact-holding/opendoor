"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { BedDouble, Ruler, Heart, Star } from "lucide-react";
import Carte from "@/components/ui/carte";
import { formaterPrix } from "@/lib/utils";
import { creerClientNavigateur } from "@/lib/supabase/client";
import type { Logement } from "@/types";

export default function CarteLogement({ logement }: { logement: Logement }) {
  const [favori, setFavori] = useState(false);
  const router = useRouter();
  const { locale } = useParams();

  async function gererFavori(e: React.MouseEvent) {
    e.preventDefault();
    const supabase = creerClientNavigateur();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/" + locale + "/connexion");
      return;
    }
    setFavori(!favori);
  }

  return (
    <Link href={"/logements/" + logement.id} className="block h-full">
      <Carte className="group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
        <div className="relative h-48 w-full shrink-0 overflow-hidden bg-sable">
          <Image
            src={logement.photos?.[0]?.url ?? "/images/placeholders/logement-defaut.jpg"}
            alt={logement.titre}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <button
            onClick={gererFavori}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-fond/80 backdrop-blur transition-colors hover:bg-fond"
            aria-label="Ajouter aux favoris"
          >
            <Heart className={"h-4 w-4 " + (favori ? "fill-argile text-argile" : "text-encre/60")} />
          </button>

          {logement.promo && (
            <span className="absolute left-3 top-3 rounded-full bg-argile px-3 py-1 text-xs font-medium text-fond">
              {logement.promo}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-4">
          <p className="text-xs uppercase tracking-wide text-encre/50">
            {logement.quartier}, {logement.ville}
          </p>
          <h3 className="mt-1 line-clamp-2 min-h-[3rem] font-display text-lg">{logement.titre}</h3>

          {logement.note && (
            <div className="mt-2 flex items-center gap-1 text-xs text-encre/60">
              <Star className="h-3.5 w-3.5 fill-argile text-argile" />
              <span className="font-medium text-encre">{logement.note}</span>
              ({logement.nombreAvis} avis)
            </div>
          )}

          <div className="mt-3 flex items-center gap-4 text-sm text-encre/60">
            <span className="flex items-center gap-1">
              <BedDouble className="h-4 w-4" /> {logement.nombre_pieces} pièces
            </span>
            <span className="flex items-center gap-1">
              <Ruler className="h-4 w-4" /> {logement.surface} m²
            </span>
          </div>

          <p className="mt-auto pt-4 font-donnees text-base text-argile">
            {formaterPrix(logement.prix_mensuel)} <span className="text-xs text-encre/50">/ mois</span>
          </p>
        </div>
      </Carte>
    </Link>
  );
}