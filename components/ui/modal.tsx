"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  ouvert: boolean;
  onFermer: () => void;
  titre: string;
  children: ReactNode;
}

export default function Modal({ ouvert, onFermer, titre, children }: ModalProps) {
  if (!ouvert) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-encre/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-fond p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg">{titre}</h3>
          <button onClick={onFermer} aria-label="Fermer">
            <X className="h-5 w-5 text-encre/60" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}