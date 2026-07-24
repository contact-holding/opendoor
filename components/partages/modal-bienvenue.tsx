"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { X } from "lucide-react";
import { creerClientNavigateur } from "@/lib/supabase/client";

export default function ModalBienvenue() {
  const [ouvert, setOuvert] = useState(false);
  const { locale } = useParams();

  useEffect(() => {
    const dejaVu = sessionStorage.getItem("opendoors_modal_bienvenue");
    if (!dejaVu) {
      const minuteur = setTimeout(() => setOuvert(true), 800);
      return () => clearTimeout(minuteur);
    }
  }, []);

  function fermer() {
    sessionStorage.setItem("opendoors_modal_bienvenue", "1");
    setOuvert(false);
  }

  async function connexionGoogle() {
    const supabase = creerClientNavigateur();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/" + locale },
    });
  }

  if (!ouvert) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-encre/50 px-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-fond p-8 text-center shadow-xl">
        <button
          onClick={fermer}
          className="absolute right-4 top-4 text-encre/40 hover:text-encre"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </button>

        <img src="/images/accueil/icone-opendoor.png" alt="Open Doors" className="mx-auto h-10 w-auto" />

        <h2 className="mt-4 font-display text-xl">Connectez-vous</h2>
        <p className="mt-2 text-sm text-encre/60">
          Sauvegardez vos logements favoris et accédez plus vite à vos recherches.
        </p>

        <button
          onClick={connexionGoogle}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-ligne px-6 py-3 text-sm font-medium hover:bg-sable"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.15-4.53H2.18v2.85A11 11 0 0 0 12 23z" />
            <path fill="#FBBC05" d="M5.85 14.1a6.6 6.6 0 0 1 0-4.2V7.05H2.18a11 11 0 0 0 0 9.9l3.67-2.85z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.05l3.67 2.85C6.71 7.3 9.14 5.38 12 5.38z" />
          </svg>
          Continuer avec Google
        </button>

        <button
          onClick={fermer}
          className="mt-3 w-full text-sm text-encre/50 hover:text-encre"
        >
          Continuer sans se connecter
        </button>
      </div>
    </div>
  );
}