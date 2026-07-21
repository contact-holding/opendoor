import { ReactNode } from "react";

export default function Carte({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-ligne bg-fond shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}