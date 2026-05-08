"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  login as loginService,
  register as registerService,
  logout as logoutService,
  getCurrentUser,
} from "@/services/auth.service";
import { ROUTES, ROLES } from "@/utils/constants";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const stored = getCurrentUser();
    setUser(stored);
    setLoading(false);
  }, []);

  const redirectByRole = useCallback((role) => {
    if (role === ROLES.PRINCIPAL) {
      router.push(ROUTES.PRINCIPAL_DASHBOARD);
    } else {
      router.push(ROUTES.TEACHER_DASHBOARD);
    }
  }, [router]);

  const login = useCallback(async (credentials) => {
    const { user: loggedInUser } = await loginService(credentials);
    setUser(loggedInUser);
    redirectByRole(loggedInUser.role);
    return loggedInUser;
  }, [redirectByRole]);

  const register = useCallback(async (data) => {
    const { user: newUser } = await registerService(data);
    setUser(newUser);
    redirectByRole(newUser.role);
    return newUser;
  }, [redirectByRole]);

  const logout = useCallback(() => {
    logoutService();
    setUser(null);
    router.push(ROUTES.LOGIN);
  }, [router]);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      isTeacher:   user?.role === ROLES.TEACHER,
      isPrincipal: user?.role === ROLES.PRINCIPAL,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
