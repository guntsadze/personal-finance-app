import { apiClient } from "@/services/api-client";
import { PaginatedResponse } from "@/types/Pagination";
import type { RecurringBill } from "@/types/recurring-bill";

export async function getRecurringBills(): Promise<RecurringBill[]> {
  const { data } =
    await apiClient.get<PaginatedResponse<RecurringBill>>("/recurring-bills");
  return data.data ?? [];
}
