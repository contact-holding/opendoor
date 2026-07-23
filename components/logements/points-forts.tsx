import { Home, UtensilsCrossed, ShieldCheck } from "lucide-react";

export default function PointsForts({
  nombrePieces,
  surface,
}: {
  nombrePieces: number;
  surface: number;
}) {
  const points = [
    {
      icone: Home,
      titre: "Logement entier pour vous",
      description: nombrePieces + " pièce(s), " + surface + " m²",
    },
    {
      icone: UtensilsCrossed,
      titre: "Cuisine équipée",
      description: "Espace cuisine à disposition",
    },
    {
      icone: ShieldCheck,
      titre: "Vérifié sur place",
      description: "Contrôlé par l'équipe Open Doors",
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {points.map(({ icone: Icone, titre, description }) => (
        <div key={titre} className="rounded-xl border border-ligne p-4">
          <Icone className="h-5 w-5 text-argile" />
          <p className="mt-2 text-sm font-medium">{titre}</p>
          <p className="text-xs text-encre/60">{description}</p>
        </div>
      ))}
    </div>
  );
}