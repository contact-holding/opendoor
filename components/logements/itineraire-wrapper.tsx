"use client";

import dynamic from "next/dynamic";

const ItineraireLogement = dynamic(
  () => import("@/components/logements/itineraire-logement"),
  {
    ssr: false,
    loading: () => (
      <p className="text-sm text-encre/50">Chargement de l'itinéraire…</p>
    ),
  }
);

export default function ItineraireWrapper({
  latitudeLogement,
  longitudeLogement,
}: {
  latitudeLogement: number;
  longitudeLogement: number;
}) {
  return (
    <ItineraireLogement
      latitudeLogement={latitudeLogement}
      longitudeLogement={longitudeLogement}
    />
  );
}