import { forwardRef } from "react";
import { cn } from "@/utils/helpers";

const Input = forwardRef(function Input({ label, error, className, required, ...props }, ref) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-[var(--text-primary)]">
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        {...props}
        className={cn(
          "w-full rounded-lg border px-3 py-2 text-sm",
          "bg-[var(--input-bg)] text-[var(--text-primary)]",
          "placeholder:text-[var(--text-muted)]",
          "transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
          error
            ? "border-red-400 bg-red-50 dark:bg-red-900/20"
            : "border-[var(--input-border)] hover:border-[var(--text-muted)]",
          className
        )}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
});

export default Input;
