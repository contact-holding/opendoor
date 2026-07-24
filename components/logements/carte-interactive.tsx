"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import { formaterPrix } from "@/lib/utils";
import type { Logement } from "@/types";

const icone = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function CarteInteractive({ logements }: { logements: Logement[] }) {
  const points = logements.filter((l) => l.latitude && l.longitude);

  if (points.length === 0) {
    return (
      <div className="flex h-full min-h-[400px] w-full items-center justify-center rounded-2xl border border-ligne bg-sable text-sm text-encre/50">
        Aucune position disponible pour ces logements
      </div>
    );
  }

  const contenuMarqueurs = points.map((logement) => (
    <Marker key={logement.id} position={[logement.latitude!, logement.longitude!]} icon={icone}>
      <Popup>
        <Link href={"/logements/" + logement.id} className="block min-w-[160px]">
          <p className="font-medium text-sm">{logement.titre}</p>
          <p className="text-xs text-encre/60">{logement.quartier}, {logement.ville}</p>
          <p className="mt-1 text-sm font-semibold text-argile">
            {formaterPrix(logement.prix_mensuel)} / mois
          </p>
        </Link>
      </Popup>
    </Marker>
  ));

  return (
    <div className="h-full min-h-[400px] w-full overflow-hidden rounded-2xl border border-ligne">
      {points.length === 1 ? (
        <MapContainer
          center={[points[0].latitude!, points[0].longitude!]}
          zoom={14}
          style={{ width: "100%", height: "100%", minHeight: "400px" }}
        >
          <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {contenuMarqueurs}
        </MapContainer>
      ) : (
        <MapContainer
          bounds={points.map((l) => [l.latitude!, l.longitude!]) as [number, number][]}
          boundsOptions={{ padding: [50, 50] }}
          style={{ width: "100%", height: "100%", minHeight: "400px" }}
        >
          <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {contenuMarqueurs}
        </MapContainer>
      )}
    </div>
  );
}