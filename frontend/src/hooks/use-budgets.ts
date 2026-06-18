"use client";

import { useFetch } from "@/hooks/use-fetch";
import { getBudgets } from "@/services/budgets.service";

export function useBudgets() {
  return useFetch(getBudgets);
}
