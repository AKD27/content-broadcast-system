"use client";

import { useCallback } from "react";
import { Upload, BookOpen, Clock, CheckCircle, XCircle, Plus } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getTeacherStats } from "@/services/content.service";
import { useAsync } from "@/hooks/useAsync";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import StatCard from "@/components/ui/StatCard";
import Button from "@/components/ui/Button";
import { SkeletonStatCard } from "@/components/ui/Skeleton";
import { ROUTES, ROLES } from "@/utils/constants";

export default function TeacherDashboardPage() {
  const { user } = useAuth();

  const fetchStats = useCallback(
    () => getTeacherStats(),
    []
  );
  const { data: stats, loading, error } = useAsync(fetchStats, []);

  return (
    <ProtectedRoute allowedRole={ROLES.TEACHER}>
      <DashboardLayout
        title={`Welcome, ${user?.name?.split(" ")[0]} 👋`}
        subtitle="Here's an overview of your content"
      >
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonStatCard key={i} />)
          ) : error ? (
            <div className="col-span-4 text-sm text-red-600 bg-red-50 rounded-xl p-4">
              Failed to load stats: {error}
            </div>
          ) : (
            <>
              <StatCard title="Total Uploads"  value={stats?.total}    icon={BookOpen}     color="blue"   />
              <StatCard title="Pending"        value={stats?.pending}  icon={Clock}        color="yellow" />
              <StatCard title="Approved"       value={stats?.approved} icon={CheckCircle}  color="green"  />
              <StatCard title="Rejected"       value={stats?.rejected} icon={XCircle}      color="red"    />
            </>
          )}
        </div>

        
        <div className="bg-surface rounded-xl border border-theme p-6">
          <h2 className="text-base font-semibold text-main mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link href={ROUTES.TEACHER_UPLOAD}>
              <Button variant="primary" size="md">
                <Plus size={16} /> Upload New Content
              </Button>
            </Link>
            <Link href={ROUTES.TEACHER_MY_CONTENT}>
              <Button variant="outline" size="md">
                <BookOpen size={16} /> View My Content
              </Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
