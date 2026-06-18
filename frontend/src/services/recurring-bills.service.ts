import { apiClient } from "@/services/api-client";
import type { RecurringBill } from "@/types/recurring-bill";

export async function getRecurringBills(): Promise<RecurringBill[]> {
  const { data } = await apiClient.get<RecurringBill[]>("/recurring-bills");
  return data;
}
