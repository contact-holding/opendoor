import { ShieldCheck, Smartphone, Lock, RotateCcw, Star } from "lucide-react";

const avantages = [
  { icone: ShieldCheck, label: "Propriétaires vérifiés" },
  { icone: Smartphone, label: "Contact direct WhatsApp" },
  { icone: Lock, label: "Aucune donnée bancaire requise" },
  { icone: RotateCcw, label: "Visite en présentiel" },
];

export default function SectionAvantages() {
  return (
    <section className="border-y border-ligne bg-fond">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {avantages.map(({ icone: Icone, label }) => (
            <span key={label} className="flex items-center gap-2 text-sm text-encre/70">
              <Icone className="h-4 w-4 text-argile" />
              {label}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-sm text-encre/60">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-argile text-argile" />
            ))}
          </div>
          Noté 4,7/5 par nos utilisateurs
        </div>
      </div>
    </section>
  );
}