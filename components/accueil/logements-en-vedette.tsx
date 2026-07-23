import CarteLogement from "@/components/logements/carte-logement";
import { logementsDemo } from "@/lib/donnees-demo";

export default function LogementsEnVedette() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="font-donnees text-xs uppercase tracking-[0.2em] text-argile">
            Sélection
          </p>
          <h2 className="mt-2 font-display text-3xl">Logements en vedette</h2>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {logementsDemo.map((logement) => (
          <CarteLogement key={logement.id} logement={logement} />
        ))}
      </div>
    </section>
  );
}