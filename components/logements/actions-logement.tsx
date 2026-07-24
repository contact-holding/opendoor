"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import Bouton from "@/components/ui/bouton";
import ModalPaiement from "@/components/logements/modal-paiement";
import ModalContactProprietaire from "@/components/logements/modal-contact-proprietaire";
import ModalDemanderVisite from "@/components/logements/modal-demander-visite";
import { formaterPrix } from "@/lib/utils";
import type { Logement } from "@/types";

export default function ActionsLogement({ logement }: { logement: Logement }) {
  const [modalPaiement, setModalPaiement] = useState(false);
  const [modalContact, setModalContact] = useState(false);
  const [modalVisite, setModalVisite] = useState(false);
  const lienWhatsapp = "https://wa.me/" + logement.whatsapp;

  return (
    <aside className="h-fit rounded-2xl border border-ligne p-6 lg:sticky lg:top-24">
      <p className="font-donnees text-2xl text-argile">
        {formaterPrix(logement.prix_mensuel)}
        <span className="text-sm text-encre/50"> / mois</span>
      </p>
      <p className="mt-1 text-sm text-encre/60">
        {logement.disponible ? "Disponible dès maintenant" : "Actuellement loué"}
      </p>

      <Bouton variante="principal" className="mt-6 w-full" onClick={() => setModalPaiement(true)}>
        Réserver
      </Bouton>

      <Bouton variante="fantome" className="mt-3 w-full" onClick={() => setModalContact(true)}>
        Contacter le propriétaire
      </Bouton>

      {logement.whatsapp && (
        <Bouton
          variante="fantome"
          href={lienWhatsapp}
          nouvelOnglet
          className="mt-3 w-full border-mousse text-mousse hover:bg-mousse/10"
        >
          <MessageCircle className="h-4 w-4" />
          Contacter sur WhatsApp
        </Bouton>
      )}

      <Bouton variante="fantome" className="mt-3 w-full" onClick={() => setModalVisite(true)}>
        Demander une visite
      </Bouton>

      <ModalPaiement ouvert={modalPaiement} onFermer={() => setModalPaiement(false)} montant={logement.prix_mensuel} />
      <ModalContactProprietaire ouvert={modalContact} onFermer={() => setModalContact(false)} titreLogement={logement.titre} />
      <ModalDemanderVisite ouvert={modalVisite} onFermer={() => setModalVisite(false)} titreLogement={logement.titre} />
    </aside>
  );
}