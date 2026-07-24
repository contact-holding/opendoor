"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Bouton from "@/components/ui/bouton";

export default function ModalDemanderVisite({
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

        <h3 className="font-display text-lg">Demander une visite</h3>
        <p className="mt-1 text-sm text-encre/60">Pour : {titreLogement}</p>

        {envoye ? (
          <p className="mt-6 text-sm text-mousse">
            Demande envoyée ! Vous serez contacté pour confirmer le rendez-vous.
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
              type="date"
              required
              className="w-full rounded-lg border border-ligne px-3 py-2 text-sm outline-none focus:border-argile"
            />
            <select className="w-full rounded-lg border border-ligne px-3 py-2 text-sm outline-none focus:border-argile">
              <option>Matin</option>
              <option>Après-midi</option>
            </select>
            <Bouton variante="principal" type="submit" className="w-full">
              Envoyer la demande
            </Bouton>
          </form>
        )}
      </div>
    </div>
  );
}