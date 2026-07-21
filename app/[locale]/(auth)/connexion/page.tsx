"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ChampTexte from "@/components/ui/champ-texte";
import Bouton from "@/components/ui/bouton";
import { creerClientNavigateur } from "@/lib/supabase/client";

export default function PageConnexion() {
  const router = useRouter();
  const [champs, setChamps] = useState({ email: "", motDePasse: "" });
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);

  async function gererConnexion(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);
    setEnCours(true);

    const supabase = creerClientNavigateur();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: champs.email,
      password: champs.motDePasse,
    });

    if (error) {
      setErreur("Email ou mot de passe incorrect.");
      setEnCours(false);
      return;
    }

    const { data: profil } = await supabase
      .from("profils")
      .select("role")
      .eq("id", data.user.id)
      .single();

    setEnCours(false);

    if (profil?.role === "proprietaire") router.push("/proprietaire/tableau-de-bord");
    else if (profil?.role === "admin") router.push("/admin/tableau-de-bord");
    else router.push("/locataire/tableau-de-bord");
  }

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl">Connexion</h1>
      <p className="mb-6 text-sm text-encre/60">Accédez à votre espace</p>

      <form onSubmit={gererConnexion} className="space-y-4">
        <ChampTexte
          label="Email"
          type="email"
          value={champs.email}
          onChange={(e) => setChamps({ ...champs, email: e.target.value })}
          required
        />
        <ChampTexte
          label="Mot de passe"
          type="password"
          value={champs.motDePasse}
          onChange={(e) => setChamps({ ...champs, motDePasse: e.target.value })}
          required
        />

        {erreur && <p className="text-sm text-red-500">{erreur}</p>}

        <Bouton variante="principal" type="submit" disabled={enCours} className="w-full">
          {enCours ? "Connexion en cours…" : "Se connecter"}
        </Bouton>
      </form>

      <p className="mt-6 text-center text-sm text-encre/60">
        Pas encore de compte ?{" "}
        <Link href="/inscription" className="text-argile">
          S&apos;inscrire
        </Link>
      </p>
    </div>
  );
}