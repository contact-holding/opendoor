"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ChampTexte from "@/components/ui/champ-texte";
import Select from "@/components/ui/select";
import Bouton from "@/components/ui/bouton";
import { creerClientNavigateur } from "@/lib/supabase/client";
import type { Urgence } from "@/types";

const niveauxUrgence = [
  { valeur: "faible", label: "Faible" },
  { valeur: "normale", label: "Normale" },
  { valeur: "urgente", label: "Urgente" },
];

export default function FormulaireTicket({ logementId }: { logementId: string }) {
  const router = useRouter();
  const [enregistrement, setEnregistrement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  const [champs, setChamps] = useState({
    titre: "",
    description: "",
    urgence: "normale" as Urgence,
  });

  async function gererEnvoi(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);
    setEnregistrement(true);

    const supabase = creerClientNavigateur();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setErreur("Vous devez être connecté.");
      setEnregistrement(false);
      return;
    }

    const { error } = await supabase.from("incidents").insert({
      logement_id: logementId,
      locataire_id: user.id,
      titre: champs.titre,
      description: champs.description,
      urgence: champs.urgence,
      statut: "signale",
    });

    setEnregistrement(false);

    if (error) {
      setErreur(error.message);
      return;
    }

    router.push("/locataire/mes-incidents");
  }

  return (
    <form onSubmit={gererEnvoi} className="space-y-4">
      <ChampTexte
        label="Titre de l'incident"
        value={champs.titre}
        onChange={(e) => setChamps({ ...champs, titre: e.target.value })}
        placeholder="Ex : Fuite d'eau dans la salle de bain"
        required
      />

      <div>
        <label className="mb-1.5 block text-sm font-medium">Description</label>
        <textarea
          value={champs.description}
          onChange={(e) => setChamps({ ...champs, description: e.target.value })}
          rows={4}
          required
          className="w-full rounded-lg border border-ligne px-4 py-2.5 text-sm outline-none focus:border-argile"
        />
      </div>

      <Select
        label="Niveau d'urgence"
        value={champs.urgence}
        onChange={(e) => setChamps({ ...champs, urgence: e.target.value as Urgence })}
        options={niveauxUrgence}
      />

      {erreur && <p className="text-sm text-red-500">{erreur}</p>}

      <Bouton variante="principal" type="submit" disabled={enregistrement} className="w-full">
        {enregistrement ? "Envoi en cours…" : "Signaler l'incident"}
      </Bouton>
    </form>
  );
}