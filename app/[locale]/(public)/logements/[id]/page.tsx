import GalerieParPiece from "@/components/logements/galerie-par-piece";
import FicheCaracteristiques from "@/components/logements/fiche-caracteristiques";
import CarteLogementItineraireWrapper from "@/components/logements/carte-logement-itineraire-wrapper";
import CalendrierDisponibilite from "@/components/logements/calendrier-disponibilite";
import SectionEquipements from "@/components/logements/section-equipements";
import PointsForts from "@/components/logements/points-forts";
import ReglesMaison from "@/components/logements/regles-maison";
import FaqLogement from "@/components/logements/faq-logement";
import ActionsLogement from "@/components/logements/actions-logement";
import { logementsDemo } from "@/lib/donnees-demo";

const libellesType: Record<string, string> = {
  appartement: "Appartement",
  studio: "Studio",
  maison: "Maison",
  chambre: "Chambre",
};

export default function PageLogement({ params }: { params: { id: string } }) {
  const logement = logementsDemo.find((l) => l.id === params.id) ?? logementsDemo[0];

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-xs uppercase tracking-wide text-encre/50">
          {logement.quartier}, {logement.ville}
        </p>
        <span className="rounded-full bg-sable px-3 py-1 text-xs font-medium text-encre/70">
          {libellesType[logement.type]}
        </span>
      </div>

      <h1 className="mt-1 font-display text-3xl">{logement.titre}</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <GalerieParPiece
            photos={logement.photos ?? []}
            titre={logement.titre}
            videoUrl={logement.video_url}
          />

          <div>
            <h2 className="mb-3 font-display text-lg">Points forts</h2>
            <PointsForts nombrePieces={logement.nombre_pieces} surface={logement.surface} />
          </div>

          <div>
            <h2 className="mb-2 font-display text-lg">Description</h2>
            <p className="text-sm leading-relaxed text-encre/70">{logement.description}</p>
          </div>

          <FicheCaracteristiques logement={logement} />

          <SectionEquipements />

          <CalendrierDisponibilite disponible={logement.disponible} />

          <CarteLogementItineraireWrapper logement={logement} />

          <div>
            <h2 className="mb-3 font-display text-lg">Règles et fonctionnement</h2>
            <ReglesMaison />
          </div>

          <div>
            <h2 className="mb-3 font-display text-lg">Questions fréquentes</h2>
            <FaqLogement />
          </div>
        </div>

        <ActionsLogement logement={logement} />
      </div>
    </div>
  );
}