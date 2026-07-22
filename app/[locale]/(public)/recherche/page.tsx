import FiltreRecherche from "@/components/logements/filtre-recherche";
import CarteLogement from "@/components/logements/carte-logement";
import CarteInteractiveWrapper from "@/components/logements/carte-interactive-wrapper";
import type { Logement } from "@/types";

// données fictives temporaires — un logement par chef-lieu de région
// seront remplacées par une vraie requête Supabase une fois le formulaire connecté
const tousLesLogementsFictifs: Logement[] = [
  {
    id: "1",
    titre: "Appartement lumineux, proche centre-ville",
    description: "",
    ville: "Yaoundé",
    quartier: "Bastos",
    adresse: null,
    prix_mensuel: 180000,
    type: "appartement",
    nombre_pieces: 3,
    surface: 75,
    photos: [],
    latitude: 3.848,
    longitude: 11.5021,
    disponible: true,
    equipements: [],
    proprietaire_id: "temp",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    titre: "Studio moderne meublé",
    description: "",
    ville: "Douala",
    quartier: "Akwa",
    adresse: null,
    prix_mensuel: 95000,
    type: "studio",
    nombre_pieces: 1,
    surface: 32,
    photos: [],
    latitude: 4.0511,
    longitude: 9.7679,
    disponible: true,
    equipements: [],
    proprietaire_id: "temp",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    titre: "Maison familiale avec cour",
    description: "",
    ville: "Bafoussam",
    quartier: "Centre",
    adresse: null,
    prix_mensuel: 120000,
    type: "maison",
    nombre_pieces: 4,
    surface: 110,
    photos: [],
    latitude: 5.4737,
    longitude: 10.4176,
    disponible: true,
    equipements: [],
    proprietaire_id: "temp",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    titre: "Chambre étudiante proche université",
    description: "",
    ville: "Bamenda",
    quartier: "Up Station",
    adresse: null,
    prix_mensuel: 40000,
    type: "chambre",
    nombre_pieces: 1,
    surface: 18,
    photos: [],
    latitude: 5.9631,
    longitude: 10.1591,
    disponible: true,
    equipements: [],
    proprietaire_id: "temp",
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    titre: "Appartement vue collines",
    description: "",
    ville: "Buea",
    quartier: "Molyko",
    adresse: null,
    prix_mensuel: 85000,
    type: "appartement",
    nombre_pieces: 2,
    surface: 55,
    photos: [],
    latitude: 4.156,
    longitude: 9.232,
    disponible: true,
    equipements: [],
    proprietaire_id: "temp",
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    titre: "Studio calme et lumineux",
    description: "",
    ville: "Ebolowa",
    quartier: "Centre-ville",
    adresse: null,
    prix_mensuel: 60000,
    type: "studio",
    nombre_pieces: 1,
    surface: 28,
    photos: [],
    latitude: 2.9167,
    longitude: 11.15,
    disponible: true,
    equipements: [],
    proprietaire_id: "temp",
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    titre: "Maison spacieuse avec jardin",
    description: "",
    ville: "Bertoua",
    quartier: "Nkolbikon",
    adresse: null,
    prix_mensuel: 100000,
    type: "maison",
    nombre_pieces: 3,
    surface: 95,
    photos: [],
    latitude: 4.5833,
    longitude: 13.6833,
    disponible: true,
    equipements: [],
    proprietaire_id: "temp",
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    titre: "Appartement proche marché central",
    description: "",
    ville: "Ngaoundéré",
    quartier: "Baladji",
    adresse: null,
    prix_mensuel: 70000,
    type: "appartement",
    nombre_pieces: 2,
    surface: 60,
    photos: [],
    latitude: 7.3167,
    longitude: 13.5833,
    disponible: true,
    equipements: [],
    proprietaire_id: "temp",
    created_at: new Date().toISOString(),
  },
  {
    id: "9",
    titre: "Chambre meublée sécurisée",
    description: "",
    ville: "Garoua",
    quartier: "Plateau",
    adresse: null,
    prix_mensuel: 35000,
    type: "chambre",
    nombre_pieces: 1,
    surface: 16,
    photos: [],
    latitude: 9.3017,
    longitude: 13.3921,
    disponible: true,
    equipements: [],
    proprietaire_id: "temp",
    created_at: new Date().toISOString(),
  },
  {
    id: "10",
    titre: "Studio proche centre administratif",
    description: "",
    ville: "Maroua",
    quartier: "Domayo",
    adresse: null,
    prix_mensuel: 50000,
    type: "studio",
    nombre_pieces: 1,
    surface: 25,
    photos: [],
    latitude: 10.5957,
    longitude: 14.3247,
    disponible: true,
    equipements: [],
    proprietaire_id: "temp",
    created_at: new Date().toISOString(),
  },
] as any;

export default function PageRecherche({
  searchParams,
}: {
  searchParams: { ville?: string };
}) {
  const villeRecherchee = searchParams.ville?.toLowerCase().trim();

  // filtre réel : ne garde que les logements dont la ville correspond à la recherche
  const resultats = villeRecherchee
    ? tousLesLogementsFictifs.filter((logement) =>
        logement.ville.toLowerCase().includes(villeRecherchee)
      )
    : tousLesLogementsFictifs;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-2xl">
        {searchParams.ville
          ? `Logements à ${searchParams.ville}`
          : "Tous les logements disponibles"}
      </h1>
      <p className="mt-1 text-sm text-encre/60">{resultats.length} résultat(s)</p>

      <div className="mt-8 flex flex-col gap-8 md:flex-row">
        <FiltreRecherche />

        <div className="flex-1">
          {resultats.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-ligne p-8 text-center text-sm text-encre/60">
              Aucun logement trouvé pour cette ville. Essayez : Yaoundé, Douala,
              Bafoussam, Bamenda, Buea, Ebolowa, Bertoua, Ngaoundéré, Garoua ou Maroua.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {resultats.map((logement) => (
                <CarteLogement key={logement.id} logement={logement} />
              ))}
            </div>
          )}
        </div>

        <div className="hidden w-full lg:block lg:w-96">
          <CarteInteractiveWrapper logements={resultats} />
        </div>
      </div>
    </div>
  );
}