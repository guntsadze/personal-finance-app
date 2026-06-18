import { apiClient } from "@/services/api-client";
import type { OverviewSummary } from "@/types/overview";

export async function getOverview(): Promise<OverviewSummary> {
  const { data } = await apiClient.get<OverviewSummary>("/overview");
  return data;
}
