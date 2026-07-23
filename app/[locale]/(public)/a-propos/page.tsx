import {
  Handshake,
  Key,
  TrendingUp,
  ShieldCheck,
  MapPin,
  Users,
  FileCheck2,
} from "lucide-react";

const statistiques = [
  { valeur: "3", label: "Villes couvertes" },
  { valeur: "100%", label: "Propriétaires vérifiés" },
  { valeur: "0", label: "Frais cachés" },
  { valeur: "24/7", label: "Contact WhatsApp" },
];

const etapes = [
  {
    numero: "01",
    titre: "Vous cherchez",
    texte: "Parcourez des logements vérifiés à Douala, Kribi et Edéa, filtrés par ville, quartier et budget.",
  },
  {
    numero: "02",
    titre: "Vous contactez",
    texte: "Échangez directement avec le propriétaire par WhatsApp, sans intermédiaire caché ni commission surprise.",
  },
  {
    numero: "03",
    titre: "Vous visitez, vous signez",
    texte: "La visite et la signature du bail se font en présentiel, en toute confiance, avec un accompagnement à chaque étape.",
  },
];

const piliers = [
  { icone: Handshake, titre: "Confiance", texte: "Chaque profil et chaque bien sont vérifiés avant publication." },
  { icone: Key, titre: "Simplicité", texte: "Du premier contact à la remise des clés, un parcours sans détour." },
  { icone: TrendingUp, titre: "Transparence", texte: "Loyers, incidents, contrats : tout est traçable, pour tous." },
];

export default function PageAPropos() {
  return (
    <div>
      {/* HERO avec motif cadastral, cohérent avec l'accueil */}
      <section className="relative overflow-hidden border-b border-ligne bg-encre">
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden="true">
          <defs>
            <pattern id="plan-cadastral-apropos" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M60 0H0V60" fill="none" stroke="#FBFAF6" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#plan-cadastral-apropos)" />
        </svg>

        <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-28">
          <p className="font-donnees text-xs uppercase tracking-[0.2em] text-argile">
            À propos d&apos;Open Doors
          </p>

          <h1 className="mt-4 max-w-2xl font-display text-4xl text-fond md:text-6xl">
            Nous rendons la location plus honnête
          </h1>

          <p className="mt-6 max-w-2xl text-fond/70">
            L&apos;immobilier est un patrimoine précieux. Open Doors accompagne
            propriétaires et locataires avec une gestion minutieuse et
            transparente, pour que chaque logement soit bien géré — et chaque
            location, sereine.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {statistiques.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl text-argile">{stat.valeur}</p>
                <p className="mt-1 text-xs text-fond/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-donnees text-xs uppercase tracking-[0.2em] text-argile">
          Le parcours
        </p>
        <h2 className="mt-2 font-display text-3xl">Comment ça marche</h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {etapes.map((etape, index) => (
            <div key={etape.numero} className="relative">
              <span className="font-display text-6xl text-sable">{etape.numero}</span>
              <h3 className="mt-2 font-display text-xl">{etape.titre}</h3>
              <p className="mt-2 text-sm text-encre/70">{etape.texte}</p>

              {index < etapes.length - 1 && (
                <div className="absolute right-[-1rem] top-8 hidden h-px w-8 bg-ligne md:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* PILIERS avec effet de survol conservé, mais dans la palette de marque */}
      <section className="border-y border-ligne bg-sable/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="font-donnees text-xs uppercase tracking-[0.2em] text-argile">
            Nos engagements
          </p>
          <h2 className="mt-2 font-display text-3xl">Ce qui nous distingue</h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {piliers.map(({ icone: Icone, titre, texte }) => (
              <div
                key={titre}
                className="group rounded-2xl border border-ligne bg-fond p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-argile/10 transition-colors group-hover:bg-argile">
                  <Icone
                    className="h-6 w-6 text-argile transition-colors group-hover:text-fond"
                    strokeWidth={1.8}
                  />
                </div>
                <h3 className="mt-5 font-display text-xl">{titre}</h3>
                <p className="mt-2 text-sm text-encre/70">{texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONFIANCE / couverture */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-donnees text-xs uppercase tracking-[0.2em] text-argile">
              Notre présence
            </p>
            <h2 className="mt-2 font-display text-3xl">
              Ancrés localement, pensés pour le Cameroun
            </h2>
            <p className="mt-4 text-sm leading-6 text-encre/70">
              Open Doors se concentre volontairement sur Douala, Kribi et
              Edéa — pour bien connaître chaque quartier, vérifier chaque
              bien sur place, et garantir un accompagnement humain plutôt
              qu&apos;une plateforme anonyme.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-encre/70">
                <MapPin className="h-4 w-4 text-argile" /> 3 villes actives
              </div>
              <div className="flex items-center gap-2 text-sm text-encre/70">
                <ShieldCheck className="h-4 w-4 text-argile" /> Vérification sur place
              </div>
              <div className="flex items-center gap-2 text-sm text-encre/70">
                <Users className="h-4 w-4 text-argile" /> Accompagnement humain
              </div>
              <div className="flex items-center gap-2 text-sm text-encre/70">
                <FileCheck2 className="h-4 w-4 text-argile" /> Contrats clairs
              </div>
            </div>
          </div>

          <div className="relative h-72 overflow-hidden rounded-2xl md:h-80">
            <img
              src="/images/accueil/appartement1.PNG"
              alt="Logement Open Doors"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}