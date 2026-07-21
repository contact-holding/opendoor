import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Miette {
  label: string;
  href?: string;
}

export default function FilAriane({ miettes }: { miettes: Miette[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-encre/50">
      {miettes.map((miette, index) => (
        <span key={index} className="flex items-center gap-2">
          {miette.href ? (
            <Link href={miette.href} className="hover:text-argile">
              {miette.label}
            </Link>
          ) : (
            <span className="text-encre">{miette.label}</span>
          )}
          {index < miettes.length - 1 && <ChevronRight className="h-3.5 w-3.5" />}
        </span>
      ))}
    </nav>
  );
}