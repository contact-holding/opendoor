import { CalendarCheck, CalendarX } from "lucide-react";
import { formaterDate } from "@/lib/utils";

export default function CalendrierDisponibilite({
  disponible,
  dateLibereLe,
}: {
  disponible: boolean;
  dateLibereLe?: string | null;
}) {
  return (
    <div className="rounded-2xl border border-ligne p-5">
      <h3 className="mb-3 flex items-center gap-2 font-display text-lg">
        {disponible ? (
          <CalendarCheck className="h-5 w-5 text-mousse" />
        ) : (
          <CalendarX className="h-5 w-5 text-encre/40" />
        )}
        Disponibilité
      </h3>

      {disponible ? (
        <p className="text-sm text-mousse">
          Ce logement est disponible dès maintenant.
        </p>
      ) : (
        <p className="text-sm text-encre/60">
          Actuellement occupé
          {dateLibereLe && (
            <> — libéré prévu le <span className="font-donnees">{formaterDate(dateLibereLe)}</span></>
          )}
          .
        </p>
      )}
    </div>
  );
}