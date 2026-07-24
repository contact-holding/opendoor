import { creerClientServeur } from "@/lib/supabase/serveur";
import BadgeStatut from "@/components/ui/badge-statut";
import EtatVide from "@/components/partages/etat-vide";
import { formaterPrix, formaterDate } from "@/lib/utils";

export default async function PageHistoriqueLocataire() {
  const supabase = await creerClientServeur();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: historique } = await supabase
    .from("historique_loyers")
    .select("*, contrat:contrats!inner(locataire_id)")
    .eq("contrat.locataire_id", user?.id)
    .order("mois_concerne", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl">Historique des loyers</h1>

      {!historique || historique.length === 0 ? (
        <div className="mt-6">
          <EtatVide
            titre="Aucun paiement enregistré"
            message="Les loyers enregistrés par votre propriétaire apparaîtront ici."
          />
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-ligne">
          <table className="w-full text-sm">
            <thead className="bg-sable/50 text-left text-xs uppercase text-encre/50">
              <tr>
                <th className="px-4 py-3">Mois</th>
                <th className="px-4 py-3">Montant</th>
                <th className="px-4 py-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {historique.map((ligne) => (
                <tr key={ligne.id} className="border-t border-ligne">
                  <td className="px-4 py-3 font-donnees">{formaterDate(ligne.mois_concerne)}</td>
                  <td className="px-4 py-3 font-donnees">{formaterPrix(ligne.montant)}</td>
                  <td className="px-4 py-3">
                    <BadgeStatut statut={ligne.statut} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}