import Badge from "@/components/ui/Badge";
import { Clock, BookOpen, Calendar } from "lucide-react";
import { formatDateTime, getScheduleStatus, truncate } from "@/utils/helpers";

export default function ContentCard({ content, actions }) {
  const scheduleStatus = getScheduleStatus(content.startTime, content.endTime);

  return (
    <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border-color)] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      
      <div className="relative h-44 bg-[var(--bg-elevated)]">
        <img
          src={content.fileUrl}
          alt={content.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://placehold.co/800x400/e5e7eb/9ca3af?text=${encodeURIComponent(content.title)}`;
          }}
        />
        <div className="absolute top-2 right-2 flex gap-1.5">
          <Badge status={content.status} />
          <Badge status={scheduleStatus} />
        </div>
      </div>

      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-[var(--text-primary)] text-sm leading-snug">{content.title}</h3>
          {content.description && (
            <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
              {truncate(content.description, 80)}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
          <span className="flex items-center gap-1"><BookOpen size={12} />{content.subject}</span>
          <span className="flex items-center gap-1"><Clock size={12} />{content.rotationDuration}s</span>
        </div>

        <div className="text-xs text-[var(--text-muted)] space-y-0.5">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>Start: {formatDateTime(content.startTime)}</span>
          </div>
          <div className="flex items-center gap-1 ml-3.5">
            <span>End: {formatDateTime(content.endTime)}</span>
          </div>
        </div>

        {content.status === "rejected" && content.rejectionReason && (
          <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2">
            <p className="text-xs text-red-700 dark:text-red-400 font-medium">Rejection reason:</p>
            <p className="text-xs text-red-600 dark:text-red-300 mt-0.5">{content.rejectionReason}</p>
          </div>
        )}

        {actions && <div className="pt-1 flex gap-2">{actions}</div>}
      </div>
    </div>
  );
}
