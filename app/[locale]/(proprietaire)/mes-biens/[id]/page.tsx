import { creerClientServeur } from "@/lib/supabase/serveur";
import GaleriePhotos from "@/components/logements/galerie-photos";
import FicheCaracteristiques from "@/components/logements/fiche-caracteristiques";
import BadgeStatut from "@/components/ui/badge-statut";
import { formaterPrix } from "@/lib/utils";
import type { Logement } from "@/types";

export default async function PageDetailBien({ params }: { params: { id: string } }) {
  const supabase = await creerClientServeur();

  const { data: logement } = await supabase
    .from("logements")
    .select("*, photos:photos_logements(*), equipements:equipements_logements(*)")
    .eq("id", params.id)
    .single();

  if (!logement) return <p>Logement introuvable.</p>;

  const logementType = logement as Logement;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">{logementType.titre}</h1>
        <BadgeStatut statut={logementType.disponible ? "disponible" : "en_attente"} />
      </div>

      <p className="mt-1 font-donnees text-argile">
        {formaterPrix(logementType.prix_mensuel)} / mois
      </p>

      <div className="mt-6">
        <GaleriePhotos
          photos={logementType.photos?.map((p) => p.url) ?? []}
          titre={logementType.titre}
        />
      </div>

      <div className="mt-6">
        <FicheCaracteristiques logement={logementType} />
      </div>
    </div>
  );
}