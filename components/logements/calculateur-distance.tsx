"use client";

import { useState } from "react";
import { Footprints, Bike, Car, Search, Loader2, MapPin } from "lucide-react";
import { geocoderLieu } from "@/lib/geocodage";
import { calculerDistanceKm, estimerTempsTrajet } from "@/lib/distance";

interface ResultatTrajet {
  libelle: string;
  distanceKm: number;
  aPied: number;
  aVelo: number;
  enVoiture: number;
}

export default function CalculateurDistance({
  latitudeLogement,
  longitudeLogement,
}: {
  latitudeLogement: number;
  longitudeLogement: number;
}) {
  const [destination, setDestination] = useState("");
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [resultat, setResultat] = useState<ResultatTrajet | null>(null);

  async function calculer(e: React.FormEvent) {
    e.preventDefault();
    if (!destination.trim()) return;

    setChargement(true);
    setErreur(null);
    setResultat(null);

    const lieu = await geocoderLieu(destination);

    setChargement(false);

    if (!lieu) {
      setErreur(
        "Lieu introuvable. Essayez d'être plus précis (ex: \"Université de Douala\", \"Marché de Kribi\")."
      );
      return;
    }

    const distanceKm = calculerDistanceKm(
      latitudeLogement,
      longitudeLogement,
      lieu.latitude,
      lieu.longitude
    );
    const temps = estimerTempsTrajet(distanceKm);

    setResultat({
      libelle: lieu.libelle,
      distanceKm,
      aPied: temps.aPied,
      aVelo: temps.aVelo,
      enVoiture: temps.enVoiture,
    });
  }

  return (
    <div className="rounded-2xl border border-ligne p-5">
      <h3 className="mb-1 flex items-center gap-2 font-display text-lg">
        <MapPin className="h-5 w-5 text-argile" />
        Calculer une distance
      </h3>
      <p className="mb-4 text-sm text-encre/60">
        Entrez un lieu (université, marché, quartier…) pour voir la distance
        depuis ce logement.
      </p>

      <form onSubmit={calculer} className="flex gap-2">
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Ex : Université de Douala, Marché de Kribi…"
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

      {resultat && (
        <div className="mt-4">
          <p className="mb-3 text-sm text-encre/60">
            Distance jusqu'à{" "}
            <span className="font-medium text-encre">{resultat.libelle}</span> :{" "}
            <span className="font-donnees text-argile">
              {resultat.distanceKm.toFixed(1)} km
            </span>
          </p>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-sable/40 p-3">
              <Footprints className="mx-auto h-4 w-4 text-encre/60" />
              <p className="mt-1 font-donnees text-sm">{resultat.aPied} min</p>
              <p className="text-xs text-encre/50">à pied</p>
            </div>
            <div className="rounded-xl bg-sable/40 p-3">
              <Bike className="mx-auto h-4 w-4 text-encre/60" />
              <p className="mt-1 font-donnees text-sm">{resultat.aVelo} min</p>
              <p className="text-xs text-encre/50">à vélo</p>
            </div>
            <div className="rounded-xl bg-sable/40 p-3">
              <Car className="mx-auto h-4 w-4 text-encre/60" />
              <p className="mt-1 font-donnees text-sm">{resultat.enVoiture} min</p>
              <p className="text-xs text-encre/50">en voiture</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}