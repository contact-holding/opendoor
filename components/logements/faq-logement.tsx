"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const questions = [
  {
    q: "Combien de personnes peuvent séjourner dans ce logement ?",
    r: "La capacité dépend du nombre de pièces indiqué sur l'annonce. Contactez le propriétaire pour confirmer.",
  },
  {
    q: "Comment se passe la visite du logement ?",
    r: "Vous contactez le propriétaire par WhatsApp ou par message, puis vous convenez ensemble d'un rendez-vous en présentiel.",
  },
  {
    q: "Faut-il payer en ligne pour réserver ?",
    r: "Non. Open Doors ne gère aucun paiement en ligne. Toute transaction se fait directement entre vous et le propriétaire.",
  },
  {
    q: "Le logement est-il vérifié ?",
    r: "Chaque annonce est contrôlée par l'équipe Open Doors avant publication.",
  },
];

export default function FaqLogement() {
  const [ouvert, setOuvert] = useState<number | null>(null);

  return (
    <div className="divide-y divide-ligne rounded-2xl border border-ligne">
      {questions.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => setOuvert(ouvert === index ? null : index)}
            className="flex w-full items-center justify-between p-4 text-left text-sm font-medium"
          >
            {item.q}
            <ChevronDown
              className={
                "h-4 w-4 shrink-0 transition-transform " +
                (ouvert === index ? "rotate-180" : "")
              }
            />
          </button>
          {ouvert === index && (
            <p className="px-4 pb-4 text-sm text-encre/60">{item.r}</p>
          )}
        </div>
      ))}
    </div>
  );
}