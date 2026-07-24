import { creerClientServeur } from "@/lib/supabase/serveur";
import BadgeStatut from "@/components/ui/badge-statut";
import { formaterPrix } from "@/lib/utils";
import Link from "next/link";

export default async function PageTableauDeBordLocataire() {
  const supabase = await creerClientServeur();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: contrat } = await supabase
    .from("contrats")
    .select("*, logement:logements(*)")
    .eq("locataire_id", user?.id)
    .eq("statut", "actif")
    .maybeSingle();

  return (
    <div>
      <h1 className="font-display text-2xl">Mon tableau de bord</h1>

      {contrat ? (
        <div className="mt-6 rounded-2xl border border-ligne p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg">{contrat.logement.titre}</h2>
            <BadgeStatut statut={contrat.statut} />
          </div>
          <p className="mt-2 font-donnees text-argile">
            {formaterPrix(contrat.montant_loyer)} / mois
          </p>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-ligne p-6 text-center text-sm text-encre/60">
          Vous n&apos;avez pas encore de contrat actif.{" "}
          <Link href="/recherche" className="text-argile">
            Rechercher un logement
          </Link>
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link href="/locataire/mes-documents" className="rounded-2xl border border-ligne p-5 hover:shadow-sm">
          Mes documents
        </Link>
        <Link href="/locataire/historique" className="rounded-2xl border border-ligne p-5 hover:shadow-sm">
          Historique des loyers
        </Link>
        <Link href="/locataire/mes-incidents" className="rounded-2xl border border-ligne p-5 hover:shadow-sm">
          Mes incidents
        </Link>
      </div>
    </div>
  );
}