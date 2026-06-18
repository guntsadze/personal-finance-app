"use client";

import { useFetch } from "@/hooks/use-fetch";
import { getRecurringBills } from "@/services/recurring-bills.service";

export function useRecurringBills() {
  return useFetch(getRecurringBills);
}
