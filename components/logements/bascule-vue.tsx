"use client";

import { List, Map } from "lucide-react";

type Vue = "liste" | "carte";

export default function BasculeVue({
  vue,
  onChangerVue,
}: {
  vue: Vue;
  onChangerVue: (vue: Vue) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-ligne bg-fond p-1">
      <button
        onClick={() => onChangerVue("liste")}
        className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm transition-colors ${
          vue === "liste" ? "bg-encre text-fond" : "text-encre/60 hover:text-encre"
        }`}
      >
        <List className="h-4 w-4" />
        Liste
      </button>
      <button
        onClick={() => onChangerVue("carte")}
        className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm transition-colors ${
          vue === "carte" ? "bg-encre text-fond" : "text-encre/60 hover:text-encre"
        }`}
      >
        <Map className="h-4 w-4" />
        Carte
      </button>
    </div>
  );
}