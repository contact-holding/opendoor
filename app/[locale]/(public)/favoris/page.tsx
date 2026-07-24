"use client";

import { useEffect, useState } from "react";
import CarteLogement from "@/components/logements/carte-logement";
import EtatVide from "@/components/partages/etat-vide";
import { creerClientNavigateur } from "@/lib/supabase/client";
import { logementsDemo } from "@/lib/donnees-demo";
import type { Logement } from "@/types";

export default function PageFavoris() {
  const [chargement, setChargement] = useState(true);
  const [connecte, setConnecte] = useState(false);

  useEffect(() => {
    async function verifier() {
      const supabase = creerClientNavigateur();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setConnecte(!!user);
      setChargement(false);
    }
    verifier();
  }, []);

  // en attendant la vraie table favoris connectée, on affiche 2 logements de démo
  const favorisDemo: Logement[] = logementsDemo.slice(0, 2);

  if (chargement) {
    return <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-encre/50">Chargement…</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-2xl">Mes favoris</h1>

      {!connecte ? (
        <div className="mt-6">
          <EtatVide
            titre="Connectez-vous pour voir vos favoris"
            message="Vos logements enregistrés apparaîtront ici une fois connecté."
          />
        </div>
      ) : favorisDemo.length === 0 ? (
        <div className="mt-6">
          <EtatVide
            titre="Aucun favori pour le moment"
            message="Cliquez sur le cœur d'un logement pour l'ajouter ici."
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorisDemo.map((logement) => (
            <CarteLogement key={logement.id} logement={logement} />
          ))}
        </div>
      )}
    </div>
  );
}