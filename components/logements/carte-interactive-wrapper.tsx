"use client";

import dynamic from "next/dynamic";
import type { Logement } from "@/types";

const CarteInteractive = dynamic(
  () => import("@/components/logements/carte-interactive"),
  {
    ssr: false,
    loading: () => (
      <p className="text-sm text-encre/50">Chargement de la carte…</p>
    ),
  }
);

export default function CarteInteractiveWrapper({ logements }: { logements: Logement[] }) {
  return <CarteInteractive logements={logements} />;
}