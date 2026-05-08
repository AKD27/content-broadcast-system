import { cn } from "@/utils/helpers";

export default function Card({ children, className, ...props }) {
  return (
    <div
      {...props}
      className={cn(
        "bg-[var(--bg-surface)] rounded-xl border border-[var(--border-color)] shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return (
    <div className={cn("px-6 py-4 border-b border-[var(--border-subtle)]", className)}>
      {children}
    </div>
  );
}

export function CardBody({ children, className }) {
  return <div className={cn("px-6 py-4", className)}>{children}</div>;
}

export function CardFooter({ children, className }) {
  return (
    <div className={cn("px-6 py-4 border-t border-[var(--border-subtle)]", className)}>
      {children}
    </div>
  );
}
