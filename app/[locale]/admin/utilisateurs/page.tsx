import { creerClientServeur } from "@/lib/supabase/serveur";
import Avatar from "@/components/ui/avatar";
import BadgeStatut from "@/components/ui/badge-statut";

export default async function PageUtilisateurs() {
  const supabase = await creerClientServeur();
  const { data: profils } = await supabase
    .from("profils")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl">Utilisateurs</h1>

      <div className="mt-6 overflow-hidden rounded-2xl border border-ligne bg-fond">
        <table className="w-full text-sm">
          <thead className="bg-sable/50 text-left text-xs uppercase text-encre/50">
            <tr>
              <th className="px-4 py-3">Utilisateur</th>
              <th className="px-4 py-3">Rôle</th>
              <th className="px-4 py-3">Ville</th>
              <th className="px-4 py-3">Téléphone</th>
            </tr>
          </thead>
          <tbody>
            {profils?.map((profil) => (
              <tr key={profil.id} className="border-t border-ligne">
                <td className="flex items-center gap-3 px-4 py-3">
                  <Avatar url={profil.avatar_url} nom={profil.prenom} taille={32} />
                  {profil.prenom} {profil.nom}
                </td>
                <td className="px-4 py-3">
                  <BadgeStatut statut={profil.role} />
                </td>
                <td className="px-4 py-3">{profil.ville ?? "—"}</td>
                <td className="px-4 py-3 font-donnees">{profil.telephone ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}