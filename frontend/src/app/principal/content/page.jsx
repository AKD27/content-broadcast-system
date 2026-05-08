"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Filter } from "lucide-react";
import { getAllContent } from "@/services/content.service";
import { useDebounce } from "@/hooks/useDebounce";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import ContentCard from "@/components/shared/ContentCard";
import EmptyState from "@/components/ui/EmptyState";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { ROLES } from "@/utils/constants";
import { cn } from "@/utils/helpers";

const STATUS_FILTERS = ["all", "pending", "approved", "rejected"];

export default function AllContentPage() {
  const [content, setContent]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [search, setSearch]     = useState("");
  const [status, setStatus]     = useState("all");

  const debouncedSearch = useDebounce(search, 400);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllContent({ status, search: debouncedSearch });
      setContent(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [status, debouncedSearch]);

  useEffect(() => { fetchContent(); }, [fetchContent]);

  return (
    <ProtectedRoute allowedRole={ROLES.PRINCIPAL}>
      <DashboardLayout
        title="All Content"
        subtitle="Browse and filter all uploaded content"
      >
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, subject or teacher…"
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-[var(--input-bg)] text-[var(--text-primary)] border border-[var(--input-border)] placeholder:text-[var(--text-muted)]"
            />
          </div>

          <div className="flex gap-1.5">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={cn(
                  "px-3 py-2 rounded-lg text-xs font-medium capitalize transition-colors",
                  status === s
                    ? "bg-primary-600 text-white"
                    : "bg-surface border border-theme text-sub hover:border-gray-300"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <div className="rounded-xl bg-red-50 border border-red-200 p-6 text-sm text-red-700">
            {error} <button onClick={fetchContent} className="underline ml-1">Retry</button>
          </div>
        ) : !content.length ? (
          <EmptyState
            icon={Filter}
            title="No content found"
            description="Try adjusting your search or filter criteria."
          />
        ) : (
          <>
            <p className="text-xs text-gray-500 mb-4">{content.length} items found</p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {content.map((item) => (
                <ContentCard key={item.id} content={item} />
              ))}
            </div>
          </>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
