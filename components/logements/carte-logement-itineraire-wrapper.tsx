"use client";

import dynamic from "next/dynamic";
import type { Logement } from "@/types";

const CarteLogementItineraire = dynamic(
  () => import("@/components/logements/carte-logement-itineraire"),
  { ssr: false, loading: () => <p className="text-sm text-encre/50">Chargement de la carte…</p> }
);

export default function CarteLogementItineraireWrapper({ logement }: { logement: Logement }) {
  return <CarteLogementItineraire logement={logement} />;
}