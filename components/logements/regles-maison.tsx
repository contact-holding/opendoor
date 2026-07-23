import { LogIn, LogOut, Info, Ban } from "lucide-react";

export default function ReglesMaison() {
  const regles = [
    {
      icone: LogIn,
      titre: "Visite",
      texte: "Sur rendez-vous, à convenir directement avec le propriétaire.",
    },
    {
      icone: LogOut,
      titre: "Emménagement",
      texte: "Après signature du bail et état des lieux d'entrée.",
    },
    {
      icone: Info,
      titre: "Paiement",
      texte: "Aucun paiement en ligne. Les échanges se font en présentiel avec le propriétaire.",
    },
    {
      icone: Ban,
      titre: "Annulation",
      texte: "Une visite peut être annulée ou reportée directement par WhatsApp, sans frais.",
    },
  ];

  return (
    <div className="divide-y divide-ligne rounded-2xl border border-ligne">
      {regles.map(({ icone: Icone, titre, texte }) => (
        <div key={titre} className="flex gap-3 p-4">
          <Icone className="h-5 w-5 shrink-0 text-argile" />
          <div>
            <p className="text-sm font-medium">{titre}</p>
            <p className="text-sm text-encre/60">{texte}</p>
          </div>
        </div>
      ))}
    </div>
  );
}