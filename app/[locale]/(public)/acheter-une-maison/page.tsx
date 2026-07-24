import CarteMaisonAchat from "@/components/logements/carte-maison-achat";
import { logementsDemo } from "@/lib/donnees-demo";
import { ShieldCheck, FileCheck2, Wallet } from "lucide-react";

export default function PageAcheterMaison() {
  const resultats = logementsDemo.filter((l) => l.type === "maison");

  return (
    <div>
      <section className="border-b border-ligne bg-sable/40">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="font-donnees text-xs uppercase tracking-[0.2em] text-argile">Vente</p>
          <h1 className="mt-2 font-display text-4xl">Acheter une maison au Cameroun</h1>
          <p className="mt-3 max-w-xl text-sm text-encre/70">
            Des biens sélectionnés à Douala, Kribi et Edéa, avec un
            accompagnement complet jusqu&apos;à la signature.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl bg-fond p-4">
              <ShieldCheck className="h-5 w-5 text-argile" />
              <span className="text-sm">Titres fonciers vérifiés</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-fond p-4">
              <FileCheck2 className="h-5 w-5 text-argile" />
              <span className="text-sm">Accompagnement notarié</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-fond p-4">
              <Wallet className="h-5 w-5 text-argile" />
              <span className="text-sm">Acompte via Mobile Money</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="mb-4 text-sm text-encre/60">{resultats.length} bien(s) en vente</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resultats.map((logement) => (
            <CarteMaisonAchat key={logement.id} logement={logement} />
          ))}
        </div>
      </div>
    </div>
  );
}