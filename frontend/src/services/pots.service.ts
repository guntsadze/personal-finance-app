import { apiClient } from "@/services/api-client";
import { PaginatedResponse } from "@/types/Pagination";
import type { Pot } from "@/types/pot";

export interface PotPayload {
  name: string;
  target: number;
  color: string;
}

export interface MoneyPayload {
  amount: number;
}

export async function getPots(): Promise<Pot[]> {
  const { data } = await apiClient.get<PaginatedResponse<Pot>>("/pots");
  return data.data ?? [];
}

export async function createPot(payload: PotPayload): Promise<Pot> {
  const { data } = await apiClient.post<Pot>("/pots", payload);
  return data;
}

export async function updatePot(
  id: string,
  payload: Partial<PotPayload>,
): Promise<Pot> {
  const { data } = await apiClient.put<Pot>(`/pots/${id}`, payload);
  return data;
}

export async function deletePot(id: string): Promise<void> {
  await apiClient.delete(`/pots/${id}`);
}

export async function addMoneyToPot(
  id: string,
  payload: MoneyPayload,
): Promise<Pot> {
  const { data } = await apiClient.post<Pot>(`/pots/${id}/add-money`, payload);
  return data;
}

export async function withdrawFromPot(
  id: string,
  payload: MoneyPayload,
): Promise<Pot> {
  const { data } = await apiClient.post<Pot>(`/pots/${id}/withdraw`, payload);
  return data;
}
