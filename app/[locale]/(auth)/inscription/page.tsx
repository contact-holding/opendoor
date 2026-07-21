"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ChampTexte from "@/components/ui/champ-texte";
import Select from "@/components/ui/select";
import Bouton from "@/components/ui/bouton";
import { creerClientNavigateur } from "@/lib/supabase/client";
import type { Role } from "@/types";

const roles = [
  { valeur: "locataire", label: "Je cherche un logement (locataire)" },
  { valeur: "proprietaire", label: "Je publie un bien (propriétaire)" },
];

export default function PageInscription() {
  const router = useRouter();
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);

  const [champs, setChamps] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    motDePasse: "",
    role: "locataire" as Role,
  });

  async function gererInscription(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);
    setEnCours(true);

    const supabase = creerClientNavigateur();

    const { error } = await supabase.auth.signUp({
      email: champs.email,
      password: champs.motDePasse,
      options: {
        data: {
          nom: champs.nom,
          prenom: champs.prenom,
          role: champs.role,
        },
      },
    });

    setEnCours(false);

    if (error) {
      setErreur(error.message);
      return;
    }

    router.push(
      champs.role === "proprietaire"
        ? "/proprietaire/tableau-de-bord"
        : "/locataire/tableau-de-bord"
    );
  }

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl">Créer un compte</h1>
      <p className="mb-6 text-sm text-encre/60">Rejoignez la plateforme en quelques instants</p>

      <form onSubmit={gererInscription} className="space-y-4">
        <Select
          label="Vous êtes"
          value={champs.role}
          onChange={(e) => setChamps({ ...champs, role: e.target.value as Role })}
          options={roles}
        />

        <div className="grid grid-cols-2 gap-3">
          <ChampTexte
            label="Prénom"
            value={champs.prenom}
            onChange={(e) => setChamps({ ...champs, prenom: e.target.value })}
            required
          />
          <ChampTexte
            label="Nom"
            value={champs.nom}
            onChange={(e) => setChamps({ ...champs, nom: e.target.value })}
            required
          />
        </div>

        <ChampTexte
          label="Email"
          type="email"
          value={champs.email}
          onChange={(e) => setChamps({ ...champs, email: e.target.value })}
          required
        />
        <ChampTexte
          label="Téléphone"
          type="tel"
          value={champs.telephone}
          onChange={(e) => setChamps({ ...champs, telephone: e.target.value })}
        />
        <ChampTexte
          label="Mot de passe"
          type="password"
          value={champs.motDePasse}
          onChange={(e) => setChamps({ ...champs, motDePasse: e.target.value })}
          minLength={6}
          required
        />

        {erreur && <p className="text-sm text-red-500">{erreur}</p>}

        <Bouton variante="principal" type="submit" disabled={enCours} className="w-full">
          {enCours ? "Création en cours…" : "Créer mon compte"}
        </Bouton>
      </form>

      <p className="mt-6 text-center text-sm text-encre/60">
        Déjà inscrit ?{" "}
        <Link href="/connexion" className="text-argile">
          Se connecter
        </Link>
      </p>
    </div>
  );
}