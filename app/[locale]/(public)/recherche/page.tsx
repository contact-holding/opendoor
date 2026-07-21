import FiltreRecherche from "@/components/logements/filtre-recherche";
import CarteLogement from "@/components/logements/carte-logement";
import CarteInteractive from "@/components/logements/carte-interactive";
import type { Logement } from "@/types";

const resultatsFictifs: Logement[] = [
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
  } as any,
];

export default function PageRecherche({
  searchParams,
}: {
  searchParams: { ville?: string };
}) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-2xl">
        {searchParams.ville
          ? `Logements à ${searchParams.ville}`
          : "Tous les logements disponibles"}
      </h1>
      <p className="mt-1 text-sm text-encre/60">{resultatsFictifs.length} résultat(s)</p>

      <div className="mt-8 flex flex-col gap-8 md:flex-row">
        <FiltreRecherche />

        <div className="flex-1">
          <div className="grid gap-6 sm:grid-cols-2">
            {resultatsFictifs.map((logement) => (
              <CarteLogement key={logement.id} logement={logement} />
            ))}
          </div>
        </div>

        <div className="hidden w-full lg:block lg:w-96">
          <CarteInteractive logements={resultatsFictifs} />
        </div>
      </div>
    </div>
  );
}