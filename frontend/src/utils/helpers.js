import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}


export function formatDateTime(dateString) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}


export function getScheduleStatus(startTime, endTime) {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (now < start) return "scheduled";
  if (now >= start && now <= end) return "active";
  return "expired";
}


export function formatFileSize(bytes) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}


export function validateFile(file) {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: "Only JPG, PNG, and GIF files are allowed." };
  }
  if (file.size > maxSize) {
    return { valid: false, error: "File size must be less than 10MB." };
  }
  return { valid: true, error: null };
}


export function getStatusColor(status) {
  const map = {
    pending:  "bg-warning-50 text-warning-700 border-warning-500",
    approved: "bg-success-50 text-success-700 border-success-500",
    rejected: "bg-danger-50  text-danger-700  border-danger-500",
    active:   "bg-primary-50 text-primary-700 border-primary-500",
    scheduled:"bg-gray-100   text-gray-700    border-gray-400",
    expired:  "bg-gray-100   text-gray-500    border-gray-300",
  };
  return map[status] ?? "bg-gray-100 text-sub border-gray-300";
}


export function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}


export function truncate(str, length = 60) {
  if (!str) return "";
  return str.length > length ? `${str.slice(0, length)}...` : str;
}


export function safeJsonParse(str, fallback = null) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}
