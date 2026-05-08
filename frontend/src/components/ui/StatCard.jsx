import { cn } from "@/utils/helpers";

export default function StatCard({ title, value, icon: Icon, color = "blue" }) {
  const colors = {
    blue:   { bg: "bg-blue-50   dark:bg-blue-900/20",   icon: "text-blue-600   dark:text-blue-400",   val: "text-blue-700   dark:text-blue-300"   },
    green:  { bg: "bg-green-50  dark:bg-green-900/20",  icon: "text-green-600  dark:text-green-400",  val: "text-green-700  dark:text-green-300"  },
    yellow: { bg: "bg-yellow-50 dark:bg-yellow-900/20", icon: "text-yellow-600 dark:text-yellow-400", val: "text-yellow-700 dark:text-yellow-300" },
    red:    { bg: "bg-red-50    dark:bg-red-900/20",    icon: "text-red-600    dark:text-red-400",    val: "text-red-700    dark:text-red-300"    },
  };
  const c = colors[color] ?? colors.blue;

  return (
    <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border-color)] p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
      {Icon && (
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", c.bg)}>
          <Icon size={22} className={c.icon} />
        </div>
      )}
      <div>
        <p className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wide">{title}</p>
        <p className={cn("text-2xl font-bold mt-0.5", c.val)}>
          {value ?? <span className="text-[var(--text-muted)]">—</span>}
        </p>
      </div>
    </div>
  );
}
