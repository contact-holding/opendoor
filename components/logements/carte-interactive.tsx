"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import { formaterPrix } from "@/lib/utils";
import type { Logement } from "@/types";

function creerPinAvecPrix(prix: number, survole: boolean) {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        background:${survole ? "#22333B" : "#BC5B39"};
        color:#FBFAF6;
        padding:6px 12px;
        border-radius:9999px;
        font-size:12px;
        font-weight:600;
        font-family: var(--font-donnees), monospace;
        white-space:nowrap;
        box-shadow:0 2px 6px rgba(0,0,0,0.25);
        border:2px solid #FBFAF6;
      ">
        ${new Intl.NumberFormat("fr-FR").format(prix)} FCFA
      </div>
    `,
    iconSize: undefined,
    iconAnchor: [30, 15],
  });
}

export default function CarteInteractive({ logements }: { logements: Logement[] }) {
  const logementsAvecPosition = logements.filter(
    (logement) => logement.latitude && logement.longitude
  );

  if (logementsAvecPosition.length === 0) {
    return (
      <div className="flex h-full min-h-[400px] w-full items-center justify-center rounded-2xl border border-ligne bg-sable/40 text-sm text-encre/50">
        Aucune position disponible pour ces logements
      </div>
    );
  }

  const centre: [number, number] = [
    logementsAvecPosition[0].latitude!,
    logementsAvecPosition[0].longitude!,
  ];

  return (
    <div className="h-full min-h-[400px] w-full overflow-hidden rounded-2xl border border-ligne">
      <MapContainer
        center={centre}
        zoom={13}
        style={{ width: "100%", height: "100%", minHeight: "400px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {logementsAvecPosition.map((logement) => (
          <Marker
            key={logement.id}
            position={[logement.latitude!, logement.longitude!]}
            icon={creerPinAvecPrix(logement.prix_mensuel, false)}
          >
            <Popup>
              <Link href={`/logements/${logement.id}`} className="block min-w-[160px]">
                <p className="font-medium text-sm">{logement.titre}</p>
                <p className="text-xs text-encre/60">
                  {logement.quartier}, {logement.ville}
                </p>
                <p className="mt-1 text-sm font-semibold text-argile">
                  {formaterPrix(logement.prix_mensuel)} / mois
                </p>
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}