import { Loader2 } from "lucide-react";

export default function Chargement({ message = "Chargement…" }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-encre/50">
      <Loader2 className="h-6 w-6 animate-spin text-argile" />
      <p className="text-sm">{message}</p>
    </div>
  );
}