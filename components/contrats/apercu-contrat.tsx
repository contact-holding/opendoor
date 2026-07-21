import BadgeStatut from "@/components/ui/badge-statut";
import { formaterPrix, formaterDate } from "@/lib/utils";
import type { Contrat } from "@/types";

export default function ApercuContrat({ contrat }: { contrat: Contrat }) {
  return (
    <div className="rounded-2xl border border-ligne p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg">
          {contrat.logement?.titre ?? "Logement"}
        </h3>
        <BadgeStatut statut={contrat.statut} />
      </div>

      <dl className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-encre/50">Début du bail</dt>
          <dd className="font-donnees">{formaterDate(contrat.date_debut)}</dd>
        </div>
        <div>
          <dt className="text-encre/50">Fin du bail</dt>
          <dd className="font-donnees">
            {contrat.date_fin ? formaterDate(contrat.date_fin) : "Indéterminée"}
          </dd>
        </div>
        <div>
          <dt className="text-encre/50">Loyer mensuel</dt>
          <dd className="font-donnees text-argile">{formaterPrix(contrat.montant_loyer)}</dd>
        </div>
        <div>
          <dt className="text-encre/50">Signatures</dt>
          <dd className="font-donnees">
            {contrat.signe_par_locataire && contrat.signe_par_proprietaire
              ? "Complètes"
              : "En attente"}
          </dd>
        </div>
      </dl>
    </div>
  );
}