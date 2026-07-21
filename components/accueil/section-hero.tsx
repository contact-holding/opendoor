import BarreRecherche from "@/components/accueil/barre-recherche";

export default function SectionHero() {
  return (
    <section className="relative overflow-hidden border-b border-ligne">
      {/* motif cadastral en fond, discret */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
        aria-hidden="true"
      >
        <defs>
          <pattern id="plan-cadastral" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M60 0H0V60" fill="none" stroke="#22333B" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#plan-cadastral)" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="mb-4 font-donnees text-xs uppercase tracking-[0.2em] text-argile">
          Location & gestion, sans friction
        </p>
        <h1 className="max-w-2xl font-display text-4xl leading-tight md:text-6xl">
          Trouvez un logement.
          <br />
          Gérez-le en confiance.
        </h1>
        <p className="mt-6 max-w-xl text-encre/70">
          Clevia connecte locataires et propriétaires autour d'un parcours clair :
          recherche, contrat, suivi — sans intermédiaire caché.
        </p>

        <div className="mt-10 max-w-2xl">
          <BarreRecherche />
        </div>
      </div>
    </section>
  );
}