import ApercuContrat from "@/components/contrats/apercu-contrat";
import EtatVide from "@/components/partages/etat-vide";
import type { Contrat } from "@/types";

export default function ListeContrats({ contrats }: { contrats: Contrat[] }) {
  if (contrats.length === 0) {
    return (
      <EtatVide
        titre="Aucun contrat pour le moment"
        message="Les contrats que vous créez ou signez apparaîtront ici."
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {contrats.map((contrat) => (
        <ApercuContrat key={contrat.id} contrat={contrat} />
      ))}
    </div>
  );
}