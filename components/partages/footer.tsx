import Link from "next/link";
import { Key } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-ligne bg-sable/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-lg">
            <Key className="h-4 w-4 text-argile" strokeWidth={1.75} />
            Clevia
          </div>
          <p className="mt-3 text-sm text-encre/70">
            La location, du premier contact à la remise des clés.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Plateforme</h4>
          <ul className="space-y-2 text-sm text-encre/70">
            <li><Link href="/recherche">Rechercher un logement</Link></li>
            <li><Link href="/inscription">Publier un bien</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">À propos</h4>
          <ul className="space-y-2 text-sm text-encre/70">
            <li><Link href="/a-propos">Qui sommes-nous</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Légal</h4>
          <ul className="space-y-2 text-sm text-encre/70">
            <li><Link href="/politique-confidentialite">Confidentialité</Link></li>
            <li><Link href="/conditions-generales">Conditions générales</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ligne px-6 py-4 text-center text-xs text-encre/60">
        © {new Date().getFullYear()} Clevia. Tous droits réservés.
      </div>
    </footer>
  );
}