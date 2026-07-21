import { creerClientServeur } from "@/lib/supabase/serveur";
import BadgeStatut from "@/components/ui/badge-statut";
import { formaterPrix } from "@/lib/utils";

export default async function PageBiensAdmin() {
  const supabase = await creerClientServeur();
  const { data: logements } = await supabase
    .from("logements")
    .select("*, proprietaire:profils(nom, prenom)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl">Tous les biens</h1>

      <div className="mt-6 overflow-hidden rounded-2xl border border-ligne bg-fond">
        <table className="w-full text-sm">
          <thead className="bg-sable/50 text-left text-xs uppercase text-encre/50">
            <tr>
              <th className="px-4 py-3">Titre</th>
              <th className="px-4 py-3">Propriétaire</th>
              <th className="px-4 py-3">Prix</th>
              <th className="px-4 py-3">Statut</th>
            </tr>
          </thead>
          <tbody>
            {logements?.map((logement: any) => (
              <tr key={logement.id} className="border-t border-ligne">
                <td className="px-4 py-3">{logement.titre}</td>
                <td className="px-4 py-3">
                  {logement.proprietaire?.prenom} {logement.proprietaire?.nom}
                </td>
                <td className="px-4 py-3 font-donnees">{formaterPrix(logement.prix_mensuel)}</td>
                <td className="px-4 py-3">
                  <BadgeStatut statut={logement.disponible ? "disponible" : "en_attente"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}