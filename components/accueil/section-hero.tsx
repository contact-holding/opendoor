import BarreRecherche from "@/components/accueil/barre-recherche";
import { ShieldCheck, MessageCircle, Home } from "lucide-react";

export default function SectionHero() {
  return (
    <section
      className="relative bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero.PNG')" }}
    >
      <div className="absolute inset-0 bg-encre/70" />

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <span className="inline-block rounded-full bg-fond/10 px-4 py-1.5 text-sm text-fond backdrop-blur">
          👋 Bienvenue
        </span>

        <h1 className="mt-5 font-display text-4xl text-fond md:text-6xl">
          Où allez-vous ?
        </h1>

        <p className="mt-4 max-w-xl text-fond/80">
          Logements meublés et locations vérifiées à Douala, Kribi et Edéa,
          proposés par des propriétaires de confiance.
        </p>

        <div className="mt-10 max-w-2xl">
          <BarreRecherche />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-fond/70">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" /> Propriétaires vérifiés
          </span>
          <span className="flex items-center gap-2">
            <Home className="h-4 w-4" /> 3 villes couvertes
          </span>
          <span className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" /> Contact direct WhatsApp
          </span>
        </div>
      </div>
    </section>
  );
}