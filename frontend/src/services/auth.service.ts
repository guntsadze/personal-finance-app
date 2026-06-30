import { apiClient } from "@/services/api-client";
import Cookies from "js-cookie";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  // user: { id: string; name: string; email: string };
}

export interface MeResponse {
  id: string;
  name: string;
  email: string;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>("/auth/login", payload);

  if (data && data.accessToken) {
    Cookies.set("token", data.accessToken, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });

    window.location.href = "/";
  }

  return data;
}

export async function register(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>(
    "/auth/register",
    payload,
  );

  if (data) {
    window.location.href = "/login";
  }

  return data;
}

// export async function logout(): Promise<void> {
//   await apiClient.post("/auth/logout");
// }

export async function logout(): Promise<void> {
  Cookies.remove("token");
  window.location.href = "/login";
}

export async function getMe(): Promise<MeResponse> {
  const { data } = await apiClient.get<MeResponse>("/auth/me");
  return data;
}
