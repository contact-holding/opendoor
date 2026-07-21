import { SelectHTMLAttributes, forwardRef } from "react";

interface OptionSelect {
  valeur: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: OptionSelect[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="mb-1.5 block text-sm font-medium text-encre">
          {label}
        </label>
        <select
          ref={ref}
          className={`w-full rounded-lg border border-ligne bg-fond px-4 py-2.5 text-sm outline-none focus:border-argile ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.valeur} value={option.valeur}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;