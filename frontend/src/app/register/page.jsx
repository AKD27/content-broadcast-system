"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Link from "next/link";
import toast from "react-hot-toast";

const registerSchema = z.object({
  name:     z.string().min(2, "Name must be at least 2 characters"),
  email:    z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
  role:     z.enum(["teacher", "principal"], { required_error: "Please select a role" }),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data) => {
    try {
      await registerUser({ name: data.name, email: data.email, password: data.password, role: data.role });
      toast.success("Account created! Welcome to EduBroadcast.");
    } catch (err) {
      setError("root", { message: err.message });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-[var(--bg-base)] to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
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
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Create your account</h2>
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">Fill in your details to get started</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input {...register("name")} label="Full Name" placeholder="e.g., Rahul Sharma" required error={errors.name?.message} />
            <Input {...register("email")} label="Email address" type="email" placeholder="you@school.com" required error={errors.email?.message} />

            <div className="relative">
              <Input {...register("password")} label="Password" type={showPass ? "text" : "password"} placeholder="Min 6 characters" required error={errors.password?.message} />
              <button type="button" onClick={() => setShowPass((v) => !v)} className="absolute right-3 top-[34px] text-[var(--text-muted)] hover:text-[var(--text-secondary)]">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <Input {...register("confirmPassword")} label="Confirm Password" type="password" placeholder="Re-enter password" required error={errors.confirmPassword?.message} />

            <Select {...register("role")} label="Role" required
              options={[
                { label: "Teacher",   value: "teacher"   },
                { label: "Principal", value: "principal" },
              ]}
              error={errors.role?.message}
            />

            {errors.root && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
                {errors.root.message}
              </div>
            )}

            <Button type="submit" loading={isSubmitting} className="w-full mt-2" size="lg">Create Account</Button>
          </form>

          <div className="text-center text-sm text-[var(--text-secondary)]">
            Already have an account?{" "}
            <Link href="/login" className="text-primary-600 font-medium hover:underline">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
