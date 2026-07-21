"use client";

import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";

const langues = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
];

export default function SelecteurLangue() {
  const pathname = usePathname();
  const router = useRouter();

  function changerLangue(code: string) {
    const segments = pathname?.split("/") ?? [];
    segments[1] = code;
    router.push(segments.join("/"));
  }

  return (
    <div className="flex items-center gap-1 text-sm text-encre/60">
      <Globe className="h-4 w-4" />
      {langues.map((langue) => (
        <button
          key={langue.code}
          onClick={() => changerLangue(langue.code)}
          className="px-1 hover:text-argile"
        >
          {langue.label}
        </button>
      ))}
    </div>
  );
}