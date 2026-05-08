import { memo } from "react";
import Badge from "@/components/ui/Badge";
import { formatDateTime, getScheduleStatus, truncate } from "@/utils/helpers";


const ContentTable = memo(function ContentTable({ items, actions }) {
  return (
    <div className="bg-surface rounded-xl border border-theme overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-base border-b border-theme">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Content
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Subject
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Teacher
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                Schedule
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              {actions && (
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <ContentTableRow key={item.id} item={item} actions={actions} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});


const ContentTableRow = memo(function ContentTableRow({ item, actions }) {
  const scheduleStatus = getScheduleStatus(item.startTime, item.endTime);

  return (
    <tr className="hover:bg-base transition-colors group">
      
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <img
              src={item.fileUrl}
              alt={item.title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.src = `https://placehold.co/40x40/e5e7eb/9ca3af?text=?`;
              }}
            />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-main truncate max-w-[180px]">
              {item.title}
            </p>
            {item.rejectionReason && (
              <p className="text-xs text-red-500 truncate max-w-[180px]" title={item.rejectionReason}>
                ✗ {truncate(item.rejectionReason, 40)}
              </p>
            )}
          </div>
        </div>
      </td>

      
      <td className="px-4 py-3 hidden sm:table-cell">
        <span className="text-sub text-xs">{item.subject}</span>
      </td>

      
      <td className="px-4 py-3 hidden md:table-cell">
        <span className="text-sub text-xs">{item.teacherName}</span>
      </td>

      
      <td className="px-4 py-3 hidden lg:table-cell">
        <div className="text-xs text-gray-500 space-y-0.5">
          <div>{formatDateTime(item.startTime)}</div>
          <div className="text-gray-400">→ {formatDateTime(item.endTime)}</div>
        </div>
      </td>

      
      <td className="px-4 py-3">
        <div className="flex flex-col gap-1">
          <Badge status={item.status} />
          <Badge status={scheduleStatus} />
        </div>
      </td>

      
      {actions && (
        <td className="px-4 py-3 text-right">
          <div className="flex items-center justify-end gap-2">
            {actions(item)}
          </div>
        </td>
      )}
    </tr>
  );
});

export default ContentTable;
