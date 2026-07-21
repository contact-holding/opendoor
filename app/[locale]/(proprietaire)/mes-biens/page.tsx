import { creerClientServeur } from "@/lib/supabase/serveur";
import CarteLogement from "@/components/logements/carte-logement";
import EtatVide from "@/components/partages/etat-vide";
import Bouton from "@/components/ui/bouton";
import { Plus } from "lucide-react";
import type { Logement } from "@/types";

export default async function PageMesBiens() {
  const supabase = await creerClientServeur();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: logements } = await supabase
    .from("logements")
    .select("*, photos:photos_logements(*)")
    .eq("proprietaire_id", user?.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">Mes biens</h1>
        <Bouton variante="principal" href="/proprietaire/mes-biens/nouveau">
          <Plus className="h-4 w-4" /> Ajouter un bien
        </Bouton>
      </div>

      <div className="mt-6">
        {!logements || logements.length === 0 ? (
          <EtatVide
            titre="Aucun bien publié"
            message="Ajoutez votre premier logement pour commencer à recevoir des demandes."
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(logements as Logement[]).map((logement) => (
              <CarteLogement key={logement.id} logement={logement} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}