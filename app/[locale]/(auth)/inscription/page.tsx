"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Home, Building2, Users } from "lucide-react";
import ChampTexte from "@/components/ui/champ-texte";
import Bouton from "@/components/ui/bouton";
import { creerClientNavigateur } from "@/lib/supabase/client";
import type { Role } from "@/types";

const choix = [
  { role: "locataire" as Role, icone: Home, titre: "Trouver un logement", description: "Réserver ou louer" },
  { role: "proprietaire" as Role, icone: Building2, titre: "Publier un bien", description: "Rentabiliser mon logement" },
  { role: "proprietaire" as Role, icone: Users, titre: "Agent immobilier", description: "Publier au nom de mes clients" },
];

export default function PageInscription() {
  const router = useRouter();
  const [indexChoisi, setIndexChoisi] = useState(0);
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);

  const [champs, setChamps] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    motDePasse: "",
  });

  const roleChoisi = choix[indexChoisi].role;

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
          role: roleChoisi,
        },
      },
    });

    setEnCours(false);

    if (error) {
      setErreur(error.message);
      return;
    }

    router.push(
      roleChoisi === "proprietaire"
        ? "/proprietaire/tableau-de-bord"
        : "/locataire/tableau-de-bord"
    );
  }

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl">Créez votre compte</h1>
      <p className="mb-6 text-sm text-encre/60">
        Rejoignez des locataires et propriétaires au Cameroun, en moins d&apos;une minute.
      </p>

      <p className="mb-3 text-sm font-medium">Je souhaite</p>
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {choix.map((option, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setIndexChoisi(index)}
            className={
              "rounded-xl border p-4 text-left transition-colors " +
              (indexChoisi === index ? "border-argile" : "border-ligne hover:border-argile")
            }
          >
            <option.icone className="h-5 w-5 text-argile" />
            <p className="mt-2 text-sm font-medium">{option.titre}</p>
            <p className="text-xs text-encre/60">{option.description}</p>
          </button>
        ))}
      </div>

      <form onSubmit={gererInscription} className="space-y-4">
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
          placeholder="+237 6XX XX XX XX"
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
          {enCours ? "Création en cours…" : "Créer le compte"}
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