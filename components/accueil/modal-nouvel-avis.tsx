"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { X, Star } from "lucide-react";
import Bouton from "@/components/ui/bouton";
import { creerClientNavigateur } from "@/lib/supabase/client";

export default function ModalNouvelAvis({
  ouvert,
  onFermer,
}: {
  ouvert: boolean;
  onFermer: () => void;
}) {
  const router = useRouter();
  const { locale } = useParams();
  const [pretAAfficher, setPretAAfficher] = useState(false);
  const [note, setNote] = useState(5);
  const [commentaire, setCommentaire] = useState("");
  const [envoye, setEnvoye] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    if (!ouvert) return;

    async function verifier() {
      const supabase = creerClientNavigateur();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        onFermer();
        router.push("/" + locale + "/connexion");
        return;
      }
      setPretAAfficher(true);
    }
    verifier();
  }, [ouvert]);

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);

    const supabase = creerClientNavigateur();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profil } = await supabase.from("profils").select("role").eq("id", user.id).single();

    const { error } = await supabase.from("avis").insert({
      auteur_id: user.id,
      note,
      commentaire,
      role_auteur: profil?.role === "proprietaire" ? "proprietaire" : "locataire",
    });

    if (error) {
      setErreur(error.message);
      return;
    }
    setEnvoye(true);
  }

  if (!ouvert || !pretAAfficher) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-encre/50 px-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-fond p-6 shadow-xl">
        <button onClick={onFermer} className="absolute right-4 top-4 text-encre/40 hover:text-encre" aria-label="Fermer">
          <X className="h-5 w-5" />
        </button>

        <h3 className="font-display text-lg">Donner mon avis</h3>

        {envoye ? (
          <p className="mt-6 text-sm text-mousse">
            Merci ! Votre avis sera publié après vérification.
          </p>
        ) : (
          <form onSubmit={envoyer} className="mt-4 space-y-4">
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button type="button" key={n} onClick={() => setNote(n)}>
                  <Star className={"h-6 w-6 " + (n <= note ? "fill-argile text-argile" : "text-ligne")} />
                </button>
              ))}
            </div>
            <textarea
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
              placeholder="Partagez votre expérience avec Open Doors"
              required
              rows={4}
              className="w-full rounded-lg border border-ligne px-3 py-2 text-sm outline-none focus:border-argile"
            />
            {erreur && <p className="text-sm text-red-500">{erreur}</p>}
            <Bouton variante="principal" type="submit" className="w-full">
              Envoyer mon avis
            </Bouton>
          </form>
        )}
      </div>
    </div>
  );
}