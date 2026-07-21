import Link from "next/link";
import BadgeStatut from "@/components/ui/badge-statut";
import { formaterDate } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import type { Incident } from "@/types";

const couleurUrgence: Record<string, string> = {
  faible: "text-encre/40",
  normale: "text-amber-500",
  urgente: "text-red-500",
};

export default function CarteTicket({ incident }: { incident: Incident }) {
  return (
    <Link
      href={`/locataire/mes-incidents/${incident.id}`}
      className="block rounded-2xl border border-ligne p-4 transition-shadow hover:shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2">
          <AlertTriangle className={`mt-0.5 h-4 w-4 ${couleurUrgence[incident.urgence]}`} />
          <div>
            <h4 className="font-medium">{incident.titre}</h4>
            <p className="mt-1 text-xs text-encre/50">{formaterDate(incident.created_at)}</p>
          </div>
        </div>
        <BadgeStatut statut={incident.statut} />
      </div>
    </Link>
  );
}