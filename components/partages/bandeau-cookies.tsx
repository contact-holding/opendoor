"use client";

import { useEffect, useState } from "react";

export default function BandeauCookies() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepte = localStorage.getItem("opendoors_cookies_accepte");
    if (!accepte) setVisible(true);
  }, []);

  function repondre(valeur: "accepte" | "refuse") {
    localStorage.setItem("opendoors_cookies_accepte", valeur);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[150] border-t border-ligne bg-fond p-6 shadow-lg">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4">
        <p className="max-w-2xl text-sm text-encre/70">
          Nous utilisons des cookies pour améliorer votre expérience sur Open
          Doors et mesurer l&apos;audience du site.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => repondre("refuse")}
            className="rounded-full border border-ligne px-5 py-2 text-sm font-medium hover:bg-sable"
          >
            Tout refuser
          </button>
          <button
            onClick={() => repondre("accepte")}
            className="rounded-full bg-argile px-5 py-2 text-sm font-medium text-fond hover:bg-argile-fonce"
          >
            J&apos;accepte
          </button>
        </div>
      </div>
    </div>
  );
}