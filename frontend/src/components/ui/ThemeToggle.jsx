"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/utils/helpers";

/**
 * ThemeToggle — cycles through light → dark → system
 * Pass variant="icon" for just the icon button (sidebar/navbar use)
 * Pass variant="full" for a segmented 3-way pill (settings use)
 */
export default function ThemeToggle({ variant = "icon", className }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render after mount
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className={cn("w-9 h-9", className)} />;

  /* ── Icon variant — single button that cycles ── */
  if (variant === "icon") {
    const cycle = () => {
      if (theme === "light")  return setTheme("dark");
      if (theme === "dark")   return setTheme("system");
      return setTheme("light");
    };

    const Icon  = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;
    const label = theme === "light" ? "Switch to dark"
                : theme === "dark"  ? "Switch to system"
                : "Switch to light";

    return (
      <button
        onClick={cycle}
        title={label}
        aria-label={label}
        className={cn(
          "w-9 h-9 rounded-lg flex items-center justify-center transition-colors",
          "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
          "hover:bg-[var(--bg-elevated)] border border-transparent",
          "hover:border-[var(--border-color)]",
          className
        )}
      >
        <Icon size={17} />
      </button>
    );
  }

  /* ── Full segmented variant ── */
  const options = [
    { value: "light",  Icon: Sun,     label: "Light"  },
    { value: "dark",   Icon: Moon,    label: "Dark"   },
    { value: "system", Icon: Monitor, label: "System" },
  ];

  return (
    <div
      className={cn(
        "inline-flex rounded-xl p-1 gap-0.5",
        "bg-[var(--bg-elevated)] border border-[var(--border-color)]",
        className
      )}
    >
      {options.map(({ value, Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          title={label}
          aria-label={`Switch to ${label} theme`}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
            theme === value
              ? "bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm border border-[var(--border-color)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]/50"
          )}
        >
          <Icon size={13} />
          {label}
        </button>
      ))}
    </div>
  );
}
