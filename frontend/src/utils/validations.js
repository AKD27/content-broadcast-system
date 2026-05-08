import { z } from "zod";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "./constants";


export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});


export const contentUploadSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(100, "Title must be under 100 characters"),
    subject: z.string().min(1, "Subject is required"),
    description: z.string().max(500, "Description must be under 500 characters").optional(),
    startTime: z.string().min(1, "Start time is required"),
    endTime:   z.string().min(1, "End time is required"),
    rotationDuration: z
      .number({ invalid_type_error: "Rotation duration must be a number" })
      .min(5,  "Minimum rotation is 5 seconds")
      .max(300, "Maximum rotation is 300 seconds")
      .optional(),
  })
  .refine(
    (data) => new Date(data.endTime) > new Date(data.startTime),
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );


export const rejectionSchema = z.object({
  reason: z
    .string()
    .min(1, "Rejection reason is required")
    .min(10, "Please provide a more detailed reason (min 10 characters)")
    .max(300, "Reason must be under 300 characters"),
});


export const filterSchema = z.object({
  search: z.string().optional(),
  status: z.enum(["all", "pending", "approved", "rejected"]).default("all"),
});
