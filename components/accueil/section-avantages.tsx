import { FileCheck2, MessageCircle, ShieldCheck } from "lucide-react";

const avantages = [
  {
    icone: FileCheck2,
    titre: "Contrats clairs",
    texte: "Baux générés et signés électroniquement, sans paperasse égarée.",
  },
  {
    icone: MessageCircle,
    titre: "Communication directe",
    texte: "Locataires et propriétaires échangent sans intermédiaire.",
  },
  {
    icone: ShieldCheck,
    titre: "Suivi transparent",
    texte: "Historique des loyers et des incidents, toujours consultable.",
  },
];

export default function SectionAvantages() {
  return (
    <section className="border-y border-ligne bg-sable/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="max-w-md font-display text-3xl">
          Pensé pour simplifier chaque étape de la location
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {avantages.map(({ icone: Icone, titre, texte }) => (
            <div key={titre}>
              <Icone className="h-6 w-6 text-argile" strokeWidth={1.5} />
              <h3 className="mt-4 font-display text-xl">{titre}</h3>
              <p className="mt-2 text-sm text-encre/70">{texte}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}