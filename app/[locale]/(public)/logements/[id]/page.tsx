import GalerieParPiece from "@/components/logements/galerie-par-piece";
import FicheCaracteristiques from "@/components/logements/fiche-caracteristiques";
import CarteInteractiveWrapper from "@/components/logements/carte-interactive-wrapper";
import ItineraireWrapper from "@/components/logements/itineraire-wrapper";
import CalendrierDisponibilite from "@/components/logements/calendrier-disponibilite";
import PointsForts from "@/components/logements/points-forts";
import ReglesMaison from "@/components/logements/regles-maison";
import FaqLogement from "@/components/logements/faq-logement";
import Bouton from "@/components/ui/bouton";
import { formaterPrix } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { logementsDemo } from "@/lib/donnees-demo";

const libellesType: Record<string, string> = {
  appartement: "Appartement",
  studio: "Studio",
  maison: "Maison",
  chambre: "Chambre",
};

export default function PageLogement({ params }: { params: { id: string } }) {
  const logement =
    logementsDemo.find((l) => l.id === params.id) ?? logementsDemo[0];

  const lienWhatsapp = "https://wa.me/" + logement.whatsapp;

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
            <p className="text-sm leading-relaxed text-encre/70">
              {logement.description}
            </p>
          </div>

          <FicheCaracteristiques logement={logement} />

          <div className="grid gap-6 sm:grid-cols-2">
            <CalendrierDisponibilite disponible={logement.disponible} />
            <ItineraireWrapper
              latitudeLogement={logement.latitude!}
              longitudeLogement={logement.longitude!}
            />
          </div>

          <div>
            <h2 className="mb-3 font-display text-lg">Localisation</h2>
            <CarteInteractiveWrapper logements={[logement]} />
          </div>

          <div>
            <h2 className="mb-3 font-display text-lg">Règles et fonctionnement</h2>
            <ReglesMaison />
          </div>

          <div>
            <h2 className="mb-3 font-display text-lg">
              Questions fréquentes
            </h2>
            <FaqLogement />
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-ligne p-6 lg:sticky lg:top-24">
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

          {logement.whatsapp && (
            <Bouton
              variante="fantome"
              href={lienWhatsapp}
              nouvelOnglet
              className="mt-3 w-full border-mousse text-mousse hover:bg-mousse/10"
            >
              <MessageCircle className="h-4 w-4" />
              Contacter sur WhatsApp
            </Bouton>
          )}

          <Bouton variante="fantome" className="mt-3 w-full">
            Demander une visite
          </Bouton>
        </aside>
      </div>
    </div>
  );
}