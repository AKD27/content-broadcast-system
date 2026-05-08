"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { uploadContent } from "@/services/content.service";
import { contentUploadSchema } from "@/utils/validations";
import { SUBJECTS, ROUTES, ROLES } from "@/utils/constants";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import FileUpload from "@/components/shared/FileUpload";
import Card, { CardBody } from "@/components/ui/Card";

const subjectOptions = SUBJECTS.map((s) => ({ label: s, value: s }));

export default function TeacherUploadPage() {
  const router = useRouter();
  const [file, setFile]           = useState(null);
  const [fileError, setFileError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contentUploadSchema),
    defaultValues: { rotationDuration: 30 },
  });

  const onSubmit = async (data) => {
    if (!file) { setFileError("Please upload an image file."); return; }
    setFileError(null);

    try {
      
      await uploadContent({ formData: data, file });
      toast.success("Content uploaded! It's now pending approval.");
      reset();
      setFile(null);
      router.push(ROUTES.TEACHER_MY_CONTENT);
    } catch (err) {
      toast.error(err.message ?? "Upload failed. Please try again.");
    }
  };

  return (
    <ProtectedRoute allowedRole={ROLES.TEACHER}>
      <DashboardLayout title="Upload Content" subtitle="Upload educational content for principal approval">
        <div className="max-w-2xl">
          <Card>
            <CardBody className="space-y-5">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Input {...register("title")} label="Title" placeholder="e.g., Quadratic Equations Chapter 3" required error={errors.title?.message} />

                <Controller name="subject" control={control} render={({ field }) => (
                  <Select {...field} label="Subject" placeholder="Select a subject" options={subjectOptions} required error={errors.subject?.message} />
                )} />

                <Textarea {...register("description")} label="Description" placeholder="Briefly describe the content…" rows={3} error={errors.description?.message} />

                <FileUpload onChange={setFile} error={fileError} />

                <div className="grid grid-cols-2 gap-4">
                  <Input {...register("startTime")} label="Start Time" type="datetime-local" required error={errors.startTime?.message} />
                  <Input {...register("endTime")} label="End Time" type="datetime-local" required error={errors.endTime?.message} />
                </div>

                <Input {...register("rotationDuration", { valueAsNumber: true })} label="Rotation Duration (seconds)" type="number" min={5} max={300} placeholder="30" error={errors.rotationDuration?.message} />

                <div className="flex gap-3 pt-2">
                  <Button type="submit" loading={isSubmitting} size="lg">Upload Content</Button>
                  <Button type="button" variant="outline" size="lg" onClick={() => router.back()} disabled={isSubmitting}>Cancel</Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
