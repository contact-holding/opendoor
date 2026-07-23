"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, PlayCircle, ImageOff, Video } from "lucide-react";
import type { PhotoLogement } from "@/types";

const pieces = [
  { valeur: "general", label: "Toutes" },
  { valeur: "salon", label: "Salon" },
  { valeur: "chambre", label: "Chambre" },
  { valeur: "cuisine", label: "Cuisine" },
  { valeur: "salle_de_bain", label: "Salle de bain" },
  { valeur: "exterieur", label: "Extérieur" },
];

type Element =
  | { type: "photo"; url: string }
  | { type: "video"; url: string };

export default function GalerieParPiece({
  photos,
  titre,
  videoUrl,
}: {
  photos: PhotoLogement[];
  titre: string;
  videoUrl?: string | null;
}) {
  const [ongletActif, setOngletActif] = useState("general");
  const [indexActif, setIndexActif] = useState(0);

  function compterPhotos(valeur: string) {
    if (valeur === "general") return photos.length;
    return photos.filter((p) => p.piece === valeur).length;
  }

  function changerOnglet(valeur: string) {
    setOngletActif(valeur);
    setIndexActif(0);
  }

  const photosFiltrees =
    ongletActif === "general" ? photos : photos.filter((p) => p.piece === ongletActif);

  const elements: Element[] = photosFiltrees.map((p) => ({ type: "photo", url: p.url }));
  if (ongletActif === "general" && videoUrl) {
    elements.push({ type: "video", url: videoUrl });
  }

  const elementActif = elements[indexActif];
  const estVideoMp4 = elementActif?.type === "video" && elementActif.url.endsWith(".mp4");

  function precedent() {
    setIndexActif((i) => (i === 0 ? elements.length - 1 : i - 1));
  }

  function suivant() {
    setIndexActif((i) => (i === elements.length - 1 ? 0 : i + 1));
  }

  function allerAuxVideo() {
    changerOnglet("general");
    const indexVideo = photos.length; // la vidéo est toujours après toutes les photos de "Toutes"
    setIndexActif(indexVideo);
  }

  return (
    <div>
      {/* Onglets par pièce */}
      <div className="mb-3 flex flex-wrap gap-2">
        {pieces.map((piece) => (
          <button
            key={piece.valeur}
            onClick={() => changerOnglet(piece.valeur)}
            className={
              "rounded-full border px-3 py-1.5 text-xs transition-colors " +
              (ongletActif === piece.valeur
                ? "border-argile bg-argile text-fond"
                : "border-ligne text-encre/70 hover:border-argile")
            }
          >
            {piece.label}
            <span className="ml-1 opacity-60">({compterPhotos(piece.valeur)})</span>
          </button>
        ))}

        {videoUrl && (
          <button
            onClick={allerAuxVideo}
            className={
              "flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs transition-colors " +
              (elementActif?.type === "video"
                ? "border-argile bg-argile text-fond"
                : "border-ligne text-encre/70 hover:border-argile")
            }
          >
            <Video className="h-3.5 w-3.5" /> Vidéo 360°
          </button>
        )}
      </div>

      {/* Grand cadre principal avec flèches */}
      <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-sable md:h-[420px]">
        {elements.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-encre/40">
            <ImageOff className="h-8 w-8" />
            <p className="text-sm">Aucune photo ajoutée pour cette pièce pour le moment</p>
          </div>
        ) : elementActif.type === "video" ? (
          estVideoMp4 ? (
            <video
              src={elementActif.url}
              controls
              className="h-full w-full object-cover"
            />
          ) : (
            <iframe
              src={elementActif.url}
              className="h-full w-full"
              allow="accelerometer; autoplay; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )
        ) : (
          <Image src={elementActif.url} alt={titre} fill className="object-cover" />
        )}

        {/* Flèches suivant/précédent */}
        {elements.length > 1 && (
          <>
            <button
              onClick={precedent}
              aria-label="Précédent"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-encre/60 p-2 text-fond backdrop-blur transition-colors hover:bg-encre/80"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={suivant}
              aria-label="Suivant"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-encre/60 p-2 text-fond backdrop-blur transition-colors hover:bg-encre/80"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {elementActif?.type === "video" && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-encre/70 px-3 py-1 text-xs text-fond">
            <PlayCircle className="h-3.5 w-3.5" /> Visite vidéo
          </span>
        )}

        {elements.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded-full bg-encre/60 px-2.5 py-1 text-xs text-fond">
            {indexActif + 1} / {elements.length}
          </span>
        )}
      </div>

      {/* Miniatures */}
      {elements.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {elements.map((el, index) => (
            <button
              key={index}
              onClick={() => setIndexActif(index)}
              className={
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 " +
                (indexActif === index ? "border-argile" : "border-transparent")
              }
            >
              {el.type === "video" ? (
                <div className="flex h-full w-full items-center justify-center bg-encre">
                  <PlayCircle className="h-6 w-6 text-fond" />
                </div>
              ) : (
                <Image src={el.url} alt="" fill className="object-cover" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}