"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Menu as MenuIcon, Heart, Share2 } from "lucide-react";

export default function MenuUtilisateur() {
  const [ouvert, setOuvert] = useState(false);
  const { locale } = useParams();

  async function partager() {
    const url = window.location.origin;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Open Doors", url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      alert("Lien copié dans le presse-papier !");
    }
    setOuvert(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOuvert(!ouvert)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-ligne hover:bg-sable"
        aria-label="Mon espace"
      >
        <MenuIcon className="h-4 w-4" />
      </button>

      {ouvert && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOuvert(false)} />
          <div className="absolute right-0 z-50 mt-2 w-64 rounded-2xl border border-ligne bg-fond p-2 shadow-lg">
            <Link
              href={"/" + locale + "/favoris"}
              onClick={() => setOuvert(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-sable"
            >
              <Heart className="h-4 w-4 text-argile" /> Mes favoris
            </Link>
            <button
              onClick={partager}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm hover:bg-sable"
            >
              <Share2 className="h-4 w-4 text-argile" /> Partager Open Doors
            </button>
          </div>
        </>
      )}
    </div>
  );
}