import { apiClient } from "@/services/api-client";
import type { Budget } from "@/types/budget";
import { PaginatedResponse } from "@/types/Pagination";

export interface BudgetPayload {
  category: string;
  maximum: number;
  color: string;
}

export async function getBudgets(): Promise<Budget[]> {
  const { data } = await apiClient.get<PaginatedResponse<Budget>>("/budgets");
  return data.data ?? [];
}

export async function createBudget(payload: BudgetPayload): Promise<Budget> {
  const { data } = await apiClient.post<Budget>("/budgets", payload);
  return data;
}

export async function updateBudget(
  id: string,
  payload: Partial<BudgetPayload>,
): Promise<Budget> {
  const { data } = await apiClient.put<Budget>(`/budgets/${id}`, payload);
  return data;
}

export async function deleteBudget(id: string): Promise<void> {
  await apiClient.delete(`/budgets/${id}`);
}
