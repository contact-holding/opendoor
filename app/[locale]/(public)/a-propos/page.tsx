import { Key, Handshake, TrendingUp } from "lucide-react";

const piliers = [
  { icone: Handshake, titre: "Confiance", texte: "Chaque profil et chaque bien sont vérifiés avant publication." },
  { icone: Key, titre: "Simplicité", texte: "Du premier contact à la remise des clés, un parcours sans détour." },
  { icone: TrendingUp, titre: "Transparence", texte: "Loyers, incidents, contrats : tout est traçable, pour tous." },
];

export default function PageAPropos() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#22333B] to-[#A67C52]">
      {/* Halo décoratif */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-300/10 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <p className="font-donnees text-xs uppercase tracking-[0.2em] text-orange-200">
          À propos
        </p>

        <h1 className="mt-3 font-display text-4xl text-white md:text-5xl">
          Nous rendons la location plus honnête
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85">
          Opendoor est née d'un constat simple : trouver un logement fiable et le gérer une fois loué reste compliqué, que l'on soit locataire ou propriétaire. Nous construisons une plateforme où chaque étape est claire, sécurisée et transparente.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {piliers.map(({ icone: Icone, titre, texte }) => (
            <div
              key={titre}
              className="rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 hover:shadow-2xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-400/20">
                <Icone className="h-7 w-7 text-orange-300" strokeWidth={1.8} />
              </div>

              <h3 className="mt-6 font-display text-2xl text-white">
                {titre}
              </h3>

              <p className="mt-3 leading-7 text-white/80">
                {texte}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}