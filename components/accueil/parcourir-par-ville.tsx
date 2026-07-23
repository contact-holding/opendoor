import Link from "next/link";
import Image from "next/image";

const villes = [
  { nom: "Douala", image: "/images/accueil/appartement1.PNG", quartiers: ["Bonapriso", "Akwa", "Logbessou", "Bonanjo"] },
  { nom: "Kribi", image: "/images/accueil/plagestudio2.PNG", quartiers: ["Centre-ville", "Mboa Manga"] },
  { nom: "Edéa", image: "/images/accueil/maison1.PNG", quartiers: ["Ndogbiakat"] },
];

export default function ParcourirParVille() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="font-display text-3xl">Parcourir par ville</h2>
      <p className="mt-2 text-sm text-encre/60">
        Découvrez les destinations disponibles au Cameroun.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {villes.map((ville) => (
          <Link
            key={ville.nom}
            href={`/recherche?ville=${encodeURIComponent(ville.nom)}`}
            className="group relative h-56 overflow-hidden rounded-2xl"
          >
            <Image
              src={ville.image}
              alt={ville.nom}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-encre/80 to-transparent" />
            <div className="absolute bottom-4 left-4 text-fond">
              <p className="font-display text-xl">{ville.nom}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {villes.flatMap((v) => v.quartiers).map((quartier) => (
          <Link
            key={quartier}
            href={`/recherche?ville=${encodeURIComponent(quartier)}`}
            className="rounded-full border border-ligne px-3 py-1.5 text-xs text-encre/70 hover:border-argile hover:text-argile"
          >
            {quartier}
          </Link>
        ))}
      </div>
    </section>
  );
}