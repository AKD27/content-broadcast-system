
import apiClient from "@/lib/apiClient";


export async function getPendingContent() {
  const response = await apiClient.get("/content/pending");
  return response.data.content;
}


export async function approveContent(contentId) {
  const response = await apiClient.patch(`/content/${contentId}/approve`);
  return response.data;
}

export async function rejectContent(contentId, reason) {
  const response = await apiClient.patch(`/content/${contentId}/reject`, { reason });
  return response.data;
}
