export interface PointItineraire {
  latitude: number;
  longitude: number;
}

export interface ResultatItineraire {
  distanceKm: number;
  dureeMinutes: number;
  trace: [number, number][];
}

const services: Record<"pied" | "velo" | "voiture", string> = {
  pied: "routed-foot",
  velo: "routed-bike",
  voiture: "routed-car",
};

export async function calculerItineraire(
  origine: PointItineraire,
  destination: PointItineraire,
  profil: "pied" | "velo" | "voiture"
): Promise<ResultatItineraire | null> {
  const service = services[profil];
  const url =
    "https://routing.openstreetmap.de/" +
    service +
    "/route/v1/driving/" +
    origine.longitude +
    "," +
    origine.latitude +
    ";" +
    destination.longitude +
    "," +
    destination.latitude +
    "?overview=full&geometries=geojson";

  const reponse = await fetch(url);
  const donnees = await reponse.json();

  if (donnees.code !== "Ok" || !donnees.routes?.[0]) return null;

  const route = donnees.routes[0];
  const trace: [number, number][] = route.geometry.coordinates.map(
    (point: [number, number]) => [point[1], point[0]]
  );

  return {
    distanceKm: route.distance / 1000,
    dureeMinutes: Math.round(route.duration / 60),
    trace,
  };
}