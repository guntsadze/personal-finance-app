"use client";

import { useFetch } from "@/hooks/use-fetch";
import { getPots } from "@/services/pots.service";

export function usePots() {
  return useFetch(getPots);
}
