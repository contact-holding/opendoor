"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, CheckCircle2 } from "lucide-react";
import Bouton from "@/components/ui/bouton";

const sujetsSuggeres = [
  "Je cherche un logement",
  "Je veux publier un bien",
  "J'ai une question sur un contrat",
  "Autre demande",
];

export default function PageContact() {
  const [envoye, setEnvoye] = useState(false);
  const [sujetChoisi, setSujetChoisi] = useState(sujetsSuggeres[0]);

  function gererEnvoi(e: React.FormEvent) {
    e.preventDefault();
    setEnvoye(true);
  }

  const lienWhatsapp = "https://wa.me/237600000000";

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-ligne bg-encre">
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden="true">
          <defs>
            <pattern id="plan-cadastral-contact" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M60 0H0V60" fill="none" stroke="#FBFAF6" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#plan-cadastral-contact)" />
        </svg>

        <div className="relative mx-auto max-w-5xl px-6 py-20">
          <p className="font-donnees text-xs uppercase tracking-[0.2em] text-argile">
            Contact
          </p>
          <h1 className="mt-3 max-w-xl font-display text-4xl text-fond md:text-5xl">
            Une question ? Parlons-en.
          </h1>
          <p className="mt-4 max-w-lg text-fond/70">
            Que vous cherchiez un logement ou souhaitiez en publier un, notre
            équipe vous répond rapidement — par email, téléphone ou WhatsApp.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr]">
          {/* COLONNE CONSEILLER */}
          <div>
            <div className="rounded-2xl border border-ligne bg-sable/40 p-6">
              {/* Avatar illustré */}
              <div className="relative mx-auto h-28 w-28">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <circle cx="50" cy="50" r="50" fill="#22333B" />
                  <circle cx="50" cy="40" r="18" fill="#E4D8C3" />
                  <path
                    d="M18 92c2-20 16-32 32-32s30 12 32 32"
                    fill="#BC5B39"
                  />
                </svg>
                <span className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-fond bg-mousse">
                  <CheckCircle2 className="h-3.5 w-3.5 text-fond" />
                </span>
              </div>

              <p className="mt-4 text-center font-display text-lg">
                L&apos;équipe Open Doors
              </p>
              <p className="text-center text-xs text-encre/50">
                Répond généralement sous 2h
              </p>

              {/* Bulle de conseil */}
              <div className="relative mt-6 rounded-2xl rounded-tl-none bg-fond p-4 text-sm text-encre/70 shadow-sm">
                <span className="absolute -top-2 left-6 h-3 w-3 rotate-45 bg-fond" />
                Dites-nous simplement <strong>ce que vous cherchez</strong>,
                dans <strong>quelle ville</strong>, et un moyen de vous{" "}
                <strong>recontacter</strong> — on s&apos;occupe du reste.
              </div>

              
             <a
  href={lienWhatsapp}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-mousse px-6 py-3 text-sm font-medium text-fond transition-colors hover:bg-mousse/90"
>
  <MessageCircle className="h-4 w-4" />
  Discuter sur WhatsApp
</a>
            </div>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 text-argile" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-encre/70">contact@opendoors.app</p>
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
                  <p className="text-sm font-medium">Zones couvertes</p>
                  <p className="text-sm text-encre/70">Douala, Kribi, Edéa</p>
                </div>
              </div>
            </div>
          </div>

          {/* COLONNE FORMULAIRE */}
          <div>
            <p className="mb-3 text-sm font-medium">Quel est l&apos;objet de votre message ?</p>
            <div className="mb-6 flex flex-wrap gap-2">
              {sujetsSuggeres.map((sujet) => (
                <button
                  key={sujet}
                  type="button"
                  onClick={() => setSujetChoisi(sujet)}
                  className={
                    "rounded-full border px-3 py-1.5 text-xs transition-colors " +
                    (sujetChoisi === sujet
                      ? "border-argile bg-argile text-fond"
                      : "border-ligne text-encre/70 hover:border-argile")
                  }
                >
                  {sujet}
                </button>
              ))}
            </div>

            <form onSubmit={gererEnvoi} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-encre/60">
                  Nom complet
                </label>
                <input
                  type="text"
                  placeholder="Ex : Carel Tido"
                  required
                  className="w-full rounded-lg border border-ligne px-4 py-3 text-sm outline-none focus:border-argile"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-encre/60">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="vous@exemple.com"
                    required
                    className="w-full rounded-lg border border-ligne px-4 py-3 text-sm outline-none focus:border-argile"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-encre/60">
                    Téléphone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+237 6XX XX XX XX"
                    className="w-full rounded-lg border border-ligne px-4 py-3 text-sm outline-none focus:border-argile"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-encre/60">
                  Votre message — précisez la ville et le type de logement si possible
                </label>
                <textarea
                  placeholder="Ex : Je cherche un studio à Douala, quartier Akwa, budget 80 000 FCFA/mois."
                  required
                  rows={5}
                  className="w-full rounded-lg border border-ligne px-4 py-3 text-sm outline-none focus:border-argile"
                />
              </div>

              <Bouton variante="principal" type="submit" className="w-full">
                Envoyer le message
              </Bouton>

              {envoye && (
                <p className="flex items-center gap-2 text-sm text-mousse">
                  <CheckCircle2 className="h-4 w-4" />
                  Message envoyé — nous répondons sous 48h merci.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}