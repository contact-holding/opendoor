"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ChampTexte from "@/components/ui/champ-texte";
import Bouton from "@/components/ui/bouton";
import { creerClientNavigateur } from "@/lib/supabase/client";

export default function FormulaireBail({
  logementId,
  proprietaireId,
}: {
  logementId: string;
  proprietaireId: string;
}) {
  const router = useRouter();
  const [enregistrement, setEnregistrement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  const [champs, setChamps] = useState({
    emailLocataire: "",
    dateDebut: "",
    dateFin: "",
    montantLoyer: "",
  });

  async function gererEnvoi(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);
    setEnregistrement(true);

    const supabase = creerClientNavigateur();

    const { data: profilLocataire, error: erreurRecherche } = await supabase
      .from("profils")
      .select("id")
      .eq("id", champs.emailLocataire) // remplacé par une vraie recherche par email plus tard via une fonction RPC
      .single();

    if (erreurRecherche || !profilLocataire) {
      setErreur("Locataire introuvable. Vérifiez l'email renseigné.");
      setEnregistrement(false);
      return;
    }

    const { error: erreurContrat } = await supabase.from("contrats").insert({
      logement_id: logementId,
      proprietaire_id: proprietaireId,
      locataire_id: profilLocataire.id,
      date_debut: champs.dateDebut,
      date_fin: champs.dateFin || null,
      montant_loyer: Number(champs.montantLoyer),
      statut: "en_attente",
    });

    setEnregistrement(false);

    if (erreurContrat) {
      setErreur(erreurContrat.message);
      return;
    }

    router.push("/proprietaire/mes-contrats");
  }

  return (
    <form onSubmit={gererEnvoi} className="space-y-4">
      <ChampTexte
        label="Email du locataire"
        type="email"
        value={champs.emailLocataire}
        onChange={(e) => setChamps({ ...champs, emailLocataire: e.target.value })}
        required
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <ChampTexte
          label="Date de début"
          type="date"
          value={champs.dateDebut}
          onChange={(e) => setChamps({ ...champs, dateDebut: e.target.value })}
          required
        />
        <ChampTexte
          label="Date de fin (optionnel)"
          type="date"
          value={champs.dateFin}
          onChange={(e) => setChamps({ ...champs, dateFin: e.target.value })}
        />
      </div>
      <ChampTexte
        label="Montant du loyer mensuel (FCFA)"
        type="number"
        value={champs.montantLoyer}
        onChange={(e) => setChamps({ ...champs, montantLoyer: e.target.value })}
        required
      />

      {erreur && <p className="text-sm text-red-500">{erreur}</p>}

      <Bouton variante="principal" type="submit" disabled={enregistrement} className="w-full">
        {enregistrement ? "Création en cours…" : "Créer le contrat"}
      </Bouton>
    </form>
  );
}