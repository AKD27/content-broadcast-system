"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/utils/constants";

export default function ProtectedRoute({ children, allowedRole }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace(ROUTES.LOGIN);
      return;
    }

    if (allowedRole && user.role !== allowedRole) {
      
      const redirect =
        user.role === "principal"
          ? ROUTES.PRINCIPAL_DASHBOARD
          : ROUTES.TEACHER_DASHBOARD;
      router.replace(redirect);
    }
  }, [user, loading, allowedRole, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base">
        <div className="flex flex-col items-center gap-3">
          <span className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading…</p>
        </div>
      </div>
    );
  }

  if (!user) return null;
  if (allowedRole && user.role !== allowedRole) return null;

  return children;
}
