import { forwardRef } from "react";
import { cn } from "@/utils/helpers";

const Select = forwardRef(function Select({ label, error, options = [], placeholder = "Select…", className, required, ...props }, ref) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-[var(--text-primary)]">
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        ref={ref}
        {...props}
        className={cn(
          "w-full rounded-lg border px-3 py-2 text-sm",
          "bg-[var(--input-bg)] text-[var(--text-primary)]",
          "transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
          error
            ? "border-red-400"
            : "border-[var(--input-border)] hover:border-[var(--text-muted)]",
          className
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
});

export default Select;
