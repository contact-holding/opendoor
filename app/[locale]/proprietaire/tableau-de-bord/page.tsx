import { creerClientServeur } from "@/lib/supabase/serveur";
import { Home, CheckCircle2, FileSignature } from "lucide-react";

export default async function PageTableauDeBordProprietaire() {
  const supabase = await creerClientServeur();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: logements } = await supabase
    .from("logements")
    .select("*")
    .eq("proprietaire_id", user?.id);

  const total = logements?.length ?? 0;
  const occupes = logements?.filter((l) => !l.disponible).length ?? 0;

  const statistiques = [
    { icone: Home, label: "Biens publiés", valeur: total },
    { icone: CheckCircle2, label: "Biens occupés", valeur: occupes },
    { icone: FileSignature, label: "Biens vacants", valeur: total - occupes },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl">Tableau de bord</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {statistiques.map(({ icone: Icone, label, valeur }) => (
          <div key={label} className="rounded-2xl border border-ligne p-5">
            <Icone className="h-5 w-5 text-argile" />
            <p className="mt-3 font-donnees text-2xl">{valeur}</p>
            <p className="text-sm text-encre/60">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}