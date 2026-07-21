"use client";

import { useEffect, useState } from "react";
import { creerClientNavigateur } from "@/lib/supabase/client";
import type { Profil } from "@/types";

export function useUtilisateur() {
  const [profil, setProfil] = useState<Profil | null>(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const supabase = creerClientNavigateur();

    async function chargerProfil() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setProfil(null);
        setChargement(false);
        return;
      }

      const { data } = await supabase
        .from("profils")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfil(data as Profil | null);
      setChargement(false);
    }

    chargerProfil();

    const { data: abonnement } = supabase.auth.onAuthStateChange(() => {
      chargerProfil();
    });

    return () => abonnement.subscription.unsubscribe();
  }, []);

  return { profil, chargement, estConnecte: !!profil };
}