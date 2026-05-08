"use client";

import { useCallback } from "react";
import { BookOpen, Plus } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getContentByTeacher } from "@/services/content.service";
import { useAsync } from "@/hooks/useAsync";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import ContentCard from "@/components/shared/ContentCard";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { ROUTES, ROLES } from "@/utils/constants";

export default function MyContentPage() {
  const { user } = useAuth();

  const fetchContent = useCallback(
    () => getContentByTeacher(),
    []
  );
  const { data: content, loading, error, refetch } = useAsync(fetchContent, []);

  return (
    <ProtectedRoute allowedRole={ROLES.TEACHER}>
      <DashboardLayout
        title="My Content"
        subtitle="All content you've submitted for approval"
      >
        
        <div className="flex justify-end mb-6">
          <Link href={ROUTES.TEACHER_UPLOAD}>
            <Button size="sm">
              <Plus size={15} /> Upload New
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <div className="rounded-xl bg-red-50 border border-red-200 p-6 text-sm text-red-700">
            {error}{" "}
            <button onClick={refetch} className="underline ml-1">Retry</button>
          </div>
        ) : !content?.length ? (
          <EmptyState
            icon={BookOpen}
            title="No content uploaded yet"
            description="Upload your first piece of educational content to get started."
            action={
              <Link href={ROUTES.TEACHER_UPLOAD}>
                <Button size="sm"><Plus size={14} /> Upload Content</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {content.map((item) => (
              <ContentCard key={item.id} content={item} />
            ))}
          </div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
