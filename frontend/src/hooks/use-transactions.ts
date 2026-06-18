"use client";

import { useFetch } from "@/hooks/use-fetch";
import { getTransactions } from "@/services/transactions.service";

export function useTransactions() {
  return useFetch(getTransactions);
}
