"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { Search, Loader2, MapPin } from "lucide-react";
import { geocoderLieu } from "@/lib/geocodage";
import { calculerItineraire } from "@/lib/itineraire";
import type { Logement } from "@/types";

const iconeDepart = new L.DivIcon({
  className: "",
  html: '<div style="background:#6118A5;width:16px;height:16px;border-radius:9999px;border:3px solid #FFFFFF;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const iconeArrivee = new L.DivIcon({
  className: "",
  html: '<div style="background:#2E9E5B;width:16px;height:16px;border-radius:9999px;border:3px solid #FFFFFF;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

function RecentrerCarte({ trace }: { trace: [number, number][] | null }) {
  const map = useMap();
  if (trace && trace.length > 0) {
    map.fitBounds(trace, { padding: [50, 50] });
  }
  return null;
}

export default function CarteLogementItineraire({ logement }: { logement: Logement }) {
  const [destination, setDestination] = useState("");
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [pointArrivee, setPointArrivee] = useState<{ lat: number; lng: number; libelle: string } | null>(null);
  const [trace, setTrace] = useState<[number, number][] | null>(null);
  const [infos, setInfos] = useState<{ distanceKm: number; dureeMinutes: number } | null>(null);

  async function calculer(e: React.FormEvent) {
    e.preventDefault();
    if (!destination.trim()) return;

    setChargement(true);
    setErreur(null);

    const lieu = await geocoderLieu(destination);
    if (!lieu) {
      setErreur("Lieu introuvable. Essayez un nom plus précis (ex : Université de Douala).");
      setChargement(false);
      return;
    }

    const resultat = await calculerItineraire(
      { latitude: logement.latitude!, longitude: logement.longitude! },
      { latitude: lieu.latitude, longitude: lieu.longitude },
      "voiture"
    );

    setChargement(false);

    if (!resultat) {
      setErreur("Impossible de calculer un itinéraire pour ce trajet.");
      return;
    }

    setPointArrivee({ lat: lieu.latitude, lng: lieu.longitude, libelle: lieu.libelle });
    setTrace(resultat.trace);
    setInfos({ distanceKm: resultat.distanceKm, dureeMinutes: resultat.dureeMinutes });
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-ligne">
      <div className="p-4">
        <h2 className="mb-3 flex items-center gap-2 font-display text-lg">
          <MapPin className="h-5 w-5 text-argile" />
          Localisation et itinéraire
        </h2>

        <form onSubmit={calculer} className="flex gap-2">
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Où voulez-vous aller ? (ex : Université de Douala)"
            className="flex-1 rounded-lg border border-ligne px-3 py-2 text-sm outline-none focus:border-argile"
          />
          <button
            type="submit"
            disabled={chargement}
            className="flex items-center justify-center rounded-lg bg-argile px-4 py-2 text-fond transition-colors hover:bg-argile-fonce disabled:opacity-50"
          >
            {chargement ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </button>
        </form>

        {erreur && <p className="mt-2 text-sm text-red-500">{erreur}</p>}

        {infos && pointArrivee && (
          <p className="mt-3 text-sm text-encre/60">
            Jusqu&apos;à <span className="font-medium text-encre">{pointArrivee.libelle}</span> :{" "}
            <span className="font-donnees text-argile">{infos.distanceKm.toFixed(1)} km</span> —{" "}
            <span className="font-donnees text-argile">{infos.dureeMinutes} min</span> en voiture
          </p>
        )}
      </div>

      <MapContainer
        center={[logement.latitude!, logement.longitude!]}
        zoom={15}
        maxZoom={19}
        style={{ width: "100%", height: "420px" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        <Marker position={[logement.latitude!, logement.longitude!]} icon={iconeDepart} />
        {pointArrivee && <Marker position={[pointArrivee.lat, pointArrivee.lng]} icon={iconeArrivee} />}
        {trace && <Polyline positions={trace} pathOptions={{ color: "#6118A5", weight: 4 }} />}
        <RecentrerCarte trace={trace} />
      </MapContainer>
    </div>
  );
}