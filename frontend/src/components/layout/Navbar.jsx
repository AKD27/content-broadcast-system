"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, X, GraduationCap, LayoutDashboard, Upload,
  BookOpen, CheckSquare, FileText, LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ROLES, ROUTES } from "@/utils/constants";
import { cn } from "@/utils/helpers";
import ThemeToggle from "@/components/ui/ThemeToggle";

const TEACHER_NAV = [
  { label: "Dashboard",  href: ROUTES.TEACHER_DASHBOARD,  icon: LayoutDashboard },
  { label: "Upload",     href: ROUTES.TEACHER_UPLOAD,     icon: Upload          },
  { label: "My Content", href: ROUTES.TEACHER_MY_CONTENT, icon: BookOpen        },
];

const PRINCIPAL_NAV = [
  { label: "Dashboard",   href: ROUTES.PRINCIPAL_DASHBOARD, icon: LayoutDashboard },
  { label: "Approvals",   href: ROUTES.PRINCIPAL_APPROVALS, icon: CheckSquare     },
  { label: "All Content", href: ROUTES.PRINCIPAL_CONTENT,   icon: FileText        },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const nav = user?.role === ROLES.PRINCIPAL ? PRINCIPAL_NAV : TEACHER_NAV;

  return (
    <header className="lg:hidden sticky top-0 z-40 bg-[var(--bg-surface)] border-b border-[var(--border-color)] px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
          <GraduationCap size={15} className="text-white" />
        </div>
        <span className="font-bold text-[var(--text-primary)] text-sm">EduBroadcast</span>
      </div>

      <div className="flex items-center gap-1">
        <ThemeToggle variant="icon" />
        <button
          onClick={() => setOpen((v) => !v)}
          className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] transition-colors"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={() => setOpen(false)} />
          <div className="fixed top-0 left-0 bottom-0 w-72 z-50 shadow-2xl flex flex-col animate-slide-up bg-[var(--bg-surface)] border-r border-[var(--border-color)]">
            <div className="px-5 py-5 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{user?.name}</p>
                  <p className="text-xs text-[var(--text-secondary)] capitalize">{user?.role}</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
              {nav.map(({ label, href, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                      active
                        ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
                    )}
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="px-3 py-4 border-t border-[var(--border-subtle)] space-y-1">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-xs text-[var(--text-muted)] font-medium">Theme</span>
                <ThemeToggle variant="full" />
              </div>
              <button
                onClick={() => { logout(); setOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
