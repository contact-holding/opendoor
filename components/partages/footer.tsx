"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import BadgesPaiement from "@/components/partages/badges-paiement";

function IconeFacebook() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8v-6.93H7.9V12H10V9.8C10 7.73 11.24 6.5 13.1 6.5c.9 0 1.85.16 1.85.16v2.03h-1.04c-1.03 0-1.35.64-1.35 1.3V12h2.3l-.37 2.87h-1.93v6.93c4.56-.93 8-4.96 8-9.8z" />
    </svg>
  );
}

function IconeInstagram() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconeTikTok() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-3.77A4.793 4.793 0 0 0 11.999 2v13.333a2.667 2.667 0 1 1-2.667-2.667c.235 0 .462.03.678.087V10.03a6.667 6.667 0 1 0 5.333 6.525V9.333a8.002 8.002 0 0 0 4.667 1.5V7.5a4.79 4.79 0 0 1-.421-.814Z" />
    </svg>
  );
}

function IconeYoutube() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M22 12s0-3.2-.4-4.7c-.2-.9-.9-1.6-1.8-1.8C18 5 12 5 12 5s-6 0-7.8.5c-.9.2-1.6.9-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.7c.2.9.9 1.6 1.8 1.8C6 19 12 19 12 19s6 0 7.8-.5c.9-.2 1.6-.9 1.8-1.8.4-1.5.4-4.7.4-4.7Zm-12 3V9l5.2 3-5.2 3Z" />
    </svg>
  );
}

export default function Footer() {
  const { locale } = useParams();
  const base = "/" + locale;

  return (
    <footer className="bg-encre text-fond">
      <div className="border-b border-fond/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8">
          <div>
            <p className="font-display text-lg">Restez informé</p>
            <p className="mt-1 text-sm text-fond/60">
              Nouvelles annonces et actualités du marché locatif.
            </p>
          </div>
          <form className="flex w-full max-w-sm gap-2 sm:w-auto">
            <input
              type="email"
              placeholder="votre@email.com"
              className="flex-1 rounded-full bg-fond/10 px-4 py-2.5 text-sm text-fond outline-none placeholder:text-fond/40"
            />
            <button className="whitespace-nowrap rounded-full bg-fond px-5 py-2.5 text-sm font-medium text-encre">
              S&apos;abonner
            </button>
          </form>
        </div>
      </div>

      <div className="border-b border-fond/10">
        <div className="mx-auto max-w-6xl px-1 py-10">
          <BadgesPaiement />
        </div>
      </div>

      <div className="border-b border-fond/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
          <div>
            <p className="font-display text-lg">Publier un bien</p>
            <p className="mt-1 text-sm text-fond/60">
              Rentabilisez votre logement.
            </p>
          </div>
          <Link
            href={base + "/inscription"}
            className="rounded-full bg-fond px-6 py-2.5 text-sm font-medium text-encre"
          >
            Publier un bien →
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-4">
        <div>
          <img
            src="/images/accueil/icone-opendoor.png"
            alt="Open Doors"
            className="h-14 w-auto"
          />
          <p className="mt-3 text-sm text-fond/60">
            Trouvez votre logement idéal au Cameroun.
          </p>
          <div className="mt-4 flex gap-3 text-fond/60">
            <a
              href="https://www.facebook.com/profile.php?id=61573324192374&locale=fr_FR"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Open Doors"
            >
              <IconeFacebook />
            </a>
            <a
              href="https://www.instagram.com/opendoors835/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Open Doors"
            >
              <IconeInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@open.doors14"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok Open Doors"
            >
              <IconeTikTok />
            </a>
            <a
              href="https://www.youtube.com/channel/UCqnSvZk7qMC-cDj1cRbqgEQ"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube Open Doors"
            >
              <IconeYoutube />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide">
            Explorer par ville
          </h4>
          <ul className="space-y-2 text-sm text-fond/60">
            <li>
              <Link href={base + "/recherche?ville=Douala"}>Douala</Link>
            </li>
            <li>
              <Link href={base + "/recherche?ville=Kribi"}>Kribi</Link>
            </li>
            <li>
              <Link href={base + "/recherche?ville=Edéa"}>Edéa</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide">
            Explorer par catégorie
          </h4>
          <ul className="space-y-2 text-sm text-fond/60">
            <li>
              <Link href={base + "/louer-un-logement"}>
                Louer un logement
              </Link>
            </li>
            <li>
              <Link href={base + "/acheter-une-maison"}>
                Acheter une maison
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide">
            Ressources
          </h4>
          <ul className="space-y-2 text-sm text-fond/60">
            <li>
              <Link href={base + "/a-propos"}>À propos</Link>
            </li>
            <li>
              <Link href={base + "/contact"}>Contact</Link>
            </li>
            <li>
              <Link href={base + "/politique-confidentialite"}>
                Confidentialité
              </Link>
            </li>
            <li>
              <Link href={base + "/conditions-generales"}>
                Conditions générales
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-fond/10 px-6 py-4 text-center text-xs text-fond/40">
        © {new Date().getFullYear()} Open Doors. Tous droits réservés.
      </div>
    </footer>
  );
}