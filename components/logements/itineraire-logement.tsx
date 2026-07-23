"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import { Search, Loader2, Footprints, Bike, Car, MapPin } from "lucide-react";
import { geocoderLieu } from "@/lib/geocodage";
import { calculerItineraire, type ResultatItineraire } from "@/lib/itineraire";

const iconeDepart = new L.DivIcon({
  className: "",
  html:
    '<div style="background:#5B6B4F;width:14px;height:14px;border-radius:9999px;border:3px solid #FBFAF6;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const iconeArrivee = new L.DivIcon({
  className: "",
  html:
    '<div style="background:#BC5B39;width:14px;height:14px;border-radius:9999px;border:3px solid #FBFAF6;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

type Profil = "pied" | "velo" | "voiture";

const profils: { valeur: Profil; icone: typeof Footprints; label: string }[] = [
  { valeur: "pied", icone: Footprints, label: "À pied" },
  { valeur: "velo", icone: Bike, label: "À vélo" },
  { valeur: "voiture", icone: Car, label: "En voiture" },
];

export default function ItineraireLogement({
  latitudeLogement,
  longitudeLogement,
}: {
  latitudeLogement: number;
  longitudeLogement: number;
}) {
  const [destination, setDestination] = useState("");
  const [profil, setProfil] = useState<Profil>("voiture");
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [pointDestination, setPointDestination] = useState<{
    latitude: number;
    longitude: number;
    libelle: string;
  } | null>(null);
  const [resultat, setResultat] = useState<ResultatItineraire | null>(null);

  async function lancerCalcul(e?: React.FormEvent, profilChoisi?: Profil) {
    e?.preventDefault();
    if (!destination.trim() && !pointDestination) return;

    setChargement(true);
    setErreur(null);

    let point = pointDestination;

    if (!point || e) {
      const lieu = await geocoderLieu(destination);
      if (!lieu) {
        setErreur(
          "Lieu introuvable. Essayez le nom complet (ex: \"Institut Universitaire de la Côte\" plutôt que \"IUC\")."
        );
        setChargement(false);
        return;
      }
      point = lieu;
      setPointDestination(lieu);
    }

    const trajet = await calculerItineraire(
      { latitude: latitudeLogement, longitude: longitudeLogement },
      { latitude: point.latitude, longitude: point.longitude },
      profilChoisi ?? profil
    );

    setChargement(false);

    if (!trajet) {
      setErreur("Impossible de calculer un itinéraire pour ce trajet.");
      return;
    }

    setResultat(trajet);
  }

  function changerProfil(nouveauProfil: Profil) {
    setProfil(nouveauProfil);
    if (pointDestination) lancerCalcul(undefined, nouveauProfil);
  }

  return (
    <div className="rounded-2xl border border-ligne p-5">
      <h3 className="mb-1 flex items-center gap-2 font-display text-lg">
        <MapPin className="h-5 w-5 text-argile" />
        Calculer un itinéraire
      </h3>
      <p className="mb-4 text-sm text-encre/60">
        Entrez une destination pour voir le vrai trajet routier depuis ce
        logement.
      </p>

      <form onSubmit={(e) => lancerCalcul(e)} className="flex gap-2">
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Ex : Institut Universitaire de la Côte, Marché de Kribi…"
          className="flex-1 rounded-lg border border-ligne px-3 py-2 text-sm outline-none focus:border-argile"
        />
        <button
          type="submit"
          disabled={chargement}
          className="flex items-center justify-center rounded-lg bg-argile px-4 py-2 text-fond transition-colors hover:bg-argile-fonce disabled:opacity-50"
        >
          {chargement ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </button>
      </form>

      {erreur && <p className="mt-3 text-sm text-red-500">{erreur}</p>}

      {pointDestination && (
        <div className="mt-4 flex gap-2">
          {profils.map(({ valeur, icone: Icone, label }) => (
            <button
              key={valeur}
              onClick={() => changerProfil(valeur)}
              className={
                "flex flex-1 flex-col items-center gap-1 rounded-xl border px-2 py-2 text-xs transition-colors " +
                (profil === valeur
                  ? "border-argile bg-argile text-fond"
                  : "border-ligne text-encre/70 hover:border-argile")
              }
            >
              <Icone className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      )}

      {resultat && pointDestination && (
        <>
          <p className="mt-4 text-sm text-encre/60">
            Jusqu'à{" "}
            <span className="font-medium text-encre">{pointDestination.libelle}</span> :{" "}
            <span className="font-donnees text-argile">
              {resultat.distanceKm.toFixed(1)} km
            </span>{" "}
            —{" "}
            <span className="font-donnees text-argile">{resultat.dureeMinutes} min</span>
          </p>

          <div className="mt-3 h-64 overflow-hidden rounded-xl border border-ligne">
            <MapContainer
              key={profil + resultat.trace.length}
              bounds={resultat.trace}
              style={{ width: "100%", height: "100%" }}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[latitudeLogement, longitudeLogement]} icon={iconeDepart} />
              <Marker
                position={[pointDestination.latitude, pointDestination.longitude]}
                icon={iconeArrivee}
              />
              <Polyline positions={resultat.trace} pathOptions={{ color: "#BC5B39", weight: 4 }} />
            </MapContainer>
          </div>
        </>
      )}
    </div>
  );
}