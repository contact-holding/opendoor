"use client";

import { MessageCircle } from "lucide-react";

const numeroWhatsapp = "237600000000";

export default function BulleWhatsapp() {
  const lienWhatsapp = "https://wa.me/" + numeroWhatsapp;

  const proprietesLien = {
    href: lienWhatsapp,
    target: "_blank",
    rel: "noopener noreferrer",
    className:
      "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-mousse text-fond shadow-lg transition-transform hover:scale-105",
    "aria-label": "Contacter sur WhatsApp",
  };

  return (
    <a {...proprietesLien}>
      <MessageCircle className="h-6 w-6" fill="currentColor" />
    </a>
  );
}