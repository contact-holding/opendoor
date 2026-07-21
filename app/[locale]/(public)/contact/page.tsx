"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Bouton from "@/components/ui/bouton";

export default function PageContact() {
  const [envoye, setEnvoye] = useState(false);

  function gererEnvoi(e: React.FormEvent) {
    e.preventDefault();
    // logique d'envoi à connecter plus tard (Supabase ou service email)
    setEnvoye(true);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="font-donnees text-xs uppercase tracking-[0.2em] text-argile">Contact</p>
      <h1 className="mt-2 font-display text-4xl">Une question ? Écrivez-nous</h1>

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <form onSubmit={gererEnvoi} className="space-y-4">
          <input
            type="text"
            placeholder="Nom complet"
            required
            className="w-full rounded-lg border border-ligne px-4 py-3 text-sm outline-none focus:border-argile"
          />
          <input
            type="email"
            placeholder="Adresse email"
            required
            className="w-full rounded-lg border border-ligne px-4 py-3 text-sm outline-none focus:border-argile"
          />
          <textarea
            placeholder="Votre message"
            required
            rows={5}
            className="w-full rounded-lg border border-ligne px-4 py-3 text-sm outline-none focus:border-argile"
          />
          <Bouton variante="principal" type="submit" className="w-full">
            Envoyer le message
          </Bouton>
          {envoye && (
            <p className="text-sm text-mousse">Message envoyé — nous répondons sous 48h.</p>
          )}
        </form>

        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <Mail className="mt-1 h-5 w-5 text-argile" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-encre/70">contact@clevia.app</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-1 h-5 w-5 text-argile" />
            <div>
              <p className="text-sm font-medium">Téléphone</p>
              <p className="text-sm text-encre/70">+237 6XX XX XX XX</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 text-argile" />
            <div>
              <p className="text-sm font-medium">Bureau</p>
              <p className="text-sm text-encre/70">Yaoundé, Cameroun</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}