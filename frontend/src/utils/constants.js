export const ROLES = {
  TEACHER:   "teacher",
  PRINCIPAL: "principal",
};

export const CONTENT_STATUS = {
  PENDING:  "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

export const SCHEDULE_STATUS = {
  SCHEDULED: "scheduled",
  ACTIVE:    "active",
  EXPIRED:   "expired",
};

export const SUBJECTS = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Geography",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Social Studies",
  "Art",
  "Physical Education",
];

export const ROUTES = {
  HOME:                "/",
  LOGIN:               "/login",
  TEACHER_DASHBOARD:   "/teacher/dashboard",
  TEACHER_UPLOAD:      "/teacher/upload",
  TEACHER_MY_CONTENT:  "/teacher/my-content",
  PRINCIPAL_DASHBOARD: "/principal/dashboard",
  PRINCIPAL_APPROVALS: "/principal/approvals",
  PRINCIPAL_CONTENT:   "/principal/content",
  LIVE:                "/live",
};

export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];
export const MAX_FILE_SIZE_MB   = 10;
export const MAX_FILE_SIZE      = MAX_FILE_SIZE_MB * 1024 * 1024;

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";

export const POLLING_INTERVAL = 30000; 
