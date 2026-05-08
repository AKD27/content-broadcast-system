import { cn, getStatusColor, capitalize } from "@/utils/helpers";

export default function Badge({ status, label, className }) {
  const display = label ?? capitalize(status);
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        getStatusColor(status),
        className
      )}
    >
      {display}
    </span>
  );
}
