import { InputHTMLAttributes, forwardRef } from "react";

interface ChampTexteProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  erreur?: string;
}

const ChampTexte = forwardRef<HTMLInputElement, ChampTexteProps>(
  ({ label, erreur, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="mb-1.5 block text-sm font-medium text-encre">
          {label}
        </label>
        <input
          ref={ref}
          className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors ${
            erreur ? "border-red-400" : "border-ligne focus:border-argile"
          } ${className}`}
          {...props}
        />
        {erreur && <p className="mt-1 text-xs text-red-500">{erreur}</p>}
      </div>
    );
  }
);

ChampTexte.displayName = "ChampTexte";
export default ChampTexte;