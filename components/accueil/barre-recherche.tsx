"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import Bouton from "@/components/ui/bouton";

export default function BarreRecherche() {
  const [ville, setVille] = useState("");
  const router = useRouter();

  function lancerRecherche(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/recherche${ville ? `?ville=${encodeURIComponent(ville)}` : ""}`);
  }

  return (
    <form
      onSubmit={lancerRecherche}
      className="flex flex-col gap-3 rounded-2xl border border-ligne bg-fond p-3 shadow-sm sm:flex-row sm:items-center"
    >
      <div className="flex flex-1 items-center gap-2 px-3">
        <MapPin className="h-4 w-4 shrink-0 text-encre/50" />
        <input
          type="text"
          value={ville}
          onChange={(e) => setVille(e.target.value)}
          placeholder="Quelle ville ? (ex : Yaoundé, Douala…)"
          className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-encre/40"
        />
      </div>
      <Bouton variante="principal" type="submit" className="w-full sm:w-auto">
        <Search className="h-4 w-4" />
        Rechercher
      </Bouton>
    </form>
  );
}