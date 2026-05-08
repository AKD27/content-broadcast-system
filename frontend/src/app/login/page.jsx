"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { loginSchema } from "@/utils/validations";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      await login(data);
      toast.success("Welcome back!");
    } catch (err) {
      setError("root", { message: err.message });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-[var(--bg-base)] to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      {/* Theme toggle — top right */}
      <div className="absolute top-4 right-4">
        <ThemeToggle variant="full" />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 bg-primary-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
            <GraduationCap size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">EduBroadcast</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Content Broadcasting System</p>
        </div>

        <div className="bg-[var(--bg-surface)] rounded-2xl shadow-xl border border-[var(--border-color)] p-8 space-y-5">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Sign in to your account</h2>
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input {...register("email")} label="Email address" type="email" placeholder="you@school.com" required error={errors.email?.message} />

            <div className="relative">
              <Input {...register("password")} label="Password" type={showPassword ? "text" : "password"} placeholder="••••••••" required error={errors.password?.message} />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-[34px] text-[var(--text-muted)] hover:text-[var(--text-secondary)]">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {errors.root && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
                {errors.root.message}
              </div>
            )}

            <Button type="submit" loading={isSubmitting} className="w-full mt-2" size="lg">Sign In</Button>
          </form>

          <div className="text-center text-sm text-[var(--text-secondary)]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary-600 font-medium hover:underline">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
