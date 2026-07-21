import CarteLogement from "@/components/logements/carte-logement";
import type { Logement } from "@/types";

// données fictives temporaires — seront remplacées par une requête Supabase
const logementsFictifs: Logement[] = [
  {
    id: "1",
    titre: "Appartement lumineux, proche centre-ville",
    description: "",
    ville: "Yaoundé",
    quartier: "Bastos",
    prixMensuel: 180000,
    type: "appartement",
    nombrePieces: 3,
    surface: 75,
    photos: [],
    latitude: 3.8878,
    longitude: 11.5213,
    disponible: true,
    equipements: [],
  },
  {
    id: "2",
    titre: "Studio moderne meublé",
    description: "",
    ville: "Douala",
    quartier: "Bonapriso",
    prixMensuel: 95000,
    type: "studio",
    nombrePieces: 1,
    surface: 32,
    photos: [],
    latitude: 4.0483,
    longitude: 9.7043,
    disponible: true,
    equipements: [],
  },
  {
    id: "3",
    titre: "Maison familiale avec cour",
    description: "",
    ville: "Yaoundé",
    quartier: "Nsimeyong",
    prixMensuel: 220000,
    type: "maison",
    nombrePieces: 4,
    surface: 120,
    photos: [],
    latitude: 3.8556,
    longitude: 11.5177,
    disponible: false,
    equipements: [],
  },
];

export default function LogementsEnVedette() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="font-donnees text-xs uppercase tracking-[0.2em] text-argile">
            Sélection
          </p>
          <h2 className="mt-2 font-display text-3xl">Logements en vedette</h2>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {logementsFictifs.map((logement) => (
          <CarteLogement key={logement.id} logement={logement} />
        ))}
      </div>
    </section>
  );
}