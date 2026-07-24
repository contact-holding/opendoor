import Link from "next/link";
import Image from "next/image";
import { Star, Sparkles } from "lucide-react";
import { formaterPrix } from "@/lib/utils";
import { logementsVedette } from "@/lib/donnees-demo";

export default function LogementsEnVedette() {
  const vedettes = logementsVedette();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8">
        <p className="flex items-center gap-1.5 font-donnees text-xs uppercase tracking-[0.2em] text-argile">
          <Sparkles className="h-3.5 w-3.5" /> Sélection premium
        </p>
        <h2 className="mt-2 font-display text-3xl">Coups de cœur Open Doors</h2>
        <p className="mt-1 text-sm text-encre/60">
          Choisis par notre équipe pour leur emplacement, leur qualité et leur fiabilité.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {vedettes.map((logement) => (
          <Link
            key={logement.id}
            href={"/logements/" + logement.id}
            className="group overflow-hidden rounded-2xl border-2 border-argile/20 bg-fond transition-all hover:border-argile hover:shadow-xl"
          >
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={logement.photos?.[0]?.url ?? "/images/placeholders/logement-defaut.jpg"}
                alt={logement.titre}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-encre/70 via-transparent to-transparent" />
              <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-argile px-3 py-1 text-xs font-semibold text-fond">
                <Sparkles className="h-3 w-3" /> Coup de cœur
              </span>
              <div className="absolute bottom-3 left-3 right-3 text-fond">
                <p className="text-xs uppercase tracking-wide opacity-80">
                  {logement.quartier}, {logement.ville}
                </p>
                <h3 className="font-display text-lg">{logement.titre}</h3>
              </div>
            </div>

            <div className="p-4">
              {logement.argumentMarketing && (
                <p className="text-xs italic text-encre/60">{logement.argumentMarketing}</p>
              )}

              <div className="mt-3 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-encre/60">
                  <Star className="h-3.5 w-3.5 fill-argile text-argile" />
                  <span className="font-medium text-encre">{logement.note}</span>
                  ({logement.nombreAvis} avis)
                </span>
                <span className="font-donnees text-argile">
                  {formaterPrix(logement.prix_mensuel)}
                  <span className="text-xs text-encre/50">/mois</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}