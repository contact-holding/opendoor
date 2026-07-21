import { creerClientServeur } from "@/lib/supabase/serveur";
import BadgeStatut from "@/components/ui/badge-statut";
import EtatVide from "@/components/partages/etat-vide";
import { formaterDate } from "@/lib/utils";

export default async function PageLitiges() {
  const supabase = await creerClientServeur();
  const { data: litiges } = await supabase
    .from("litiges")
    .select("*, contrat:contrats(logement:logements(titre))")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl">Litiges</h1>

      {!litiges || litiges.length === 0 ? (
        <div className="mt-6">
          <EtatVide titre="Aucun litige" message="Aucun conflit signalé pour le moment." />
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {litiges.map((litige: any) => (
            <div key={litige.id} className="rounded-2xl border border-ligne bg-fond p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{litige.type}</h3>
                <BadgeStatut statut={litige.statut} />
              </div>
              <p className="mt-2 text-sm text-encre/70">{litige.description}</p>
              <p className="mt-2 text-xs text-encre/40">{formaterDate(litige.created_at)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}