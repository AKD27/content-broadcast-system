
import apiClient from "@/lib/apiClient";


export async function uploadContent({ formData, file }) {
  const data = new FormData();
  data.append("title",            formData.title);
  data.append("subject",          formData.subject);
  data.append("description",      formData.description || "");
  data.append("startTime",        formData.startTime);
  data.append("endTime",          formData.endTime);
  data.append("rotationDuration", formData.rotationDuration || 30);
  data.append("file",             file);

  const response = await apiClient.post("/content/upload", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.content;
}


export async function getContentByTeacher() {
  const response = await apiClient.get("/content/my");
  return response.data.content;
}


export async function getTeacherStats() {
  const response = await apiClient.get("/content/my/stats");
  return response.data.stats;
}


export async function getAllContent({ status = "all", search = "" } = {}) {
  const params = {};
  if (status !== "all") params.status = status;
  if (search.trim())    params.search = search.trim();

  const response = await apiClient.get("/content/all", { params });
  return response.data.content;
}


export async function getPrincipalStats() {
  const response = await apiClient.get("/content/stats");
  return response.data.stats;
}


export async function getPendingContent() {
  const response = await apiClient.get("/content/pending");
  return response.data.content;
}


export async function getLiveContent(teacherId) {
  const response = await apiClient.get(`/content/live/${teacherId}`);
  return response.data.content;
}


export async function deleteContent(contentId) {
  const response = await apiClient.delete(`/content/${contentId}`);
  return response.data;
}
