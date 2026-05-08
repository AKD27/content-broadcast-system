import { cn } from "@/utils/helpers";

const variants = {
  primary:   "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
  secondary: "bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] focus:ring-gray-400",
  success:   "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
  danger:    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  outline:   "border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] focus:ring-gray-400",
  ghost:     "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] focus:ring-gray-400",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({ children, variant = "primary", size = "md", loading = false, disabled = false, className, ...props }) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-offset-1",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {loading && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  );
}
