"use client";

import { useFetch } from "@/hooks/use-fetch";
import { getMe } from "@/services/auth.service";

export function useAuth() {
  return useFetch(getMe);
}
