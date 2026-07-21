"use client";

import { useEffect } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

interface ToastProps {
  type: "succes" | "erreur";
  message: string;
  onFermer: () => void;
}

export default function NotificationToast({ type, message, onFermer }: ToastProps) {
  useEffect(() => {
    const minuteur = setTimeout(onFermer, 4000);
    return () => clearTimeout(minuteur);
  }, [onFermer]);

  const Icone = type === "succes" ? CheckCircle2 : XCircle;
  const couleur = type === "succes" ? "text-mousse" : "text-red-500";

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-2 rounded-xl border border-ligne bg-fond px-4 py-3 shadow-lg">
      <Icone className={`h-5 w-5 ${couleur}`} />
      <p className="text-sm">{message}</p>
    </div>
  );
}