import { apiClient } from "@/services/api-client";
import type { Transaction } from "@/types/transaction";

export interface TransactionPayload {
  name: string;
  category: string;
  amount: number;
  date: string;
  recurring?: boolean;
}

export async function getTransactions(): Promise<Transaction[]> {
  const { data } = await apiClient.get<Transaction[]>("/transactions");
  return data;
}

export async function getTransaction(id: string): Promise<Transaction> {
  const { data } = await apiClient.get<Transaction>(`/transactions/${id}`);
  return data;
}

export async function createTransaction(payload: TransactionPayload): Promise<Transaction> {
  const { data } = await apiClient.post<Transaction>("/transactions", payload);
  return data;
}

export async function updateTransaction(
  id: string,
  payload: Partial<TransactionPayload>
): Promise<Transaction> {
  const { data } = await apiClient.put<Transaction>(`/transactions/${id}`, payload);
  return data;
}

export async function deleteTransaction(id: string): Promise<void> {
  await apiClient.delete(`/transactions/${id}`);
}
