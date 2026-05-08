
import apiClient from "@/lib/apiClient";

const USER_KEY = "auth_user";
const TOKEN_KEY = "auth_token";


export async function login({ email, password }) {
  const response = await apiClient.post("/auth/login", { email, password });
  const { token, user } = response.data;

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  return { token, user };
}


export async function register({ name, email, password, role }) {
  const response = await apiClient.post("/auth/register", { name, email, password, role });
  const { token, user } = response.data;

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  return { token, user };
}


export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}


export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}


export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}


export function isAuthenticated() {
  return Boolean(getToken() && getCurrentUser());
}


export async function fetchMe() {
  const response = await apiClient.get("/auth/me");
  return response.data.user;
}
