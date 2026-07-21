import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

interface ButonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: "principal" | "secondaire" | "fantome";
  href?: string;
  children: ReactNode;
}

export default function Bouton({
  variante = "principal",
  href,
  children,
  className = "",
  ...props
}: ButonProps) {
  const styles = {
    principal: "bg-argile text-fond hover:bg-argile-fonce",
    secondaire: "bg-encre text-fond hover:bg-encre/90",
    fantome: "bg-transparent text-encre border border-ligne hover:bg-sable",
  };

  const classesFinales = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${styles[variante]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classesFinales}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classesFinales} {...props}>
      {children}
    </button>
  );
}