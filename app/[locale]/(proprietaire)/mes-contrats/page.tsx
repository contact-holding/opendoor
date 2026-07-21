import { creerClientServeur } from "@/lib/supabase/serveur";
import ListeContrats from "@/components/contrats/liste-contrats";
import type { Contrat } from "@/types";

export default async function PageMesContrats() {
  const supabase = await creerClientServeur();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: contrats } = await supabase
    .from("contrats")
    .select("*, logement:logements(*)")
    .eq("proprietaire_id", user?.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl">Mes contrats</h1>
      <div className="mt-6">
        <ListeContrats contrats={(contrats as Contrat[]) ?? []} />
      </div>
    </div>
  );
}