"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ROUTES, ROLES } from "@/utils/constants";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace(ROUTES.LOGIN);
    } else if (user.role === ROLES.PRINCIPAL) {
      router.replace(ROUTES.PRINCIPAL_DASHBOARD);
    } else {
      router.replace(ROUTES.TEACHER_DASHBOARD);
    }
  }, [user, loading, router]);

  return null;
}
