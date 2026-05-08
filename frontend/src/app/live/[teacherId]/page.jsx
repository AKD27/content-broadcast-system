"use client";

import { useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Tv, RefreshCw } from "lucide-react";
import { getLiveContent } from "@/services/content.service";
import { useAsync } from "@/hooks/useAsync";
import { usePolling } from "@/hooks/usePolling";
import { formatDateTime } from "@/utils/helpers";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { POLLING_INTERVAL } from "@/utils/constants";

export default function LivePage() {
  const { teacherId } = useParams();
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const fetchLive = useCallback(() => getLiveContent(teacherId), [teacherId]);
  const { data: content, loading, error, refetch } = useAsync(fetchLive, [teacherId]);

  usePolling(() => { refetch(); setLastRefresh(new Date()); }, POLLING_INTERVAL, Boolean(teacherId));

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <Tv size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold">EduBroadcast Live</h1>
            <p className="text-xs text-white/50">Teacher ID: {teacherId}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle variant="icon" className="text-white/60 hover:text-white hover:bg-surface/10 border-white/10" />
          <p className="text-xs text-white/40 hidden sm:block">Updated: {lastRefresh.toLocaleTimeString()}</p>
          <button
            onClick={() => { refetch(); setLastRefresh(new Date()); }}
            className="p-2 rounded-lg bg-surface/10 hover:bg-surface/20 text-white/70 hover:text-white"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </header>

      <div className="px-6 py-3 bg-red-600/20 border-b border-red-500/30 flex items-center gap-2">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <span className="text-xs font-medium text-red-400 uppercase tracking-wider">Live Broadcast</span>
      </div>

      <main className="px-6 py-8 max-w-5xl mx-auto">
        {loading && !content ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3 bg-surface/10" />
            <Skeleton className="h-96 w-full rounded-2xl bg-surface/10" />
          </div>
        ) : error ? (
          <div className="rounded-xl bg-red-900/30 border border-red-700/50 p-6 text-center">
            <p className="text-red-400 text-sm">{error}</p>
            <button onClick={refetch} className="mt-3 text-xs text-red-300 underline">Try again</button>
          </div>
        ) : !content?.length ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <EmptyState icon={Tv} title="No content available" description="No live content is broadcasting right now. Check back later." className="text-white/60" />
          </div>
        ) : (
          <div className="space-y-8">
            {content.map((item, index) => (
              <div key={item.id || item._id} className="bg-surface/5 border border-white/10 rounded-2xl overflow-hidden animate-fade-in">
                {index === 0 && (
                  <div className="px-4 py-2 bg-primary-600/30 border-b border-primary-500/30">
                    <span className="text-xs font-medium text-primary-300 uppercase tracking-wider">Now Playing</span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h2 className="text-xl font-bold">{item.title}</h2>
                      <p className="text-white/60 text-sm mt-0.5">{item.subject}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge status="approved" label="Approved" />
                      <Badge status="active" label="Active" />
                    </div>
                  </div>
                  {item.description && <p className="text-white/60 text-sm mb-4">{item.description}</p>}
                  <div className="rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center">
                    <img src={item.fileUrl} alt={item.title} className="w-full h-full object-contain"
                      onError={(e) => { e.target.src = `https://placehold.co/1280x720/1f2937/6b7280?text=${encodeURIComponent(item.title)}`; }} />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/40">
                    <span>Start: {formatDateTime(item.startTime)}</span>
                    <span>End: {formatDateTime(item.endTime)}</span>
                    <span>Rotation: {item.rotationDuration}s</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="text-center py-6 text-xs text-white/20">
        EduBroadcast · Auto-refreshes every 30 seconds
      </footer>
    </div>
  );
}
