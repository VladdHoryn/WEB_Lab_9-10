import http from "@/api/http";
import type { AuthProfile } from "@/types/AuthProfile";

export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
}


export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const data = await http.post<LoginResponse, LoginResponse>("/auth/login", {
    email,
    password,
  });

  return data; // тут вже чистий LoginResponse
}

export async function getProfile(): Promise<AuthProfile> {
  const data = await http.get<AuthProfile, AuthProfile>("/auth/profile");
  return data; // тут вже чистий AuthProfile
}

export function logout(): void {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
}
