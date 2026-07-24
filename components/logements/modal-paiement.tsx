"use client";

import { X } from "lucide-react";

export default function ModalPaiement({
  ouvert,
  onFermer,
  montant,
}: {
  ouvert: boolean;
  onFermer: () => void;
  montant: number;
}) {
  if (!ouvert) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-encre/50 px-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-fond p-6 shadow-xl">
        <button onClick={onFermer} className="absolute right-4 top-4 text-encre/40 hover:text-encre" aria-label="Fermer">
          <X className="h-5 w-5" />
        </button>

        <h3 className="font-display text-lg">Réserver ce logement</h3>
        <p className="mt-1 text-sm text-encre/60">
          Premier mois : <span className="font-donnees text-argile">{montant.toLocaleString("fr-FR")} FCFA</span>
        </p>
        <p className="mt-4 text-sm text-encre/70">
          Effectuez le paiement via l&apos;un des numéros ci-dessous, puis
          envoyez la capture de confirmation par WhatsApp pour valider votre
          réservation.
        </p>

        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-3 rounded-xl bg-[#FFCB05]/15 p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFCB05] text-xs font-black text-encre">
              MTN
            </span>
            <div>
              <p className="text-sm font-medium">MTN Mobile Money</p>
              <p className="font-donnees text-sm text-encre/70">+237 650 00 00 00</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-[#FF6600]/10 p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF6600] text-xs font-black text-fond">
              OM
            </span>
            <div>
              <p className="text-sm font-medium">Orange Money</p>
              <p className="font-donnees text-sm text-encre/70">+237 690 00 00 00</p>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-encre/50">
          Aucun montant n&apos;est prélevé automatiquement. Le paiement se
          fait manuellement, en toute transparence.
        </p>
      </div>
    </div>
  );
}