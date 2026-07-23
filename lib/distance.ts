export function calculerDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const rayonTerre = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return rayonTerre * c;
}

export function estimerTempsTrajet(distanceKm: number) {
  return {
    aPied: Math.round((distanceKm / 5) * 60),
    aVelo: Math.round((distanceKm / 15) * 60),
    enVoiture: Math.round((distanceKm / 30) * 60),
  };
}