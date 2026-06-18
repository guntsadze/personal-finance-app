"use client";

import { useFetch } from "@/hooks/use-fetch";
import { getOverview } from "@/services/overview.service";

export function useOverview() {
  return useFetch(getOverview);
}
