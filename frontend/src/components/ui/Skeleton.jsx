import { cn } from "@/utils/helpers";

export function Skeleton({ className }) {
  return <div className={cn("rounded-md bg-[var(--skeleton-base)] animate-pulse-soft", className)} />;
}

export function SkeletonCard() {
  return (
    <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border-color)] p-6 space-y-4">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-32 w-full rounded-lg" />
      <div className="flex gap-3">
        <Skeleton className="h-8 w-20 rounded-lg" />
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 items-center p-4 bg-[var(--bg-surface)] rounded-lg border border-[var(--border-color)]">
          <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonStatCard() {
  return (
    <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border-color)] p-6 space-y-3">
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-8 w-1/3" />
    </div>
  );
}
