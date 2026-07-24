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

  async function connexionGoogle() {
    const supabase = creerClientNavigateur();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  }

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl">Connexion</h1>
      <p className="mb-6 text-sm text-encre/60">Accédez à votre espace</p>

      <button
        type="button"
        onClick={connexionGoogle}
        className="mb-6 flex w-full items-center justify-center gap-2 rounded-full border border-ligne px-6 py-3 text-sm font-medium hover:bg-sable"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.15-4.53H2.18v2.85A11 11 0 0 0 12 23z" />
          <path fill="#FBBC05" d="M5.85 14.1a6.6 6.6 0 0 1 0-4.2V7.05H2.18a11 11 0 0 0 0 9.9l3.67-2.85z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.05l3.67 2.85C6.71 7.3 9.14 5.38 12 5.38z" />
        </svg>
        Continuer avec Google
      </button>

      <div className="mb-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-ligne" />
        <span className="text-xs text-encre/40">ou</span>
        <div className="h-px flex-1 bg-ligne" />
      </div>

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