import CarteTicket from "@/components/incidents/carte-ticket";
import EtatVide from "@/components/partages/etat-vide";
import type { Incident } from "@/types";

export default function ListeIncidents({ incidents }: { incidents: Incident[] }) {
  if (incidents.length === 0) {
    return (
      <EtatVide
        titre="Aucun incident signalé"
        message="Tout va bien ! Les incidents que vous déclarez apparaîtront ici."
      />
    );
  }

  return (
    <div className="space-y-3">
      {incidents.map((incident) => (
        <CarteTicket key={incident.id} incident={incident} />
      ))}
    </div>
  );
}