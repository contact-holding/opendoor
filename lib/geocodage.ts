export async function geocoderAdresse(
  quartier: string,
  ville: string
): Promise<{ latitude: number; longitude: number } | null> {
  const adresseComplete = `${quartier}, ${ville}, Cameroun`;

  const reponse = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      adresseComplete
    )}&format=json&limit=1`,
    {
      headers: {
        // Nominatim exige d'identifier ton application (règle d'usage, gratuite quand même)
        "User-Agent": "Clevia-App (contact@clevia.app)",
      },
    }
  );

  const donnees = await reponse.json();

  if (!donnees[0]) return null;

  return {
    latitude: parseFloat(donnees[0].lat),
    longitude: parseFloat(donnees[0].lon),
  };
}