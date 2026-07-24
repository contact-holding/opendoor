"use client";

import { useState } from "react";
import { Star, Plus, Quote } from "lucide-react";
import ModalNouvelAvis from "@/components/accueil/modal-nouvel-avis";

const avisDemo = [
  { nom: "Carel T.", role: "Locataire, Douala", note: 5, commentaire: "J'ai trouvé mon studio en 2 jours, contact direct, aucune arnaque." },
  { nom: "Aïcha M.", role: "Locataire, Kribi", note: 5, commentaire: "La visite était vraiment gratuite, logement conforme aux photos." },
  { nom: "Junior E.", role: "Locataire, Edéa", note: 4, commentaire: "Bon accompagnement, réponse rapide sur WhatsApp." },
  { nom: "Sarah B.", role: "Propriétaire, Douala", note: 5, commentaire: "Mon bien a été loué en une semaine, très satisfaite." },
  { nom: "Jordan M.", role: "Locataire, Douala", note: 4, commentaire: "Simple à utiliser, propriétaire vérifié comme annoncé." },
];

function initiales(nom: string) {
  return nom
    .split(" ")
    .map((mot) => mot[0])
    .join("")
    .toUpperCase();
}

export default function AvisClients() {
  const [modalOuvert, setModalOuvert] = useState(false);

  const avisDouble = [...avisDemo, ...avisDemo];

  return (
    <section className="border-y border-ligne bg-sable/30 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="font-donnees text-xs uppercase tracking-[0.2em] text-argile">
              Témoignages
            </p>
            <h2 className="mt-1 font-display text-2xl">Ce que disent nos utilisateurs</h2>
          </div>

          <button
            onClick={() => setModalOuvert(true)}
            className="flex items-center gap-2 rounded-full bg-argile px-4 py-2 text-sm font-medium text-fond hover:bg-argile-fonce"
          >
            <Plus className="h-4 w-4" /> Donner mon avis
          </button>
        </div>
      </div>

      <div className="group relative overflow-hidden">
        <div className="animate-defilement-avis flex w-max gap-4 px-6 group-hover:[animation-play-state:paused]">
          {avisDouble.map((avis, index) => (
            <div
              key={index}
              className="w-72 shrink-0 rounded-2xl border border-ligne bg-fond p-5 transition-shadow hover:shadow-md"
            >
              <Quote className="h-5 w-5 text-argile/40" />
              <p className="mt-2 line-clamp-3 text-sm text-encre/70">{avis.commentaire}</p>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-argile/10 text-xs font-semibold text-argile">
                  {initiales(avis.nom)}
                </div>
                <div>
                  <p className="text-sm font-medium">{avis.nom}</p>
                  <p className="text-xs text-encre/50">{avis.role}</p>
                </div>
                <div className="ml-auto flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={"h-3 w-3 " + (i < avis.note ? "fill-argile text-argile" : "text-ligne")}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModalNouvelAvis ouvert={modalOuvert} onFermer={() => setModalOuvert(false)} />
    </section>
  );
}