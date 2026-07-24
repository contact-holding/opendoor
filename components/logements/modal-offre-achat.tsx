"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Bouton from "@/components/ui/bouton";

export default function ModalOffreAchat({
  ouvert,
  onFermer,
  titreLogement,
}: {
  ouvert: boolean;
  onFermer: () => void;
  titreLogement: string;
}) {
  const [envoye, setEnvoye] = useState(false);
  if (!ouvert) return null;

  function envoyer(e: React.FormEvent) {
    e.preventDefault();
    setEnvoye(true);
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-encre/50 px-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-fond p-6 shadow-xl">
        <button onClick={onFermer} className="absolute right-4 top-4 text-encre/40 hover:text-encre" aria-label="Fermer">
          <X className="h-5 w-5" />
        </button>

        <span className="inline-block rounded-full bg-argile/10 px-3 py-1 text-xs font-medium text-argile">
          Demande d&apos;achat
        </span>
        <h3 className="mt-2 font-display text-lg">Faire une offre d&apos;achat</h3>
        <p className="mt-1 text-sm text-encre/60">Pour : {titreLogement}</p>

        {envoye ? (
          <p className="mt-6 text-sm text-mousse">
            Votre demande d&apos;achat a été transmise. Notre équipe vous
            recontacte sous 48h.
          </p>
        ) : (
          <form onSubmit={envoyer} className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Votre nom"
              required
              className="w-full rounded-lg border border-ligne px-3 py-2 text-sm outline-none focus:border-argile"
            />
            <input
              type="tel"
              placeholder="Votre téléphone"
              required
              className="w-full rounded-lg border border-ligne px-3 py-2 text-sm outline-none focus:border-argile"
            />
            <input
              type="number"
              placeholder="Votre offre (FCFA, optionnel)"
              className="w-full rounded-lg border border-ligne px-3 py-2 text-sm outline-none focus:border-argile"
            />
            <Bouton variante="principal" type="submit" className="w-full">
              Envoyer ma demande d&apos;achat
            </Bouton>
          </form>
        )}
      </div>
    </div>
  );
}