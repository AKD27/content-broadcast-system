"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import toast from "react-hot-toast";
import { getPendingContent } from "@/services/approval.service";
import { approveContent, rejectContent } from "@/services/approval.service";
import { useAsync } from "@/hooks/useAsync";
import { rejectionSchema } from "@/utils/validations";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import ContentCard from "@/components/shared/ContentCard";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import EmptyState from "@/components/ui/EmptyState";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { ROLES } from "@/utils/constants";

export default function ApprovalsPage() {
  const { data: content, loading, error, refetch } = useAsync(getPendingContent);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(rejectionSchema) });

  const handleApprove = async (_id) => {
    setActionLoading(_id);
    try {
      await approveContent(_id);
      toast.success("Content approved successfully!");
      refetch();
    } catch (err) {
      toast.error(err.message ?? "Failed to approve content.");
    } finally {
      setActionLoading(null);
    }
  };

  const openRejectModal = (item) => {
    setRejectTarget(item);
    reset();
  };

  const handleReject = async ({ reason }) => {
    setActionLoading(rejectTarget._id);
    try {
      await rejectContent(rejectTarget._id, reason);
      toast.success("Content rejected.");
      setRejectTarget(null);
      refetch();
    } catch (err) {
      toast.error(err.message ?? "Failed to reject content.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <ProtectedRoute allowedRole={ROLES.PRINCIPAL}>
      <DashboardLayout
        title="Pending Approvals"
        subtitle="Review and approve or reject teacher-submitted content"
      >
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <div className="rounded-xl bg-red-50 border border-red-200 p-6 text-sm text-red-700">
            {error}{" "}<button onClick={refetch} className="underline ml-1">Retry</button>
          </div>
        ) : !content?.length ? (
          <EmptyState
            icon={Clock}
            title="No pending content"
            description="All content has been reviewed. Check back later."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {content.map((item) => (
              <ContentCard
                key={item._id}
                content={item}
                actions={
                  <>
                    <Button
                      variant="success"
                      size="sm"
                      loading={actionLoading === item._id}
                      onClick={() => handleApprove(item._id)}
                    >
                      <CheckCircle size={14} /> Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      disabled={actionLoading === item._id}
                      onClick={() => openRejectModal(item)}
                    >
                      <XCircle size={14} /> Reject
                    </Button>
                  </>
                }
              />
            ))}
          </div>
        )}

        {/* Rejection Modal */}
        <Modal
          isOpen={Boolean(rejectTarget)}
          onClose={() => setRejectTarget(null)}
          title="Reject Content"
        >
          <div className="space-y-4">
            <p className="text-sm text-sub">
              You are rejecting:{" "}
              <strong className="text-main">{rejectTarget?.title}</strong>
            </p>
            <form onSubmit={handleSubmit(handleReject)} className="space-y-4">
              <Textarea
                {...register("reason")}
                label="Rejection Reason"
                placeholder="Explain why this content is being rejected…"
                rows={4}
                required
                error={errors.reason?.message}
              />
              <div className="flex gap-3">
                <Button
                  type="submit"
                  variant="danger"
                  loading={Boolean(actionLoading)}
                >
                  Confirm Rejection
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setRejectTarget(null)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
