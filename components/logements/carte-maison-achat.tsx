"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BedDouble, Ruler } from "lucide-react";
import { formaterPrix } from "@/lib/utils";
import ModalOffreAchat from "@/components/logements/modal-offre-achat";
import type { Logement } from "@/types";

export default function CarteMaisonAchat({ logement }: { logement: Logement }) {
  const [modalOuvert, setModalOuvert] = useState(false);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-ligne">
      <Link href={"/logements/" + logement.id} className="relative block h-48 w-full overflow-hidden bg-sable">
        <Image
          src={logement.photos?.[0]?.url ?? "/images/placeholders/logement-defaut.jpg"}
          alt={logement.titre}
          fill
          className="object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs uppercase tracking-wide text-encre/50">
          {logement.quartier}, {logement.ville}
        </p>
        <h3 className="mt-1 line-clamp-2 min-h-[3rem] font-display text-lg">{logement.titre}</h3>

        <div className="mt-3 flex items-center gap-4 text-sm text-encre/60">
          <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" /> {logement.nombre_pieces} pièces</span>
          <span className="flex items-center gap-1"><Ruler className="h-4 w-4" /> {logement.surface} m²</span>
        </div>

        <p className="mt-3 font-donnees text-base text-argile">
          {formaterPrix(logement.prix_mensuel)}
        </p>

        <button
          onClick={() => setModalOuvert(true)}
          className="mt-4 w-full rounded-full bg-argile px-4 py-2.5 text-sm font-medium text-fond hover:bg-argile-fonce"
        >
          Faire une offre d&apos;achat
        </button>
      </div>

      <ModalOffreAchat
        ouvert={modalOuvert}
        onFermer={() => setModalOuvert(false)}
        titreLogement={logement.titre}
      />
    </div>
  );
}