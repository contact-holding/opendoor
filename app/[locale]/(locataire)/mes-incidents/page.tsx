import { creerClientServeur } from "@/lib/supabase/serveur";
import ListeIncidents from "@/components/incidents/liste-incidents";
import Bouton from "@/components/ui/bouton";
import { Plus } from "lucide-react";
import type { Incident } from "@/types";

export default async function PageMesIncidents() {
  const supabase = await creerClientServeur();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: incidents } = await supabase
    .from("incidents")
    .select("*")
    .eq("locataire_id", user?.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">Mes incidents</h1>
        <Bouton variante="principal" href="/locataire/mes-incidents/nouveau">
          <Plus className="h-4 w-4" /> Signaler
        </Bouton>
      </div>

      <div className="mt-6">
        <ListeIncidents incidents={(incidents as Incident[]) ?? []} />
      </div>
    </div>
  );
}