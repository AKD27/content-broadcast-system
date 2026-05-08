"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Upload, BookOpen, CheckSquare,
  FileText, LogOut, GraduationCap,
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

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const nav = user?.role === ROLES.PRINCIPAL ? PRINCIPAL_NAV : TEACHER_NAV;

  return (
    <aside className="w-64 min-h-screen flex flex-col bg-[var(--sidebar-bg)] border-r border-[var(--sidebar-border)]">
      
      <div className="px-6 py-5 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <GraduationCap size={18} className="text-white" />
          </div>
          <span className="font-bold text-[var(--text-primary)] text-sm">EduBroadcast</span>
        </div>
      </div>

      
      <div className="px-5 py-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-700 dark:text-primary-300 font-semibold text-sm flex-shrink-0">
            {user?.name?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-[var(--text-primary)] truncate">{user?.name}</p>
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
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
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
          <ThemeToggle variant="icon" />
        </div>
        
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
