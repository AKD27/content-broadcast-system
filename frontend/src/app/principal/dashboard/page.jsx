"use client";

import { CheckSquare, Clock, FileText, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getPrincipalStats } from "@/services/content.service";
import { useAsync } from "@/hooks/useAsync";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import StatCard from "@/components/ui/StatCard";
import Button from "@/components/ui/Button";
import { SkeletonStatCard } from "@/components/ui/Skeleton";
import { ROUTES, ROLES } from "@/utils/constants";

export default function PrincipalDashboardPage() {
  const { user } = useAuth();
  const { data: stats, loading, error } = useAsync(getPrincipalStats);

  return (
    <ProtectedRoute allowedRole={ROLES.PRINCIPAL}>
      <DashboardLayout
        title={`Hello, ${user?.name?.split(" ")[0]} 👋`}
        subtitle="Content approval overview"
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
              <StatCard title="Total Content" value={stats?.total}    icon={FileText}     color="blue"   />
              <StatCard title="Pending"       value={stats?.pending}  icon={Clock}        color="yellow" />
              <StatCard title="Approved"      value={stats?.approved} icon={CheckCircle}  color="green"  />
              <StatCard title="Rejected"      value={stats?.rejected} icon={XCircle}      color="red"    />
            </>
          )}
        </div>

        
        <div className="bg-surface rounded-xl border border-theme p-6">
          <h2 className="text-base font-semibold text-main mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link href={ROUTES.PRINCIPAL_APPROVALS}>
              <Button variant="primary" size="md">
                <CheckSquare size={16} /> Review Pending
                {stats?.pending > 0 && (
                  <span className="ml-1 bg-surface/30 text-white text-xs rounded-full px-1.5 py-0.5">
                    {stats.pending}
                  </span>
                )}
              </Button>
            </Link>
            <Link href={ROUTES.PRINCIPAL_CONTENT}>
              <Button variant="outline" size="md">
                <FileText size={16} /> View All Content
              </Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
