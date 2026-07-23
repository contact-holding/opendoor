export async function geocoderLieu(
  recherche: string
): Promise<{ latitude: number; longitude: number; libelle: string } | null> {
  const reponse = await fetch(
    "https://nominatim.openstreetmap.org/search?q=" +
      encodeURIComponent(recherche + ", Cameroun") +
      "&format=json&limit=1&countrycodes=cm",
    {
      headers: {
        "User-Agent": "OpenDoor-App (contact@opendoor.app)",
      },
    }
  );

  const donnees = await reponse.json();

  if (!donnees[0]) return null;

  return {
    latitude: parseFloat(donnees[0].lat),
    longitude: parseFloat(donnees[0].lon),
    libelle: donnees[0].display_name,
  };
}

export async function geocoderAdresse(
  quartier: string,
  ville: string
): Promise<{ latitude: number; longitude: number } | null> {
  const resultat = await geocoderLieu(quartier + ", " + ville);
  if (!resultat) return null;
  return { latitude: resultat.latitude, longitude: resultat.longitude };
}