import { Key, Handshake, TrendingUp } from "lucide-react";

const piliers = [
  { icone: Handshake, titre: "Confiance", texte: "Chaque profil et chaque bien sont vérifiés avant publication." },
  { icone: Key, titre: "Simplicité", texte: "Du premier contact à la remise des clés, un parcours sans détour." },
  { icone: TrendingUp, titre: "Transparence", texte: "Loyers, incidents, contrats : tout est traçable, pour tous." },
];

export default function PageAPropos() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <p className="font-donnees text-xs uppercase tracking-[0.2em] text-argile">
        À propos
      </p>
      <h1 className="mt-2 font-display text-4xl">
        Nous rendons la location plus honnête
      </h1>
      <p className="mt-6 text-encre/70">
        Clevia est née d'un constat simple : trouver un logement fiable — et le
        gérer une fois loué — reste compliqué, que l'on soit locataire ou
        propriétaire. Nous construisons un espace commun où chaque étape est
        claire, documentée et accessible.
      </p>

      <div className="mt-16 grid gap-10 md:grid-cols-3">
        {piliers.map(({ icone: Icone, titre, texte }) => (
          <div key={titre}>
            <Icone className="h-6 w-6 text-argile" strokeWidth={1.5} />
            <h3 className="mt-4 font-display text-xl">{titre}</h3>
            <p className="mt-2 text-sm text-encre/70">{texte}</p>
          </div>
        ))}
      </div>
    </div>
  );
}