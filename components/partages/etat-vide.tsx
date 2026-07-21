import { Inbox } from "lucide-react";

export default function EtatVide({
  titre,
  message,
}: {
  titre: string;
  message: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ligne py-16 text-center">
      <Inbox className="h-8 w-8 text-encre/30" strokeWidth={1.5} />
      <h3 className="font-display text-lg">{titre}</h3>
      <p className="max-w-sm text-sm text-encre/60">{message}</p>
    </div>
  );
}