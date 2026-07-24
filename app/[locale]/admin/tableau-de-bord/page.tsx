import { creerClientServeur } from "@/lib/supabase/serveur";
import { Users, Home, FileSignature, Scale } from "lucide-react";

export default async function PageTableauDeBordAdmin() {
  const supabase = await creerClientServeur();

  const [{ count: nbUtilisateurs }, { count: nbLogements }, { count: nbContrats }, { count: nbLitiges }] =
    await Promise.all([
      supabase.from("profils").select("*", { count: "exact", head: true }),
      supabase.from("logements").select("*", { count: "exact", head: true }),
      supabase.from("contrats").select("*", { count: "exact", head: true }).eq("statut", "actif"),
      supabase.from("litiges").select("*", { count: "exact", head: true }).eq("statut", "ouvert"),
    ]);

  const statistiques = [
    { icone: Users, label: "Utilisateurs", valeur: nbUtilisateurs ?? 0 },
    { icone: Home, label: "Logements publiés", valeur: nbLogements ?? 0 },
    { icone: FileSignature, label: "Contrats actifs", valeur: nbContrats ?? 0 },
    { icone: Scale, label: "Litiges ouverts", valeur: nbLitiges ?? 0 },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl">Vue d&apos;ensemble</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statistiques.map(({ icone: Icone, label, valeur }) => (
          <div key={label} className="rounded-2xl border border-ligne bg-fond p-5">
            <Icone className="h-5 w-5 text-argile" />
            <p className="mt-3 font-donnees text-2xl">{valeur}</p>
            <p className="text-sm text-encre/60">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}