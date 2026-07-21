"use client";

import { useEffect, useState } from "react";
import { creerClientNavigateur } from "@/lib/supabase/client";
import type { Logement } from "@/types";

interface FiltresLogements {
  ville?: string;
  type?: string;
  prixMax?: number;
}

export function useLogements(filtres: FiltresLogements = {}) {
  const [logements, setLogements] = useState<Logement[]>([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    const supabase = creerClientNavigateur();

    async function chargerLogements() {
      setChargement(true);
      let requete = supabase
        .from("logements")
        .select("*, photos:photos_logements(*)")
        .order("created_at", { ascending: false });

      if (filtres.ville) requete = requete.ilike("ville", `%${filtres.ville}%`);
      if (filtres.type) requete = requete.eq("type", filtres.type);
      if (filtres.prixMax) requete = requete.lte("prix_mensuel", filtres.prixMax);

      const { data, error } = await requete;

      if (error) setErreur(error.message);
      setLogements((data as Logement[]) ?? []);
      setChargement(false);
    }

    chargerLogements();
  }, [filtres.ville, filtres.type, filtres.prixMax]);

  return { logements, chargement, erreur };
}