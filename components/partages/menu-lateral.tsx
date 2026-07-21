"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  History,
  Wrench,
  Home,
  FileSignature,
  Users,
  Scale,
} from "lucide-react";

const liensParEspace = {
  locataire: [
    { label: "Tableau de bord", href: "/locataire/tableau-de-bord", icone: LayoutDashboard },
    { label: "Mes documents", href: "/locataire/mes-documents", icone: FileText },
    { label: "Historique", href: "/locataire/historique", icone: History },
    { label: "Mes incidents", href: "/locataire/mes-incidents", icone: Wrench },
  ],
  proprietaire: [
    { label: "Tableau de bord", href: "/proprietaire/tableau-de-bord", icone: LayoutDashboard },
    { label: "Mes biens", href: "/proprietaire/mes-biens", icone: Home },
    { label: "Mes contrats", href: "/proprietaire/mes-contrats", icone: FileSignature },
    { label: "Historique", href: "/proprietaire/historique", icone: History },
  ],
  admin: [
    { label: "Tableau de bord", href: "/admin/tableau-de-bord", icone: LayoutDashboard },
    { label: "Utilisateurs", href: "/admin/utilisateurs", icone: Users },
    { label: "Biens", href: "/admin/biens", icone: Home },
    { label: "Litiges", href: "/admin/litiges", icone: Scale },
  ],
};

export default function MenuLateral({ espace }: { espace: "locataire" | "proprietaire" | "admin" }) {
  const pathname = usePathname();
  const liens = liensParEspace[espace];

  return (
    <aside className="h-full w-64 shrink-0 border-r border-ligne bg-fond p-5">
      <nav className="flex flex-col gap-1">
        {liens.map((lien) => {
          const actif = pathname?.includes(lien.href);
          const Icone = lien.icone;
          return (
            <Link
              key={lien.href}
              href={lien.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                actif ? "bg-argile text-fond" : "text-encre/70 hover:bg-sable"
              }`}
            >
              <Icone className="h-4 w-4" />
              {lien.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}