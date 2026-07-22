import GaleriePhotos from "@/components/logements/galerie-photos";
import FicheCaracteristiques from "@/components/logements/fiche-caracteristiques";
import CarteInteractiveWrapper from "@/components/logements/carte-interactive-wrapper";
import Bouton from "@/components/ui/bouton";
import { formaterPrix } from "@/lib/utils";
import type { Logement } from "@/types";

// donnée fictive temporaire — sera remplacée par une requête Supabase selon params.id
const logementFictif: Logement = {
  id: "1",
  titre: "Appartement lumineux, proche centre-ville",
  description:
    "Bel appartement de 3 pièces au cœur de Bastos, entièrement rénové, proche des commerces et des transports.",
  ville: "Yaoundé",
  quartier: "Bastos",
  adresse: null,
  prix_mensuel: 180000,
  type: "appartement",
  nombre_pieces: 3,
  surface: 75,
  photos: [],
  latitude: 3.8878,
  longitude: 11.5213,
  disponible: true,
  equipements: [],
  proprietaire_id: "temp",
  created_at: new Date().toISOString(),
} as any;

export default function PageLogement({ params }: { params: { id: string } }) {
  const logement = logementFictif; // params.id servira à la vraie requête

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <p className="text-xs uppercase tracking-wide text-encre/50">
        {logement.quartier}, {logement.ville}
      </p>
      <h1 className="mt-1 font-display text-3xl">{logement.titre}</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <GaleriePhotos photos={logement.photos} titre={logement.titre} />

          <div className="mt-8">
            <h2 className="mb-2 font-display text-lg">Description</h2>
            <p className="text-sm leading-relaxed text-encre/70">{logement.description}</p>
          </div>

          <div className="mt-8">
            <FicheCaracteristiques logement={logement} />
          </div>

          <div className="mt-8">
            <h2 className="mb-3 font-display text-lg">Localisation</h2>
            <CarteInteractiveWrapper logements={[logement]} />
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-ligne p-6">
          <p className="font-donnees text-2xl text-argile">
            {formaterPrix(logement.prix_mensuel)}
            <span className="text-sm text-encre/50"> / mois</span>
          </p>
          <p className="mt-1 text-sm text-encre/60">
            {logement.disponible ? "Disponible dès maintenant" : "Actuellement loué"}
          </p>

          <Bouton variante="principal" className="mt-6 w-full">
            Contacter le propriétaire
          </Bouton>
          <Bouton variante="fantome" className="mt-3 w-full">
            Demander une visite
          </Bouton>
        </aside>
      </div>
    </div>
  );
}