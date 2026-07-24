"use client";

import { useEffect, useState } from "react";

const messages = [
  "Trouvez un studio, une chambre ou un appartement vérifié à Douala, Kribi et Edéa",
  "Contactez directement les propriétaires par WhatsApp, sans intermédiaire caché",
  "Payez simplement via MTN Mobile Money ou Orange Money",
  "Profitez de visites gratuites sur une sélection de logements chaque semaine",
];

export default function TexteDefilant() {
  const [texteAffiche, setTexteAffiche] = useState("");
  const [indexMessage, setIndexMessage] = useState(0);
  const [enSuppression, setEnSuppression] = useState(false);

  useEffect(() => {
    const messageActuel = messages[indexMessage];
    const vitesse = enSuppression ? 15 : 30;

    const minuteur = setTimeout(() => {
      if (!enSuppression) {
        if (texteAffiche.length < messageActuel.length) {
          setTexteAffiche(messageActuel.slice(0, texteAffiche.length + 1));
        } else {
          setTimeout(() => setEnSuppression(true), 1400);
        }
      } else {
        if (texteAffiche.length > 0) {
          setTexteAffiche(texteAffiche.slice(0, -1));
        } else {
          setEnSuppression(false);
          setIndexMessage((i) => (i + 1) % messages.length);
        }
      }
    }, vitesse);

    return () => clearTimeout(minuteur);
  }, [texteAffiche, enSuppression, indexMessage]);

  return (
    <p className="min-h-[3.5rem] max-w-2xl text-lg text-fond/90 md:text-xl">
      {texteAffiche}
      <span className="animate-pulse">|</span>
    </p>
  );
}