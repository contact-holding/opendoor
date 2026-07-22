import BarreRecherche from "@/components/accueil/barre-recherche";

export default function SectionHero() {
  return (
    <section className="relative overflow-hidden border-b border-ligne bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/hero.PNG')" }}>
      {/* Voile sombre */}
      <div className="absolute inset-0 bg-white/10"></div>

      {/* Motif cadastral */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-10" aria-hidden="true">
        <defs>
          <pattern id="plan-cadastral" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M60 0H0V60" fill="none" stroke="#FFFFFF" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#plan-cadastral)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-28 md:py-40">
        <p className="mb-4 font-donnees text-xs uppercase tracking-[0.4em] bold text-orange-500">
          Location & gestion, sans friction
        </p>

        <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight text-white md:text-6xl">
          Trouvez un logement.<br />
          Gérez-le en confiance.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">
          Opendoor connecte locataires et propriétaires autour d'un parcours clair : recherche, contrat, suivi et gestion locative moderne, sans intermédiaire caché.
        </p>

        <div className="mt-10 max-w-2xl">
          <BarreRecherche />
        </div>
      </div>
    </section>
  );
}